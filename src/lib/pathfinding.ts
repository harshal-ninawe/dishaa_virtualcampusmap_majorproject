// A* Pathfinding Engine for DISHAA Campus Road Network
// Uses real OSM road data for road-following navigation

import { roadNodes, roadEdges } from './roadNetwork';
import { StepMilestone, CampusLocation, officialRoutePoints, OfficialRoutePoint, getNearestBuildingEntryPoint } from './campusData';

// Build adjacency list from edges
interface GraphEdge {
  neighbor: number;
  distance: number;
}

const adjacencyList: Record<number, GraphEdge[]> = {};

function buildGraph() {
  if (Object.keys(adjacencyList).length > 0) return; // Already built

  // Initialize all nodes
  for (const nodeId of Object.keys(roadNodes)) {
    adjacencyList[Number(nodeId)] = [];
  }

  // Add bidirectional edges
  for (const [a, b, dist] of roadEdges) {
    if (!adjacencyList[a]) adjacencyList[a] = [];
    if (!adjacencyList[b]) adjacencyList[b] = [];
    adjacencyList[a].push({ neighbor: b, distance: dist });
    adjacencyList[b].push({ neighbor: a, distance: dist });
  }
}

// Haversine distance (meters) — used as heuristic
function haversine(a: [number, number], b: [number, number]): number {
  const R = 6371000;
  const phi1 = (a[0] * Math.PI) / 180;
  const phi2 = (b[0] * Math.PI) / 180;
  const dPhi = ((b[0] - a[0]) * Math.PI) / 180;
  const dLam = ((b[1] - a[1]) * Math.PI) / 180;
  const x = Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLam / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

// Find the nearest road graph node to a given lat/lon coordinate
export function findNearestNode(coord: [number, number]): number {
  let bestId = -1;
  let bestDist = Infinity;

  for (const [idStr, nodeCoord] of Object.entries(roadNodes)) {
    const d = haversine(coord, nodeCoord);
    if (d < bestDist) {
      bestDist = d;
      bestId = Number(idStr);
    }
  }
  return bestId;
}

// Priority Queue (min-heap) for A*
class MinHeap {
  private items: { node: number; priority: number }[] = [];

  push(node: number, priority: number) {
    this.items.push({ node, priority });
    this._bubbleUp(this.items.length - 1);
  }

  pop(): { node: number; priority: number } | undefined {
    if (this.items.length === 0) return undefined;
    const top = this.items[0];
    const last = this.items.pop()!;
    if (this.items.length > 0) {
      this.items[0] = last;
      this._sinkDown(0);
    }
    return top;
  }

  get size() { return this.items.length; }

  private _bubbleUp(i: number) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.items[parent].priority <= this.items[i].priority) break;
      [this.items[parent], this.items[i]] = [this.items[i], this.items[parent]];
      i = parent;
    }
  }

  private _sinkDown(i: number) {
    const n = this.items.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this.items[l].priority < this.items[smallest].priority) smallest = l;
      if (r < n && this.items[r].priority < this.items[smallest].priority) smallest = r;
      if (smallest === i) break;
      [this.items[smallest], this.items[i]] = [this.items[i], this.items[smallest]];
      i = smallest;
    }
  }
}

import { RouteOption } from './campusData';

