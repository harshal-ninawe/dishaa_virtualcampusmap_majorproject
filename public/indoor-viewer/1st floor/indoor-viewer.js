import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// --- Room Data ---
const ROOM_DATA = [
    {"id": "101", "name": "Dr. APJ Abdul Kalam Hall", "category": "seminar", "labelGroup": "label_133_601"},
    {"id": "102", "name": "Lab", "category": "lab", "labelGroup": "label_134_602"},
    {"id": "103A", "name": "A Lab", "category": "lab", "labelGroup": "label_128_596"},
    {"id": "103B", "name": "B Lab", "category": "lab", "labelGroup": "label_129_597"},
    {"id": "103C", "name": "C Lab", "category": "lab", "labelGroup": "label_130_598"},
    {"id": "104", "name": "Block Chain Technology Lab", "category": "lab", "labelGroup": "label_135_603"},
    {"id": "105", "name": "Dean Block", "category": "staff", "labelGroup": "label_137_605"},
    {"id": "106", "name": "Robotics Lab", "category": "lab", "labelGroup": "label_138_606"},
    {"id": "107A", "name": "Smart Room", "category": "special", "labelGroup": "label_139_607"},
    {"id": "107B", "name": "Staff Room", "category": "staff", "labelGroup": "label_140_608"},
    {"id": "108", "name": "Physics Lab", "category": "lab", "labelGroup": "label_141_609"},
    {"id": "109", "name": "Dark Room", "category": "special", "labelGroup": "label_161_629"},
    {"id": "110", "name": "Staff Room", "category": "staff", "labelGroup": "label_143_611"},
    {"id": "111", "name": "Physics Lab", "category": "lab", "labelGroup": "label_142_610"},
    {"id": "112", "name": "Girls Washroom", "category": "utility", "labelGroup": "label_144_612"},
    {"id": "113", "name": "Boys Washroom", "category": "utility", "labelGroup": "label_145_613"},
    {"id": "114", "name": "Board Room", "category": "special", "labelGroup": "label_146_614"},
    {"id": "115", "name": "Room 115", "category": "class", "labelGroup": "label_147_615"},
    {"id": "116", "name": "Room 116", "category": "class", "labelGroup": "label_148_616"},
    {"id": "117", "name": "Girls Common Room", "category": "special", "labelGroup": "label_150_618"},
    {"id": "118", "name": "Class Room", "category": "class", "labelGroup": "label_151_619"},
    {"id": "119", "name": "Class Room", "category": "class", "labelGroup": "label_152_620"},
    {"id": "120", "name": "Class Room", "category": "class", "labelGroup": "label_153_621"},
    {"id": "121", "name": "Class Room", "category": "class", "labelGroup": "label_154_622"},
    {"id": "122", "name": "Dean First Year Cabin", "category": "staff", "labelGroup": "label_155_623"},
    {"id": "123", "name": "Language Lab", "category": "lab", "labelGroup": "label_156_624"},
    {"id": "124", "name": "Class Room", "category": "class", "labelGroup": "label_158_626"},
    {"id": "125", "name": "AR-VR Lab", "category": "lab", "labelGroup": "label_159_627"},
    {"id": "126", "name": "Class Room", "category": "class", "labelGroup": "label_157_625"},
    {"id": "staff_room", "name": "Staff Room", "category": "staff", "labelGroup": "label_136_604"},
    {"id": "director_office", "name": "Director sir Office", "category": "staff", "labelGroup": "label_149_617"},
    {"id": "lift1", "name": "LIFT 1", "category": "utility", "labelGroup": "label_131_599"},
    {"id": "lift2", "name": "LIFT 2", "category": "utility", "labelGroup": "label_132_600"},
    {"id": "atrium", "name": "ATRIUM", "category": "utility", "labelGroup": "label_160_628"}
];

// Vibrant category colors for prominent 3D floor highlighting
const CATEGORY_COLORS = {
    "lab": 0x00e5ff,      // Vivid Cyan
    "class": 0xab47bc,    // Rich Vivid Magenta / Purple
    "staff": 0xffd600,    // Vibrant Golden Yellow
    "seminar": 0x00b0ff,  // Bright Azure Blue
    "special": 0xff1744,  // Vivid Coral Red
    "utility": 0x78909c   // Clean Slate Gray
};

