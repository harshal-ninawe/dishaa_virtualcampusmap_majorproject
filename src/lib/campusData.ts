// Shared Campus Location Data & Official Route Points for DISHAA Navigation

export interface CampusLocation {
  id: string;
  coords: [number, number];
  name: string;
  type: 'block' | 'amenity' | 'sports';
  categoryLabel: string;
  description: string;
  image: string;
}

export interface StepMilestone {
  stepNumber: number;
  title: string;
  instruction: string;
  coords: [number, number];
  image: string;
  pointId?: number;
}

export interface OfficialRoutePoint {
  pointId: number;
  name: string;
  coords: [number, number];
  info: string;
  image: string;
}

// 17 Official Campus Route Points (Path Waypoints for Directions & Step Images)
export const officialRoutePoints: OfficialRoutePoint[] = [
  { pointId: 1, name: 'INFRONT OF GATE', coords: [21.125954, 79.003415], info: 'INFRONT OF GATE', image: '/college-front.jpg' },
  { pointId: 2, name: 'BETWEEN SEATING AND BLOCK A', coords: [21.125793, 79.003199], info: 'BETWEEN SEATING AND BLOCK A', image: '/college-front.jpg' },
  { pointId: 3, name: 'BLOCK A', coords: [21.125510, 79.002747], info: 'BLOCK A', image: '/college-front.jpg' },
  { pointId: 4, name: 'GATE 2', coords: [21.125051, 79.001989], info: 'GATE 2', image: '/college-front.jpg' },
  { pointId: 5, name: 'MANDIR KE PICHE', coords: [21.125580, 79.003344], info: 'MANDIR KE PICHE', image: '/college-front.jpg' },
  { pointId: 6, name: 'SANDWICH CAFÉ', coords: [21.125309, 79.003508], info: 'SANDWICH CAFÉ', image: '/CLG.jpeg' },
  { pointId: 7, name: 'NESCAFE, MAHA CHAI', coords: [21.125309, 79.003508], info: 'NESCAFE, MAHA CHAI', image: '/CLG.jpeg' },
  { pointId: 8, name: 'BLOCK B KE SAMNE', coords: [21.124575, 79.002326], info: 'BLOCK B KE SAMNE', image: '/CLG.jpeg' },
  { pointId: 9, name: 'CANTEEN ROUTE', coords: [21.124174, 79.002579], info: 'CANTEEN ROUTE', image: '/CLG.jpeg' },
  { pointId: 10, name: 'AMRAVATI GREEN GYM', coords: [21.124432, 79.002987], info: 'AMRAVATI GREEN GYM', image: '/college-bg.jpg' },
  { pointId: 11, name: 'GROUND VALA RASTA', coords: [21.124602, 79.003078], info: 'GROUND VALA RASTA', image: '/college-bg.jpg' },
  { pointId: 12, name: 'BLOCK C', coords: [21.124332, 79.003293], info: 'BLOCK C', image: '/college-front.jpg' },
  { pointId: 13, name: 'SIDDHI CAFÉ', coords: [21.124031, 79.003498], info: 'SIDDHI CAFÉ', image: '/CLG.jpeg' },
  { pointId: 14, name: 'GIRLS HOSTEL AND PARKING', coords: [21.123960, 79.002726], info: 'GIRLS HOSTEL AND PARKING', image: '/college-bg.jpg' },
  { pointId: 15, name: 'FUTSAL', coords: [21.123662, 79.002933], info: 'FUTSAL', image: '/college-bg.jpg' },
  { pointId: 16, name: 'BASKETBALL', coords: [21.123827, 79.003207], info: 'BASKETBALL', image: '/college-bg.jpg' },
  { pointId: 17, name: 'VOLLEY BALL', coords: [21.123414, 79.002659], info: 'VOLLEY BALL', image: '/college-bg.jpg' },
];

