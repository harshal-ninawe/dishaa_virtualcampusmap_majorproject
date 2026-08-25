import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// ==========================================
// 1. FLOOR DATA CONFIGURATIONS
// ==========================================

const FLOOR_CONFIGS = {
    1: {
        name: "1st Floor",
        shortName: "1F",
        folder: "./1st floor/",
        mtlFile: "1st_floor.mtl",
        objFile: "1st floor.obj",
        planImage: "./1st final.jpg",
        planSize: { width: 3790, depth: 1972.5 },
        rooms: [
            // Classes: 107A, 118, 119, 120, 121, 124, 126
            {"id": "107A", "name": "Smart Room", "category": "class", "labelGroup": "label_139_607"},
            {"id": "118", "name": "Class Room", "category": "class", "labelGroup": "label_151_619"},
            {"id": "119", "name": "Class Room", "category": "class", "labelGroup": "label_152_620"},
            {"id": "120", "name": "Class Room", "category": "class", "labelGroup": "label_153_621"},
            {"id": "121", "name": "Class Room", "category": "class", "labelGroup": "label_154_622"},
            {"id": "124", "name": "Class Room", "category": "class", "labelGroup": "label_158_626"},
            {"id": "126", "name": "Class Room", "category": "class", "labelGroup": "label_157_625"},

            // Labs: 102, 103A, 103B, 104, 106, 108, 111, 123, 125
            {"id": "102", "name": "Lab", "category": "lab", "labelGroup": "label_134_602"},
            {"id": "103A", "name": "A Lab", "category": "lab", "labelGroup": "label_128_596"},
            {"id": "103B", "name": "B Lab", "category": "lab", "labelGroup": "label_129_597"},
            {"id": "104", "name": "Block Chain Technology Lab", "category": "lab", "labelGroup": "label_135_603"},
            {"id": "106", "name": "Robotics Lab", "category": "lab", "labelGroup": "label_138_606"},
            {"id": "108", "name": "Physics Lab", "category": "lab", "labelGroup": "label_141_609"},
            {"id": "111", "name": "Physics Lab", "category": "lab", "labelGroup": "label_142_610"},
            {"id": "123", "name": "Language Lab", "category": "lab", "labelGroup": "label_156_624"},
            {"id": "125", "name": "AR-VR Lab", "category": "lab", "labelGroup": "label_159_627"},

            // Department: 122
            {"id": "122", "name": "Dean First Year Cabin", "category": "dept", "labelGroup": "label_155_623"},

            // Staff Rooms: 107B, 110, 105, director_office
            {"id": "107B", "name": "Staff Room", "category": "staff", "labelGroup": "label_140_608"},
            {"id": "110", "name": "Staff Room", "category": "staff", "labelGroup": "label_143_611"},
            {"id": "105", "name": "Dean Block", "category": "staff", "labelGroup": "label_137_605"},
            {"id": "director_office", "name": "Director sir Office", "category": "staff", "labelGroup": "label_149_617"},

            // Seminar: 101
            {"id": "101", "name": "Dr. APJ Abdul Kalam Hall", "category": "seminar", "labelGroup": "label_133_601"},

            // Special: 114, 115, 116
            {"id": "114", "name": "Board Room", "category": "special", "labelGroup": "label_146_614"},
            {"id": "115", "name": "Room 115", "category": "special", "labelGroup": "label_147_615"},
            {"id": "116", "name": "Room 116", "category": "special", "labelGroup": "label_148_616"},

            // Utility: 112, 113, 117, atrium
            {"id": "112", "name": "Girls Washroom", "category": "utility", "labelGroup": "label_144_612"},
            {"id": "113", "name": "Boys Washroom", "category": "utility", "labelGroup": "label_145_613"},
            {"id": "117", "name": "Girls Common Room", "category": "utility", "labelGroup": "label_150_618"},
            {"id": "atrium", "name": "ATRIUM", "category": "utility", "labelGroup": "label_160_628"}
        ],
        roomCoords: {
            "101": {x: 762.2, y: 2.0, z: 1385.7}, "102": {x: 510.0, y: 2.0, z: 1415.6}, "103A": {x: 153.9, y: 2.0, z: 1424.2},
            "103B": {x: 148.3, y: 2.0, z: 1525.5}, "103C": {x: 150.5, y: 2.0, z: 1621.6}, "104": {x: 160.5, y: 2.0, z: 1079.0},
            "105": {x: 150.6, y: 2.0, z: 678.7}, "106": {x: 133.1, y: 2.0, z: 356.7}, "107A": {x: 125.6, y: 2.0, z: 105.1},
            "107B": {x: 397.7, y: 2.0, z: 52.2}, "108": {x: 672.4, y: 2.0, z: 76.9}, "109": {x: 673.1, y: 2.0, z: 435.0},
            "110": {x: 1038.9, y: 2.0, z: 103.5}, "111": {x: 1011.3, y: 2.0, z: 412.0}, "112": {x: 1383.7, y: 2.0, z: 38.7},
            "113": {x: 1638.4, y: 2.0, z: 55.7}, "114": {x: 1640.9, y: 2.0, z: 315.3}, "115": {x: 1848.0, y: 2.0, z: 384.7},
            "116": {x: 1970.4, y: 2.0, z: 377.7}, "117": {x: 2157.6, y: 2.0, z: 252.4}, "118": {x: 2926.4, y: 2.0, z: 443.1},
            "119": {x: 2911.5, y: 2.0, z: 148.5}, "120": {x: 3528.0, y: 2.0, z: 147.5}, "121": {x: 3510.6, y: 2.0, z: 431.6},
            "122": {x: 3523.3, y: 2.0, z: 897.0}, "123": {x: 3523.0, y: 2.0, z: 1219.4}, "124": {x: 3518.0, y: 2.0, z: 1482.5},
            "125": {x: 2928.9, y: 2.0, z: 1486.0}, "126": {x: 2923.9, y: 2.0, z: 1236.9}, "staff_room": {x: 147.9, y: 2.0, z: 1309.5},
            "director_office": {x: 1921.9, y: 2.0, z: 87.3}, "lift1": {x: 619.9, y: 2.0, z: 891.4}, "lift2": {x: 2027.7, y: 2.0, z: 844.5},
            "atrium": {x: 1687.2, y: 2.0, z: 1446.7}
        },
        graphNodes: {
            // === RED DOOR NODES (from img 3.png) ===
            "rd_101": {x:700, z:1371, px:351, py:550, type:"door", landmark:"Room 101 Dr. APJ Abdul Kalam Hall door"},
            "rd_102": {x:571, z:1377, px:299, py:552, type:"door", landmark:"Room 102 Lab door"},
            "rd_104": {x:253, z:1065, px:171, py:438, type:"door", landmark:"Room 104 Block Chain Technology door"},
            "rd_105": {x:231, z:657, px:162, py:289, type:"door", landmark:"Room 105 Dean Block door"},
            "rd_106": {x:218, z:411, px:157, py:199, type:"door", landmark:"Room 106 Robotics Lab door"},
            "rd_108": {x:568, z:140, px:298, py:100, type:"door", landmark:"Room 108 Physics Lab door"},
            "rd_110": {x:1189, z:403, px:548, py:196, type:"door", landmark:"Room 110 Staff Room door"},
            "rd_111": {x:1189, z:403, px:548, py:196, type:"door", landmark:"Room 111 Physics Lab door"},
            "rd_112": {x:1308, z:-16, px:596, py:43, type:"door", landmark:"Room 112 Girls Washroom door"},
            "rd_113": {x:1549, z:74, px:693, py:76, type:"door", landmark:"Room 113 Boys Washroom door"},
            "rd_114": {x:1589, z:419, px:709, py:202, type:"door", landmark:"Room 114 Board Room door"},
            "rd_115": {x:1822, z:414, px:803, py:200, type:"door", landmark:"Room 115 door"},
            "rd_116": {x:1974, z:408, px:864, py:198, type:"door", landmark:"Room 116 door"},
            "rd_117": {x:2170, z:384, px:943, py:189, type:"door", landmark:"Room 117 Girls Common Room door"},
            "rd_118": {x:3034, z:583, px:1291, py:262, type:"door", landmark:"Room 118 Class Room door"},
            "rd_119": {x:3034, z:195, px:1291, py:120, type:"door", landmark:"Room 119 Class Room door"},
            "rd_120": {x:3367, z:184, px:1425, py:116, type:"door", landmark:"Room 120 Class Room door"},
            "rd_121": {x:3386, z:581, px:1433, py:261, type:"door", landmark:"Room 121 Class Room door"},
            "rd_122": {x:3379, z:821, px:1430, py:349, type:"door", landmark:"Room 122 Dean First Year door"},
            "rd_123": {x:3376, z:1232, px:1429, py:499, type:"door", landmark:"Room 123 Language Lab door"},
            "rd_124": {x:3379, z:1629, px:1430, py:644, type:"door", landmark:"Room 124 Class Room door"},
            "rd_125": {x:3024, z:1585, px:1287, py:628, type:"door", landmark:"Room 125 AR-VR Lab door"},
            "rd_126": {x:3024, z:1341, px:1287, py:539, type:"door", landmark:"Room 126 Class Room door"},
            "rd_107A": {x:201, z:137, px:150, py:99, type:"door", landmark:"Room 107A Smart Room door"},
            "rd_107B": {x:370, z:31, px:218, py:60, type:"door", landmark:"Room 107B Staff Room door"},
            "rd_103A": {x:241, z:1497, px:166, py:596, type:"door", landmark:"Room 103A Lab door"},
            "rd_103B": {x:238, z:1609, px:165, py:637, type:"door", landmark:"Room 103B Lab door"},
            "rd_director_office": {x:1758, z:553, px:777, py:251, type:"door", landmark:"Director Office door"},
            "rd_atrium": {x:1641, z:1453, px:730, py:580, type:"door", landmark:"Atrium entrance"},

            // === STRAIGHT GREEN CORRIDOR LINE & JUNCTION NODES (from img 3.png) ===
            "cp_left_top": {x:422, z:31, px:239, py:60, type:"corridor", landmark:"Left corridor top end"},
            "cp_j_top_left": {x:422, z:586, px:239, py:263, type:"corridor", landmark:"Top-Left corridor junction"},
            "cp_j_bot_left": {x:422, z:1229, px:239, py:498, type:"corridor", landmark:"Bottom-Left corridor junction"},
            "cp_left_bot": {x:422, z:1645, px:239, py:650, type:"corridor", landmark:"Left corridor south end"},
            "cp_j_top_wash": {x:1353, z:586, px:614, py:263, type:"corridor", landmark:"Top-Washroom corridor junction"},
            "cp_j_top_east": {x:2182, z:586, px:948, py:263, type:"corridor", landmark:"Top-East corridor junction"},
            "cp_wash_top": {x:1353, z:-16, px:614, py:43, type:"corridor", landmark:"Washroom entrance corridor"},
            "cp_j_bot_wash": {x:1353, z:1229, px:614, py:498, type:"corridor", landmark:"Bottom-Washroom corridor junction"},
            "cp_j_bridge_east": {x:2182, z:838, px:948, py:355, type:"corridor", landmark:"East corridor & Right Wing bridge junction"},
            "cp_j_bot_east": {x:2182, z:1229, px:948, py:498, type:"corridor", landmark:"Bottom-East corridor junction"},
            "cp_j_bridge_rw": {x:3215, z:838, px:1364, py:355, type:"corridor", landmark:"Right Wing & bridge junction"},
            "cp_rw_top": {x:3215, z:61, px:1364, py:71, type:"corridor", landmark:"Right wing north stairs"},
            "cp_rw_bot": {x:3215, z:1749, px:1364, py:688, type:"corridor", landmark:"Right wing south end"},
            "cp_proj_rd_101": {x:700, z:1229, px:351, py:498, type:"corridor", landmark:"Corridor outside Room 101 Dr. APJ Abdul Kalam Hall door"},
            "cp_proj_rd_102": {x:571, z:1229, px:299, py:498, type:"corridor", landmark:"Corridor outside Room 102 Lab door"},
            "cp_proj_rd_104": {x:422, z:1065, px:239, py:438, type:"corridor", landmark:"Corridor outside Room 104 Block Chain Technology door"},
            "cp_proj_rd_105": {x:422, z:657, px:239, py:289, type:"corridor", landmark:"Corridor outside Room 105 Dean Block door"},
            "cp_proj_rd_106": {x:422, z:411, px:239, py:199, type:"corridor", landmark:"Corridor outside Room 106 Robotics Lab door"},
            "cp_proj_rd_108": {x:568, z:586, px:298, py:263, type:"corridor", landmark:"Corridor outside Room 108 Physics Lab door"},
            "cp_proj_rd_110": {x:1189, z:586, px:548, py:263, type:"corridor", landmark:"Corridor outside Room 110 Staff Room door"},
            "cp_proj_rd_111": {x:1189, z:586, px:548, py:263, type:"corridor", landmark:"Corridor outside Room 111 Physics Lab door"},
            "cp_proj_rd_112": {x:1353, z:-16, px:614, py:43, type:"corridor", landmark:"Corridor outside Room 112 Girls Washroom door"},
            "cp_proj_rd_113": {x:1353, z:74, px:614, py:76, type:"corridor", landmark:"Corridor outside Room 113 Boys Washroom door"},
            "cp_proj_rd_114": {x:1589, z:586, px:709, py:263, type:"corridor", landmark:"Corridor outside Room 114 Board Room door"},
            "cp_proj_rd_115": {x:1822, z:586, px:803, py:263, type:"corridor", landmark:"Corridor outside Room 115 door"},
            "cp_proj_rd_116": {x:1974, z:586, px:864, py:263, type:"corridor", landmark:"Corridor outside Room 116 door"},
            "cp_proj_rd_117": {x:2170, z:586, px:943, py:263, type:"corridor", landmark:"Corridor outside Room 117 Girls Common Room door"},
            "cp_proj_rd_118": {x:3215, z:583, px:1364, py:262, type:"corridor", landmark:"Corridor outside Room 118 Class Room door"},
            "cp_proj_rd_119": {x:3215, z:195, px:1364, py:120, type:"corridor", landmark:"Corridor outside Room 119 Class Room door"},
            "cp_proj_rd_120": {x:3215, z:184, px:1364, py:116, type:"corridor", landmark:"Corridor outside Room 120 Class Room door"},
            "cp_proj_rd_121": {x:3215, z:581, px:1364, py:261, type:"corridor", landmark:"Corridor outside Room 121 Class Room door"},
            "cp_proj_rd_122": {x:3215, z:821, px:1364, py:349, type:"corridor", landmark:"Corridor outside Room 122 Dean First Year door"},
            "cp_proj_rd_123": {x:3215, z:1232, px:1364, py:499, type:"corridor", landmark:"Corridor outside Room 123 Language Lab door"},
            "cp_proj_rd_124": {x:3215, z:1629, px:1364, py:644, type:"corridor", landmark:"Corridor outside Room 124 Class Room door"},
            "cp_proj_rd_125": {x:3215, z:1585, px:1364, py:628, type:"corridor", landmark:"Corridor outside Room 125 AR-VR Lab door"},
            "cp_proj_rd_126": {x:3215, z:1341, px:1364, py:539, type:"corridor", landmark:"Corridor outside Room 126 Class Room door"},
            "cp_proj_rd_107A": {x:422, z:137, px:239, py:99, type:"corridor", landmark:"Corridor outside Room 107A Smart Room door"},
            "cp_proj_rd_107B": {x:422, z:31, px:239, py:60, type:"corridor", landmark:"Corridor outside Room 107B Staff Room door"},
            "cp_proj_rd_103A": {x:422, z:1497, px:239, py:596, type:"corridor", landmark:"Corridor outside Room 103A Lab door"},
            "cp_proj_rd_103B": {x:422, z:1609, px:239, py:637, type:"corridor", landmark:"Corridor outside Room 103B Lab door"},
            "cp_proj_rd_director_office": {x:1758, z:586, px:777, py:263, type:"corridor", landmark:"Corridor outside Director Office door"},
            "cp_proj_rd_atrium": {x:1641, z:1229, px:730, py:498, type:"corridor", landmark:"Corridor outside Atrium entrance"},
        },
        graphEdges: [
            // Straight corridor lines
            ["cp_left_top", "cp_proj_rd_107B"],
            ["cp_proj_rd_107B", "cp_proj_rd_107A"],
            ["cp_proj_rd_107A", "cp_proj_rd_106"],
            ["cp_proj_rd_106", "cp_j_top_left"],
            ["cp_j_top_left", "cp_proj_rd_105"],
            ["cp_proj_rd_105", "cp_proj_rd_104"],
            ["cp_proj_rd_104", "cp_j_bot_left"],
            ["cp_j_bot_left", "cp_proj_rd_103A"],
            ["cp_proj_rd_103A", "cp_proj_rd_103B"],
            ["cp_proj_rd_103B", "cp_left_bot"],
            ["cp_j_top_left", "cp_proj_rd_108"],
            ["cp_proj_rd_108", "cp_proj_rd_110"],
            ["cp_proj_rd_110", "cp_proj_rd_111"],
            ["cp_proj_rd_111", "cp_j_top_wash"],
            ["cp_j_top_wash", "cp_proj_rd_114"],
            ["cp_proj_rd_114", "cp_proj_rd_director_office"],
            ["cp_proj_rd_director_office", "cp_proj_rd_115"],
            ["cp_proj_rd_115", "cp_proj_rd_116"],
            ["cp_proj_rd_116", "cp_proj_rd_117"],
            ["cp_proj_rd_117", "cp_j_top_east"],
            ["cp_wash_top", "cp_proj_rd_112"],
            ["cp_proj_rd_112", "cp_proj_rd_113"],
            ["cp_proj_rd_113", "cp_j_top_wash"],
            ["cp_j_top_wash", "cp_j_bot_wash"],
            ["cp_j_top_east", "cp_j_bridge_east"],
            ["cp_j_bridge_east", "cp_j_bot_east"],
            ["cp_j_bridge_east", "cp_j_bridge_rw"],
            ["cp_rw_top", "cp_proj_rd_120"],
            ["cp_proj_rd_120", "cp_proj_rd_119"],
            ["cp_proj_rd_119", "cp_proj_rd_121"],
            ["cp_proj_rd_121", "cp_proj_rd_118"],
            ["cp_proj_rd_118", "cp_proj_rd_122"],
            ["cp_proj_rd_122", "cp_j_bridge_rw"],
            ["cp_j_bridge_rw", "cp_proj_rd_123"],
            ["cp_proj_rd_123", "cp_proj_rd_126"],
            ["cp_proj_rd_126", "cp_proj_rd_125"],
            ["cp_proj_rd_125", "cp_proj_rd_124"],
            ["cp_proj_rd_124", "cp_rw_bot"],
            ["cp_j_bot_left", "cp_proj_rd_102"],
            ["cp_proj_rd_102", "cp_proj_rd_101"],
            ["cp_proj_rd_101", "cp_j_bot_wash"],
            ["cp_j_bot_wash", "cp_proj_rd_atrium"],
            ["cp_proj_rd_atrium", "cp_j_bot_east"],

            // Red Door to Straight Corridor links
            ["rd_101", "cp_proj_rd_101"],
            ["rd_102", "cp_proj_rd_102"],
            ["rd_104", "cp_proj_rd_104"],
            ["rd_105", "cp_proj_rd_105"],
            ["rd_106", "cp_proj_rd_106"],
            ["rd_108", "cp_proj_rd_108"],
            ["rd_110", "cp_proj_rd_110"],
            ["rd_111", "cp_proj_rd_111"],
            ["rd_112", "cp_proj_rd_112"],
            ["rd_113", "cp_proj_rd_113"],
            ["rd_114", "cp_proj_rd_114"],
            ["rd_115", "cp_proj_rd_115"],
            ["rd_116", "cp_proj_rd_116"],
            ["rd_117", "cp_proj_rd_117"],
            ["rd_118", "cp_proj_rd_118"],
            ["rd_119", "cp_proj_rd_119"],
            ["rd_120", "cp_proj_rd_120"],
            ["rd_121", "cp_proj_rd_121"],
            ["rd_122", "cp_proj_rd_122"],
            ["rd_123", "cp_proj_rd_123"],
            ["rd_124", "cp_proj_rd_124"],
            ["rd_125", "cp_proj_rd_125"],
            ["rd_126", "cp_proj_rd_126"],
            ["rd_107A", "cp_proj_rd_107A"],
            ["rd_107B", "cp_proj_rd_107B"],
            ["rd_103A", "cp_proj_rd_103A"],
            ["rd_103B", "cp_proj_rd_103B"],
            ["rd_director_office", "cp_proj_rd_director_office"],
            ["rd_atrium", "cp_proj_rd_atrium"],
        ],
        roomToNode: {
            "101": "rd_101",
            "102": "rd_102",
            "104": "rd_104",
            "105": "rd_105",
            "106": "rd_106",
            "108": "rd_108",
            "110": "rd_110",
            "111": "rd_111",
            "112": "rd_112",
            "113": "rd_113",
            "114": "rd_114",
            "115": "rd_115",
            "116": "rd_116",
            "117": "rd_117",
            "118": "rd_118",
            "119": "rd_119",
            "120": "rd_120",
            "121": "rd_121",
            "122": "rd_122",
            "123": "rd_123",
            "124": "rd_124",
            "125": "rd_125",
            "126": "rd_126",
            "107A": "rd_107A",
            "107B": "rd_107B",
            "103A": "rd_103A",
            "103B": "rd_103B",
            "director_office": "rd_director_office",
            "atrium": "rd_atrium"
        }
    },
    4: {
        name: "4th Floor",
        shortName: "4F",
        folder: "./4th floor/",
        mtlFile: "4th_floor.mtl",
        objFile: "4th floor.obj",
        planImage: "./4th floor.jpg",
        planSize: { width: 3307.9, depth: 1644.9 },
        rooms: [
            // Classes: 403, 404, 409A, 410, 418, 421, 422, 429
            {"id": "403", "name": "Smart Room", "category": "class", "labelGroup": "label_186_799"},
            {"id": "404", "name": "Class Room", "category": "class", "labelGroup": "label_187_800"},
            {"id": "409A", "name": "409(A) Class Room", "category": "class", "labelGroup": "label_192_805"},
            {"id": "410", "name": "Class Room", "category": "class", "labelGroup": "label_193_806"},
            {"id": "418", "name": "Music Room", "category": "class", "labelGroup": "label_176_789"},
            {"id": "421", "name": "Class Room", "category": "class", "labelGroup": "label_177_790"},
            {"id": "422", "name": "Class Room", "category": "class", "labelGroup": "label_182_795"},
            {"id": "429", "name": "Class Room", "category": "class", "labelGroup": "label_183_796"},

            // Labs: 402, 405, 406, 408, 411, 412, 413, 423, 424, 426, 427, 428
            {"id": "402", "name": "Wireless Communication & Computing Lab", "category": "lab", "labelGroup": "label_185_798"},
            {"id": "405", "name": "Operating System Lab", "category": "lab", "labelGroup": "label_188_801"},
            {"id": "406", "name": "Digital & Microcontroller Lab", "category": "lab", "labelGroup": "label_189_802"},
            {"id": "408", "name": "DMS Lab", "category": "lab", "labelGroup": "label_191_804"},
            {"id": "411", "name": "Project Lab", "category": "lab", "labelGroup": "label_194_807"},
            {"id": "412", "name": "Web Technology & DSA Lab", "category": "lab", "labelGroup": "label_195_808"},
            {"id": "413", "name": "Computer Network Lab", "category": "lab", "labelGroup": "label_196_809"},
            {"id": "423", "name": "Switchgear & Protection Lab", "category": "lab", "labelGroup": "label_179_792"},
            {"id": "424", "name": "Electrical Workshop & Hardware Lab", "category": "lab", "labelGroup": "label_178_791"},
            {"id": "426", "name": "BEE Lab", "category": "lab", "labelGroup": "label_180_793"},
            {"id": "427", "name": "Power Electronic & Network Theory Lab", "category": "lab", "labelGroup": "label_181_794"},
            {"id": "428", "name": "Control System & Sensor Transducer Lab", "category": "lab", "labelGroup": "label_184_797"},

            // Departments: 407, 417, 425
            {"id": "407", "name": "Department of CSE & IT", "category": "dept", "labelGroup": "label_190_803"},
            {"id": "417", "name": "Department of CSE & Electrical Diploma", "category": "dept", "labelGroup": "label_175_788"},
            {"id": "425", "name": "Department of Electrical", "category": "dept", "labelGroup": "label_173_786"},

            // Staff Rooms: 409B, 420
            {"id": "409B", "name": "409(B) Staff Room", "category": "staff", "labelGroup": "label_192_805"},
            {"id": "420", "name": "Teacher Staff Room", "category": "staff", "labelGroup": "label_169_782"},

            // Seminar: 401
            {"id": "401", "name": "Dr. Vijay Bhatkar Seminar Hall", "category": "seminar", "labelGroup": "label_170_783"},

            // Utility: 414, 415_416, 419
            {"id": "414", "name": "Girls Washroom", "category": "utility", "labelGroup": "label_167_780"},
            {"id": "415_416", "name": "415 Washroom & 416 Staff Washroom", "category": "utility", "labelGroup": "label_174_787"},
            {"id": "419", "name": "Girls Common Room", "category": "utility", "labelGroup": "label_168_781"}
        ],
        roomCoords: {
            "401": {x: 854, y: 2.0, z: 1091},
            "402": {x: 684, y: 2.0, z: 1091},
            "403": {x: 564, y: 2.0, z: 1387},
            "404": {x: 243, y: 2.0, z: 1368},
            "405": {x: 245, y: 2.0, z: 1234},
            "406": {x: 247, y: 2.0, z: 878},
            "407": {x: 245, y: 2.0, z: 643},
            "408": {x: 238, y: 2.0, z: 492},
            "410": {x: 490, y: 2.0, z: 254},
            "411": {x: 540, y: 2.0, z: 527},
            "412": {x: 923, y: 2.0, z: 478},
            "413": {x: 904, y: 2.0, z: 256},
            "414": {x: 1016, y: 2.0, z: 121},
            "417": {x: 1317, y: 2.0, z: 515},
            "418": {x: 1737, y: 2.0, z: 508},
            "419": {x: 1978, y: 2.0, z: 519},
            "420": {x: 2237, y: 2.0, z: 515},
            "421": {x: 2738, y: 2.0, z: 597},
            "422": {x: 2765, y: 2.0, z: 273},
            "423": {x: 3047, y: 2.0, z: 293},
            "424": {x: 3054, y: 2.0, z: 595},
            "425": {x: 3031, y: 2.0, z: 756},
            "426": {x: 3045, y: 2.0, z: 1012},
            "427": {x: 3047, y: 2.0, z: 1329},
            "428": {x: 2762, y: 2.0, z: 1308},
            "429": {x: 2763, y: 2.0, z: 1022},
            "409A": {x: 222, y: 2.0, z: 268},
            "409B": {x: 371, y: 2.0, z: 156},
            "415_416": {x: 1278, y: 2.0, z: 186},
        },
        graphNodes: {
            // === RED DOOR NODES (from img4.jpg) ===
            "rd_401": {x:854, z:1091, px:770, py:1028, type:"door", landmark:"Room 401 Dr. Vijay Bhatkar Seminar Hall door"},
            "rd_402": {x:684, z:1091, px:617, py:1028, type:"door", landmark:"Room 402 Wireless Communication & Computing Lab door"},
            "rd_403": {x:564, z:1387, px:508, py:1307, type:"door", landmark:"Room 403 Smart Room door"},
            "rd_404": {x:243, z:1368, px:219, py:1289, type:"door", landmark:"Room 404 Class Room door"},
            "rd_405": {x:245, z:1234, px:221, py:1163, type:"door", landmark:"Room 405 Operating System Lab door"},
            "rd_406": {x:247, z:878, px:223, py:827, type:"door", landmark:"Room 406 Digital & Microcontroller Lab door"},
            "rd_407": {x:245, z:643, px:221, py:606, type:"door", landmark:"Room 407 Department of CSE & IT door"},
            "rd_408": {x:238, z:492, px:215, py:464, type:"door", landmark:"Room 408 DMS Lab door"},
            "rd_410": {x:490, z:254, px:442, py:239, type:"door", landmark:"Room 410 Class Room door"},
            "rd_411": {x:540, z:527, px:487, py:497, type:"door", landmark:"Room 411 Project Lab door"},
            "rd_412": {x:923, z:478, px:832, py:450, type:"door", landmark:"Room 412 Web Technology & DSA Lab door"},
            "rd_413": {x:904, z:256, px:815, py:241, type:"door", landmark:"Room 413 Computer Network Lab door"},
            "rd_414": {x:1016, z:121, px:916, py:114, type:"door", landmark:"Room 414 Girls Washroom door"},
            "rd_417": {x:1317, z:515, px:1187, py:485, type:"door", landmark:"Room 417 Department of CSE & Electrical Diploma door"},
            "rd_418": {x:1737, z:508, px:1566, py:479, type:"door", landmark:"Room 418 Music Room door"},
            "rd_419": {x:1978, z:519, px:1783, py:489, type:"door", landmark:"Room 419 Girls Common Room door"},
            "rd_420": {x:2237, z:515, px:2017, py:485, type:"door", landmark:"Room 420 Teacher Staff Room door"},
            "rd_421": {x:2738, z:597, px:2468, py:563, type:"door", landmark:"Room 421 Class Room door"},
            "rd_422": {x:2765, z:273, px:2493, py:257, type:"door", landmark:"Room 422 Class Room door"},
            "rd_423": {x:3047, z:293, px:2747, py:276, type:"door", landmark:"Room 423 Switchgear & Protection Lab door"},
            "rd_424": {x:3054, z:595, px:2753, py:561, type:"door", landmark:"Room 424 Electrical Workshop & Hardware Lab door"},
            "rd_425": {x:3031, z:756, px:2732, py:712, type:"door", landmark:"Room 425 Electrical Department door"},
            "rd_426": {x:3045, z:1012, px:2745, py:954, type:"door", landmark:"Room 426 BEE Lab door"},
            "rd_427": {x:3047, z:1329, px:2747, py:1252, type:"door", landmark:"Room 427 Power Electronic & Network Theory Lab door"},
            "rd_428": {x:2762, z:1308, px:2490, py:1233, type:"door", landmark:"Room 428 Control System & Sensor Transducer Lab door"},
            "rd_429": {x:2763, z:1022, px:2491, py:963, type:"door", landmark:"Room 429 Class Room door"},
            "rd_409A": {x:222, z:268, px:200, py:253, type:"door", landmark:"Room 409(A) Class Room door"},
            "rd_409B": {x:371, z:156, px:334, py:147, type:"door", landmark:"Room 409(B) Staff Room door"},
            "rd_415_416": {x:1278, z:186, px:1152, py:175, type:"door", landmark:"Room 415 & 416 Washrooms door"},

            // === STRAIGHT GREEN CORRIDOR LINE & JUNCTION NODES (from img4.jpg) ===
            "cp_left_top": {x:377, z:156, px:340, py:147, type:"corridor", landmark:"Left corridor north end (409B)"},
            "cp_j_top_left": {x:377, z:649, px:340, py:612, type:"corridor", landmark:"Top-Left corridor junction"},
            "cp_j_bot_left": {x:377, z:1004, px:340, py:946, type:"corridor", landmark:"Bottom-Left corridor junction"},
            "cp_left_bot": {x:377, z:1454, px:340, py:1370, type:"corridor", landmark:"Left corridor south end (404)"},
            "cp_midlab_left": {x:377, z:393, px:340, py:370, type:"corridor", landmark:"Labs 410-413 west hallway junction"},
            "cp_midlab_right": {x:1056, z:393, px:952, py:370, type:"corridor", landmark:"Labs 410-413 east hallway junction"},
            "cp_j_top_wash": {x:1056, z:649, px:952, py:612, type:"corridor", landmark:"Top-Washroom corridor junction"},
            "cp_j_top_east": {x:2224, z:649, px:2005, py:612, type:"corridor", landmark:"Top-East corridor junction (420)"},
            "cp_wash_top": {x:1056, z:121, px:952, py:114, type:"corridor", landmark:"Girls Washroom corridor entrance (414)"},
            "cp_j_bot_wash": {x:1056, z:1004, px:952, py:946, type:"corridor", landmark:"Bottom-Washroom corridor junction"},
            "cp_j_bridge_east": {x:2224, z:809, px:2005, py:762, type:"corridor", landmark:"East courtyard & bridge junction"},
            "cp_j_bot_east": {x:2224, z:1004, px:2005, py:946, type:"corridor", landmark:"Bottom-East courtyard junction"},
            "cp_j_bridge_rw": {x:2913, z:809, px:2626, py:762, type:"corridor", landmark:"Right Wing & bridge junction"},
            "cp_rw_top": {x:2913, z:273, px:2626, py:257, type:"corridor", landmark:"Right wing north end (422/423)"},
            "cp_rw_bot": {x:2913, z:1410, px:2626, py:1329, type:"corridor", landmark:"Right wing south end (427/428)"},
            "cp_proj_rd_401": {x:854, z:1004, px:770, py:946, type:"corridor", landmark:"Corridor outside Room 401 Dr. Vijay Bhatkar Seminar Hall door"},
            "cp_proj_rd_402": {x:684, z:1004, px:617, py:946, type:"corridor", landmark:"Corridor outside Room 402 Wireless Communication & Computing Lab door"},
            "cp_proj_rd_403": {x:377, z:1387, px:340, py:1307, type:"corridor", landmark:"Corridor outside Room 403 Smart Room door"},
            "cp_proj_rd_404": {x:377, z:1368, px:340, py:1289, type:"corridor", landmark:"Corridor outside Room 404 Class Room door"},
            "cp_proj_rd_405": {x:377, z:1234, px:340, py:1163, type:"corridor", landmark:"Corridor outside Room 405 Operating System Lab door"},
            "cp_proj_rd_406": {x:377, z:878, px:340, py:827, type:"corridor", landmark:"Corridor outside Room 406 Digital & Microcontroller Lab door"},
            "cp_proj_rd_407": {x:377, z:643, px:340, py:606, type:"corridor", landmark:"Corridor outside Room 407 Department of CSE & IT door"},
            "cp_proj_rd_408": {x:377, z:492, px:340, py:464, type:"corridor", landmark:"Corridor outside Room 408 DMS Lab door"},
            "cp_proj_rd_410": {x:490, z:393, px:442, py:370, type:"corridor", landmark:"Corridor outside Room 410 Class Room door"},
            "cp_proj_rd_411": {x:540, z:649, px:487, py:612, type:"corridor", landmark:"Corridor outside Room 411 Project Lab door"},
            "cp_proj_rd_412": {x:923, z:649, px:832, py:612, type:"corridor", landmark:"Corridor outside Room 412 Web Technology & DSA Lab door"},
            "cp_proj_rd_413": {x:904, z:393, px:815, py:370, type:"corridor", landmark:"Corridor outside Room 413 Computer Network Lab door"},
            "cp_proj_rd_414": {x:1056, z:121, px:952, py:114, type:"corridor", landmark:"Corridor outside Room 414 Girls Washroom door"},
            "cp_proj_rd_417": {x:1317, z:649, px:1187, py:612, type:"corridor", landmark:"Corridor outside Room 417 Department of CSE & Electrical Diploma door"},
            "cp_proj_rd_418": {x:1737, z:649, px:1566, py:612, type:"corridor", landmark:"Corridor outside Room 418 Music Room door"},
            "cp_proj_rd_419": {x:1978, z:649, px:1783, py:612, type:"corridor", landmark:"Corridor outside Room 419 Girls Common Room door"},
            "cp_proj_rd_420": {x:2237, z:649, px:2017, py:612, type:"corridor", landmark:"Corridor outside Room 420 Teacher Staff Room door"},
            "cp_proj_rd_421": {x:2913, z:597, px:2626, py:563, type:"corridor", landmark:"Corridor outside Room 421 Class Room door"},
            "cp_proj_rd_422": {x:2913, z:273, px:2626, py:257, type:"corridor", landmark:"Corridor outside Room 422 Class Room door"},
            "cp_proj_rd_423": {x:2913, z:293, px:2626, py:276, type:"corridor", landmark:"Corridor outside Room 423 Switchgear & Protection Lab door"},
            "cp_proj_rd_424": {x:2913, z:595, px:2626, py:561, type:"corridor", landmark:"Corridor outside Room 424 Electrical Workshop & Hardware Lab door"},
            "cp_proj_rd_425": {x:2913, z:756, px:2626, py:712, type:"corridor", landmark:"Corridor outside Room 425 Electrical Department door"},
            "cp_proj_rd_426": {x:2913, z:1012, px:2626, py:954, type:"corridor", landmark:"Corridor outside Room 426 BEE Lab door"},
            "cp_proj_rd_427": {x:2913, z:1329, px:2626, py:1252, type:"corridor", landmark:"Corridor outside Room 427 Power Electronic & Network Theory Lab door"},
            "cp_proj_rd_428": {x:2913, z:1308, px:2626, py:1233, type:"corridor", landmark:"Corridor outside Room 428 Control System & Sensor Transducer Lab door"},
            "cp_proj_rd_429": {x:2913, z:1022, px:2626, py:963, type:"corridor", landmark:"Corridor outside Room 429 Class Room door"},
            "cp_proj_rd_409A": {x:377, z:268, px:340, py:253, type:"corridor", landmark:"Corridor outside Room 409(A) Class Room door"},
            "cp_proj_rd_409B": {x:371, z:649, px:334, py:612, type:"corridor", landmark:"Corridor outside Room 409(B) Staff Room door"},
            "cp_proj_rd_415_416": {x:1056, z:186, px:952, py:175, type:"corridor", landmark:"Corridor outside Room 415 & 416 Washrooms door"},
        },
        graphEdges: [
            // Straight corridor lines
            ["cp_left_top", "cp_proj_rd_409A"],
            ["cp_proj_rd_409A", "cp_midlab_left"],
            ["cp_midlab_left", "cp_proj_rd_408"],
            ["cp_proj_rd_408", "cp_proj_rd_407"],
            ["cp_proj_rd_407", "cp_j_top_left"],
            ["cp_j_top_left", "cp_proj_rd_406"],
            ["cp_proj_rd_406", "cp_j_bot_left"],
            ["cp_j_bot_left", "cp_proj_rd_405"],
            ["cp_proj_rd_405", "cp_proj_rd_404"],
            ["cp_proj_rd_404", "cp_proj_rd_403"],
            ["cp_proj_rd_403", "cp_left_bot"],
            ["cp_midlab_left", "cp_proj_rd_410"],
            ["cp_proj_rd_410", "cp_proj_rd_413"],
            ["cp_proj_rd_413", "cp_midlab_right"],
            ["cp_proj_rd_409B", "cp_j_top_left"],
            ["cp_j_top_left", "cp_proj_rd_411"],
            ["cp_proj_rd_411", "cp_proj_rd_412"],
            ["cp_proj_rd_412", "cp_j_top_wash"],
            ["cp_j_top_wash", "cp_proj_rd_417"],
            ["cp_proj_rd_417", "cp_proj_rd_418"],
            ["cp_proj_rd_418", "cp_proj_rd_419"],
            ["cp_proj_rd_419", "cp_j_top_east"],
            ["cp_j_top_east", "cp_proj_rd_420"],
            ["cp_wash_top", "cp_proj_rd_414"],
            ["cp_proj_rd_414", "cp_proj_rd_415_416"],
            ["cp_proj_rd_415_416", "cp_midlab_right"],
            ["cp_midlab_right", "cp_j_top_wash"],
            ["cp_j_top_wash", "cp_j_bot_wash"],
            ["cp_j_top_east", "cp_j_bridge_east"],
            ["cp_j_bridge_east", "cp_j_bot_east"],
            ["cp_j_bridge_east", "cp_j_bridge_rw"],
            ["cp_rw_top", "cp_proj_rd_422"],
            ["cp_proj_rd_422", "cp_proj_rd_423"],
            ["cp_proj_rd_423", "cp_proj_rd_424"],
            ["cp_proj_rd_424", "cp_proj_rd_421"],
            ["cp_proj_rd_421", "cp_proj_rd_425"],
            ["cp_proj_rd_425", "cp_j_bridge_rw"],
            ["cp_j_bridge_rw", "cp_proj_rd_426"],
            ["cp_proj_rd_426", "cp_proj_rd_429"],
            ["cp_proj_rd_429", "cp_proj_rd_428"],
            ["cp_proj_rd_428", "cp_proj_rd_427"],
            ["cp_proj_rd_427", "cp_rw_bot"],
            ["cp_j_bot_left", "cp_proj_rd_402"],
            ["cp_proj_rd_402", "cp_proj_rd_401"],
            ["cp_proj_rd_401", "cp_j_bot_wash"],
            ["cp_j_bot_wash", "cp_j_bot_east"],

            // Red Door to Straight Corridor links
            ["rd_401", "cp_proj_rd_401"],
            ["rd_402", "cp_proj_rd_402"],
            ["rd_403", "cp_proj_rd_403"],
            ["rd_404", "cp_proj_rd_404"],
            ["rd_405", "cp_proj_rd_405"],
            ["rd_406", "cp_proj_rd_406"],
            ["rd_407", "cp_proj_rd_407"],
            ["rd_408", "cp_proj_rd_408"],
            ["rd_410", "cp_proj_rd_410"],
            ["rd_411", "cp_proj_rd_411"],
            ["rd_412", "cp_proj_rd_412"],
            ["rd_413", "cp_proj_rd_413"],
            ["rd_414", "cp_proj_rd_414"],
            ["rd_417", "cp_proj_rd_417"],
            ["rd_418", "cp_proj_rd_418"],
            ["rd_419", "cp_proj_rd_419"],
            ["rd_420", "cp_proj_rd_420"],
            ["rd_421", "cp_proj_rd_421"],
            ["rd_422", "cp_proj_rd_422"],
            ["rd_423", "cp_proj_rd_423"],
            ["rd_424", "cp_proj_rd_424"],
            ["rd_425", "cp_proj_rd_425"],
            ["rd_426", "cp_proj_rd_426"],
            ["rd_427", "cp_proj_rd_427"],
            ["rd_428", "cp_proj_rd_428"],
            ["rd_429", "cp_proj_rd_429"],
            ["rd_409A", "cp_proj_rd_409A"],
            ["rd_409B", "cp_proj_rd_409B"],
            ["rd_415_416", "cp_proj_rd_415_416"],
        ],
        roomToNode: {
            "401": "rd_401",
            "402": "rd_402",
            "403": "rd_403",
            "404": "rd_404",
            "405": "rd_405",
            "406": "rd_406",
            "407": "rd_407",
            "408": "rd_408",
            "410": "rd_410",
            "411": "rd_411",
            "412": "rd_412",
            "413": "rd_413",
            "414": "rd_414",
            "417": "rd_417",
            "418": "rd_418",
            "419": "rd_419",
            "420": "rd_420",
            "421": "rd_421",
            "422": "rd_422",
            "423": "rd_423",
            "424": "rd_424",
            "425": "rd_425",
            "426": "rd_426",
            "427": "rd_427",
            "428": "rd_428",
            "429": "rd_429",
            "409A": "rd_409A",
            "409B": "rd_409B",
            "415_416": "rd_415_416",
        }
    }
};