// --- Navigation Graph ---
// Graph nodes mapped precisely to the red circulation pathways on the floor plan
const GRAPH_NODES = {
    // Left Loop (corridor surrounding Lift 1 / left courtyard)
    "c_left_top_left":   {x: 350,  z: 220,  landmark: "Left-top corridor junction"},
    "c_left_bot_left":   {x: 350,  z: 1300, landmark: "Left-bottom corridor junction"},
    "c_left_bot_right":  {x: 1000, z: 1300, landmark: "Atrium west entrance"},
    "c_left_top_right":  {x: 1000, z: 220,  landmark: "Physics Lab corridor"},

    // Top Extension (vertical pathway towards rooms 110, 111, 113)
    "c_top_extension":   {x: 1000, z: 80,   landmark: "Staff Room corridor extension"},

    // Right Loop (corridor surrounding Lift 2 / right courtyard)
    "c_top_right_corner": {x: 2028, z: 220,  landmark: "Director Office corridor junction"},
    "c_right_bot_mid":   {x: 2028, z: 1300, landmark: "Atrium east entrance"},
    "c_right_mid_junc":  {x: 2028, z: 700,  landmark: "Central cross corridor"},

    // Right Wing Corridor (vertical spine on the right)
    "c_right_wing_junc": {x: 3200, z: 700,  landmark: "Right wing corridor junction"},
    "c_right_wing_top":  {x: 3200, z: 150,  landmark: "Classrooms 118-121 area"},
    "c_right_wing_bot":  {x: 3200, z: 1500, landmark: "124 Class Room area"},

    // Center connectors / Lobbies
    "c_lift1":           {x: 620,  z: 890,  landmark: "Lift 1 lobby"},
    "c_lift2":           {x: 2027, z: 844,  landmark: "Lift 2 lobby"},
    "c_atrium":          {x: 1687, z: 1446, landmark: "Atrium center"}
};

const GRAPH_EDGES = [
    // Left loop edges
    ["c_left_top_left", "c_left_bot_left"],
    ["c_left_bot_left", "c_left_bot_right"],
    ["c_left_bot_right", "c_left_top_right"],
    ["c_left_top_right", "c_left_top_left"],

    // Top Extension
    ["c_left_top_right", "c_top_extension"],

    // Right loop edges
    ["c_left_top_right", "c_top_right_corner"],
    ["c_left_bot_right", "c_right_bot_mid"],
    ["c_top_right_corner", "c_right_mid_junc"],
    ["c_right_mid_junc", "c_right_bot_mid"],

    // Horizontal connector to Right Wing
    ["c_right_mid_junc", "c_right_wing_junc"],

    // Right wing vertical spine
    ["c_right_wing_junc", "c_right_wing_top"],
    ["c_right_wing_junc", "c_right_wing_bot"],

    // Intermediate lobby/atrium connections
    ["c_left_bot_left", "c_lift1"],
    ["c_lift1", "c_left_bot_right"],
    ["c_right_mid_junc", "c_lift2"],
    ["c_left_bot_right", "c_atrium"],
    ["c_atrium", "c_right_bot_mid"]
];

// Room → nearest corridor node
const ROOM_TO_NODE = {
    "101": "c_left_bot_right", "102": "c_left_bot_right", "103A": "c_left_bot_left", "103B": "c_left_bot_left", "103C": "c_left_bot_left",
    "104": "c_left_bot_left", "staff_room": "c_left_bot_left",
    "105": "c_left_top_left", "106": "c_left_top_left", "109": "c_left_top_right",
    "107A": "c_left_top_left", "107B": "c_left_top_left",
    "108": "c_left_top_right", "110": "c_top_extension", "111": "c_top_extension",
    "lift1": "c_lift1",
    "atrium": "c_atrium",
    "lift2": "c_lift2",
    "112": "c_left_top_right", "113": "c_left_top_right",
    "director_office": "c_top_right_corner", "114": "c_top_right_corner", "115": "c_top_right_corner",
    "116": "c_right_mid_junc", "117": "c_right_mid_junc",
    "118": "c_right_wing_top", "119": "c_right_wing_top", "122": "c_right_wing_top",
    "120": "c_right_wing_top", "121": "c_right_wing_top",
    "123": "c_right_wing_bot", "124": "c_right_wing_bot", "125": "c_right_wing_bot", "126": "c_right_wing_bot"
};

