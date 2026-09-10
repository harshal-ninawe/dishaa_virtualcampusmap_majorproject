import { campusLocations, CampusLocation } from './campusData';

export const DISHAA_SYSTEM_PROMPT = `
You are DISHAA AI, the official intelligent assistant for the DISHAA Campus Navigation & Spatial Guide app.
Your primary role is to guide students, visitors, and faculty members through the campus and explain how to use every feature of the DISHAA app.

---
### 📍 CAMPUS LAYOUT & LOCATIONS KNOWLEDGE BASE
1. **Block A (Ground Floor)**: Main Entrance & Administration, Principal Office, Student Section, Central Library, Classrooms 001-020.
2. **Block B (Floors 1F - 4F)**:
   - 1st Floor: Canteen 1, Cafeteria, Student Common Room, Seminar Hall.
   - 2nd & 3rd Floor: Computer Engineering & IT Department, Electronics Labs.
   - 4th Floor: AI & Data Science Department, Advanced Robotics Lab, Room 408 (Faculty Cabins).
3. **Block C (Ground Floor)**: Mechanical & Civil Engineering Departments, Heavy Machinery Labs, Workshop, Nescafé Outlet, Siddhi Café.
4. **Hostels & Amenities**:
   - Boys Hostel: Located near the West Sports Complex.
   - Girls Hostel: Located near the East Campus Garden.
   - Sports Ground & Athletics Complex: Behind Block C.
   - Main Entrance Gate: Near Block A.

---
### 🛠️ DISHAA APP FEATURES & STEP-BY-STEP USER GUIDANCE
When a user asks how to perform a task in the app, always give clear step-by-step instructions:

1. **How to Calculate a Route / Get Directions**:
   - Step 1: Click the **Get Directions & Route Planner** button in the sidebar or top bar.
   - Step 2: Select your **Start Point** (or tap the Crosshair icon to pick on the map).
   - Step 3: Select your **Destination** (e.g., Boys Hostel, Block B).
   - Step 4: Click the blue **Calculate Route** button.
   - Step 5: Follow the step-by-step milestone directions! (You can drag the top handle bar of the steps window up or down to adjust its height).

2. **How to View Indoor 3D/2D Floor Maps**:
   - Step 1: Click on **Campus Buildings / Blocks** on the main map.
   - Step 2: Select the desired **Block** (A, B, or C) and **Floor** (0F to 4F).
   - Step 3: Click **Explore Inside Floor Plan** to launch the full 3D/2D Indoor Viewer.

3. **How to Check Faculty Sitting Locations & Details**:
   - Step 1: Open the **Indoor Viewer** for the specific Block & Floor (e.g., Block B, 4th Floor).
   - Step 2: Click on any classroom, lab, or office room.
   - Step 3: In the room popup, click the **Faculty 👨‍🏫** button.
   - Step 4: View the live tabular list of faculty members sitting in that room (fetched from MongoDB Atlas).

4. **How to Check Room Information**:
   - Click on any room in the Indoor Viewer, then click the **Info ℹ️** button to view room specifications.

5. **How to Check Broadcast Alerts & Notices**:
   - Click **Broadcasts** in the top navigation bar to view real-time announcements or publish new campus alerts.

---
### 💬 RESPONSE STYLE & GUIDELINES
- Be warm, helpful, encouraging, and clear.
- Use emojis appropriately (📍, 🏢, 🏃‍♂️, 👨‍🏫, 🧭).
- When a user asks for directions (e.g. *"I am at Block B, I want to go to Boys Hostel"*), provide clear written guidance AND recommend using the Route Planner tool.
`;

export interface ChatAction {
  label: string;
  type: 'set_route' | 'open_block' | 'search_faculty' | 'open_broadcasts' | 'switch_tab';
  payload: {
    from?: string;
    to?: string;
    fromLoc?: CampusLocation;
    toLoc?: CampusLocation;
    block?: string;
    floor?: number;
    roomNo?: string;
    tab?: string;
  };
}