const CATEGORY_COLORS = {
    "class": 0xa855f7,    // Purple-500
    "lab": 0x06b6d4,      // Cyan-500
    "dept": 0x2563eb,     // Blue-600
    "staff": 0xeab308,    // Yellow-500
    "seminar": 0x3b82f6,  // Blue-500
    "special": 0xef4444,  // Red-500
    "utility": 0x94a3b8   // Slate-400
};

// ==========================================
// 2. STATE & THREE.JS VARIABLES
// ==========================================

let currentFloor = 1;
let currentViewMode = '2d'; // Default mode is 2D Top View
let currentCategoryFilter = 'all';

let scene, camera, renderer, controls;
let currentModel = null;
let planMesh2D = null;
let roomMeshes = [];
let wallMeshes = [];
let routeLine = null;
let startMarker = null;
let destMarker = null;
let routeGroup = null;
let categoryPinsGroup = null;
let selectionPinGroup = null;
let startDestPinsGroup = null;
let activeRouteCurve = null;
let pulseMarkers = [];
let airportTrackTexture = null;
let airportRadarRings = [];

function createAirportTrackTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 512, 128);

    // Glowing Neon Cyan Rail Borders (Top & Bottom runway edges)
    ctx.fillStyle = 'rgba(56, 189, 248, 0.95)';
    ctx.fillRect(0, 8, 512, 8);
    ctx.fillRect(0, 112, 512, 8);

    // Soft runway track lane fill
    const grad = ctx.createLinearGradient(0, 16, 0, 112);
    grad.addColorStop(0, 'rgba(37, 99, 235, 0.35)');
    grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.55)');
    grad.addColorStop(1, 'rgba(37, 99, 235, 0.35)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 16, 512, 96);

    // Sequential Airport Chevron Flow Glyphs (>>> >>> >>>)
    for (let x = 32; x < 512; x += 64) {
        // Outer cyan chevron
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(x + 24, 64);      // Arrow front tip
        ctx.lineTo(x - 12, 28);      // Top wing
        ctx.lineTo(x - 2, 64);       // Inner notch
        ctx.lineTo(x - 12, 100);     // Bottom wing
        ctx.closePath();
        ctx.fill();

        // Inner bright white core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(x + 18, 64);
        ctx.lineTo(x - 6, 38);
        ctx.lineTo(x + 3, 64);
        ctx.lineTo(x - 6, 90);
        ctx.closePath();
        ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
}

const originalMaterials = new Map();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let currentSelectedRoomId = null;

// UI Cache
let popupElement, popupRoomBadge, popupRoomName, popupRoomDesc, popupRoomFloor;
let headerFloorIndicator, activeFloorBadgeText, floatFloorIndicator;
let startSelect, destSelect, globalInput, globalResults, globalClear;
let floorModal, modalTitle, modalMessage, modalCloseBtn, sidebarToggleBtn, sidebar;
let mode2dBtn, mode3dBtn;

// ==========================================
// 3. INITIALIZATION
// ==========================================

function init() {
    const container = document.getElementById('canvas-container');
    popupElement = document.getElementById('room-popup');
    popupRoomBadge = document.getElementById('popup-room-badge');
    popupRoomName = document.getElementById('popup-room-name');
    popupRoomDesc = document.getElementById('popup-room-desc');
    popupRoomFloor = document.getElementById('popup-room-floor');
    
    headerFloorIndicator = document.getElementById('header-floor-indicator');
    activeFloorBadgeText = document.getElementById('active-floor-badge-text');
    floatFloorIndicator = document.getElementById('float-floor-indicator');

    startSelect = document.getElementById('start-select');
    destSelect = document.getElementById('dest-select');
    globalInput = document.getElementById('global-search-input');
    globalResults = document.getElementById('global-search-results');
    globalClear = document.getElementById('global-search-clear');

    floorModal = document.getElementById('floor-modal');
    modalTitle = document.getElementById('modal-title');
    modalMessage = document.getElementById('modal-message');
    modalCloseBtn = document.getElementById('modal-close-btn');

    sidebar = document.getElementById('sidebar');
    sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    
    mode2dBtn = document.getElementById('mode-2d-btn');
    mode3dBtn = document.getElementById('mode-3d-btn');

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Matching Tailwind Slate-50

    categoryPinsGroup = new THREE.Group();
    scene.add(categoryPinsGroup);

    selectionPinGroup = new THREE.Group();
    scene.add(selectionPinGroup);

    startDestPinsGroup = new THREE.Group();
    scene.add(startDestPinsGroup);

    routeGroup = new THREE.Group();
    scene.add(routeGroup);

    // Initial camera starts directly in 2D Top View looking straight down
    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 12000);
    camera.position.set(0, 3600, 1);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 0, 0);
    controls.minDistance = 300;
    controls.maxDistance = 6500;

    // In 2D Top View: Lock rotation, allow smooth pan & zoom
    controls.enableRotate = false;
    controls.maxPolarAngle = 0.05;
    controls.minPolarAngle = 0;

    // Architectural daylight lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 1.2);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight1.position.set(2200, 3200, 1800);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.45);
    dirLight2.position.set(-2200, 3200, -1800);
    scene.add(dirLight2);

    setupUI();
    const urlParams = new URLSearchParams(window.location.search);
    const initialFloor = parseInt(urlParams.get('floor') || '1', 10);
    loadFloor(initialFloor);

    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CHANGE_FLOOR') {
            loadFloor(Number(event.data.floor));
        }
    });

    window.addEventListener('resize', onWindowResize);
    container.addEventListener('click', onCanvasClick);

    animate();
}

