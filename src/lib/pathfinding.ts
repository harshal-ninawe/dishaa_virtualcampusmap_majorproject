// A* Pathfinding Engine for DISHAA Campus Road Network
// Uses real OSM road data for road-following navigation

import { roadNodes, roadEdges } from './roadNetwork';
import { StepMilestone, CampusLocation, officialRoutePoints, OfficialRoutePoint } from './campusData';

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

// A* pathfinding: returns ordered list of [lat, lon] coordinates along roads
export function findRoute(
  fromCoord: [number, number],
  toCoord: [number, number]
): { path: [number, number][]; distance: number; nodeCount: number } | null {
  buildGraph();

  const startNode = findNearestNode(fromCoord);
  const endNode = findNearestNode(toCoord);

  if (startNode === -1 || endNode === -1) return null;
  if (startNode === endNode) {
    return {
      path: [fromCoord, roadNodes[startNode], toCoord],
      distance: haversine(fromCoord, toCoord),
      nodeCount: 1,
    };
  }

  const endCoord = roadNodes[endNode];

  // A* algorithm
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
      // Reconstruct path
      const nodePath: number[] = [];
      let node = endNode;
      while (node !== undefined && node !== startNode) {
        nodePath.unshift(node);
        node = cameFrom[node];
      }
      nodePath.unshift(startNode);

      // Convert node IDs to coordinates, prepend fromCoord and append toCoord
      const coordPath: [number, number][] = [fromCoord];
      for (const nid of nodePath) {
        coordPath.push(roadNodes[nid]);
      }
      coordPath.push(toCoord);

      return {
        path: coordPath,
        distance: gScore[endNode],
        nodeCount: nodePath.length,
      };
    }

    if (visited.has(currentNode)) continue;
    visited.add(currentNode);

    const neighbors = adjacencyList[currentNode] || [];
    for (const { neighbor, distance } of neighbors) {
      if (visited.has(neighbor)) continue;

      const tentativeG = (gScore[currentNode] ?? Infinity) + distance;
      if (tentativeG < (gScore[neighbor] ?? Infinity)) {
        cameFrom[neighbor] = currentNode;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] = tentativeG + haversine(roadNodes[neighbor], endCoord);
        openSet.push(neighbor, fScore[neighbor]);
      }
    }
  }

  // No path found — fallback to direct line
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

// Generate max 4 gamified milestone steps using the official 17 campus route points
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

  // Find candidate official route points that lie along or near the generated road path
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

    // Include point if within 50m of route path
    if (minDist <= 50) {
      candidatePoints.push({ point: pt, pathIdx: bestIdx, distToPath: minDist });
    }
  }

  // Sort candidates chronologically along the route path
  candidatePoints.sort((a, b) => a.pathIdx - b.pathIdx);

  // Filter out points too close to start or end or duplicate names
  const intermediateCandidates = candidatePoints.filter(
    (c) =>
      c.point.name.toLowerCase() !== fromLoc.name.toLowerCase() &&
      c.point.name.toLowerCase() !== toLoc.name.toLowerCase()
  );

  // Pick at most 2 intermediate official route points
  let selectedIntermediates: OfficialRoutePoint[] = [];
  if (intermediateCandidates.length === 1) {
    selectedIntermediates = [intermediateCandidates[0].point];
  } else if (intermediateCandidates.length >= 2) {
    const p1 = intermediateCandidates[Math.floor((intermediateCandidates.length - 1) * 0.33)].point;
    const p2 = intermediateCandidates[Math.floor((intermediateCandidates.length - 1) * 0.66)].point;
    if (p1.pointId !== p2.pointId) {
      selectedIntermediates = [p1, p2];
    } else {
      selectedIntermediates = [p1];
    }
  }

  // Build the 4 Milestones: Start, Intermediate 1, Intermediate 2, End
  const walkTime = Math.max(1, Math.round(totalDistance / 80));
  const rawList: { name: string; coords: [number, number]; info: string; image: string; pointId?: number }[] = [
    { name: fromLoc.name, coords: fromLoc.coords, info: fromLoc.description, image: fromLoc.image },
    ...selectedIntermediates.map((pt) => ({
      name: pt.name,
      coords: pt.coords,
      info: pt.info,
      image: pt.image,
      pointId: pt.pointId,
    })),
    { name: toLoc.name, coords: toLoc.coords, info: toLoc.description, image: toLoc.image },
  ];

  // Limit to at most 4 steps
  const milestones: StepMilestone[] = rawList.slice(0, 4).map((pt, idx) => {
    let title = `Step ${idx + 1}: ${pt.name}`;
    let instruction = `Pass by ${pt.info || pt.name}.`;

    if (idx === 0) {
      title = `Step 1: Start at ${pt.name}`;
      instruction = `Begin your route from ${pt.name}.`;
    } else if (idx === rawList.length - 1) {
      title = `Step ${idx + 1}: Arrived at ${pt.name}`;
      instruction = `Reach your destination ${pt.name}! (Total: ~${Math.round(totalDistance)}m, ~${walkTime} min walk).`;
    } else {
      instruction = `Follow the campus path past Route Point ${pt.pointId ? '#' + pt.pointId : ''} (${pt.name}).`;
    }

    return {
      stepNumber: idx + 1,
      title,
      instruction,
      coords: pt.coords,
      image: pt.image || '/college-front.jpg',
      pointId: pt.pointId,
    };
  });

  const steps = milestones.map((m) => `📍 ${m.title}: ${m.instruction}`);

  return { steps, milestones };
}
