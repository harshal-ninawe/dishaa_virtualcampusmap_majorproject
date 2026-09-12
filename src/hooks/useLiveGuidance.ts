import { useEffect, useRef } from 'react';
import { decodePolyline } from '../utils/polyline';
import { distanceMeters } from '../utils/geo';
import { subscribeToLiveLocation, type LocationUpdateEvent } from './useGeolocation';
import { voiceNavigation, type VoicePriority } from '../services/voiceNavigation';
import type { RouteResponse, Coordinates, Place } from '../types';
import type { StepMilestone } from '../lib/campusData';

export interface NavigationContextSnapshot {
  navigationStatus: 'navigating' | 'idle' | 'arrived' | 'rerouting';
  currentLocation: Coordinates | null;
  origin: { name: string; lat: number; lng: number } | null;
  destination: { name: string; lat: number; lng: number } | null;
  remainingDistance: number | null;
  estimatedTime: number | null;
  currentManeuver: {
    instruction: string;
    distance: number;
    stage: 'approaching' | 'immediate' | 'cruising';
  } | null;
  nextManeuver: {
    instruction: string;
    distance: number;
  } | null;
  nearbyLandmark: {
    name: string;
    category: string;
    distance: number;
  } | null;
  isOffRoute: boolean;
}

let activeNavigationContext: NavigationContextSnapshot = {
  navigationStatus: 'idle',
  currentLocation: null,
  origin: null,
  destination: null,
  remainingDistance: null,
  estimatedTime: null,
  currentManeuver: null,
  nextManeuver: null,
  nearbyLandmark: null,
  isOffRoute: false,
};

export function getLatestNavigationContext(): NavigationContextSnapshot {
  return activeNavigationContext;
}

type GuidanceOptions = {
  route: RouteResponse | null;
  currentLocation: Coordinates | null;
  milestones?: StepMilestone[];
  places?: Place[];
  speak?: (text: string, priority?: VoicePriority, dedupeKey?: string) => void;
  onInstruction?: (text: string | null, remainingMeters?: number | null) => void;
  onStepIndexChange?: (stepIndex: number) => void;
  onOffRoute?: () => void;
  onArrived?: (location?: Coordinates) => void;
  recalcRoute?: () => void;
};

const OFF_ROUTE_METERS = 40; // threshold to trigger off-route
const ON_ROUTE_RECOVERY_METERS = 25; // hysteresis threshold to confirm recovery onto route
const ARRIVAL_METERS = 10; // destination reached within 10m
const APPROACHING_METERS = 45; // threshold for "approaching" stage
const IMMEDIATE_METERS = 9; // threshold for "immediate" stage ("turn now" <= 9m)
const DESTINATION_APPROACH_METERS = 20; // threshold for destination approach announcement

// 5-second / 5-meter progress guidance thresholds for small campus
const REASSURANCE_COOLDOWN_MS = 5000;
const REASSURANCE_MIN_PROGRESS_METERS = 5;

const REASSURANCE_MESSAGES = [
  'You are moving correctly. Go straight.',
  'You are on the right path. Continue straight.',
  'Perfect. You are moving correctly.',
  "You're on the right path. Keep going.",
  "You're doing great. Continue straight.",
];

/**
 * Authoritatively extract LEFT / RIGHT direction from Valhalla maneuver instruction.
 * Excludes destination arrival instructions.
 */
export function getTurnDirection(instruction: string): 'left' | 'right' | null {
  const lower = instruction.toLowerCase();
  // Filter out arrival text
  if (lower.includes('arrived') || lower.includes('destination')) {
    return null;
  }
  // Check action prefix before street/landmark preposition (onto, towards, toward, on, at, into)
  const actionPart = lower.split(/\b(?:onto|towards|toward|on|at|into)\b/)[0] || lower;

  const hasLeftAction = /\b(left|slight left|sharp left|bear left|keep left)\b/.test(actionPart);
  const hasRightAction = /\b(right|slight right|sharp right|bear right|keep right)\b/.test(actionPart);

  if (hasLeftAction && !hasRightAction) return 'left';
  if (hasRightAction && !hasLeftAction) return 'right';

  // Fallback to whole string if actionPart didn't match cleanly
  const hasLeft = /\bleft\b/.test(lower);
  const hasRight = /\bright\b/.test(lower);
  if (hasLeft && !hasRight) return 'left';
  if (hasRight && !hasLeft) return 'right';

  return null;
}