// ==========================================
// 4. VIEW MODE TOGGLE (2D TOP VIEW ⇄ 3D ISOMETRIC)
// ==========================================

function setViewMode(mode) {
    if (currentViewMode === mode) return;
    currentViewMode = mode;

    if (mode2dBtn && mode3dBtn) {
        mode2dBtn.classList.toggle('active', mode === '2d');
        mode3dBtn.classList.toggle('active', mode === '3d');
    }

    // Apply visibility of 3D vertical walls vs 2D flat plan
    updateWallVisibilityForMode(mode);

    if (mode === '2d') {
        // Smoothly animate back to 2D Top-Down View
        animateCameraTo(
            new THREE.Vector3(0, 3600, 1),
            new THREE.Vector3(0, 0, 0),
            500,
            () => {
                controls.enableRotate = false;
                controls.maxPolarAngle = 0.05;
                controls.minPolarAngle = 0;
            }
        );
    } else {
        // Unlock 3D rotation & orbital exploration
        controls.enableRotate = true;
        controls.maxPolarAngle = Math.PI / 2 - 0.05;
        controls.minPolarAngle = 0;
        
        // Perform a smooth 360° overview sweep and settle centered in Top View
        animate360Preview();
    }
}

function animate360Preview(onComplete = null) {
    const duration = 1400; // 1.4s smooth 360 orbital preview
    const startTime = performance.now();
    const radius = 2400;
    const startY = 2000;
    const endY = 3600;
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easeOutCubic transition
        const ease = 1 - Math.pow(1 - progress, 3);

        const angle = ease * Math.PI * 2; // Full 360° rotation
        const currentHeight = THREE.MathUtils.lerp(startY, endY, ease);
        const currentRadius = THREE.MathUtils.lerp(radius, 1, ease);

        camera.position.x = Math.sin(angle) * currentRadius;
        camera.position.y = currentHeight;
        camera.position.z = Math.cos(angle) * currentRadius;
        
        controls.target.copy(targetLookAt);
        controls.update();

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            // Settle precisely centered in Top View
            camera.position.set(0, 3600, 1);
            controls.target.set(0, 0, 0);
            controls.update();
            if (onComplete) onComplete();
        }
    }
    requestAnimationFrame(step);
}