// Exact room coordinate mapping from OBJ
const ROOM_COORDINATES = {
    "101": {x: 762.2, y: 2.0, z: 1385.7},
    "102": {x: 510.0, y: 2.0, z: 1415.6},
    "103A": {x: 153.9, y: 2.0, z: 1424.2},
    "103B": {x: 148.3, y: 2.0, z: 1525.5},
    "103C": {x: 150.5, y: 2.0, z: 1621.6},
    "104": {x: 160.5, y: 2.0, z: 1079.0},
    "105": {x: 150.6, y: 2.0, z: 678.7},
    "106": {x: 133.1, y: 2.0, z: 356.7},
    "107A": {x: 125.6, y: 2.0, z: 105.1},
    "107B": {x: 397.7, y: 2.0, z: 52.2},
    "108": {x: 672.4, y: 2.0, z: 76.9},
    "109": {x: 673.1, y: 2.0, z: 435.0},
    "110": {x: 1038.9, y: 2.0, z: 103.5},
    "111": {x: 1011.3, y: 2.0, z: 412.0},
    "112": {x: 1383.7, y: 2.0, z: 38.7},
    "113": {x: 1638.4, y: 2.0, z: 55.7},
    "114": {x: 1640.9, y: 2.0, z: 315.3},
    "115": {x: 1848.0, y: 2.0, z: 384.7},
    "116": {x: 1970.4, y: 2.0, z: 377.7},
    "117": {x: 2157.6, y: 2.0, z: 252.4},
    "118": {x: 2926.4, y: 2.0, z: 443.1},
    "119": {x: 2911.5, y: 2.0, z: 148.5},
    "120": {x: 3528.0, y: 2.0, z: 147.5},
    "121": {x: 3510.6, y: 2.0, z: 431.6},
    "122": {x: 3523.3, y: 2.0, z: 897.0},
    "123": {x: 3523.0, y: 2.0, z: 1219.4},
    "124": {x: 3518.0, y: 2.0, z: 1482.5},
    "125": {x: 2928.9, y: 2.0, z: 1486.0},
    "126": {x: 2923.9, y: 2.0, z: 1236.9},
    "staff_room": {x: 147.9, y: 2.0, z: 1309.5},
    "director_office": {x: 1921.9, y: 2.0, z: 87.3},
    "lift1": {x: 619.9, y: 2.0, z: 891.4},
    "lift2": {x: 2027.7, y: 2.0, z: 844.5},
    "atrium": {x: 1687.2, y: 2.0, z: 1446.7}
};

// --- Three.js Variables ---
let scene, camera, renderer, controls;
let model;
let roomMeshes = [];
let routeLine = null;
let startMarker = null;
let destMarker = null;

const originalMaterials = new Map();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let currentSelectedRoomId = null;

// UI element cache
let popupElement, popupRoomBadge, popupRoomName, popupRoomDesc;

function init() {
    const container = document.getElementById('canvas-container');
    popupElement = document.getElementById('room-popup');
    popupRoomBadge = document.getElementById('popup-room-badge');
    popupRoomName = document.getElementById('popup-room-name');
    popupRoomDesc = document.getElementById('popup-room-desc');
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeef2f3); // Clean light gray viewport background

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 10000);
    camera.position.set(0, 2800, 2200);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 250;
    controls.maxDistance = 5500;

    // --- Enhanced Bright & Balanced Lighting ---
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcfd8dc, 0.95);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.65);
    dirLight1.position.set(2200, 3200, 1800);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-2200, 3200, -1800);
    scene.add(dirLight2);

    loadModel();

    window.addEventListener('resize', onWindowResize);
    container.addEventListener('click', onCanvasClick);

    setupUI();
    animate();
}