// Core A* pathfinding helper with optional penalized edge weights
function runAStarSearch(
  startNode: number,
  endNode: number,
  fromCoord: [number, number],
  toCoord: [number, number],
  penalizedEdges: Map<string, number> = new Map()
): { path: [number, number][]; distance: number; nodePath: number[] } | null {
  const endCoord = roadNodes[endNode];
  const gScore: Record<number, number> = {};
  const fScore: Record<number, number> = {};
  const cameFrom: Record<number, number> = {};
  const visited = new Set<number>();

  gScore[startNode] = 0;
  fScore[startNode] = haversine(roadNodes[startNode], endCoord);

  const openSet = new MinHeap();
  openSet.push(startNode, fScore[startNode]);

  while (openSet.size > 0) {
    const current = openSet.pop()!;
    const currentNode = current.node;

    if (currentNode === endNode) {
      const nodePath: number[] = [];
      let node = endNode;
      while (node !== undefined && node !== startNode) {
        nodePath.unshift(node);
        node = cameFrom[node];
      }
      nodePath.unshift(startNode);

      const coordPath: [number, number][] = [fromCoord];
      for (const nid of nodePath) {
        coordPath.push(roadNodes[nid]);
      }
      coordPath.push(toCoord);

      // Compute actual geographical length along coordPath
      let realDist = 0;
      for (let i = 0; i < coordPath.length - 1; i++) {
        realDist += haversine(coordPath[i], coordPath[i + 1]);
      }

      return {
        path: coordPath,
        distance: Math.round(realDist),
        nodePath,
      };
    }

    if (visited.has(currentNode)) continue;
    visited.add(currentNode);

    const neighbors = adjacencyList[currentNode] || [];
    for (const { neighbor, distance } of neighbors) {
      if (visited.has(neighbor)) continue;

      const edgeKey1 = `${currentNode}-${neighbor}`;
      const edgeKey2 = `${neighbor}-${currentNode}`;
      const penalty = penalizedEdges.get(edgeKey1) || penalizedEdges.get(edgeKey2) || 0;

      const edgeCost = distance + penalty;
      const tentativeG = (gScore[currentNode] ?? Infinity) + edgeCost;
      if (tentativeG < (gScore[neighbor] ?? Infinity)) {
        cameFrom[neighbor] = currentNode;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] = tentativeG + haversine(roadNodes[neighbor], endCoord);
        openSet.push(neighbor, fScore[neighbor]);
      }
    }
  }

  return null;
}

