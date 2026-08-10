// Script to extract road graph from OSM Overpass data for DISHAA campus
const fs = require('fs');

let raw = fs.readFileSync('overpass_roads.json', 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const data = JSON.parse(raw);

const ways = data.elements.filter(e => e.type === 'way');
const nodesRaw = data.elements.filter(e => e.type === 'node');

// Build node coordinate map
const nodeMap = {};
nodesRaw.forEach(n => { nodeMap[n.id] = [n.lat, n.lon]; });

// Campus bounding box (tight around the actual campus)
const bounds = {
  minLat: 21.1220, maxLat: 21.1270,
  minLon: 79.0005, maxLon: 79.0060
};

function inBounds(coord) {
  return coord[0] >= bounds.minLat && coord[0] <= bounds.maxLat &&
         coord[1] >= bounds.minLon && coord[1] <= bounds.maxLon;
}

// Filter ways that have at least some nodes inside campus
// Include: service, residential, footway, path, track (walkable)
const walkableTypes = ['service', 'residential', 'footway', 'path', 'track', 'tertiary'];
const campusWays = ways.filter(w => {
  const type = w.tags?.highway;
  if (!walkableTypes.includes(type)) return false;
  // At least 2 nodes in campus bounds
  const campusNodes = w.nodes.filter(nid => {
    const c = nodeMap[nid];
    return c && inBounds(c);
  });
  return campusNodes.length >= 2;
});

console.log(`Campus walkable ways: ${campusWays.length}`);

// Build adjacency graph: nodeId -> Set of neighbor nodeIds
// Also collect all unique node coordinates used
const graph = {}; // nodeId -> [{neighbor, distance}]
const usedNodes = new Set();

function haversine(a, b) {
  const R = 6371000;
  const phi1 = a[0] * Math.PI / 180;
  const phi2 = b[0] * Math.PI / 180;
  const dPhi = (b[0] - a[0]) * Math.PI / 180;
  const dLam = (b[1] - a[1]) * Math.PI / 180;
  const x = Math.sin(dPhi/2)**2 + Math.cos(phi1)*Math.cos(phi2)*Math.sin(dLam/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

campusWays.forEach(way => {
  const nodes = way.nodes;
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const coordA = nodeMap[a];
    const coordB = nodeMap[b];
    if (!coordA || !coordB) continue;
    // Only include edges where both nodes are in/near campus
    // Slightly expanded bounds for connectivity
    const expandedBounds = {
      minLat: bounds.minLat - 0.001, maxLat: bounds.maxLat + 0.001,
      minLon: bounds.minLon - 0.001, maxLon: bounds.maxLon + 0.001
    };
    const aIn = coordA[0] >= expandedBounds.minLat && coordA[0] <= expandedBounds.maxLat &&
                coordA[1] >= expandedBounds.minLon && coordA[1] <= expandedBounds.maxLon;
    const bIn = coordB[0] >= expandedBounds.minLat && coordB[0] <= expandedBounds.maxLat &&
                coordB[1] >= expandedBounds.minLon && coordB[1] <= expandedBounds.maxLon;
    if (!aIn || !bIn) continue;

    const dist = haversine(coordA, coordB);

    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push({ neighbor: b, distance: dist });
    graph[b].push({ neighbor: a, distance: dist }); // Bidirectional for walking
    usedNodes.add(a);
    usedNodes.add(b);
  }
});

console.log(`Graph nodes: ${usedNodes.size}, Edges: ${Object.values(graph).reduce((s, arr) => s + arr.length, 0) / 2}`);

// Generate TypeScript output
const nodeEntries = [];
usedNodes.forEach(nid => {
  const c = nodeMap[nid];
  if (c) nodeEntries.push(`  ${nid}: [${c[0].toFixed(7)}, ${c[1].toFixed(7)}],`);
});

const edgeEntries = [];
const edgeSet = new Set();
Object.keys(graph).forEach(fromId => {
  graph[fromId].forEach(({ neighbor, distance }) => {
    const key = [Math.min(fromId, neighbor), Math.max(fromId, neighbor)].join('-');
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      edgeEntries.push(`  [${fromId}, ${neighbor}, ${Math.round(distance * 10) / 10}],`);
    }
  });
});

const tsContent = `// Auto-generated campus road network from OpenStreetMap
// Generated at: ${new Date().toISOString()}
// Source: Overpass API - G.H. Raisoni College Campus, Nagpur
// Nodes: ${usedNodes.size}, Edges: ${edgeSet.size}

// Road network node coordinates: nodeId -> [lat, lon]
export const roadNodes: Record<number, [number, number]> = {
${nodeEntries.join('\n')}
};

// Road network edges: [nodeA, nodeB, distanceInMeters]
export const roadEdges: [number, number, number][] = [
${edgeEntries.join('\n')}
];
`;

fs.writeFileSync('src/lib/roadNetwork.ts', tsContent);
console.log(`Written to src/lib/roadNetwork.ts`);
console.log(`Nodes: ${usedNodes.size}, Edges: ${edgeSet.size}`);