function loadModel() {
    const manager = new THREE.LoadingManager();
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        const percent = Math.floor((itemsLoaded / itemsTotal) * 100);
        progressBar.style.width = percent + '%';
        progressText.innerText = percent + '%';
    };

    manager.onLoad = function () {
        setTimeout(() => {
            document.getElementById('loading-overlay').style.opacity = '0';
            setTimeout(() => document.getElementById('loading-overlay').style.display = 'none', 500);
        }, 500);
    };

    const mtlLoader = new MTLLoader(manager);
    mtlLoader.setPath('./');
    mtlLoader.load('1st_floor.mtl', function (materials) {
        materials.preload();
        
        const objLoader = new OBJLoader(manager);
        objLoader.setMaterials(materials);
        objLoader.load('1st floor.obj', function (object) {
            model = object;
            
            // Center model automatically
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            object.position.x = -center.x;
            object.position.y = -center.y;
            object.position.z = -center.z;
            
            // Process all meshes: accurately associate floor and label meshes in un-centered geometry space
            object.traverse((child) => {
                if (child.isMesh) {
                    const nameLower = child.name.toLowerCase();
                    const parentLower = child.parent ? child.parent.name.toLowerCase() : '';
                    const isLabel = nameLower.includes('label') || parentLower.includes('label');
                    const isFloor = nameLower.includes('room_') || parentLower.includes('room_');

                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                        child.material.shadowSide = THREE.DoubleSide;
                        
                        if (isLabel) {
                            child.material.transparent = true;
                            child.material.alphaTest = 0.05;
                            child.material.depthWrite = false;
                            child.material.polygonOffset = true;
                            child.material.polygonOffsetFactor = -2;
                            child.material.polygonOffsetUnits = -2;
                            child.renderOrder = 20;
                            child.position.y = 0.4;
                        }
                        
                        child.material = child.material.clone();
                        originalMaterials.set(child, child.material.clone());
                    }

                    // Geometry local center is in original uncentered OBJ coordinates
                    let geomCenter = new THREE.Vector3();
                    if (child.geometry) {
                        if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();
                        child.geometry.boundingBox.getCenter(geomCenter);
                    }

                    if (isLabel) {
                        const matchedRoom = ROOM_DATA.find(r => {
                            const lg = r.labelGroup.toLowerCase();
                            return nameLower.includes(lg) || parentLower.includes(lg);
                        });
                        if (matchedRoom) {
                            child.userData.roomId = matchedRoom.id;
                            child.userData.category = matchedRoom.category;
                            child.userData.isLabel = true;
                            roomMeshes.push(child);
                        }
                    } else if (isFloor) {
                        // Associate floor mesh with closest room by geometry center in OBJ space
                        let closestRoom = null;
                        let minDist = Infinity;
                        ROOM_DATA.forEach(r => {
                            const pos = ROOM_COORDINATES[r.id];
                            if (pos) {
                                const dist = Math.hypot(geomCenter.x - pos.x, geomCenter.z - pos.z);
                                if (dist < minDist) {
                                    minDist = dist;
                                    closestRoom = r;
                                }
                            }
                        });
                        if (closestRoom) {
                            child.userData.roomId = closestRoom.id;
                            child.userData.category = closestRoom.category;
                            child.userData.isFloor = true;
                            roomMeshes.push(child);
                        }
                    }
                }
            });

            scene.add(object);
            controls.target.set(0, 0, 0);
            controls.update();
        });
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    updatePopupPosition();
    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// --- Dynamic Screen Positioning for Popups ---
function updatePopupPosition() {
    if (!currentSelectedRoomId || !popupElement || popupElement.style.display === 'none') return;
    const roomPos = getRoomPos(currentSelectedRoomId);
    if (!roomPos || !model) return;
    
    const worldPos = roomPos.clone().add(model.position);
    worldPos.project(camera);
    
    const container = document.getElementById('canvas-container');
    const x = (worldPos.x * 0.5 + 0.5) * container.clientWidth;
    const y = (-(worldPos.y * 0.5) + 0.5) * container.clientHeight;
    
    popupElement.style.left = `${x}px`;
    popupElement.style.top = `${y}px`;
}

// --- Canvas click room raycasting ---
function onCanvasClick(event) {
    if (!model) return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(roomMeshes);

    if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        if (clickedMesh.userData && clickedMesh.userData.roomId) {
            selectRoom(clickedMesh.userData.roomId);
        }
    } else {
        if (!event.target.closest('.room-popup') && !event.target.closest('.header-search-container')) {
            hidePopupAndResetMap();
        }
    }
}