/**
 * Format deterministic maneuver speech according to turn-by-turn guidance rules:
 * Approaching: "Turn left in X meters." / "Turn right in X meters." (or with landmark)
 * Immediate (<=9m): "Turn left now." / "Turn right now."
 */
function formatManeuverSpeech({
  instruction,
  stage,
  distance,
  nearbyLandmark,
}: {
  instruction: string;
  stage: 'approaching' | 'immediate';
  distance: number;
  nearbyLandmark?: { name: string; distance: number } | null;
}): string {
  const dir = getTurnDirection(instruction);
  const isLeft = dir === 'left';
  const isRight = dir === 'right';

  if (stage === 'immediate') {
    if (isLeft) return 'Turn left now.';
    if (isRight) return 'Turn right now.';
    const cleanTurn = instruction.replace(/in \d+.*$/i, '').trim();
    return cleanTurn.toLowerCase().startsWith('turn') ? `${cleanTurn} now.` : `${cleanTurn}.`;
  }

  // Approaching stage
  if (isLeft) {
    if (nearbyLandmark && nearbyLandmark.distance <= 35) {
      return `Turn left after the ${nearbyLandmark.name} in ${distance} meters.`;
    }
    return `Turn left in ${distance} meters.`;
  }

  if (isRight) {
    if (nearbyLandmark && nearbyLandmark.distance <= 35) {
      return `Turn right after the ${nearbyLandmark.name} in ${distance} meters.`;
    }
    return `Turn right in ${distance} meters.`;
  }

  // Other maneuvers (continue / proceed)
  if (nearbyLandmark && nearbyLandmark.distance <= 35) {
    return `${instruction} near the ${nearbyLandmark.name} in ${distance} meters.`;
  }
  return `${instruction} in ${distance} meters.`;
}

/**
 * Purely deterministic live guidance hook for DISHAA.
 *
 * Real-time navigation runs 100% locally:
 * - Stable maneuver & stage deduplication (${sessionId}:${maneuverIndex}:${stage})
 * - 5-second / 5-meter progress reassurance guidance
 * - Single-announcement destination approach (10m < distance <= 20m)
 * - Highest-priority permanent arrival lock (distance <= 10m)
 * - Deduplicated off-route enter and recover transitions
 * - Great-circle distance calculations & polyline proximity
 * - Landmark detection from authentic MongoDB campus POIs
 * - Single authoritative location evaluation path
 *
 * ZERO LLM or network requests in the GPS tracking loop.
 */