function updateWallVisibilityForMode(mode) {
    // In 2D mode, hide vertical 3D walls so left and right room names are 100% visible and unblocked
    const is3D = (mode === '3d');
    wallMeshes.forEach(mesh => {
        mesh.visible = is3D;
    });

    if (planMesh2D) {
        planMesh2D.visible = !is3D;
    }

    if (routeGroup) {
        routeGroup.position.y = is3D ? 4.0 : 0.0;
    }

    // Refresh active category filter for newly toggled mode
    filterRooms(currentCategoryFilter);
}

function animateCameraTo(targetPos, targetLookAt, duration = 500, onComplete = null) {
    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth easeInOutCubic curve
        const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        camera.position.lerpVectors(startPos, targetPos, ease);
        controls.target.lerpVectors(startTarget, targetLookAt, ease);
        controls.update();

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            if (onComplete) onComplete();
        }
    }
    requestAnimationFrame(step);
}

// ==========================================
// 5. MULTI-FLOOR LOADER
// ==========================================

function loadFloor(floorNum) {
    const config = FLOOR_CONFIGS[floorNum];
    if (!config) {
        showUnbuiltFloorModal(floorNum);
        return;
    }

    currentFloor = floorNum;

    // Show loading overlay
    const overlay = document.getElementById('loading-overlay');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = '0%';
    progressText.innerText = 'Loading campus map... 0%';
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';

    // Clear previous model, routes & state
    clearRoute();
    hidePopupAndResetMap();

    if (currentModel) {
        scene.remove(currentModel);
        currentModel = null;
    }
    if (planMesh2D) {
        scene.remove(planMesh2D);
        planMesh2D = null;
    }
    roomMeshes = [];
    wallMeshes = [];
    originalMaterials.clear();

    // Update Header & Badge indicators
    headerFloorIndicator.innerText = `${config.name}`;
    activeFloorBadgeText.innerText = config.name;
    floatFloorIndicator.innerText = config.shortName;

    // Update active dropdown item states
    document.querySelectorAll('.floor-dropdown-menu a').forEach(a => {
        a.classList.remove('active');
        if (a.dataset.floor === floorNum.toString()) a.classList.add('active');
    });

    // Populate Sidebar Dropdowns for this floor
    populateDropdowns(config.rooms);

    // Create 2D Architectural Plan Mesh if planImage is configured
    if (config.planImage && config.planSize) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(config.planImage, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            const planGeo = new THREE.PlaneGeometry(config.planSize.width, config.planSize.depth);
            const planMat = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide
            });
            planMesh2D = new THREE.Mesh(planGeo, planMat);
            planMesh2D.rotation.x = -Math.PI / 2;
            planMesh2D.position.set(0, 0.2, 0);
            planMesh2D.visible = (currentViewMode === '2d');
            scene.add(planMesh2D);
        });
    }

    // Load Materials & 3D OBJ
    const manager = new THREE.LoadingManager();
    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        const percent = Math.floor((itemsLoaded / itemsTotal) * 100);
        progressBar.style.width = percent + '%';
        progressText.innerText = `Loading campus map... ${percent}%`;
    };

    manager.onLoad = function () {
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.visibility = 'hidden', 350);
        }, 300);
    };

    const mtlLoader = new MTLLoader(manager);
    mtlLoader.setPath(config.folder);
    mtlLoader.load(config.mtlFile, function (materials) {
        materials.preload();
        
        const objLoader = new OBJLoader(manager);
        objLoader.setMaterials(materials);
        objLoader.setPath(config.folder);
        objLoader.load(config.objFile, function (object) {
            currentModel = object;
            
            // Center floor model automatically
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            object.position.x = -center.x;
            object.position.y = -center.y;
            object.position.z = -center.z;
            
            // Process floor polygons and label text meshes with strict depth layering
            object.traverse((child) => {
                if (child.isMesh) {
                    const nameLower = child.name.toLowerCase();
                    const parentLower = child.parent ? child.parent.name.toLowerCase() : '';
                    const isLabel = nameLower.includes('label') || parentLower.includes('label');
                    const isFloor = nameLower.includes('room_') || parentLower.includes('room_');
                    const isGround = nameLower.includes('ground_') || parentLower.includes('ground_');
                    const isWall = nameLower.includes('wall_') || parentLower.includes('wall_');

                    if (isWall) {
                        wallMeshes.push(child);
                        child.visible = (currentViewMode === '3d');
                    }

                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                        child.material.shadowSide = THREE.DoubleSide;
                        child.material = child.material.clone();
                        originalMaterials.set(child, child.material.clone());
                    }

                    // Local geometry center in original OBJ coordinates
                    let geomCenter = new THREE.Vector3();
                    if (child.geometry) {
                        if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();
                        child.geometry.boundingBox.getCenter(geomCenter);
                    }

                    // Anti-Flicker & Layering
                    if (isGround) {
                        child.position.y = -2.0;
                    } else if (nameLower.includes('room_160_772')) {
                        child.position.y = -0.5;
                    } else if (isFloor) {
                        if (child.geometry && child.geometry.boundingBox.min.y > 150) {
                            child.visible = false; // Hide top ceiling mesh
                        } else {
                            child.position.y = 0.4;
                            if (child.material) {
                                child.material.transparent = false;
                                child.material.opacity = 1.0;
                                child.material.polygonOffset = true;
                                child.material.polygonOffsetFactor = 1;
                                child.material.polygonOffsetUnits = 1;
                            }
                        }

                        // Calculate mesh dimensions in cm
                        let geomSize = new THREE.Vector3();
                        if (child.geometry && child.geometry.boundingBox) {
                            child.geometry.boundingBox.getSize(geomSize);
                        }

                        // Open hallway/atrium corridor floor meshes (>1400cm width/depth or sh3d atrium ids)
                        const isHallway = geomSize.x > 1400 || geomSize.z > 1000 || nameLower.includes('room_123_590') || nameLower.includes('room_160_772');

                        if (!isHallway) {
                            // Associate floor mesh with closest room within realistic room radius (< 450cm)
                            let closestRoom = null;
                            let minDist = Infinity;
                            config.rooms.forEach(r => {
                                // Lifts and open atrium are lobby points, not enclosed room floor meshes
                                if (r.id === 'lift1' || r.id === 'lift2' || r.id === 'atrium') return;
                                const pos = config.roomCoords[r.id];
                                if (pos) {
                                    const dist = Math.hypot(geomCenter.x - pos.x, geomCenter.z - pos.z);
                                    if (dist < minDist && dist < 450) {
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
                    } else if (isLabel) {
                        child.material.transparent = true;
                        child.material.alphaTest = 0.05;
                        child.material.depthWrite = false;
                        child.material.polygonOffset = true;
                        child.material.polygonOffsetFactor = -4;
                        child.material.polygonOffsetUnits = -4;
                        child.renderOrder = (currentViewMode === '2d') ? 80 : 50;
                        child.position.y = (currentViewMode === '2d') ? 1.8 : 0.6;
                        
                        if (child.geometry) {
                            const b = child.geometry.boundingBox;
                            if (b.min.y > 5.0) {
                                child.geometry.translate(0, -b.min.y + 1.2, 0);
                            } else {
                                child.geometry.translate(0, 1.2, 0);
                            }
                        }

                        const matchedRoom = config.rooms.find(r => {
                            const lg = r.labelGroup.toLowerCase();
                            return nameLower.includes(lg) || parentLower.includes(lg);
                        });
                        if (matchedRoom) {
                            child.userData.roomId = matchedRoom.id;
                            child.userData.category = matchedRoom.category;
                            child.userData.isLabel = true;
                            roomMeshes.push(child);
                        }
                    }
                }
            });

            scene.add(object);
            
            // Set view according to current mode
            if (currentViewMode === '2d') {
                camera.position.set(0, 3600, 1);
                controls.target.set(0, 0, 0);
                controls.enableRotate = false;
            } else {
                camera.position.set(0, 2400, 2000);
                controls.target.set(0, 0, 0);
                controls.enableRotate = true;
            }
            controls.update();
            updateWallVisibilityForMode(currentViewMode);
        });
    });
}

function showUnbuiltFloorModal(floorNum) {
    modalTitle.innerText = `${floorNum}th Floor Not Available`;
    modalMessage.innerText = `The 3D indoor map for ${floorNum}${floorNum === 2 ? 'nd' : floorNum === 3 ? 'rd' : 'th'} Floor is currently under development. Please choose 1st Floor or 4th Floor to navigate.`;
    floorModal.style.display = 'flex';
}

function populateDropdowns(rooms) {
    startSelect.innerHTML = '<option value="">Choose start location</option>';
    destSelect.innerHTML = '<option value="">Choose destination</option>';

    // Sort rooms in natural sequential order (101, 102, 103A, 103B ... followed by named utilities/lifts)
    const sortedRooms = [...rooms].sort((a, b) => {
        const numA = parseInt(a.id, 10);
        const numB = parseInt(b.id, 10);

        const aIsNum = !isNaN(numA);
        const bIsNum = !isNaN(numB);

        if (aIsNum && bIsNum) {
            if (numA !== numB) return numA - numB;
            return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
        }
        if (aIsNum && !bIsNum) return -1;
        if (!aIsNum && bIsNum) return 1;
        return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
    });

    sortedRooms.forEach(room => {
        const opt = new Option(`${room.id} – ${room.name}`, room.id);
        startSelect.add(opt.cloneNode(true));
        destSelect.add(opt);
    });
}

// ==========================================
// 6. ANIMATION & RAYCASTING
// ==========================================

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    updatePopupPosition();

    // Pulse animation on Start & Destination markers
    if (startMarker && destMarker) {
        const pulse = 1.0 + 0.18 * Math.sin(performance.now() * 0.006);
        startMarker.scale.set(pulse, pulse, pulse);
        destMarker.scale.set(pulse, pulse, pulse);
    }

    // Pulse animation on Start (Green) & Destination (Red) pin dots
    if (startDestPinsGroup && startDestPinsGroup.children.length > 0) {
        const pulse = 1.0 + 0.16 * Math.sin(performance.now() * 0.006);
        startDestPinsGroup.children.forEach(c => {
            if (c.isMesh && c.geometry.type === 'SphereGeometry') {
                c.scale.set(pulse, pulse, pulse);
            }
        });
    }

    // Pulse animation on Selection (Blue) pin dot
    if (selectionPinGroup && selectionPinGroup.children.length > 0) {
        const pulse = 1.0 + 0.18 * Math.sin(performance.now() * 0.007);
        selectionPinGroup.children.forEach(c => {
            if (c.isMesh && c.geometry.type === 'SphereGeometry') {
                c.scale.set(pulse, pulse, pulse);
            }
        });
    }

    // Pulse animation on Category Pin Badges
    if (categoryPinsGroup && categoryPinsGroup.children.length > 0) {
        const pulse = 1.0 + 0.12 * Math.sin(performance.now() * 0.005);
        categoryPinsGroup.children.forEach(group => {
            group.scale.set(pulse, pulse, pulse);
        });
    }

    // 1. Continuous Airport Direction Track Conveyor Animation
    if (airportTrackTexture) {
        airportTrackTexture.offset.x -= 0.007; // Smooth 60fps moving airport track
    }

    // 2. Airport Departure & Arrival Radar Waves Expansion
    if (airportRadarRings.length > 0) {
        const now = performance.now() * 0.0011;
        airportRadarRings.forEach(ring => {
            const progress = (now + ring.userData.offset) % 1.0;
            const scale = 1.0 + progress * 1.75;
            ring.scale.set(scale, scale, scale);
            if (ring.material) {
                ring.material.opacity = Math.max(0, 0.85 * (1.0 - progress));
            }
        });
    }

    // 3. Smooth moving directional chevron arrows flowing along the route from Start to Destination
    if (activeRouteCurve && pulseMarkers.length > 0) {
        const time = performance.now() * 0.00028; // Steady walking pace
        const numMarkers = pulseMarkers.length;

        pulseMarkers.forEach((pm, idx) => {
            const t = (time + idx / numMarkers) % 1.0;
            const pt = activeRouteCurve.getPointAt(t);
            if (pt) {
                pm.position.set(pt.x, pt.y + 4.5, pt.z);

                // Compute forward tangent direction along straight segment
                const deltaT = 0.005;
                const tNext = Math.min(t + deltaT, 1.0);
                const tPrev = Math.max(t - deltaT, 0.0);
                const ptNext = activeRouteCurve.getPointAt(tNext);
                const ptPrev = activeRouteCurve.getPointAt(tPrev);

                if (ptNext && ptPrev) {
                    const dirX = ptNext.x - ptPrev.x;
                    const dirZ = ptNext.z - ptPrev.z;
                    if (Math.hypot(dirX, dirZ) > 0.001) {
                        const angle = Math.atan2(dirX, dirZ);
                        pm.rotation.set(0, angle, 0);
                    }
                }
            }
        });
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    if (!container || !renderer || !camera) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function updatePopupPosition() {
    if (!currentSelectedRoomId || !popupElement || popupElement.style.display === 'none') return;
    const roomPos = getRoomPos(currentSelectedRoomId);
    if (!roomPos || !currentModel) return;
    
    const worldPos = roomPos.clone().add(currentModel.position);
    worldPos.project(camera);
    
    const container = document.getElementById('canvas-container');
    const x = (worldPos.x * 0.5 + 0.5) * container.clientWidth;
    const y = (-(worldPos.y * 0.5) + 0.5) * container.clientHeight;
    
    popupElement.style.left = `${x}px`;
    popupElement.style.top = `${y}px`;
}

function onCanvasClick(event) {
    if (!currentModel) return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const targets = [...roomMeshes];
    if (planMesh2D && planMesh2D.visible) targets.push(planMesh2D);
    if (categoryPinsGroup) {
        categoryPinsGroup.traverse(child => { if (child.isMesh) targets.push(child); });
    }

    const intersects = raycaster.intersectObjects(targets, true);

    if (intersects.length > 0) {
        let hitRoomId = null;
        for (let hit of intersects) {
            if (hit.object.userData && hit.object.userData.roomId) {
                hitRoomId = hit.object.userData.roomId;
                break;
            }
            if (hit.object.parent && hit.object.parent.userData && hit.object.parent.userData.roomId) {
                hitRoomId = hit.object.parent.userData.roomId;
                break;
            }
            // If clicked on 2D floor plan plane, detect closest room
            if (hit.object === planMesh2D) {
                const clickWorld = hit.point;
                const config = FLOOR_CONFIGS[currentFloor];
                let closest = null;
                let minDist = 220; // 2.2m radius threshold
                config.rooms.forEach(r => {
                    const pos = config.roomCoords[r.id];
                    if (pos) {
                        const worldX = pos.x + currentModel.position.x;
                        const worldZ = pos.z + currentModel.position.z;
                        const d = Math.hypot(clickWorld.x - worldX, clickWorld.z - worldZ);
                        if (d < minDist) {
                            minDist = d;
                            closest = r.id;
                        }
                    }
                });
                if (closest) {
                    hitRoomId = closest;
                    break;
                }
            }
        }
        if (hitRoomId) {
            selectRoom(hitRoomId);
        } else {
            if (!event.target.closest('.room-popup') && !event.target.closest('.header-search-container') && !event.target.closest('.floor-dropdown-menu') && !event.target.closest('#floor-modal') && !event.target.closest('.sidebar')) {
                hidePopupAndResetMap();
            }
        }
    } else {
        if (!event.target.closest('.room-popup') && !event.target.closest('.header-search-container') && !event.target.closest('.floor-dropdown-menu') && !event.target.closest('#floor-modal') && !event.target.closest('.sidebar')) {
            hidePopupAndResetMap();
        }
    }
}

function selectRoom(roomId) {
    const config = FLOOR_CONFIGS[currentFloor];
    currentSelectedRoomId = roomId;
    const room = config.rooms.find(r => r.id === roomId);
    if (!room) return;

    popupRoomBadge.innerText = room.category.toUpperCase();
    popupRoomName.innerText = `Room ${room.id}`;
    popupRoomDesc.innerText = room.name;
    popupRoomFloor.innerText = `Block A, ${config.name}`;
    popupElement.style.display = 'block';
    
    // Spawn / update 🔵 Blue selection pin dot
    updateSelectionPin(roomId);

    // Highlight room floor & text
    roomMeshes.forEach(mesh => {
        if (mesh.userData.roomId === roomId) {
            if (mesh.material) {
                if (mesh.userData.isFloor) {
                    mesh.material.transparent = false;
                    mesh.material.opacity = 1.0;
                    mesh.material.color.setHex(0x10b981); // Crisp Emerald Highlight
                    mesh.material.emissive.setHex(0x064e3b);
                } else if (mesh.userData.isLabel) {
                    mesh.material.transparent = true;
                    mesh.material.opacity = 1.0;
                    mesh.material.emissive.setHex(0x000000);
                    mesh.renderOrder = 90;
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

    // Zoom camera towards selected room smoothly
    const roomPos = getRoomPos(roomId);
    if (roomPos && currentModel) {
        const targetWorld = roomPos.clone().add(currentModel.position);
        if (currentViewMode === '2d') {
            animateCameraTo(
                new THREE.Vector3(targetWorld.x, 1800, targetWorld.z + 1),
                targetWorld,
                450
            );
        } else {
            animateCameraTo(
                new THREE.Vector3(targetWorld.x, targetWorld.y + 750, targetWorld.z + 550),
                targetWorld,
                450
            );
        }
    }
}

function updateSelectionPin(roomId) {
    if (!selectionPinGroup) return;
    while (selectionPinGroup.children.length > 0) {
        selectionPinGroup.remove(selectionPinGroup.children[0]);
    }
    if (!roomId || !currentModel) return;
    const config = FLOOR_CONFIGS[currentFloor];
    const coord = config.roomCoords[roomId];
    if (!coord) return;

    const worldX = coord.x + currentModel.position.x;
    const worldZ = coord.z + currentModel.position.z;

    const pin = new THREE.Mesh(
        new THREE.SphereGeometry(15, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x2563eb, depthTest: false })
    );
    pin.position.set(worldX, 6.0, worldZ);
    pin.renderOrder = 960;
    selectionPinGroup.add(pin);

    const ring = new THREE.Mesh(
        new THREE.RingGeometry(18, 26, 32),
        new THREE.MeshBasicMaterial({
            color: 0x60a5fa,
            transparent: true,
            opacity: 0.85,
            side: THREE.DoubleSide,
            depthTest: false
        })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(worldX, 2.5, worldZ);
    ring.renderOrder = 959;
    selectionPinGroup.add(ring);
}

function updateStartDestPins() {
    if (!startDestPinsGroup) return;
    while (startDestPinsGroup.children.length > 0) {
        startDestPinsGroup.remove(startDestPinsGroup.children[0]);
    }
    if (!currentModel) return;
    const config = FLOOR_CONFIGS[currentFloor];

    // Start Pin (🟢 Emerald Green Pin Dot)
    if (startSelect.value) {
        const nodeKey = config.roomToNode ? config.roomToNode[startSelect.value] : null;
        const coord = (nodeKey && config.graphNodes[nodeKey]) ? config.graphNodes[nodeKey] : config.roomCoords[startSelect.value];
        if (coord) {
            const worldX = coord.x + currentModel.position.x;
            const worldZ = coord.z + currentModel.position.z;
            const startDot = new THREE.Mesh(
                new THREE.SphereGeometry(15, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0x10b981, depthTest: false })
            );
            startDot.position.set(worldX, 6.0, worldZ);
            startDot.renderOrder = 980;
            startDestPinsGroup.add(startDot);

            const ring = new THREE.Mesh(
                new THREE.RingGeometry(16, 24, 32),
                new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.75, side: THREE.DoubleSide, depthTest: false })
            );
            ring.rotation.x = -Math.PI / 2;
            ring.position.set(worldX, 2.5, worldZ);
            ring.renderOrder = 979;
            startDestPinsGroup.add(ring);
        }
    }

    // Destination Pin (🔴 Vibrant Red Pin Dot)
    if (destSelect.value) {
        const nodeKey = config.roomToNode ? config.roomToNode[destSelect.value] : null;
        const coord = (nodeKey && config.graphNodes[nodeKey]) ? config.graphNodes[nodeKey] : config.roomCoords[destSelect.value];
        if (coord) {
            const worldX = coord.x + currentModel.position.x;
            const worldZ = coord.z + currentModel.position.z;
            const destDot = new THREE.Mesh(
                new THREE.SphereGeometry(15, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0xef4444, depthTest: false })
            );
            destDot.position.set(worldX, 6.0, worldZ);
            destDot.renderOrder = 980;
            startDestPinsGroup.add(destDot);

            const ring = new THREE.Mesh(
                new THREE.RingGeometry(16, 24, 32),
                new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.75, side: THREE.DoubleSide, depthTest: false })
            );
            ring.rotation.x = -Math.PI / 2;
            ring.position.set(worldX, 2.5, worldZ);
            ring.renderOrder = 979;
            startDestPinsGroup.add(ring);
        }
    }
}

function hidePopupAndResetMap() {
    currentSelectedRoomId = null;
    popupElement.style.display = 'none';

    if (selectionPinGroup) {
        while (selectionPinGroup.children.length > 0) {
            selectionPinGroup.remove(selectionPinGroup.children[0]);
        }
    }

    // Reset category filter pills UI
    document.querySelectorAll('.filter-pill').forEach(b => {
        if (b.dataset.filter === 'all') b.classList.add('active');
        else b.classList.remove('active');
    });
    filterRooms('all');

    // Smoothly re-center camera to Top View
    animateCameraTo(new THREE.Vector3(0, 3600, 1), new THREE.Vector3(0, 0, 0), 450);

    if (globalInput) globalInput.value = '';
    if (globalClear) globalClear.style.display = 'none';
    if (globalResults) globalResults.style.display = 'none';
}

// ==========================================
// 7. UI CONTROLS & EVENT LISTENERS
// ==========================================

function setupUI() {
    // 2D / 3D Mode Toggle Buttons
    if (mode2dBtn) {
        mode2dBtn.addEventListener('click', () => setViewMode('2d'));
    }
    if (mode3dBtn) {
        mode3dBtn.addEventListener('click', () => setViewMode('3d'));
    }

    // Left Sidebar Toggle Button
    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            
            // Smoothly update 3D canvas viewport during slide animation
            let count = 0;
            const interval = setInterval(() => {
                onWindowResize();
                count++;
                if (count >= 16) clearInterval(interval);
            }, 20);
        });
    }

    // Start / Dest select change handlers to spawn Green/Red dots immediately
    startSelect.addEventListener('change', updateStartDestPins);
    destSelect.addEventListener('change', updateStartDestPins);

    document.getElementById('swap-btn').addEventListener('click', () => {
        const temp = startSelect.value;
        startSelect.value = destSelect.value;
        destSelect.value = temp;
        updateStartDestPins();
    });

    document.getElementById('find-route-btn').addEventListener('click', findRoute);
    document.getElementById('clear-route-btn').addEventListener('click', clearRoute);

    // Category Filter buttons
    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterRooms(e.target.dataset.filter);
        });
    });

    // Reset, Zoom In, Zoom Out
    document.getElementById('reset-view-btn').addEventListener('click', () => {
        hidePopupAndResetMap();
    });
    
    document.getElementById('zoom-in-btn').addEventListener('click', () => {
        if (currentViewMode === '2d') {
            camera.position.y = Math.max(camera.position.y * 0.72, 450);
        } else {
            camera.position.lerp(controls.target, 0.25);
        }
        controls.update();
    });
    
    document.getElementById('zoom-out-btn').addEventListener('click', () => {
        if (currentViewMode === '2d') {
            camera.position.y = Math.min(camera.position.y * 1.38, 6500);
        } else {
            const dir = camera.position.clone().sub(controls.target).normalize();
            camera.position.add(dir.multiplyScalar(300));
        }
        controls.update();
    });

    // Modal Close button
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            floorModal.style.display = 'none';
        });
    }

    // Room Tooltip actions
    document.getElementById('popup-close').addEventListener('click', hidePopupAndResetMap);
    
    document.getElementById('popup-set-start').addEventListener('click', () => {
        if (currentSelectedRoomId) {
            startSelect.value = currentSelectedRoomId;
            popupElement.style.display = 'none';
            updateStartDestPins();
        }
    });

    document.getElementById('popup-set-dest').addEventListener('click', () => {
        if (currentSelectedRoomId) {
            destSelect.value = currentSelectedRoomId;
            popupElement.style.display = 'none';
            updateStartDestPins();
            findRoute();
        }
    });

    // Floor Switcher Dropdowns (Header & Floating button)
    const headerFloorBtn = document.getElementById('header-floor-btn');
    const headerFloorMenu = document.getElementById('header-floor-menu');
    const floatFloorBtn = document.getElementById('floor-switcher-btn');
    const floatFloorDropdown = document.getElementById('floor-switcher-dropdown');

    headerFloorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        headerFloorMenu.style.display = headerFloorMenu.style.display === 'block' ? 'none' : 'block';
        floatFloorDropdown.style.display = 'none';
    });

    floatFloorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        floatFloorDropdown.style.display = floatFloorDropdown.style.display === 'block' ? 'none' : 'block';
        headerFloorMenu.style.display = 'none';
    });

    document.addEventListener('click', () => {
        headerFloorMenu.style.display = 'none';
        floatFloorDropdown.style.display = 'none';
    });

    document.querySelectorAll('.floor-dropdown-menu a').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const link = e.currentTarget;
            const floor = parseInt(link.dataset.floor);
            loadFloor(floor);
            headerFloorMenu.style.display = 'none';
            floatFloorDropdown.style.display = 'none';
        });
    });

    // Global Search Autocomplete
    globalInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        globalResults.innerHTML = '';
        
        if (!val) {
            globalResults.style.display = 'none';
            globalClear.style.display = 'none';
            return;
        }

        globalClear.style.display = 'flex';

        const config = FLOOR_CONFIGS[currentFloor];
        const matches = config.rooms.filter(room => 
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
                    <div class="item-meta">${room.name} • ${config.name}</div>
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

function filterRooms(category) {
    currentCategoryFilter = category;
    if (!currentModel) return;

    // Clear previous category pins
    if (categoryPinsGroup) {
        while (categoryPinsGroup.children.length > 0) {
            categoryPinsGroup.remove(categoryPinsGroup.children[0]);
        }
    }
    
    // Reset 3D mesh materials to original
    roomMeshes.forEach(mesh => {
        const orig = originalMaterials.get(mesh);
        if (orig && mesh.material) {
            mesh.material.copy(orig);
            if (mesh.userData.isLabel) {
                mesh.position.y = (currentViewMode === '2d') ? 1.8 : 0.6;
                mesh.material.transparent = true;
                mesh.material.alphaTest = 0.05;
                mesh.material.depthWrite = false;
                mesh.material.polygonOffset = true;
                mesh.material.polygonOffsetFactor = -4;
                mesh.material.polygonOffsetUnits = -4;
                mesh.renderOrder = (currentViewMode === '2d') ? 80 : 50;
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
            } else if (mesh.userData.isFloor) {
                mesh.position.y = 0.4;
                mesh.material.transparent = false;
                mesh.material.opacity = 1.0;
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
            }
        }
    });

    if (category === 'all') {
        if (planMesh2D) {
            planMesh2D.material.opacity = 1.0;
        }
        return;
    }

    const config = FLOOR_CONFIGS[currentFloor];
    const catColor = CATEGORY_COLORS[category] || 0x2563eb;
    const is2D = (currentViewMode === '2d');

    // In 2D Mode: Desaturate/dim the 2D background into a clean, colorless white silhouette
    if (planMesh2D) {
        planMesh2D.material.opacity = is2D ? 0.20 : 1.0;
    }

    // 1. Create Glowing Category Pin Badges on 2D and 3D floor
    config.rooms.forEach(room => {
        if (room.category === category) {
            const coord = config.roomCoords[room.id];
            if (coord) {
                const worldX = coord.x + currentModel.position.x;
                const worldZ = coord.z + currentModel.position.z;
                const worldY = 3.0;

                const pin = new THREE.Group();
                pin.position.set(worldX, worldY, worldZ);
                pin.userData.roomId = room.id;

                // Pulsing outer halo disc
                const discGeo = new THREE.CylinderGeometry(20, 20, 1.2, 24);
                const discMat = new THREE.MeshBasicMaterial({
                    color: catColor,
                    transparent: true,
                    opacity: 0.85,
                    depthTest: false
                });
                const disc = new THREE.Mesh(discGeo, discMat);
                disc.renderOrder = 850;
                pin.add(disc);

                // Inner bright bead
                const core = new THREE.Mesh(
                    new THREE.SphereGeometry(8.5, 14, 14),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false })
                );
                core.position.y = 3.5;
                core.renderOrder = 860;
                pin.add(core);

                categoryPinsGroup.add(pin);
            }
        }
    });

    // 2. Highlight matching room floor meshes (Glow) & Dim out non-matching (White/Colorless)
    roomMeshes.forEach(mesh => {
        const isMatch = (mesh.userData.category === category);

        if (isMatch) {
            if (mesh.userData.isFloor) {
                mesh.position.y = is2D ? 182.0 : 0.4; // In 2D: Elevate above 2D plan plane to glow vibrantly!
                mesh.material.transparent = false;
                mesh.material.opacity = 1.0;
                mesh.material.depthWrite = true;
                mesh.material.depthTest = !is2D;
                mesh.material.color.setHex(catColor);
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x1e293b);
                mesh.renderOrder = is2D ? 750 : 20;
            } else if (mesh.userData.isLabel) {
                mesh.position.y = is2D ? 183.5 : 0.6;
                mesh.material.transparent = true;
                mesh.material.opacity = 1.0;
                mesh.material.depthWrite = false;
                mesh.material.alphaTest = 0.02;
                mesh.material.depthTest = !is2D;
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
                mesh.renderOrder = is2D ? 850 : 90;
            }
        } else {
            if (mesh.userData.isFloor) {
                mesh.position.y = 0.4;
                if (is2D) {
                    // Under 2D plan plane, so only the dimmed/white 2D plan shows
                    mesh.renderOrder = 10;
                } else {
                    mesh.material.transparent = true;
                    mesh.material.opacity = 0.12;
                    mesh.material.color.setHex(0xe2e8f0);
                    if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
                }
            } else if (mesh.userData.isLabel) {
                mesh.position.y = is2D ? 1.8 : 0.6;
                mesh.material.transparent = true;
                mesh.material.opacity = is2D ? 0.25 : 0.18;
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
                mesh.renderOrder = is2D ? 80 : 30;
            }
        }
    });
}