function selectRoom(roomId) {
    currentSelectedRoomId = roomId;
    const room = ROOM_DATA.find(r => r.id === roomId);
    if (!room) return;

    popupRoomBadge.innerText = room.category.toUpperCase();
    popupRoomName.innerText = `Room ${room.id}`;
    popupRoomDesc.innerText = room.name;
    popupElement.style.display = 'block';
    
    // Highlight selected room floor with prominent glowing green and keep text 100% sharp
    roomMeshes.forEach(mesh => {
        if (mesh.userData.roomId === roomId) {
            if (mesh.material) {
                if (mesh.userData.isFloor) {
                    mesh.material.transparent = false;
                    mesh.material.opacity = 1.0;
                    mesh.material.color.setHex(0x00e676);
                    mesh.material.emissive.setHex(0x004d40);
                } else if (mesh.userData.isLabel) {
                    mesh.material.transparent = true;
                    mesh.material.opacity = 1.0;
                    mesh.material.emissive.setHex(0x000000);
                    mesh.renderOrder = 30;
                    mesh.position.y = 0.8;
                }
            }
        } else {
            const orig = originalMaterials.get(mesh);
            if (orig && mesh.material) {
                mesh.material.copy(orig);
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
            }
        }
    });

    // Fly camera toward the room
    const roomPos = getRoomPos(roomId);
    if (roomPos && model) {
        const targetWorld = roomPos.clone().add(model.position);
        controls.target.copy(targetWorld);
        camera.position.set(targetWorld.x, targetWorld.y + 750, targetWorld.z + 550);
        controls.update();
    }
}

// Reset everything to original overview form when clicking "✕"
function hidePopupAndResetMap() {
    currentSelectedRoomId = null;
    popupElement.style.display = 'none';
    
    // Reset all room materials and opacity
    roomMeshes.forEach(mesh => {
        const orig = originalMaterials.get(mesh);
        if (orig && mesh.material) {
            mesh.material.copy(orig);
            if (mesh.userData.isLabel) {
                mesh.material.transparent = true;
                mesh.material.alphaTest = 0.05;
                mesh.material.depthWrite = false;
                mesh.material.polygonOffset = true;
                mesh.material.polygonOffsetFactor = -2;
                mesh.material.polygonOffsetUnits = -2;
                mesh.renderOrder = 20;
                mesh.position.y = 0.4;
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
            } else if (mesh.userData.isFloor) {
                mesh.material.transparent = false;
                mesh.material.opacity = 1.0;
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
            }
        }
    });

    // Reset camera to original full-floor overview
    camera.position.set(0, 2800, 2200);
    controls.target.set(0, 0, 0);
    controls.update();

    // Clear search bar input & suggestions
    const globalInput = document.getElementById('global-search-input');
    const globalClear = document.getElementById('global-search-clear');
    const globalResults = document.getElementById('global-search-results');
    if (globalInput) globalInput.value = '';
    if (globalClear) globalClear.style.display = 'none';
    if (globalResults) globalResults.style.display = 'none';
}