// Original Destination Pinpoints (Shown as map markers & search places)
export const campusLocations: CampusLocation[] = [
  { id: 'main-gate', coords: [21.125888, 79.003391], name: 'MAIN GATE', type: 'block', categoryLabel: 'Campus Entry', description: 'Main entrance of G.H. Raisoni College campus.', image: '/college-front.jpg' },
  { id: 'blk-a', coords: [21.125205, 79.002823], name: 'BLOCK A', type: 'block', categoryLabel: 'Academic Block', description: 'Student Section, Account Section, & Scholarship Desk.', image: '/college-front.jpg' },
  { id: 'blk-b', coords: [21.124237, 79.002116], name: 'BLOCK B', type: 'block', categoryLabel: 'Academic Block', description: 'Central Canteen, Gymnasium, Sports Room, & Library.', image: '/CLG.jpeg' },
  { id: 'blk-c', coords: [21.124063, 79.003187], name: 'BLOCK C', type: 'block', categoryLabel: 'Academic Block', description: 'Department of Computer Engineering, AI, DS & Cybersecurity.', image: '/college-front.jpg' },
  { id: 'ground', coords: [21.124799, 79.003727], name: 'MAIN GROUND', type: 'sports', categoryLabel: 'Sports Field', description: 'Open field for major college fests, sports, & gatherings.', image: '/college-bg.jpg' },
  { id: 'girls-hostel', coords: [21.123688, 79.002562], name: 'GIRLS HOSTEL', type: 'block', categoryLabel: 'Residential', description: 'Residential facility for female students.', image: '/college-bg.jpg' },
  { id: 'boys-hostel', coords: [21.123938, 79.004437], name: 'BOYS HOSTEL', type: 'block', categoryLabel: 'Residential', description: 'Residential facility for male students.', image: '/college-bg.jpg' },
  { id: 'temple', coords: [21.125563, 79.003438], name: 'TEMPLE', type: 'amenity', categoryLabel: 'Campus Shrine', description: 'Mata Di Campus Temple.', image: '/college-front.jpg' },
  { id: 'futsal', coords: [21.123438, 79.003062], name: 'FUTSAL TURF', type: 'sports', categoryLabel: 'Sports Turf', description: 'Pro-grade artificial turf football ground.', image: '/college-bg.jpg' },
  { id: 'basketball', coords: [21.123688, 79.003438], name: 'BASKETBALL COURT', type: 'sports', categoryLabel: 'Sports Court', description: 'Outdoor synthetic basketball court.', image: '/college-bg.jpg' },
  { id: 'canteen-1', coords: [21.124187, 79.002437], name: 'MAIN CANTEEN', type: 'amenity', categoryLabel: 'Food Court', description: 'Food court located inside Block B.', image: '/CLG.jpeg' },
  { id: 'nescafe', coords: [21.124563, 79.002062], name: 'NESCAFÉ OUTLET', type: 'amenity', categoryLabel: 'Café & Drinks', description: 'Coffee, snacks, & quick refreshments.', image: '/CLG.jpeg' },
  { id: 'siddhi-cafe', coords: [21.124088, 79.003359], name: 'SIDDHI CAFÉ', type: 'amenity', categoryLabel: 'Café & Food', description: 'Café situated in front of Block C.', image: '/CLG.jpeg' },
  { id: 'volleyball', coords: [21.123337, 79.002797], name: 'VOLLEYBALL COURT', type: 'sports', categoryLabel: 'Sports Court', description: 'Dedicated area for volleyball enthusiasts.', image: '/college-bg.jpg' },
  { id: 'sandwich-cafe', coords: [21.125412, 79.003609], name: 'SANDWICH CAFÉ', type: 'amenity', categoryLabel: 'Café & Snacks', description: 'Serves Sandwich, Maggi & quick bites.', image: '/CLG.jpeg' },
  { id: 'staff-parking', coords: [21.125300, 79.002500], name: 'STAFF PARKING', type: 'amenity', categoryLabel: 'Parking', description: 'Reserved parking area for faculty and staff.', image: '/college-bg.jpg' },
  { id: 'student-parking', coords: [21.124500, 79.001900], name: 'STUDENT PARKING', type: 'amenity', categoryLabel: 'Parking', description: 'Two-wheeler parking for students.', image: '/college-bg.jpg' },
];

export interface DirectionsState {
  isActive: boolean;
  from: CampusLocation | null;
  to: CampusLocation | null;
  steps: string[];
  routePath: [number, number][];
  totalDistance: number;
  currentStepIndex: number;
  milestones: StepMilestone[];
}