// ==========================================
// 8. DIJKSTRA PATHFINDING & ROUTING
// ==========================================

function findRoute() {
    const startId = startSelect.value;
    const destId = destSelect.value;

    if (!startId || !destId) {
        alert('Please select both start and destination locations.');
        return;
    }
    if (startId === destId) {
        alert('Start and destination are the same.');
        return;
    }

    const config = FLOOR_CONFIGS[currentFloor];
    const startNodeId = config.roomToNode[startId];
    const destNodeId = config.roomToNode[destId];

    if (!startNodeId || !destNodeId) return;

    const graph = {};
    Object.keys(config.graphNodes).forEach(n => graph[n] = {});
    
    config.graphEdges.forEach(([u, v]) => {
        const p1 = config.graphNodes[u];
        const p2 = config.graphNodes[v];
        if (p1 && p2) {
            const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.z - p2.z, 2));
            graph[u][v] = dist;
            graph[v][u] = dist;
        }
    });

    const distances = {};
    const prev = {};
    const pq = new Set(Object.keys(config.graphNodes));

    Object.keys(config.graphNodes).forEach(n => distances[n] = Infinity);
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
    if (!currentModel) return;
    clearRouteVisuals();

    if (pathNodes.length === 0) return;

    const config = FLOOR_CONFIGS[currentFloor];
    const worldElevation = (currentViewMode === '2d') ? 3.5 : 8.0;

    // Convert path nodes to world coordinates (adding currentModel center offset)
    const points = pathNodes.map(n => {
        const node = config.graphNodes[n];
        return new THREE.Vector3(
            node.x + currentModel.position.x,
            worldElevation,
            node.z + currentModel.position.z
        );
    });

    // Build 100% laser-straight line segments (CurvePath of LineCurve3)
    const curvePath = new THREE.CurvePath();
    const cleanPoints = [points[0]];
    for (let i = 1; i < points.length; i++) {
        if (points[i].distanceTo(cleanPoints[cleanPoints.length - 1]) > 0.5) {
            cleanPoints.push(points[i]);
        }
    }

    for (let i = 0; i < cleanPoints.length - 1; i++) {
        curvePath.add(new THREE.LineCurve3(cleanPoints[i], cleanPoints[i + 1]));
    }
    activeRouteCurve = curvePath;
    const tubularSegments = Math.max(curvePath.curves.length * 12, 48);

    // Calculate total straight path distance
    let totalPathDist = 0;
    for (let i = 0; i < cleanPoints.length - 1; i++) {
        totalPathDist += cleanPoints[i].distanceTo(cleanPoints[i + 1]);
    }

    // 1. Airport Runway Illuminated Direction Track with animated chevron conveyor texture
    airportTrackTexture = createAirportTrackTexture();
    airportTrackTexture.repeat.set(Math.max(totalPathDist / 90, 2), 1);

    const baseTubeGeo = new THREE.TubeGeometry(curvePath, tubularSegments, 9.2, 16, false);
    const baseTubeMat = new THREE.MeshBasicMaterial({
        map: airportTrackTexture,
        transparent: true,
        opacity: 0.96,
        depthTest: false
    });
    routeLine = new THREE.Mesh(baseTubeGeo, baseTubeMat);
    routeLine.renderOrder = 998;
    routeGroup.add(routeLine);

    // 2. Core bright highlight straight tube (inner runway centerline)
    const coreTubeGeo = new THREE.TubeGeometry(curvePath, tubularSegments, 3.4, 12, false);
    const coreTubeMat = new THREE.MeshBasicMaterial({
        color: 0xf0f9ff,
        transparent: true,
        opacity: 0.98,
        depthTest: false
    });
    const coreMesh = new THREE.Mesh(coreTubeGeo, coreTubeMat);
    coreMesh.renderOrder = 999;
    routeGroup.add(coreMesh);

    // 2.1 Airport Runway Corner Junction Lights (90° turn beacons)
    const jointGeo = new THREE.SphereGeometry(9.2, 16, 16);
    const cornerDiscGeo = new THREE.CylinderGeometry(14, 14, 1.2, 24);
    const cornerDiscMat = new THREE.MeshBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.85,
        depthTest: false
    });
    for (let i = 1; i < cleanPoints.length - 1; i++) {
        const joint = new THREE.Mesh(jointGeo, baseTubeMat);
        joint.position.copy(cleanPoints[i]);
        joint.renderOrder = 998;
        routeGroup.add(joint);

        const disc = new THREE.Mesh(cornerDiscGeo, cornerDiscMat);
        disc.position.set(cleanPoints[i].x, cleanPoints[i].y + 0.4, cleanPoints[i].z);
        disc.renderOrder = 997;
        routeGroup.add(disc);
    }

    // 3. Airport Departure Gate Pin (🟢 Emerald Gate Beacon + Expanding Radar Waves)
    const startGeo = new THREE.SphereGeometry(15, 16, 16);
    const startMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        depthTest: false
    });
    startMarker = new THREE.Mesh(startGeo, startMat);
    startMarker.position.copy(points[0]);
    startMarker.position.y += 3.5;
    startMarker.renderOrder = 1000;
    routeGroup.add(startMarker);

    const depBaseDisc = new THREE.Mesh(
        new THREE.RingGeometry(14, 22, 32),
        new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.9, depthTest: false })
    );
    depBaseDisc.rotation.x = -Math.PI / 2;
    depBaseDisc.position.set(points[0].x, points[0].y + 0.5, points[0].z);
    depBaseDisc.renderOrder = 997;
    routeGroup.add(depBaseDisc);

    // Expanding Departure Radar Waves
    airportRadarRings = [];
    for (let i = 0; i < 2; i++) {
        const radarRing = new THREE.Mesh(
            new THREE.RingGeometry(18, 22, 32),
            new THREE.MeshBasicMaterial({ color: 0x34d399, side: THREE.DoubleSide, transparent: true, opacity: 0.85, depthTest: false })
        );
        radarRing.rotation.x = -Math.PI / 2;
        radarRing.position.set(points[0].x, points[0].y + 0.6, points[0].z);
        radarRing.renderOrder = 996;
        radarRing.userData.offset = i * 0.5;
        airportRadarRings.push(radarRing);
        routeGroup.add(radarRing);
    }

    // 4. Airport Arrival Gate Pin (🔴 Vibrant Target Beacon + Concentric Landing Bullseye)
    const destPt = points[points.length - 1];
    const destGeo = new THREE.SphereGeometry(15, 16, 16);
    const destMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        depthTest: false
    });
    destMarker = new THREE.Mesh(destGeo, destMat);
    destMarker.position.copy(destPt);
    destMarker.position.y += 3.5;
    destMarker.renderOrder = 1000;
    routeGroup.add(destMarker);

    const arrTarget1 = new THREE.Mesh(
        new THREE.RingGeometry(12, 16, 32),
        new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide, transparent: true, opacity: 0.95, depthTest: false })
    );
    arrTarget1.rotation.x = -Math.PI / 2;
    arrTarget1.position.set(destPt.x, destPt.y + 0.5, destPt.z);
    arrTarget1.renderOrder = 997;
    routeGroup.add(arrTarget1);

    const arrTarget2 = new THREE.Mesh(
        new THREE.RingGeometry(22, 26, 32),
        new THREE.MeshBasicMaterial({ color: 0xf87171, side: THREE.DoubleSide, transparent: true, opacity: 0.8, depthTest: false })
    );
    arrTarget2.rotation.x = -Math.PI / 2;
    arrTarget2.position.set(destPt.x, destPt.y + 0.5, destPt.z);
    arrTarget2.renderOrder = 997;
    routeGroup.add(arrTarget2);

    for (let i = 0; i < 2; i++) {
        const arrPulse = new THREE.Mesh(
            new THREE.RingGeometry(28, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0xfca5a5, side: THREE.DoubleSide, transparent: true, opacity: 0.75, depthTest: false })
        );
        arrPulse.rotation.x = -Math.PI / 2;
        arrPulse.position.set(destPt.x, destPt.y + 0.6, destPt.z);
        arrPulse.renderOrder = 996;
        arrPulse.userData.offset = i * 0.5;
        airportRadarRings.push(arrPulse);
        routeGroup.add(arrPulse);
    }

    // 5. Animated Flowing Direction Arrows (Chevrons flowing from Start to Destination)
    pulseMarkers = [];
    const numArrows = 8;

    // Create Chevron Arrow shape lying flat on horizontal XZ floor plane
    const shape = new THREE.Shape();
    shape.moveTo(0, 16);      // Front tip pointing forward (+Z)
    shape.lineTo(12, -10);    // Right outer wing
    shape.lineTo(0, -2);      // Inner notch
    shape.lineTo(-12, -10);   // Left outer wing
    shape.closePath();

    const chevronGeo = new THREE.ShapeGeometry(shape);
    chevronGeo.rotateX(Math.PI / 2); // Lay flat on XZ floor pointing forward (+Z)

    const chevronMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        depthTest: false
    });

    const glowMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
        depthTest: false
    });

    for (let i = 0; i < numArrows; i++) {
        const arrowGroup = new THREE.Group();

        // Outer cyan glow chevron (slightly larger)
        const glowMesh = new THREE.Mesh(chevronGeo, glowMat);
        glowMesh.scale.set(1.28, 1.0, 1.28);
        glowMesh.renderOrder = 1001;
        arrowGroup.add(glowMesh);

        // Inner bright white chevron
        const coreMesh = new THREE.Mesh(chevronGeo, chevronMat);
        coreMesh.position.y = 0.5;
        coreMesh.renderOrder = 1002;
        arrowGroup.add(coreMesh);

        // Leading glowing sphere tip
        const tipMesh = new THREE.Mesh(
            new THREE.SphereGeometry(4.5, 10, 10),
            new THREE.MeshBasicMaterial({ color: 0x38bdf8, depthTest: false })
        );
        tipMesh.position.set(0, 1.0, 16);
        tipMesh.renderOrder = 1003;
        arrowGroup.add(tipMesh);

        pulseMarkers.push(arrowGroup);
        routeGroup.add(arrowGroup);
    }

    // Zoom camera towards the route center smoothly
    const centerPoint = points[Math.floor(points.length / 2)].clone();
    if (currentViewMode === '2d') {
        animateCameraTo(new THREE.Vector3(centerPoint.x, 2600, centerPoint.z + 1), centerPoint, 500);
    } else {
        animateCameraTo(new THREE.Vector3(centerPoint.x, 2000, centerPoint.z + 1400), centerPoint, 500);
    }
}