// --- UI Logic & Search bar ---
function setupUI() {
    const startSelect = document.getElementById('start-select');
    const destSelect = document.getElementById('dest-select');

    ROOM_DATA.forEach(room => {
        const option = new Option(`${room.id} - ${room.name}`, room.id);
        startSelect.add(option.cloneNode(true));
        destSelect.add(option);
    });

    document.getElementById('swap-btn').addEventListener('click', () => {
        const temp = startSelect.value;
        startSelect.value = destSelect.value;
        destSelect.value = temp;
    });

    document.getElementById('find-route-btn').addEventListener('click', findRoute);
    document.getElementById('clear-route-btn').addEventListener('click', clearRoute);

    // Category Filter logic
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterRooms(e.target.dataset.filter);
        });
    });

    // Right View controls
    document.getElementById('reset-view-btn').addEventListener('click', () => {
        hidePopupAndResetMap();
    });
    
    document.getElementById('zoom-in-btn').addEventListener('click', () => {
        camera.position.lerp(controls.target, 0.25);
        controls.update();
    });
    
    document.getElementById('zoom-out-btn').addEventListener('click', () => {
        const dir = camera.position.clone().sub(controls.target).normalize();
        camera.position.add(dir.multiplyScalar(280));
        controls.update();
    });
    
    // Back button
    document.querySelector('.back-btn').addEventListener('click', () => {
        window.history.back();
    });

    // Room Tooltip Popup Buttons
    document.getElementById('popup-close').addEventListener('click', hidePopupAndResetMap);
    
    document.getElementById('popup-set-start').addEventListener('click', () => {
        if (currentSelectedRoomId) {
            startSelect.value = currentSelectedRoomId;
            popupElement.style.display = 'none';
        }
    });

    document.getElementById('popup-set-dest').addEventListener('click', () => {
        if (currentSelectedRoomId) {
            destSelect.value = currentSelectedRoomId;
            popupElement.style.display = 'none';
            findRoute();
        }
    });

    // Floor Switcher drop-down
    const floorBtn = document.getElementById('floor-switcher-btn');
    const floorDropdown = document.getElementById('floor-switcher-dropdown');
    
    floorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        floorDropdown.style.display = floorDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', () => {
        floorDropdown.style.display = 'none';
    });

    const triggerFloorSwitch = (floorNum) => {
        document.querySelectorAll('.floor-dropdown-menu a').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.floor === floorNum.toString()) el.classList.add('active');
        });
        
        if (floorNum !== 1) {
            alert(`Floor ${floorNum} 3D model is placeholder. Active interactive 1st Floor is loaded.`);
            triggerFloorSwitch(1);
        } else {
            clearRoute();
            hidePopupAndResetMap();
        }
    };

    document.querySelectorAll('.floor-dropdown-menu a').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const floor = parseInt(e.target.dataset.floor);
            triggerFloorSwitch(floor);
            floorDropdown.style.display = 'none';
        });
    });

    // Integrated Header Search Bar Logic
    const globalInput = document.getElementById('global-search-input');
    const globalResults = document.getElementById('global-search-results');
    const globalClear = document.getElementById('global-search-clear');

    globalInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        globalResults.innerHTML = '';
        
        if (!val) {
            globalResults.style.display = 'none';
            globalClear.style.display = 'none';
            return;
        }

        globalClear.style.display = 'block';

        const matches = ROOM_DATA.filter(room => 
            room.id.toLowerCase().includes(val) || 
            room.name.toLowerCase().includes(val) || 
            room.category.toLowerCase().includes(val)
        );

        if (matches.length === 0) {
            globalResults.style.display = 'none';
            return;
        }

        matches.forEach(room => {
            const li = document.createElement('li');
            li.className = 'search-result-item';
            li.innerHTML = `
                <div>
                    <div class="item-title">Room ${room.id}</div>
                    <div class="item-meta">${room.name} • 1st Floor</div>
                </div>
                <span class="item-tag">${room.category.toUpperCase()}</span>
            `;
            
            li.addEventListener('click', () => {
                globalInput.value = `Room ${room.id} – ${room.name}`;
                globalResults.style.display = 'none';
                selectRoom(room.id);
            });
            
            globalResults.appendChild(li);
        });

        globalResults.style.display = 'block';
    });

    globalClear.addEventListener('click', () => {
        globalInput.value = '';
        globalResults.style.display = 'none';
        globalClear.style.display = 'none';
        hidePopupAndResetMap();
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-search-container')) {
            globalResults.style.display = 'none';
        }
    });
}