export function findLocationByNameOrId(nameOrId: string): CampusLocation | undefined {
  if (!nameOrId) return undefined;
  const q = nameOrId.toLowerCase().trim();
  if (q.includes('block b') || q === 'block_b') return campusLocations.find(l => l.id === 'blk-b');
  if (q.includes('block a') || q === 'block_a') return campusLocations.find(l => l.id === 'blk-a');
  if (q.includes('block c') || q === 'block_c') return campusLocations.find(l => l.id === 'blk-c');
  if (q.includes('boys hostel') || q === 'hostel_boys') return campusLocations.find(l => l.id === 'boys-hostel');
  if (q.includes('girls hostel') || q === 'hostel_girls') return campusLocations.find(l => l.id === 'girls-hostel');
  if (q.includes('canteen')) return campusLocations.find(l => l.id === 'b-block-canteen');
  if (q.includes('library')) return campusLocations.find(l => l.id === 'blk-a');
  
  return campusLocations.find(l => 
    l.id.toLowerCase() === q ||
    l.name.toLowerCase() === q ||
    l.name.toLowerCase().includes(q)
  );
}

// Intelligent Offline Fallback Intent Parser
export function parseCampusQuery(query: string): { reply: string; actions?: ChatAction[] } {
  const q = query.toLowerCase().trim();

  // 1. Navigation / Route Guidance Intent
  const routeMatch = q.match(/(?:from|at)\s+([a-z0-9\s]+?)\s+(?:to|go to|reach|find)\s+([a-z0-9\s]+)/i) ||
                     q.match(/(?:how to go|how can i go|directions?|way)\s+(?:from\s+([a-z0-9\s]+?)\s+)?to\s+([a-z0-9\s]+)/i);

  if (routeMatch || q.includes('go to') || q.includes('way to') || q.includes('route') || q.includes('directions')) {
    let fromName = routeMatch?.[1]?.trim() || '';
    let toName = routeMatch?.[2] || routeMatch?.[1] || '';

    if (!fromName && q.includes('block b')) fromName = 'Block B';
    if (!fromName && q.includes('block a')) fromName = 'Block A';
    if (!fromName && q.includes('block c')) fromName = 'Block C';
    if (!fromName && q.includes('main gate')) fromName = 'Main Gate';

    if (!toName && q.includes('boys hostel')) toName = 'Boys Hostel';
    if (!toName && q.includes('girls hostel')) toName = 'Girls Hostel';
    if (!toName && q.includes('canteen')) toName = 'B Block Canteen';
    if (!toName && q.includes('library')) toName = 'Block A';

    const fromLoc = findLocationByNameOrId(fromName) || campusLocations.find(l => l.id === 'blk-b') || campusLocations[0];
    const toLoc = findLocationByNameOrId(toName) || campusLocations.find(l => l.id === 'boys-hostel') || campusLocations[1];

    return {
      reply: `To travel from **${fromLoc.name}** to **${toLoc.name}**, follow these simple steps:\n\n` +
             `1. Click the **Get Directions & Route Planner** button in the sidebar.\n` +
             `2. Set **Start Point** as \`${fromLoc.name}\`.\n` +
             `3. Set **Destination** as \`${toLoc.name}\`.\n` +
             `4. Click **Calculate Route** to view instant step-by-step navigation!\n\n` +
             `💡 *Tip: You can click the button below to pre-fill this route automatically!*`,
      actions: [
        {
          label: `📍 Set Route: ${fromLoc.name} ➔ ${toLoc.name}`,
          type: 'set_route',
          payload: { fromLoc, toLoc }
        }
      ]
    };
  }

  // 2. Faculty / Professor / Sitting Location Query Intent
  if (q.includes('faculty') || q.includes('prof') || q.includes('teacher') || q.includes('sitting') || q.includes('cabin') || q.includes('408')) {
    return {
      reply: `👨‍🏫 **Faculty Sitting & Cabin Guidance:**\n\n` +
             `• **Option 1: Search Faculty Tab**\n` +
             `  Use the **Faculty Finder** panel to search faculty by name, department, or cabin number.\n\n` +
             `• **Option 2: Indoor 3D Viewer**\n` +
             `  1. Open the **Indoor Floor Map** (e.g. Block B, 4th Floor).\n` +
             `  2. Click on room **408** (or any lab/cabin).\n` +
             `  3. Tap the **Faculty 👨‍🏫** button in the room details to view real-time faculty sitting data fetched live from MongoDB!\n\n` +
             `💡 *Click an action button below to search faculty or launch Block B 4th Floor floor plan directly!*`,
      actions: [
        {
          label: `👨‍🏫 Open Faculty Finder Panel`,
          type: 'search_faculty',
          payload: {}
        },
        {
          label: `🏢 Launch Block B (4th Floor - Room 408)`,
          type: 'open_block',
          payload: { block: 'BLOCK B', floor: 4, roomNo: '408' }
        }
      ]
    };
  }

  // 3. Indoor Floor Maps / Block Viewer Query Intent
  if (q.includes('indoor') || q.includes('floor') || q.includes('3d') || q.includes('block') || q.includes('room')) {
    let targetBlock = 'BLOCK B';
    let targetFloor = 4;

    if (q.includes('block a')) { targetBlock = 'BLOCK A'; targetFloor = 0; }
    else if (q.includes('block c')) { targetBlock = 'BLOCK C'; targetFloor = 0; }
    else if (q.includes('block b')) {
      targetBlock = 'BLOCK B';
      if (q.includes('1st') || q.includes('1f')) targetFloor = 1;
      else if (q.includes('2nd') || q.includes('2f')) targetFloor = 2;
      else if (q.includes('3rd') || q.includes('3f')) targetFloor = 3;
      else targetFloor = 4;
    }

    return {
      reply: `🏢 **Indoor 3D & 2D Floor Maps Guidance:**\n\n` +
             `• **Block A (Ground Floor)**: Administration, Principal Office, Student Section, Central Library.\n` +
             `• **Block B (1F - 4F)**: Canteens, Seminar Halls, Computer & IT Labs, AI & Robotics (4th Floor Room 408).\n` +
             `• **Block C (Ground Floor)**: Mechanical & Civil Heavy Labs, Nescafé Outlet.\n\n` +
             `💡 *Click the action button below to explore inside ${targetBlock} (${targetFloor}F)!*`,
      actions: [
        {
          label: `🏢 Explore Inside ${targetBlock} (${targetFloor}F Floor Plan)`,
          type: 'open_block',
          payload: { block: targetBlock, floor: targetFloor }
        }
      ]
    };
  }

  // 4. Broadcasts & Announcements Query Intent
  if (q.includes('broadcast') || q.includes('notice') || q.includes('alert') || q.includes('announcement') || q.includes('event')) {
    return {
      reply: `📢 **Campus Broadcasts & Events Guidance:**\n\n` +
             `• Click **Broadcasts / Events** in the sidebar navigation to view live announcements.\n` +
             `• Authorized admins and faculty can publish new campus notices that broadcast instantly across the app!`,
      actions: [
        {
          label: `📢 Open Campus Broadcasts & Events`,
          type: 'open_broadcasts',
          payload: {}
        }
      ]
    };
  }

  // 5. Faculty Registration / Admin Portal Intent
  if (q.includes('register') || q.includes('login') || q.includes('admin') || q.includes('portal')) {
    return {
      reply: `🔐 **Faculty Registration & Admin Portal:**\n\n` +
             `• Faculty members can register and update their sitting locations by visiting the **Admin & Faculty Portal** tab.\n` +
             `• Once updated, sitting details appear in the room popups across indoor floor maps!`,
      actions: [
        {
          label: `🔐 Open Faculty & Admin Portal`,
          type: 'switch_tab',
          payload: { tab: 'admin' }
        }
      ]
    };
  }

  // Default Campus Assistant Guidance
  const defaultFrom = campusLocations.find(l => l.id === 'blk-b') || campusLocations[0];
  const defaultTo = campusLocations.find(l => l.id === 'boys-hostel') || campusLocations[1];

  return {
    reply: `👋 Welcome to DISHAA AI Assistant! How can I assist your campus navigation today?\n\n` +
           `• **Campus Directions**: Ask for route guidance between any two campus locations.\n` +
           `• **3D/2D Floor Maps**: Ask to view indoor floor plans for Block A, B, or C.\n` +
           `• **Faculty Sitting Info**: Search faculty members or room sitting locations.\n` +
           `• **Campus Broadcasts**: View live alerts and event schedules.`,
    actions: [
      {
        label: `📍 Set Route: Block B ➔ Boys Hostel`,
        type: 'set_route',
        payload: { 
          fromLoc: defaultFrom, 
          toLoc: defaultTo 
        }
      },
      {
        label: `👨‍🏫 Search Faculty Cabins`,
        type: 'search_faculty',
        payload: {}
      },
      {
        label: `🏢 Explore Block B 4th Floor`,
        type: 'open_block',
        payload: { block: 'BLOCK B', floor: 4 }
      }
    ]
  };
}