function clearRouteVisuals() {
    if (routeGroup) {
        while (routeGroup.children.length > 0) {
            const child = routeGroup.children[0];
            routeGroup.remove(child);
        }
    }
    activeRouteCurve = null;
    airportTrackTexture = null;
    airportRadarRings = [];
    pulseMarkers = [];
    startMarker = null;
    destMarker = null;
    routeLine = null;
}

function getRoomPos(roomId) {
    const config = FLOOR_CONFIGS[currentFloor];
    const coords = config.roomCoords[roomId];
    if (!coords) return null;
    return new THREE.Vector3(coords.x, 12, coords.z);
}

function getTurnDirection(prevNode, currNode, nextNode) {
    const config = FLOOR_CONFIGS[currentFloor];
    const p = config.graphNodes[prevNode];
    const c = config.graphNodes[currNode];
    const n = config.graphNodes[nextNode];
    if (!p || !c || !n) return 'straight';
    const dx1 = c.x - p.x;
    const dz1 = c.z - p.z;
    const dx2 = n.x - c.x;
    const dz2 = n.z - c.z;
    const cross = dx1 * dz2 - dz1 * dx2;
    if (Math.abs(cross) < 10.0) return 'straight';
    return cross > 0 ? 'right' : 'left';
}

function generateInstructions(path, startId, destId, totalDist) {
    const config = FLOOR_CONFIGS[currentFloor];
    const tbtSection = document.getElementById('tbt-section');
    const tbtList = document.getElementById('tbt-list');
    const distanceBadge = document.getElementById('distance-badge');
    
    tbtSection.style.display = 'block';
    // Graph uses cm — divide by 100 to get metres
    const distMeters = (totalDist / 100).toFixed(1);
    const mins = Math.ceil(parseFloat(distMeters) / 80); // ~80m/min walking pace
    distanceBadge.innerText = `~ ${distMeters} m walk (${mins} min)`;
    
    const sRoom = config.rooms.find(r => r.id === startId);
    const dRoom = config.rooms.find(r => r.id === destId);

    let html = '';
    html += `<div class="tbt-step"><span class="step-icon">🟢</span><span>Start at Room ${sRoom.id} – ${sRoom.name}</span></div>`;

    // Only emit a step when there is a meaningful turn (cross > threshold)
    // or when transitioning between named corridor segments
    for (let i = 1; i < path.length - 1; i++) {
        const node = config.graphNodes[path[i]];
        const turnDir = getTurnDirection(path[i - 1], path[i], path[i + 1]);
        
        // Skip doorway nodes (d_ prefix) mid-path and pure straight spine hops
        const isDoorway = path[i].startsWith('d_');
        if (isDoorway) continue;

        let icon, instruction;
        if (turnDir === 'left') {
            icon = '⬅️';
            instruction = `Turn left — ${node.landmark}`;
        } else if (turnDir === 'right') {
            icon = '➡️';
            instruction = `Turn right — ${node.landmark}`;
        } else {
            icon = '🚶';
            instruction = `Walk along ${node.landmark}`;
        }
        html += `<div class="tbt-step"><span class="step-icon">${icon}</span><span>${instruction}</span></div>`;
    }

    if (path.length <= 3) {
        html += `<div class="tbt-step"><span class="step-icon">🚶</span><span>Walk straight to destination</span></div>`;
    }

    html += `<div class="tbt-step"><span class="step-icon">🔴</span><span>Arrive at Room ${dRoom.id} – ${dRoom.name}</span></div>`;
    
    tbtList.innerHTML = html;
}

function clearRoute() {
    clearRouteVisuals();
    document.getElementById('tbt-section').style.display = 'none';
    startSelect.value = '';
    destSelect.value = '';
    updateStartDestPins();
}

init();