// Category filter highlighting: vibrant solid floor colors and crisp black text
function filterRooms(category) {
    if (!model) return;
    
    // Reset all meshes to initial state first
    roomMeshes.forEach(mesh => {
        const orig = originalMaterials.get(mesh);
        if (orig && mesh.material) {
            mesh.material.copy(orig);
            if (mesh.userData.isLabel) {
                mesh.material.transparent = true;
                mesh.material.alphaTest = 0.05;
                mesh.material.depthWrite = false;
                mesh.material.polygonOffset = true;
                mesh.material.polygonOffsetFactor = -2;
                mesh.material.polygonOffsetUnits = -2;
                mesh.renderOrder = 20;
                mesh.position.y = 0.4;
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
            } else if (mesh.userData.isFloor) {
                mesh.material.transparent = false;
                mesh.material.opacity = 1.0;
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
            }
        }
    });

    if (category === 'all') return;

    roomMeshes.forEach(mesh => {
        const isMatch = (mesh.userData.category === category);

        if (isMatch) {
            if (mesh.userData.isFloor) {
                // Ensure matching room floors are 100% solid, vivid, and prominent
                mesh.material.transparent = false;
                mesh.material.opacity = 1.0;
                mesh.material.depthWrite = true;
                const catColor = CATEGORY_COLORS[category];
                if (catColor) {
                    mesh.material.color.setHex(catColor);
                }
                if (mesh.material.emissive) {
                    mesh.material.emissive.setHex(0x221133); // subtle depth
                }
            } else if (mesh.userData.isLabel) {
                // Ensure matching text labels are 100% sharp and elevated
                mesh.material.transparent = true;
                mesh.material.opacity = 1.0;
                mesh.material.depthWrite = false;
                mesh.material.alphaTest = 0.02;
                if (mesh.material.emissive) {
                    mesh.material.emissive.setHex(0x000000); // 0x000000 preserves deep black legible text
                }
                mesh.renderOrder = 30;
                mesh.position.y = 0.8;
            }
        } else {
            // Dim out non-matching rooms
            if (mesh.userData.isFloor) {
                mesh.material.transparent = true;
                mesh.material.opacity = 0.08;
                mesh.material.color.setHex(0xcccccc);
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
            } else if (mesh.userData.isLabel) {
                mesh.material.transparent = true;
                mesh.material.opacity = 0.12;
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
            }
        }
    });
}

// --- Navigation Logic (Dijkstra) ---
function findRoute() {
    const startId = document.getElementById('start-select').value;
    const destId = document.getElementById('dest-select').value;

    if (!startId || !destId) {
        alert('Please select both start and destination locations.');
        return;
    }
    if (startId === destId) {
        alert('Start and destination are the same.');
        return;
    }

    const startNodeId = ROOM_TO_NODE[startId];
    const destNodeId = ROOM_TO_NODE[destId];

    if (!startNodeId || !destNodeId) return;

    const graph = {};
    Object.keys(GRAPH_NODES).forEach(n => graph[n] = {});
    
    GRAPH_EDGES.forEach(([u, v]) => {
        const p1 = GRAPH_NODES[u];
        const p2 = GRAPH_NODES[v];
        const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.z - p2.z, 2));
        graph[u][v] = dist;
        graph[v][u] = dist;
    });

    const distances = {};
    const prev = {};
    const pq = new Set(Object.keys(GRAPH_NODES));

    Object.keys(GRAPH_NODES).forEach(n => distances[n] = Infinity);
    distances[startNodeId] = 0;

    while (pq.size > 0) {
        let minNode = null;
        for (const node of pq) {
            if (minNode === null || distances[node] < distances[minNode]) {
                minNode = node;
            }
        }
        if (minNode === null || distances[minNode] === Infinity) break;
        
        pq.delete(minNode);

        if (minNode === destNodeId) break;

        for (const neighbor in graph[minNode]) {
            const alt = distances[minNode] + graph[minNode][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                prev[neighbor] = minNode;
            }
        }
    }

    const path = [];
    let curr = destNodeId;
    while (curr) {
        path.unshift(curr);
        curr = prev[curr];
    }

    drawRoute(path, startId, destId);
    generateInstructions(path, startId, destId, distances[destNodeId]);
}