// Find up to 3 distinct alternate routes between start and end location
export function findMultipleRoutes(
  fromLocOrCoord: CampusLocation | [number, number],
  toLocOrCoord: CampusLocation | [number, number]
): RouteOption[] {
  buildGraph();

  let fromName = 'Start Location';
  let toName = 'Destination';
  let fromCoord: [number, number];
  let toCoord: [number, number];

  if (Array.isArray(fromLocOrCoord)) {
    fromCoord = fromLocOrCoord;
  } else {
    fromName = fromLocOrCoord.name;
    const targetRef = Array.isArray(toLocOrCoord) ? toLocOrCoord : toLocOrCoord.coords;
    fromCoord = getNearestBuildingEntryPoint(fromLocOrCoord.name, targetRef, fromLocOrCoord.coords);
  }

  if (Array.isArray(toLocOrCoord)) {
    toCoord = toLocOrCoord;
  } else {
    toName = toLocOrCoord.name;
    toCoord = getNearestBuildingEntryPoint(toLocOrCoord.name, fromCoord, toLocOrCoord.coords);
  }

  const startNode = findNearestNode(fromCoord);
  const endNode = findNearestNode(toCoord);

  if (startNode === -1 || endNode === -1) return [];

  const fromLocObj: CampusLocation = Array.isArray(fromLocOrCoord) 
    ? { id: 'start', coords: fromCoord, name: fromName, type: 'amenity', categoryLabel: 'Start Point', description: '', image: '/college-front.jpg' }
    : fromLocOrCoord;

  const toLocObj: CampusLocation = Array.isArray(toLocOrCoord)
    ? { id: 'dest', coords: toCoord, name: toName, type: 'amenity', categoryLabel: 'Destination', description: '', image: '/college-front.jpg' }
    : toLocOrCoord;

  const routes: RouteOption[] = [];
  const penalizedEdges = new Map<string, number>();

  // Colors & Configuration for up to 3 routes
  const routeConfigs = [
    { id: 'route-1', name: 'Route 1 (Shortest Path)', color: '#2563eb', isShortest: true, penaltyAmount: 200 },
    { id: 'route-2', name: 'Route 2 (Alternative Pathway)', color: '#8b5cf6', isShortest: false, penaltyAmount: 400 },
    { id: 'route-3', name: 'Route 3 (Outer Pathway)', color: '#059669', isShortest: false, penaltyAmount: 800 },
  ];

  for (let i = 0; i < routeConfigs.length; i++) {
    const config = routeConfigs[i];
    const res = runAStarSearch(startNode, endNode, fromCoord, toCoord, penalizedEdges);
    if (!res) break;

    // Check uniqueness compared to existing routes
    const isDuplicate = routes.some((existing) => {
      if (Math.abs(existing.distance - res.distance) < 5) return true;
      const currentNodes = new Set(res.nodePath);
      const existingNodes = new Set(existing.nodePath);
      let intersection = 0;
      currentNodes.forEach((n) => { if (existingNodes.has(n)) intersection++; });
      const overlap = intersection / Math.max(currentNodes.size, existingNodes.size);
      return overlap > 0.85; // >85% node overlap considered duplicate
    });

    // Add penalty to edges in current path for next iteration
    for (let k = 0; k < res.nodePath.length - 1; k++) {
      const u = res.nodePath[k];
      const v = res.nodePath[k + 1];
      penalizedEdges.set(`${u}-${v}`, (penalizedEdges.get(`${u}-${v}`) || 0) + config.penaltyAmount);
      penalizedEdges.set(`${v}-${u}`, (penalizedEdges.get(`${v}-${u}`) || 0) + config.penaltyAmount);
    }

    if (!isDuplicate || i === 0) {
      const milestoneRes = generateMilestonesFromRoute(res.path, fromLocObj, toLocObj, res.distance);
      routes.push({
        id: config.id,
        name: i === 0 ? `Shortest Route (${res.distance}m)` : `Alternative ${i + 1} (${res.distance}m)`,
        path: res.path,
        distance: res.distance,
        steps: milestoneRes.steps,
        milestones: milestoneRes.milestones,
        isShortest: config.isShortest,
        color: config.color,
        nodePath: res.nodePath,
      });
    }
  }

  // Fallback single route if penalties yielded no distinct paths
  if (routes.length === 0) {
    const fallbackRes = runAStarSearch(startNode, endNode, fromCoord, toCoord);
    if (fallbackRes) {
      const milestoneRes = generateMilestonesFromRoute(fallbackRes.path, fromLocObj, toLocObj, fallbackRes.distance);
      routes.push({
        id: 'route-1',
        name: `Shortest Route (${fallbackRes.distance}m)`,
        path: fallbackRes.path,
        distance: fallbackRes.distance,
        steps: milestoneRes.steps,
        milestones: milestoneRes.milestones,
        isShortest: true,
        color: '#2563eb',
        nodePath: fallbackRes.nodePath,
      });
    } else {
      const directPath: [number, number][] = [fromCoord, toCoord];
      const dist = Math.round(haversine(fromCoord, toCoord));
      const milestoneRes = generateMilestonesFromRoute(directPath, fromLocObj, toLocObj, dist);
      routes.push({
        id: 'route-1',
        name: `Direct Route (${dist}m)`,
        path: directPath,
        distance: dist,
        steps: milestoneRes.steps,
        milestones: milestoneRes.milestones,
        isShortest: true,
        color: '#2563eb',
        nodePath: [startNode, endNode],
      });
    }
  }

  return routes;
}

// A* pathfinding (single shortest route for backward compatibility)
export function findRoute(
  fromLocOrCoord: CampusLocation | [number, number],
  toLocOrCoord: CampusLocation | [number, number]
): { path: [number, number][]; distance: number; nodeCount: number } | null {
  const routes = findMultipleRoutes(fromLocOrCoord, toLocOrCoord);
  if (routes.length > 0) {
    return {
      path: routes[0].path,
      distance: routes[0].distance,
      nodeCount: routes[0].path.length,
    };
  }
  return null;
}

