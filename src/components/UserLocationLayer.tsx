import { useEffect, useRef } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import type { Coordinates } from '../types';
import { subscribeToLiveLocation, getLatestLocation, type LocationUpdateEvent } from '../hooks/useGeolocation';
import { voiceNavigation } from '../services/voiceNavigation';
import { distanceMeters } from '../utils/geo';

interface UserLocationLayerProps {
  initialLocation?: Coordinates | null;
  initialAccuracy?: number | null;
  isFollowMode?: boolean;
  onFollowModeChange?: (active: boolean) => void;
  navigationActive?: boolean;
  isArrived?: boolean;
  arrivalLocation?: Coordinates | null;
}

const currentLocationIcon = divIcon({
  className: 'point-icon-wrapper',
  html: '<span class="current-location-marker"></span>',
  iconSize: [17, 17],
  iconAnchor: [8, 8],
});

export function UserLocationLayer({
  initialLocation,
  initialAccuracy,
  isFollowMode = false,
  onFollowModeChange,
  navigationActive = false,
  isArrived = false,
  arrivalLocation = null,
}: UserLocationLayerProps) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  // Position interpolation state
  const currentPosRef = useRef<Coordinates | null>(initialLocation || getLatestLocation() || null);
  const targetPosRef = useRef<Coordinates | null>(initialLocation || getLatestLocation() || null);
  const animStartPosRef = useRef<Coordinates | null>(initialLocation || getLatestLocation() || null);
  const animStartTimeRef = useRef<number>(0);
  const animDurationRef = useRef<number>(1000); // estimated update interval
  const rafIdRef = useRef<number | null>(null);
  const lastUpdateTimestampRef = useRef<number>(Date.now());

  const isFollowModeRef = useRef(isFollowMode);
  isFollowModeRef.current = isFollowMode;

  const onFollowModeChangeRef = useRef(onFollowModeChange);
  onFollowModeChangeRef.current = onFollowModeChange;

  const isArrivedRef = useRef(isArrived);
  isArrivedRef.current = isArrived;

  // Listen to user map interactions to gracefully pause auto-following
  useMapEvents({
    dragstart: () => {
      if (isFollowModeRef.current) {
        onFollowModeChangeRef.current?.(false);
      }
    },
    zoomstart: () => {
      if (isFollowModeRef.current) {
        onFollowModeChangeRef.current?.(false);
      }
    },
  });

  // Setup marker and accuracy circle on mount
  useEffect(() => {
    const startLoc = currentPosRef.current;
    if (startLoc) {
      if (!markerRef.current) {
        markerRef.current = L.marker([startLoc.lat, startLoc.lng], {
          icon: currentLocationIcon,
          zIndexOffset: 1000,
        }).addTo(map);
      }
      if (initialAccuracy && initialAccuracy > 0 && !circleRef.current) {
        circleRef.current = L.circle([startLoc.lat, startLoc.lng], {
          radius: initialAccuracy,
          color: '#3d75b4',
          weight: 1,
          opacity: 0.5,
          fillColor: '#3d75b4',
          fillOpacity: 0.12,
        }).addTo(map);
      }
    }

    return () => {
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
        markerRef.current = null;
      }
      if (circleRef.current) {
        map.removeLayer(circleRef.current);
        circleRef.current = null;
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [map]);

  // When arrival is confirmed, freeze marker at authoritative arrival position and halt animation loop
  useEffect(() => {
    const arrived = isArrived || voiceNavigation.isSessionArrived();
    if (arrived) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      const frozenPos = arrivalLocation || targetPosRef.current || currentPosRef.current || getLatestLocation();
      if (frozenPos && markerRef.current) {
        currentPosRef.current = frozenPos;
        targetPosRef.current = frozenPos;
        animStartPosRef.current = frozenPos;
        markerRef.current.setLatLng([frozenPos.lat, frozenPos.lng]);
        if (circleRef.current) {
          circleRef.current.setLatLng([frozenPos.lat, frozenPos.lng]);
        }
      }
    }
  }, [isArrived, arrivalLocation]);

  // Animation step: interpolate smoothly between confirmed GPS points
  const stepAnimation = (now: number) => {
    if (isArrivedRef.current || voiceNavigation.isSessionArrived()) {
      rafIdRef.current = null;
      return;
    }

    if (!targetPosRef.current || !animStartPosRef.current || !markerRef.current) {
      rafIdRef.current = null;
      return;
    }

    const elapsed = now - animStartTimeRef.current;
    const progress = Math.min(1, Math.max(0, elapsed / animDurationRef.current));

    // Ease-out linear interpolation
    const curLat = animStartPosRef.current.lat + (targetPosRef.current.lat - animStartPosRef.current.lat) * progress;
    const curLng = animStartPosRef.current.lng + (targetPosRef.current.lng - animStartPosRef.current.lng) * progress;
    const interpolated: Coordinates = { lat: curLat, lng: curLng };
    currentPosRef.current = interpolated;

    // Direct Leaflet marker position update — zero React re-renders!
    markerRef.current.setLatLng([curLat, curLng]);
    if (circleRef.current) {
      circleRef.current.setLatLng([curLat, curLng]);
    }

    // Camera follow update when enabled
    if (isFollowModeRef.current) {
      map.panTo([curLat, curLng], { animate: false });
    }

    if (progress < 1) {
      rafIdRef.current = requestAnimationFrame(stepAnimation);
    } else {
      rafIdRef.current = null;
    }
  };

  // Handle incoming live location updates from GPS watcher
  useEffect(() => {
    const handleLocationUpdate = (update: LocationUpdateEvent) => {
      // If arrival has been confirmed, ignore subsequent GPS movement to keep marker visually stationary
      if (isArrivedRef.current || voiceNavigation.isSessionArrived()) {
        return;
      }

      const { coordinates: nextCoords, accuracy } = update;
      const now = Date.now();
      const timeDelta = Math.max(300, Math.min(3000, now - lastUpdateTimestampRef.current));
      lastUpdateTimestampRef.current = now;

      // Ensure marker exists
      if (!markerRef.current) {
        markerRef.current = L.marker([nextCoords.lat, nextCoords.lng], {
          icon: currentLocationIcon,
          zIndexOffset: 1000,
        }).addTo(map);
        currentPosRef.current = nextCoords;
      }

      // Ensure circle exists / update radius
      if (accuracy && accuracy > 0) {
        if (!circleRef.current) {
          circleRef.current = L.circle([nextCoords.lat, nextCoords.lng], {
            radius: accuracy,
            color: '#3d75b4',
            weight: 1,
            opacity: 0.5,
            fillColor: '#3d75b4',
            fillOpacity: 0.12,
          }).addTo(map);
        } else {
          circleRef.current.setRadius(accuracy);
        }
      } else if (circleRef.current) {
        map.removeLayer(circleRef.current);
        circleRef.current = null;
      }

      const prevPos = currentPosRef.current || nextCoords;
      const dist = distanceMeters(prevPos, nextCoords);

      // If jump is large (>35 meters, e.g. initial GPS fix correction), snap instantly
      if (dist > 35 || !currentPosRef.current) {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        currentPosRef.current = nextCoords;
        targetPosRef.current = nextCoords;
        animStartPosRef.current = nextCoords;
        markerRef.current.setLatLng([nextCoords.lat, nextCoords.lng]);
        if (circleRef.current) {
          circleRef.current.setLatLng([nextCoords.lat, nextCoords.lng]);
        }
        if (isFollowModeRef.current) {
          map.panTo([nextCoords.lat, nextCoords.lng], { animate: true, duration: 0.5 });
        }
        return;
      }

      // Smooth interpolation for continuous movement
      animStartPosRef.current = { ...prevPos };
      targetPosRef.current = nextCoords;
      animStartTimeRef.current = performance.now();
      animDurationRef.current = timeDelta;

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(stepAnimation);
      }
    };

    const unsubscribe = subscribeToLiveLocation(handleLocationUpdate);
    return () => {
      unsubscribe();
    };
  }, [map]);

  // Recenter / snap map camera when follow mode is turned ON
  useEffect(() => {
    if (isFollowMode && currentPosRef.current) {
      map.flyTo([currentPosRef.current.lat, currentPosRef.current.lng], Math.max(map.getZoom(), 18), {
        duration: 0.5,
      });
    }
  }, [isFollowMode, map]);

  return null;
}