function drawRoute(pathNodes, startId, destId) {
    if (!model) return;
    if (routeLine) model.remove(routeLine);
    if (startMarker) model.remove(startMarker);
    if (destMarker) model.remove(destMarker);

    if (pathNodes.length === 0) return;

    const points = pathNodes.map(n => new THREE.Vector3(GRAPH_NODES[n].x, 12, GRAPH_NODES[n].z));
    
    const startObj = getRoomPos(startId);
    const destObj = getRoomPos(destId);
    if (startObj) points.unshift(startObj);
    if (destObj) points.push(destObj);

    const curve = new THREE.CatmullRomCurve3(points);
    const tubularSegments = points.length * 15;
    
    const geometry = new THREE.TubeGeometry(curve, tubularSegments, 6.0, 12, false);
    const material = new THREE.MeshBasicMaterial({ color: 0x00aaff, opacity: 0.95, transparent: true });
    
    routeLine = new THREE.Mesh(geometry, material);
    model.add(routeLine);

    const sphereGeo = new THREE.SphereGeometry(14.0, 16, 16);
    startMarker = new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ color: 0x00c853 }));
    destMarker = new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ color: 0xff1744 }));
    
    startMarker.position.copy(points[0]);
    destMarker.position.copy(points[points.length - 1]);
    model.add(startMarker);
    model.add(destMarker);

    // Zoom camera to focus on entire route
    const centerPoint = points[Math.floor(points.length / 2)].clone().add(model.position);
    controls.target.copy(centerPoint);
    controls.update();
}

function getRoomPos(roomId) {
    const coords = ROOM_COORDINATES[roomId];
    if (!coords) return null;
    return new THREE.Vector3(coords.x, 12, coords.z);
}

function getTurnDirection(prevNode, currNode, nextNode) {
    const p = GRAPH_NODES[prevNode];
    const c = GRAPH_NODES[currNode];
    const n = GRAPH_NODES[nextNode];
    const dx1 = c.x - p.x;
    const dz1 = c.z - p.z;
    const dx2 = n.x - c.x;
    const dz2 = n.z - c.z;
    const cross = dx1 * dz2 - dz1 * dx2;
    if (Math.abs(cross) < 10.0) return 'straight';
    return cross > 0 ? 'right' : 'left';
}

function generateInstructions(path, startId, destId, totalDist) {
    const tbtSection = document.getElementById('tbt-section');
    const tbtList = document.getElementById('tbt-list');
    const distanceBadge = document.getElementById('distance-badge');
    
    tbtSection.style.display = 'block';
    const distMeters = (totalDist * 0.015).toFixed(1);
    distanceBadge.innerText = `~ ${distMeters} m walk`;
    
    const sRoom = ROOM_DATA.find(r => r.id === startId);
    const dRoom = ROOM_DATA.find(r => r.id === destId);

    let html = '';

    html += `<div class="tbt-step"><span class="step-icon">🟢</span><span>Start at Room ${sRoom.id} – ${sRoom.name}</span></div>`;

    for (let i = 1; i < path.length - 1; i++) {
        const node = GRAPH_NODES[path[i]];
        const turnDir = getTurnDirection(path[i - 1], path[i], path[i + 1]);
        
        let icon, instruction;
        if (turnDir === 'left') {
            icon = '⬅️';
            instruction = `Turn left at ${node.landmark}`;
        } else if (turnDir === 'right') {
            icon = '➡️';
            instruction = `Turn right at ${node.landmark}`;
        } else {
            icon = '🚶';
            instruction = `Walk past ${node.landmark}`;
        }
        html += `<div class="tbt-step"><span class="step-icon">${icon}</span><span>${instruction}</span></div>`;
    }

    if (path.length === 2) {
        const midNode = GRAPH_NODES[path[0]];
        html += `<div class="tbt-step"><span class="step-icon">🚶</span><span>Walk along ${midNode.landmark} corridor</span></div>`;
    }

    html += `<div class="tbt-step"><span class="step-icon">🔴</span><span>Arrive at Room ${dRoom.id} – ${dRoom.name}</span></div>`;
    
    tbtList.innerHTML = html;
}

function clearRoute() {
    if (!model) return;
    if (routeLine) model.remove(routeLine);
    if (startMarker) model.remove(startMarker);
    if (destMarker) model.remove(destMarker);
    routeLine = null;
    document.getElementById('tbt-section').style.display = 'none';
    document.getElementById('start-select').value = '';
    document.getElementById('dest-select').value = '';
}

init();