// Get bearing direction between two coordinates
function getBearing(from: [number, number], to: [number, number]): string {
  const lat1 = (from[0] * Math.PI) / 180;
  const lat2 = (to[0] * Math.PI) / 180;
  const dLon = ((to[1] - from[1]) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  const n = (bearing + 360) % 360;

  if (n >= 337.5 || n < 22.5) return 'north';
  if (n < 67.5) return 'north-east';
  if (n < 112.5) return 'east';
  if (n < 157.5) return 'south-east';
  if (n < 202.5) return 'south';
  if (n < 247.5) return 'south-west';
  if (n < 292.5) return 'west';
  return 'north-west';
}

// Compute angle change between two segments to detect turns
function angleBetween(a: [number, number], b: [number, number], c: [number, number]): number {
  const bearing1 = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
  const bearing2 = Math.atan2(c[1] - b[1], c[0] - b[0]) * 180 / Math.PI;
  let diff = bearing2 - bearing1;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  return diff;
}

// Generate human-readable step-by-step directions from a route path
export function generateStepsFromRoute(
  path: [number, number][],
  fromName: string,
  toName: string,
  totalDistance: number
): string[] {
  if (path.length < 2) return [`📍 ${fromName} and ${toName} are at the same location.`];

  const steps: string[] = [];
  const walkTime = Math.max(1, Math.round(totalDistance / 80)); // ~80 m/min walking

  // Step 1: Start
  const initBearing = getBearing(path[0], path[1]);
  steps.push(`🚶 Start from ${fromName}.`);
  steps.push(`🧭 Head ${initBearing} along the campus road.`);

  // Analyze path for turns
  let cumulativeDist = 0;
  for (let i = 1; i < path.length - 1; i++) {
    const segDist = haversine(path[i - 1], path[i]);
    cumulativeDist += segDist;

    const angle = angleBetween(path[i - 1], path[i], path[i + 1]);

    if (Math.abs(angle) > 30) {
      const direction = angle > 0 ? 'right' : 'left';
      const sharpness = Math.abs(angle) > 70 ? 'sharp ' : 'slight ';
      steps.push(`↗️ After ~${Math.round(cumulativeDist)}m, take a ${sharpness}${direction} turn.`);
      cumulativeDist = 0; // Reset for next segment
    }
  }

  // Add final segment distance
  const lastSegDist = haversine(path[path.length - 2], path[path.length - 1]);
  cumulativeDist += lastSegDist;

  if (cumulativeDist > 20) {
    steps.push(`📍 Continue for ~${Math.round(cumulativeDist)}m.`);
  }

  steps.push(`✅ You have arrived at ${toName}! (Total: ~${Math.round(totalDistance)}m, ~${walkTime} min walk)`);

  return steps;
}

// Generate max 4 gamified milestone steps strictly along the active route path
// SNAPS ALL STEP MILESTONE MARKERS DIRECTLY ONTO THE BLUE ROUTE PATH LINE
export function generateMilestonesFromRoute(
  path: [number, number][],
  fromLoc: CampusLocation,
  toLoc: CampusLocation,
  totalDistance: number
): { steps: string[]; milestones: StepMilestone[] } {
  if (path.length < 2) {
    return {
      steps: [`📍 ${fromLoc.name} and ${toLoc.name} are at the same location.`],
      milestones: [
        {
          stepNumber: 1,
          title: `Start & Destination: ${fromLoc.name}`,
          instruction: `You are already at ${fromLoc.name}.`,
          coords: fromLoc.coords,
          image: fromLoc.image || '/college-front.jpg',
        },
      ],
    };
  }

  // Find candidate mandatory route points that lie strictly within 35m of nodes along the calculated path
  const candidatePoints: { point: OfficialRoutePoint; pathIdx: number; distToPath: number }[] = [];

  for (const pt of officialRoutePoints) {
    let bestIdx = -1;
    let minDist = Infinity;

    for (let i = 0; i < path.length; i++) {
      const d = haversine(pt.coords, path[i]);
      if (d < minDist) {
        minDist = d;
        bestIdx = i;
      }
    }

    // Must be within 35 meters of the path AND not at extreme ends of path
    if (minDist <= 35 && bestIdx > 0 && bestIdx < path.length - 1) {
      candidatePoints.push({ point: pt, pathIdx: bestIdx, distToPath: minDist });
    }
  }

  // Sort candidates strictly chronologically along the path
  candidatePoints.sort((a, b) => a.pathIdx - b.pathIdx);

  // Filter out duplicate or matching names
  const intermediateCandidates = candidatePoints.filter(
    (c) =>
      c.point.name.toLowerCase() !== fromLoc.name.toLowerCase() &&
      c.point.name.toLowerCase() !== toLoc.name.toLowerCase()
  );

  // Pick at most 2 intermediate mandatory route points strictly along the path
  let selectedIntermediates: { point: OfficialRoutePoint; pathIdx: number }[] = [];
  if (intermediateCandidates.length === 1) {
    selectedIntermediates = [intermediateCandidates[0]];
  } else if (intermediateCandidates.length >= 2) {
    const idx1 = Math.floor((intermediateCandidates.length - 1) * 0.33);
    const idx2 = Math.floor((intermediateCandidates.length - 1) * 0.66);
    const c1 = intermediateCandidates[idx1];
    const c2 = intermediateCandidates[idx2];
    if (c1.point.pointId !== c2.point.pointId) {
      selectedIntermediates = [c1, c2];
    } else {
      selectedIntermediates = [c1];
    }
  }

  // Build 4 Milestones with coordinates SNAPPED STRICTLY TO THE BLUE ROUTE PATH LINE
  const walkTime = Math.max(1, Math.round(totalDistance / 80));
  const rawList: { name: string; coords: [number, number]; info: string; image: string; pointId?: number; pathIdx: number }[] = [
    {
      name: fromLoc.name,
      coords: path[0], // Snapped to Start of Blue Path
      info: fromLoc.description,
      image: fromLoc.image,
      pathIdx: 0,
    },
    ...selectedIntermediates.map((item) => ({
      name: item.point.name,
      coords: path[item.pathIdx], // Snapped to exact point on Blue Path line
      info: item.point.info,
      image: item.point.image,
      pointId: item.point.pointId,
      pathIdx: item.pathIdx,
    })),
    {
      name: toLoc.name,
      coords: path[path.length - 1], // Snapped to Destination End of Blue Path
      info: toLoc.description,
      image: toLoc.image,
      pathIdx: path.length - 1,
    },
  ];

  // Limit to at most 4 steps with dynamic turn directions
  const slicedList = rawList.slice(0, 4);
  const milestones: StepMilestone[] = slicedList.map((pt, idx) => {
    let title = `Step ${idx + 1}: ${pt.name}`;
    let instruction = '';

    if (idx === 0) {
      title = `Step 1: Start at ${pt.name}`;
      const bearing = getBearing(path[0], path[Math.min(1, path.length - 1)]);
      const nextPt = slicedList[1];
      instruction = `Start from ${pt.name}. Head ${bearing} towards ${nextPt ? nextPt.name : toLoc.name}.`;
    } else if (idx === slicedList.length - 1) {
      title = `Step ${idx + 1}: Arrived at ${pt.name}`;
      instruction = `You have reached your destination, ${pt.name}!`;
    } else {
      const pIdx = pt.pathIdx;
      let turnAction = 'continue straight';

      if (pIdx > 0 && pIdx < path.length - 1) {
        const angle = angleBetween(path[pIdx - 1], path[pIdx], path[pIdx + 1]);
        if (angle > 25) turnAction = 'turn right';
        else if (angle < -25) turnAction = 'turn left';
      }

      const nextPt = slicedList[idx + 1];
      if (turnAction !== 'continue straight') {
        instruction = `At ${pt.name}, ${turnAction} towards ${nextPt ? nextPt.name : toLoc.name}.`;
      } else {
        instruction = `Continue straight past ${pt.name} towards ${nextPt ? nextPt.name : toLoc.name}.`;
      }
    }

    return {
      stepNumber: idx + 1,
      title,
      instruction,
      coords: pt.coords, // 100% ON THE BLUE ROUTE PATH LINE
      image: pt.image || '/college-front.jpg',
      pointId: pt.pointId,
    };
  });

  const steps = milestones.map((m) => `📍 ${m.title}: ${m.instruction}`);

  return { steps, milestones };
}