export function useLiveGuidance({
  route,
  currentLocation,
  milestones = [],
  places = [],
  speak,
  onInstruction,
  onStepIndexChange,
  onOffRoute,
  onArrived,
  recalcRoute,
}: GuidanceOptions) {
  const sessionIdRef = useRef<string | null>(null);
  const activeLegIndexRef = useRef<number>(0);
  const activeStepIndexRef = useRef<number>(0);
  const lastRecalcTime = useRef<number>(0);
  const isOffRouteRef = useRef(false);
  const arrivedRef = useRef(false);
  const destinationApproachedRef = useRef(false);
  const lastAnnouncementTimeRef = useRef<number>(0);
  const lastAnnouncementLocationRef = useRef<Coordinates | null>(null);
  const reassuranceIndexRef = useRef<number>(0);
  const lastReassuranceLocationRef = useRef<Coordinates | null>(null);
  const lastEvaluatedLocationRef = useRef<Coordinates | null>(null);
  const lastDestinationNameRef = useRef<string | null>(null);
  const spokenManeuverStagesRef = useRef<Set<string>>(new Set());

  // Keep latest callback refs to avoid stale closures
  const speakRef = useRef(speak);
  speakRef.current = speak;
  const onInstructionRef = useRef(onInstruction);
  onInstructionRef.current = onInstruction;
  const onStepIndexChangeRef = useRef(onStepIndexChange);
  onStepIndexChangeRef.current = onStepIndexChange;
  const milestonesRef = useRef(milestones);
  milestonesRef.current = milestones;
  const onOffRouteRef = useRef(onOffRoute);
  onOffRouteRef.current = onOffRoute;
  const onArrivedRef = useRef(onArrived);
  onArrivedRef.current = onArrived;
  const recalcRouteRef = useRef(recalcRoute);
  recalcRouteRef.current = recalcRoute;
  const placesRef = useRef(places);
  placesRef.current = places;

  // Dispatch speech instruction through voiceNavigation or speak prop
  const dispatchVoice = (text: string, priority: VoicePriority, dedupeKey?: string) => {
    if (speakRef.current) {
      speakRef.current(text, priority, dedupeKey);
    } else {
      voiceNavigation.speak(text, priority, dedupeKey);
    }
  };

  const activeRouteKeyRef = useRef<string | null>(null);

  // Reset navigation status ONLY when the active route changes (NOT on currentLocation!)
  useEffect(() => {
    const routeKey = route
      ? `${route.from?.name || ''}-${route.to?.name || ''}-${route.route?.encodedShape || ''}`
      : null;

    if (!route) {
      activeRouteKeyRef.current = null;
      sessionIdRef.current = null;
      arrivedRef.current = false;
      isOffRouteRef.current = false;
      destinationApproachedRef.current = false;
      activeLegIndexRef.current = 0;
      lastRecalcTime.current = 0;
      lastAnnouncementTimeRef.current = 0;
      lastAnnouncementLocationRef.current = null;
      reassuranceIndexRef.current = 0;
      lastReassuranceLocationRef.current = null;
      lastDestinationNameRef.current = null;
      lastEvaluatedLocationRef.current = null;
      spokenManeuverStagesRef.current.clear();

      voiceNavigation.stopSession();
      activeNavigationContext = {
        navigationStatus: 'idle',
        currentLocation: currentLocation || null,
        origin: null,
        destination: null,
        remainingDistance: null,
        estimatedTime: null,
        currentManeuver: null,
        nextManeuver: null,
        nearbyLandmark: null,
        isOffRoute: false,
      };
      return;
    }

    if (activeRouteKeyRef.current === routeKey) {
      return; // Same route already active, don't restart session
    }
    activeRouteKeyRef.current = routeKey;

    // Check if this is a route recalculation while off-route for the same destination
    const isRecalculation =
      sessionIdRef.current !== null &&
      lastDestinationNameRef.current === route.to.name &&
      isOffRouteRef.current;

    if (isRecalculation) {
      isOffRouteRef.current = false;
      activeLegIndexRef.current = 0;
      spokenManeuverStagesRef.current.clear();

      const newSessionId = `nav_${route.to.id || 'dest'}_recalc_${Date.now()}`;
      sessionIdRef.current = newSessionId;
      voiceNavigation.startSession(newSessionId);

      const recoveryKey = `${newSessionId}:off_route_recover`;
      spokenManeuverStagesRef.current.add(recoveryKey);
      dispatchVoice('Route updated. Continue straight.', 'NAVIGATION', recoveryKey);

      lastAnnouncementTimeRef.current = Date.now();
      if (currentLocation) {
        lastAnnouncementLocationRef.current = currentLocation;
        lastReassuranceLocationRef.current = currentLocation;
      }
      return;
    }

    // Fresh navigation session for a new route
    const newSessionId = `nav_${route.to.id || 'dest'}_${Date.now()}`;
    sessionIdRef.current = newSessionId;
    lastDestinationNameRef.current = route.to.name;
    arrivedRef.current = false;
    isOffRouteRef.current = false;
    destinationApproachedRef.current = false;
    activeLegIndexRef.current = 0;
    lastRecalcTime.current = 0;
    reassuranceIndexRef.current = 0;
    lastEvaluatedLocationRef.current = null;
    spokenManeuverStagesRef.current.clear();

    voiceNavigation.startSession(newSessionId);

    // Initial announcement once per navigation session
    const startKey = `${newSessionId}:start`;
    spokenManeuverStagesRef.current.add(startKey);
    const initialInstruction = route.route?.instructions?.[0]?.instruction || `Navigation started towards ${route.to.name}.`;
    dispatchVoice(initialInstruction, 'NAVIGATION', startKey);

    lastAnnouncementTimeRef.current = Date.now();
    if (currentLocation) {
      lastAnnouncementLocationRef.current = currentLocation;
      lastReassuranceLocationRef.current = currentLocation;
    }
  }, [route]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      voiceNavigation.cancel();
    };
  }, []);

  // Core deterministic navigation evaluator
  const evaluateNavigation = (location: Coordinates) => {
    if (!route || arrivedRef.current || voiceNavigation.isSessionArrived()) return;

    // Deduplicate identical coordinate calls
    if (
      lastEvaluatedLocationRef.current &&
      lastEvaluatedLocationRef.current.lat === location.lat &&
      lastEvaluatedLocationRef.current.lng === location.lng
    ) {
      return;
    }
    lastEvaluatedLocationRef.current = location;

    // Seed announcement & reassurance locations if not already set
    if (!lastAnnouncementLocationRef.current) {
      lastAnnouncementLocationRef.current = location;
    }
    if (!lastReassuranceLocationRef.current) {
      lastReassuranceLocationRef.current = location;
    }

    const sessionId = sessionIdRef.current || 'nav';
    const now = Date.now();

    // 0. Automatic Milestone Step Progression based on Live GPS Location
    if (milestonesRef.current && milestonesRef.current.length > 0) {
      const curStep = activeStepIndexRef.current;
      for (let i = curStep + 1; i < milestonesRef.current.length; i++) {
        const m = milestonesRef.current[i];
        if (m.coords) {
          const distToMilestone = distanceMeters(location, { lat: m.coords[0], lng: m.coords[1] });
          if (distToMilestone <= 25) {
            activeStepIndexRef.current = i;
            onStepIndexChangeRef.current?.(i);

            const milestoneKey = `${sessionId}:milestone:${i}`;
            if (!spokenManeuverStagesRef.current.has(milestoneKey)) {
              spokenManeuverStagesRef.current.add(milestoneKey);
              dispatchVoice(m.instruction, 'NAVIGATION', milestoneKey);
              lastAnnouncementTimeRef.current = now;
              lastAnnouncementLocationRef.current = location;
            }
            break;
          }
        }
      }
    }

    const instructions = route.route.instructions || [];
    const dest = { lat: route.to.lat, lng: route.to.lng };
    const path = decodePolyline(route.route.encodedShape || null);

    // 1. Destination distance calculation with route terminus validation
    // The actual destination coordinate is the primary source of truth.
    const distToDest = Math.round(distanceMeters(location, dest));

    // Valhalla pedestrian route terminus (walkway stopping point)
    // Only consider terminus when it belongs to this active route AND is adjacent to the active destination
    const routeTerminus = path.length > 0 ? path[path.length - 1] : null;
    const isRouteTerminusValidForDest = routeTerminus
      ? distanceMeters(routeTerminus, dest) <= 35
      : false;
    const distToRouteEnd = isRouteTerminusValidForDest && routeTerminus
      ? Math.round(distanceMeters(location, routeTerminus))
      : distToDest;

    // Remaining distance primarily tracks destination coordinate, using route-end to compensate for centroid offset
    const remainingToDest = isRouteTerminusValidForDest
      ? Math.min(distToDest, distToRouteEnd)
      : distToDest;

    // Strict arrival rule:
    // Destination coordinate is primary. Route-terminus compensates for centroid offset
    // ONLY when user is within 10m of route terminus AND within 25m of destination coordinate.
    const isArrivedAtDestination =
      distToDest <= ARRIVAL_METERS ||
      (isRouteTerminusValidForDest && distToRouteEnd <= ARRIVAL_METERS && distToDest <= 25);

    const estimatedMin = Math.max(1, Math.round(remainingToDest / 80)); // pedestrian ~80m/min

    // Find nearby landmark from authentic MongoDB POIs within 60 meters
    let nearbyLandmarkData: NavigationContextSnapshot['nearbyLandmark'] = null;
    if (placesRef.current && placesRef.current.length > 0) {
      let closestPoi: Place | null = null;
      let minPoiDist = Number.POSITIVE_INFINITY;
      for (const p of placesRef.current) {
        const d = distanceMeters(location, { lat: p.location.lat, lng: p.location.lng });
        if (d < minPoiDist && d <= 60) {
          minPoiDist = d;
          closestPoi = p;
        }
      }
      if (closestPoi) {
        nearbyLandmarkData = {
          name: closestPoi.name,
          category: closestPoi.category,
          distance: Math.round(minPoiDist),
        };
      }
    }

    // 1. ARRIVAL DETECTION - Priority 7 (Highest)
    // Arrival MUST have the highest voice priority and permanently lock the session.
    if (isArrivedAtDestination) {
      arrivedRef.current = true;
      const arrivalMsg = 'You have arrived at your destination.';
      const arrivalKey = `${sessionId}:arrival`;
      spokenManeuverStagesRef.current.add(arrivalKey);

      onInstructionRef.current?.(arrivalMsg, 0);
      onArrivedRef.current?.(location);
      dispatchVoice(arrivalMsg, 'ARRIVAL', arrivalKey);

      lastAnnouncementTimeRef.current = now;
      lastAnnouncementLocationRef.current = location;
      lastReassuranceLocationRef.current = location;

      activeNavigationContext = {
        navigationStatus: 'arrived',
        currentLocation: location,
        origin: route.from ? { name: route.from.name || 'Start', lat: route.from.lat, lng: route.from.lng } : null,
        destination: { name: route.to.name, lat: route.to.lat, lng: route.to.lng },
        remainingDistance: 0,
        estimatedTime: 0,
        currentManeuver: null,
        nextManeuver: null,
        nearbyLandmark: nearbyLandmarkData,
        isOffRoute: false,
      };
      return;
    }

    // 2. OFF-ROUTE DETECTION - Priority 5
    let minDistanceToPath = Number.POSITIVE_INFINITY;
    for (const point of path) {
      const d = distanceMeters(location, point);
      if (d < minDistanceToPath) minDistanceToPath = d;
    }

    const isCurrentlyOffRoute = isOffRouteRef.current
      ? minDistanceToPath > ON_ROUTE_RECOVERY_METERS
      : minDistanceToPath > OFF_ROUTE_METERS;

    if (isCurrentlyOffRoute) {
      if (!isOffRouteRef.current) {
        isOffRouteRef.current = true;
        const offRouteMsg = 'You are off route. Recalculating.';
        const offRouteKey = `${sessionId}:off_route_enter`;
        if (!spokenManeuverStagesRef.current.has(offRouteKey)) {
          spokenManeuverStagesRef.current.add(offRouteKey);
          onInstructionRef.current?.(offRouteMsg, remainingToDest);
          onOffRouteRef.current?.();
          dispatchVoice(offRouteMsg, 'OFF_ROUTE', offRouteKey);
          lastAnnouncementTimeRef.current = now;
          lastAnnouncementLocationRef.current = location;
          lastReassuranceLocationRef.current = location;
        }
      }

      activeNavigationContext = {
        navigationStatus: 'rerouting',
        currentLocation: location,
        origin: route.from ? { name: route.from.name || 'Start', lat: route.from.lat, lng: route.from.lng } : null,
        destination: { name: route.to.name, lat: route.to.lat, lng: route.to.lng },
        remainingDistance: remainingToDest,
        estimatedTime: estimatedMin,
        currentManeuver: null,
        nextManeuver: null,
        nearbyLandmark: nearbyLandmarkData,
        isOffRoute: true,
      };

      // Throttle automatic recalculation to at most once every 12 seconds
      if (now - lastRecalcTime.current > 12000) {
        lastRecalcTime.current = now;
        try {
          recalcRouteRef.current?.();
        } catch (_) {}
      }
      return;
    }

    // Back on route after being off-route (hysteresis passed <= 25m)
    if (isOffRouteRef.current) {
      isOffRouteRef.current = false;
      const recoveryKey = `${sessionId}:off_route_recover`;
      if (!spokenManeuverStagesRef.current.has(recoveryKey)) {
        spokenManeuverStagesRef.current.add(recoveryKey);
        dispatchVoice('Route updated. Continue straight.', 'NAVIGATION', recoveryKey);
        lastAnnouncementTimeRef.current = now;
        lastAnnouncementLocationRef.current = location;
        lastReassuranceLocationRef.current = location;
      }
    }

    // 3. DESTINATION APPROACH (10m < remainingToDest <= 20m) - Priority 4
    if (remainingToDest <= DESTINATION_APPROACH_METERS && !isArrivedAtDestination) {
      if (!destinationApproachedRef.current) {
        destinationApproachedRef.current = true;
        const approachMsg = 'Destination is approaching.';
        const approachKey = `${sessionId}:destination_approach`;
        spokenManeuverStagesRef.current.add(approachKey);
        dispatchVoice(approachMsg, 'DESTINATION_APPROACH', approachKey);
        lastAnnouncementTimeRef.current = now;
        lastAnnouncementLocationRef.current = location;
      }
    }

    // 4. TURN-BY-TURN MANEUVER STATE MACHINE
    const n = instructions.length;
    const legLengths = instructions.map((inst) => Math.round((inst.distanceKm || 0) * 1000));
    const endDistFromDest: number[] = new Array(n);
    if (n > 0) {
      endDistFromDest[n - 1] = 0;
      for (let i = n - 2; i >= 0; i--) {
        endDistFromDest[i] = endDistFromDest[i + 1] + legLengths[i + 1];
      }
    }

    // Find the current active leg where remainingToDest > endDistFromDest[i]
    let activeLegIndex = Math.max(0, n - 1);
    for (let i = 0; i < n; i++) {
      if (remainingToDest > endDistFromDest[i] || i === n - 1) {
        activeLegIndex = i;
        break;
      }
    }

    // Monotonically advance activeLegIndex: never regress to a completed maneuver
    if (activeLegIndex < activeLegIndexRef.current) {
      activeLegIndex = activeLegIndexRef.current;
    } else {
      activeLegIndexRef.current = activeLegIndex;
    }

    const upcomingManeuverIndex = activeLegIndex + 1 < n ? activeLegIndex + 1 : activeLegIndex;
    const upcomingManeuverObj = instructions[upcomingManeuverIndex];
    const currentLegObj = instructions[activeLegIndex];
    const rawInstruction = upcomingManeuverObj?.instruction || currentLegObj?.instruction || `Continue towards ${route.to.name}`;
    const distanceToManeuver = activeLegIndex + 1 < n
      ? Math.max(0, remainingToDest - endDistFromDest[activeLegIndex])
      : remainingToDest;

    // The final Valhalla maneuver is destination arrival and must NEVER enter the turn state machine
    const isArrivalManeuver =
      upcomingManeuverIndex >= n - 1 ||
      /arrived|destination/i.test(upcomingManeuverObj?.instruction || '');

    // Determine maneuver stage
    let stage: 'approaching' | 'immediate' | 'cruising' = 'cruising';

    // Only announce maneuvers for upcoming genuine turns (before the destination arrival leg)
    if (!isArrivalManeuver && upcomingManeuverObj) {
      if (distanceToManeuver <= IMMEDIATE_METERS) {
        stage = 'immediate';
        const immediateKey = `${sessionId}:${upcomingManeuverIndex}:immediate`;
        if (!spokenManeuverStagesRef.current.has(immediateKey)) {
          spokenManeuverStagesRef.current.add(immediateKey);
          const speech = formatManeuverSpeech({
            instruction: upcomingManeuverObj.instruction,
            stage: 'immediate',
            distance: distanceToManeuver,
            nearbyLandmark: nearbyLandmarkData,
          });
          dispatchVoice(speech, 'IMMEDIATE', immediateKey);
          lastAnnouncementTimeRef.current = now;
          lastAnnouncementLocationRef.current = location;
        }
      } else if (distanceToManeuver <= APPROACHING_METERS) {
        stage = 'approaching';
        const approachingKey = `${sessionId}:${upcomingManeuverIndex}:approaching`;
        if (!spokenManeuverStagesRef.current.has(approachingKey)) {
          spokenManeuverStagesRef.current.add(approachingKey);
          const speech = formatManeuverSpeech({
            instruction: upcomingManeuverObj.instruction,
            stage: 'approaching',
            distance: distanceToManeuver,
            nearbyLandmark: nearbyLandmarkData,
          });
          dispatchVoice(speech, 'APPROACHING', approachingKey);
          lastAnnouncementTimeRef.current = now;
          lastAnnouncementLocationRef.current = location;
        }
      }
    }

    // Display visual formatted instruction on UI
    const visualText = distanceToManeuver <= APPROACHING_METERS
      ? rawInstruction
      : (currentLegObj?.instruction || rawInstruction);
    onInstructionRef.current?.(visualText, remainingToDest);

    // Update global navigationContext snapshot for AI Assistant
    const nextInstrObj = activeLegIndex + 2 < n ? instructions[activeLegIndex + 2] : null;

    activeNavigationContext = {
      navigationStatus: 'navigating',
      currentLocation: location,
      origin: route.from ? { name: route.from.name || 'Start', lat: route.from.lat, lng: route.from.lng } : null,
      destination: { name: route.to.name, lat: route.to.lat, lng: route.to.lng },
      remainingDistance: remainingToDest,
      estimatedTime: estimatedMin,
      currentManeuver: {
        instruction: rawInstruction,
        distance: distanceToManeuver,
        stage,
      },
      nextManeuver: nextInstrObj
        ? {
            instruction: nextInstrObj.instruction,
            distance: Math.round((nextInstrObj.distanceKm || 0) * 1000),
          }
        : null,
      nearbyLandmark: nearbyLandmarkData,
      isOffRoute: false,
    };

    // 5. 5-SECOND / 5-METER PROGRESS REASSURANCE - Priority 1 (Lowest)
    // Reassurance is allowed ONLY when:
    // - On route (not off-route)
    // - Cruising (not approaching or immediate turn)
    // - Not approaching destination (remainingToDest > 20m)
    // - Not arrived
    // - At least 5 seconds elapsed since last voice announcement
    // - At least 5 meters travelled since last reassurance announcement
    const isDestinationApproachActive = remainingToDest <= DESTINATION_APPROACH_METERS;
    const isTurnActive = stage !== 'cruising' || distanceToManeuver <= APPROACHING_METERS;

    if (
      !isOffRouteRef.current &&
      !arrivedRef.current &&
      !voiceNavigation.isSessionArrived() &&
      stage === 'cruising' &&
      !isDestinationApproachActive &&
      !isTurnActive
    ) {
      const timeSinceLastVoice = now - lastAnnouncementTimeRef.current;
      const distSinceLastReassurance = lastReassuranceLocationRef.current
        ? distanceMeters(location, lastReassuranceLocationRef.current)
        : 0;

      if (
        timeSinceLastVoice >= REASSURANCE_COOLDOWN_MS &&
        distSinceLastReassurance >= REASSURANCE_MIN_PROGRESS_METERS
      ) {
        const msg = REASSURANCE_MESSAGES[reassuranceIndexRef.current % REASSURANCE_MESSAGES.length];
        reassuranceIndexRef.current = (reassuranceIndexRef.current + 1) % REASSURANCE_MESSAGES.length;

        const reassuranceKey = `${sessionId}:reassurance:${reassuranceIndexRef.current}:${now}`;
        dispatchVoice(msg, 'REASSURANCE', reassuranceKey);

        lastAnnouncementTimeRef.current = now;
        lastAnnouncementLocationRef.current = location;
        lastReassuranceLocationRef.current = location;
      }
    }
  };

  // Single authoritative evaluation on location update (idempotent, prevents duplicate execution)
  useEffect(() => {
    if (currentLocation) {
      evaluateNavigation(currentLocation);
    }
  }, [route, currentLocation]);
}
