// Shared Campus Location Data & Official Route Points for DISHAA Navigation

export interface CampusLocation {
  id: string;
  coords: [number, number];
  name: string;
  type: 'block' | 'amenity' | 'canteen' | 'sports';
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

// Building Entry Points Registry for Block A, Block B, Block C
export const buildingEntryPoints: Record<string, [number, number][]> = {
  'Block A': [
    [21.125457, 79.002647], // Entry Point 1
    [21.125052, 79.002854], // Entry Point 2
    [21.125651, 79.003330], // Entry Point 3
    [21.125004, 79.002274], // Entry Point 4
  ],
  'BLOCK A': [
    [21.125457, 79.002647],
    [21.125052, 79.002854],
    [21.125651, 79.003330],
    [21.125004, 79.002274],
  ],
  'Block B': [
    [21.124674, 79.002057], // Entry Point 1
    [21.124512, 79.002183], // Entry Point 2
    [21.124315, 79.002346], // Entry Point 3
    [21.124220, 79.002387], // Entry Point 4
  ],
  'BLOCK B': [
    [21.124674, 79.002057],
    [21.124512, 79.002183],
    [21.124315, 79.002346],
    [21.124220, 79.002387],
  ],
  'Block C': [
    [21.124278, 79.003182], // Entry Point 1
  ],
  'BLOCK C': [
    [21.124278, 79.003182],
  ],
};

// Helper function to find the nearest building entry point for a given target building & reference location
export function getNearestBuildingEntryPoint(buildingName: string, refCoord: [number, number]): [number, number] {
  const normalizedKey = Object.keys(buildingEntryPoints).find(
    (k) => k.toLowerCase() === buildingName.toLowerCase()
  );

  if (!normalizedKey || !buildingEntryPoints[normalizedKey]) {
    return refCoord;
  }

  const entries = buildingEntryPoints[normalizedKey];
  let bestEntry = entries[0];
  let minDistance = Infinity;

  for (const entry of entries) {
    const d = Math.hypot(entry[0] - refCoord[0], entry[1] - refCoord[1]);
    if (d < minDistance) {
      minDistance = d;
      bestEntry = entry;
    }
  }

  return bestEntry;
}

// 23 Mandatory Route Points (Functional for Direction Calculations)
export const officialRoutePoints: OfficialRoutePoint[] = [
  { pointId: 1, name: 'Entry Gate', coords: [21.125916, 79.003371], info: 'Main Entrance Gate', image: '/college-front.jpg' },
  { pointId: 2, name: 'Turn at Sitting area and A Block', coords: [21.125829, 79.003165], info: 'Sitting Area near Block A', image: '/college-front.jpg' },
  { pointId: 3, name: 'Infront of A Block', coords: [21.125514, 79.002662], info: 'In front of Block A Entrance', image: '/college-front.jpg' },
  { pointId: 4, name: 'Entry Gate 2', coords: [21.125035, 79.001999], info: 'Secondary Entrance Gate 2', image: '/college-front.jpg' },
  { pointId: 5, name: 'Behind Temple', coords: [21.125589, 79.003319], info: 'Area Behind Campus Temple', image: '/college-front.jpg' },
  { pointId: 6, name: 'Sandwich Café', coords: [21.125311, 79.003508], info: 'Sandwich Café Junction', image: '/CLG.jpeg' },
  { pointId: 7, name: 'Behind A Block', coords: [21.124913, 79.002864], info: 'Rear Pathway of Block A', image: '/college-front.jpg' },
  { pointId: 8, name: 'Near Staff Parking', coords: [21.124611, 79.002462], info: 'Staff Parking Area', image: '/college-bg.jpg' },
  { pointId: 9, name: 'Infront of B Block', coords: [21.124525, 79.002317], info: 'Block B Entrance Front', image: '/CLG.jpeg' },
  { pointId: 10, name: 'Ground and Green Gym', coords: [21.124610, 79.003081], info: 'Junction to Main Ground & Gym', image: '/college-bg.jpg' },
  { pointId: 11, name: 'Green Gym', coords: [21.124452, 79.002877], info: 'Open Air Green Gym', image: '/college-bg.jpg' },
  { pointId: 12, name: 'Infront of Canteen', coords: [21.124207, 79.002521], info: 'Central Food Court Entrance', image: '/CLG.jpeg' },
  { pointId: 13, name: 'Infront of Block C', coords: [21.124298, 79.003282], info: 'Block C Front Pathway', image: '/college-front.jpg' },
  { pointId: 14, name: 'Siddhi Café Point', coords: [21.123960, 79.003518], info: 'Pathway near Siddhi Café', image: '/CLG.jpeg' },
  { pointId: 15, name: 'Girls Hostel Entry', coords: [21.123873, 79.002759], info: 'Girls Hostel Gate Pathway', image: '/college-bg.jpg' },
  { pointId: 16, name: 'Futsal End', coords: [21.123658, 79.002933], info: 'Futsal Court End', image: '/college-bg.jpg' },
  { pointId: 17, name: 'Infront of Turf', coords: [21.123618, 79.002941], info: 'Artificial Turf Pathway', image: '/college-bg.jpg' },
  { pointId: 18, name: 'Pickle Ball End', coords: [21.123490, 79.002729], info: 'Pickleball Court Edge', image: '/college-bg.jpg' },
  { pointId: 19, name: 'Volleyball End', coords: [21.123385, 79.002531], info: 'Volleyball Ground Edge', image: '/college-bg.jpg' },
  { pointId: 20, name: 'Ground End', coords: [21.124330, 79.004662], info: 'Far End of Main Ground', image: '/college-bg.jpg' },
  { pointId: 21, name: 'Infront of Boys Hostel', coords: [21.124090, 79.004207], info: 'Boys Hostel Gate Front', image: '/college-bg.jpg' },
  { pointId: 22, name: 'Lawn Entry', coords: [21.124677, 79.001752], info: 'Central Lawn Gate', image: '/college-bg.jpg' },
  { pointId: 23, name: 'Near Plane', coords: [21.124876, 79.002100], info: 'Aeronautical Model Area', image: '/college-bg.jpg' },
];

// Official Campus Location Pinpoints (Categorized into 4 tabs)
export const campusLocations: CampusLocation[] = [
  // 🏢 CATEGORY 1: BLOCKS
  { id: 'blk-a', coords: [21.125186, 79.002731], name: 'Block A', type: 'block', categoryLabel: 'Academic Block', description: 'Student Section, Account Section, & First Year Dept.', image: '/college-front.jpg' },
  { id: 'blk-b', coords: [21.124373, 79.001951], name: 'Block B', type: 'block', categoryLabel: 'Academic Block', description: 'Central Canteen, Gymnasium, Sports Room, & Library.', image: '/CLG.jpeg' },
  { id: 'blk-c', coords: [21.124140, 79.003013], name: 'Block C', type: 'block', categoryLabel: 'Academic Block', description: 'Department of Computer Engineering, AI, DS & Cybersecurity.', image: '/college-front.jpg' },
  { id: 'girls-hostel', coords: [21.123774, 79.002459], name: 'Girls Hostel', type: 'block', categoryLabel: 'Residential', description: 'Residential facility for female students.', image: '/college-bg.jpg' },
  { id: 'boys-hostel', coords: [21.123912, 79.004468], name: 'Boys Hostel', type: 'block', categoryLabel: 'Residential', description: 'Residential facility for male students.', image: '/college-bg.jpg' },

  // 🛠️ CATEGORY 2: SERVICES
  { id: 'account-section', coords: [21.125425, 79.002622], name: 'Account /Student / Scholorship Section', type: 'amenity', categoryLabel: 'Administration', description: 'Student administration, fees counter, & scholarship section.', image: '/college-front.jpg' },
  { id: 'xerox-center', coords: [21.124383, 79.002341], name: 'Xerox Center', type: 'amenity', categoryLabel: 'Services', description: 'Document printing, photocopy, & stationery store.', image: '/CLG.jpeg' },
  { id: 'temple', coords: [21.125648, 79.003431], name: 'Temple', type: 'amenity', categoryLabel: 'Campus Shrine', description: 'Mata Di Campus Shrine.', image: '/college-front.jpg' },
  { id: 'security-office', coords: [21.125888, 79.003493], name: 'Security Office', type: 'amenity', categoryLabel: 'Security', description: 'Main Gate Security Office & Visitor Helpdesk.', image: '/college-front.jpg' },

  // 🍽️ CATEGORY 3: CANTEENS
  { id: 'amul-outlet', coords: [21.124691, 79.002052], name: 'Amul Outlet', type: 'canteen', categoryLabel: 'Food & Drinks', description: 'Ice cream, milkshakes, snacks, and dairy products.', image: '/CLG.jpeg' },
  { id: 'b-block-canteen', coords: [21.124203, 79.002411], name: 'B Block Canteen', type: 'canteen', categoryLabel: 'Food Court', description: 'Main college canteen located at Block B.', image: '/canteen 1 NEW.jpg' },
  { id: 'siddhi-cafe', coords: [21.123922, 79.003555], name: 'Siddhi Café', type: 'canteen', categoryLabel: 'Café', description: 'Fresh snacks, coffee, & tea near Block C.', image: '/CLG.jpeg' },
  { id: 'nescafe', coords: [21.125061, 79.002907], name: 'NesCafe', type: 'canteen', categoryLabel: 'Café & Refreshments', description: 'Coffee, hot beverages, and fast food.', image: '/CLG.jpeg' },
  { id: 'chinese-cafe', coords: [21.125176, 79.003153], name: 'Chinese Café', type: 'canteen', categoryLabel: 'Food Outlet', description: 'Noodles, fried rice, and Indo-Chinese food.', image: '/CLG.jpeg' },
  { id: 'maha-chai', coords: [21.125290, 79.003311], name: 'Maha Chai', type: 'canteen', categoryLabel: 'Beverages', description: 'Specialty tea, kulhad chai, and snacks.', image: '/CLG.jpeg' },
  { id: 'sandwich-cafe', coords: [21.125369, 79.003602], name: 'Sandwich Café', type: 'canteen', categoryLabel: 'Quick Bites', description: 'Grilled sandwiches, Maggi, and cold drinks.', image: '/CLG.jpeg' },

  // ⚽ CATEGORY 4: SPORTS
  { id: 'sports-room', coords: [21.124533, 79.001663], name: 'Sports Room - B Block', type: 'sports', categoryLabel: 'Sports Indoor', description: 'Indoor sports equipment, chess, & carrom.', image: '/college-bg.jpg' },
  { id: 'badminton-court', coords: [21.124258, 79.001921], name: 'Badminton Court - B Block', type: 'sports', categoryLabel: 'Sports Court', description: 'Indoor badminton court facility inside Block B.', image: '/college-bg.jpg' },
  { id: 'main-ground', coords: [21.124568, 79.003802], name: 'Main Ground', type: 'sports', categoryLabel: 'Sports Field', description: 'Large outdoor field for cricket, football & college fests.', image: '/ground view.jpeg' },
  { id: 'basketball-court', coords: [21.123801, 79.003366], name: 'Basketball Court', type: 'sports', categoryLabel: 'Sports Court', description: 'Standard outdoor synthetic basketball court.', image: '/college-bg.jpg' },
  { id: 'futsal-turf', coords: [21.123466, 79.003040], name: 'Futsal Turf', type: 'sports', categoryLabel: 'Sports Turf', description: 'Pro-grade artificial turf futsal ground.', image: '/college-bg.jpg' },
  { id: 'pickleball-court', coords: [21.123293, 79.002774], name: 'Pickle-ball Court', type: 'sports', categoryLabel: 'Sports Court', description: 'Dedicated pickleball court for students.', image: '/college-bg.jpg' },
  { id: 'volleyball', coords: [21.123225, 79.002599], name: 'Volleyball', type: 'sports', categoryLabel: 'Sports Court', description: 'Volleyball court near sports complex.', image: '/college-bg.jpg' },
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

// Sync dynamic Cloudinary image URLs fetched from MongoDB images collection
export function syncCloudinaryImages(storedImages: Array<{ locationId: string; pointId?: number | null; imageUrl: string }>) {
  if (!Array.isArray(storedImages)) return;

  const imageMap = new Map<string, string>();
  const pointMap = new Map<number, string>();

  storedImages.forEach((item) => {
    if (item.locationId && item.imageUrl) {
      imageMap.set(item.locationId.toLowerCase(), item.imageUrl);
    }
    if (item.pointId !== undefined && item.pointId !== null && item.imageUrl) {
      pointMap.set(Number(item.pointId), item.imageUrl);
    }
  });

  // Update campusLocations
  campusLocations.forEach((loc) => {
    if (imageMap.has(loc.id.toLowerCase())) {
      loc.image = imageMap.get(loc.id.toLowerCase())!;
    }
  });

  // Update officialRoutePoints
  officialRoutePoints.forEach((pt) => {
    if (pointMap.has(pt.pointId)) {
      pt.image = pointMap.get(pt.pointId)!;
    } else if (imageMap.has(`point-${pt.pointId}`)) {
      pt.image = imageMap.get(`point-${pt.pointId}`)!;
    }
  });
}

