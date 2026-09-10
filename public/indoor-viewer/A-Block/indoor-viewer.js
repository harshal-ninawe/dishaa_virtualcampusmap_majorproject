import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// ==========================================
// 1. MULTI-BLOCK & FLOOR CONFIGURATIONS
// ==========================================

const BLOCK_CONFIGS = {
    "A": {
        "name": "A-Block",
        "badge": "A-BLOCK",
        "availableFloors": [
            0
        ],
        "defaultFloor": 0,
        "floorConfigs": {
            "0": {
                "name": "Ground Floor",
                "shortName": "0F",
                "folder": "A-Block/",
                "mtlFile": "a_block.mtl",
                "objFile": "a block.obj",
                "planImage": "A-Block/a block OG.jpg",
                "planSize": {
                    "width": 4697.1,
                    "depth": 1539.9
                },
                "rooms": [
                    {
                        "id": "017",
                        "name": "017 Classroom",
                        "category": "class",
                        "labelGroup": "label_176_811"
                    },
                    {
                        "id": "015",
                        "name": "015 Classroom",
                        "category": "class",
                        "labelGroup": "label_174_809"
                    },
                    {
                        "id": "020",
                        "name": "020 Classroom",
                        "category": "class",
                        "labelGroup": "label_177_812"
                    },
                    {
                        "id": "034C",
                        "name": "034 Classroom",
                        "category": "class",
                        "labelGroup": "label_185_820"
                    },
                    {
                        "id": "016",
                        "name": "016 Physics Lab",
                        "category": "lab",
                        "labelGroup": "label_175_810"
                    },
                    {
                        "id": "014",
                        "name": "014 Digital Electronics Lab",
                        "category": "lab",
                        "labelGroup": "label_173_808"
                    },
                    {
                        "id": "013",
                        "name": "013 Chemistry Lab",
                        "category": "lab",
                        "labelGroup": "label_172_807"
                    },
                    {
                        "id": "018",
                        "name": "018 Biology Lab",
                        "category": "lab",
                        "labelGroup": "label_178_813"
                    },
                    {
                        "id": "019",
                        "name": "019 Fisheries Lab",
                        "category": "lab",
                        "labelGroup": "label_179_814"
                    },
                    {
                        "id": "010",
                        "name": "010 Computer Lab",
                        "category": "lab",
                        "labelGroup": "label_169_804"
                    },
                    {
                        "id": "011",
                        "name": "011 Lab",
                        "category": "lab",
                        "labelGroup": "label_171_806"
                    },
                    {
                        "id": "036",
                        "name": "036 Lab",
                        "category": "lab",
                        "labelGroup": "label_198_833"
                    },
                    {
                        "id": "035M",
                        "name": "035 Machine Lab",
                        "category": "lab",
                        "labelGroup": "label_199_834"
                    },
                    {
                        "id": "026",
                        "name": "026 Computer Room",
                        "category": "lab",
                        "labelGroup": "label_186_821"
                    },
                    {
                        "id": "027",
                        "name": "027 Anatomy Lab",
                        "category": "lab",
                        "labelGroup": "label_187_822"
                    },
                    {
                        "id": "028",
                        "name": "028 Lab",
                        "category": "lab",
                        "labelGroup": "label_189_824"
                    },
                    {
                        "id": "029",
                        "name": "029 Social Pharmacy",
                        "category": "lab",
                        "labelGroup": "label_190_825"
                    },
                    {
                        "id": "030",
                        "name": "030 Pharmaceutical Lab",
                        "category": "lab",
                        "labelGroup": "label_191_826"
                    },
                    {
                        "id": "031",
                        "name": "031 Pharmacology Lab",
                        "category": "lab",
                        "labelGroup": "label_192_827"
                    },
                    {
                        "id": "031A",
                        "name": "031(A) Aseptic Room",
                        "category": "lab",
                        "labelGroup": "label_193_828"
                    },
                    {
                        "id": "032",
                        "name": "032 Pharma Chemistry Lab",
                        "category": "lab",
                        "labelGroup": "label_194_829"
                    },
                    {
                        "id": "033",
                        "name": "033 Pharmaceutical Analysis",
                        "category": "lab",
                        "labelGroup": "label_195_830"
                    },
                    {
                        "id": "students_sec",
                        "name": "Students Section",
                        "category": "admin",
                        "labelGroup": "label_180_815"
                    },
                    {
                        "id": "accounts_sec",
                        "name": "Accounts Section",
                        "category": "admin",
                        "labelGroup": "label_183_818"
                    },
                    {
                        "id": "reception",
                        "name": "Reception Desk",
                        "category": "admin",
                        "labelGroup": "label_207_842"
                    },
                    {
                        "id": "006",
                        "name": "006 Principal Cabin",
                        "category": "admin",
                        "labelGroup": "label_164_799"
                    },
                    {
                        "id": "035TP",
                        "name": "035 T&P Cell",
                        "category": "admin",
                        "labelGroup": "label_184_819"
                    },
                    {
                        "id": "039",
                        "name": "039 Medical Room",
                        "category": "admin",
                        "labelGroup": "label_202_837"
                    },
                    {
                        "id": "041",
                        "name": "041 Exam Section",
                        "category": "admin",
                        "labelGroup": "label_204_839"
                    },
                    {
                        "id": "008",
                        "name": "008 Staff Room",
                        "category": "faculty",
                        "labelGroup": "label_166_801"
                    },
                    {
                        "id": "007",
                        "name": "007 Faculty Room",
                        "category": "faculty",
                        "labelGroup": "label_165_800"
                    },
                    {
                        "id": "012",
                        "name": "012 Staff Room",
                        "category": "faculty",
                        "labelGroup": "label_170_805"
                    },
                    {
                        "id": "021",
                        "name": "021 Faculty Room",
                        "category": "faculty",
                        "labelGroup": "label_182_817"
                    },
                    {
                        "id": "022",
                        "name": "022 Record Room",
                        "category": "faculty",
                        "labelGroup": "label_181_816"
                    },
                    {
                        "id": "02A",
                        "name": "02(A) Faculty Room",
                        "category": "faculty",
                        "labelGroup": "label_188_823"
                    },
                    {
                        "id": "037",
                        "name": "037 Faculty Room",
                        "category": "faculty",
                        "labelGroup": "label_200_835"
                    },
                    {
                        "id": "038",
                        "name": "038 Faculty Room",
                        "category": "faculty",
                        "labelGroup": "label_201_836"
                    },
                    {
                        "id": "040",
                        "name": "040 Faculty Room",
                        "category": "faculty",
                        "labelGroup": "label_203_838"
                    },
                    {
                        "id": "001",
                        "name": "001 Server Room",
                        "category": "service",
                        "labelGroup": "label_162_797"
                    },
                    {
                        "id": "002",
                        "name": "002 Server Room",
                        "category": "service",
                        "labelGroup": "label_208_843"
                    },
                    {
                        "id": "003_store",
                        "name": "003,004,005 Store Room",
                        "category": "service",
                        "labelGroup": "label_163_798"
                    },
                    {
                        "id": "xerox",
                        "name": "Xerox Centre",
                        "category": "service",
                        "labelGroup": "label_206_841"
                    },
                    {
                        "id": "lift",
                        "name": "Elevator / Lift",
                        "category": "service",
                        "labelGroup": "label_205_840"
                    },
                    {
                        "id": "009A",
                        "name": "009(A) Men's Washroom",
                        "category": "washroom",
                        "labelGroup": "label_167_802"
                    },
                    {
                        "id": "009B",
                        "name": "009(B) Women's Washroom",
                        "category": "washroom",
                        "labelGroup": "label_168_803"
                    },
                    {
                        "id": "034A",
                        "name": "034(A) Ladies Washroom",
                        "category": "washroom",
                        "labelGroup": "label_196_831"
                    },
                    {
                        "id": "034B",
                        "name": "034(B) Men's Washroom",
                        "category": "washroom",
                        "labelGroup": "label_197_832"
                    }
                ],
                "roomCoords": {
                    "017": {
                        "x": 234.1,
                        "y": 2,
                        "z": 261.6
                    },
                    "016": {
                        "x": 241.1,
                        "y": 2,
                        "z": 442.4
                    },
                    "015": {
                        "x": 244.5,
                        "y": 2,
                        "z": 626.2
                    },
                    "014": {
                        "x": 255,
                        "y": 2,
                        "z": 1142.1
                    },
                    "013": {
                        "x": 255,
                        "y": 2,
                        "z": 1394.6
                    },
                    "018": {
                        "x": 731.3,
                        "y": 2,
                        "z": 305.6
                    },
                    "019": {
                        "x": 731.3,
                        "y": 2,
                        "z": 481.7
                    },
                    "020": {
                        "x": 713.9,
                        "y": 2,
                        "z": 608.8
                    },
                    "010": {
                        "x": 717.4,
                        "y": 2,
                        "z": 1100.1
                    },
                    "011": {
                        "x": 717.4,
                        "y": 2,
                        "z": 1234.3
                    },
                    "012": {
                        "x": 724.4,
                        "y": 2,
                        "z": 1385.1
                    },
                    "021": {
                        "x": 1169.4,
                        "y": 2,
                        "z": 570.7
                    },
                    "022": {
                        "x": 1475.4,
                        "y": 2,
                        "z": 584.9
                    },
                    "009A": {
                        "x": 1251.7,
                        "y": 2,
                        "z": 1198.2
                    },
                    "009B": {
                        "x": 1091.6,
                        "y": 2,
                        "z": 1265.5
                    },
                    "008": {
                        "x": 1591.7,
                        "y": 2,
                        "z": 1102.7
                    },
                    "007": {
                        "x": 1580.3,
                        "y": 2,
                        "z": 1273.7
                    },
                    "006": {
                        "x": 1475.5,
                        "y": 2,
                        "z": 1414.4
                    },
                    "students_sec": {
                        "x": 1711.8,
                        "y": 2,
                        "z": 316.7
                    },
                    "accounts_sec": {
                        "x": 3161.7,
                        "y": 2,
                        "z": 315.8
                    },
                    "001": {
                        "x": 1883.8,
                        "y": 2,
                        "z": 1077.4
                    },
                    "002": {
                        "x": 1867.6,
                        "y": 2,
                        "z": 1208.7
                    },
                    "003_store": {
                        "x": 1886.7,
                        "y": 2,
                        "z": 1354.2
                    },
                    "reception": {
                        "x": 2285.6,
                        "y": 2,
                        "z": 1082.3
                    },
                    "xerox": {
                        "x": 2292.3,
                        "y": 2,
                        "z": 1340.6
                    },
                    "lift": {
                        "x": 2422.9,
                        "y": 2,
                        "z": 1388.7
                    },
                    "037": {
                        "x": 2769.7,
                        "y": 2,
                        "z": 1036
                    },
                    "038": {
                        "x": 2770.1,
                        "y": 2,
                        "z": 1105.2
                    },
                    "039": {
                        "x": 2775.5,
                        "y": 2,
                        "z": 1221.5
                    },
                    "040": {
                        "x": 2779.5,
                        "y": 2,
                        "z": 1312.1
                    },
                    "041": {
                        "x": 2774,
                        "y": 2,
                        "z": 1395
                    },
                    "036": {
                        "x": 3022.6,
                        "y": 2,
                        "z": 1103.4
                    },
                    "035M": {
                        "x": 3074.8,
                        "y": 2,
                        "z": 1353.3
                    },
                    "034B": {
                        "x": 3343.1,
                        "y": 2,
                        "z": 1220.5
                    },
                    "034A": {
                        "x": 3499.6,
                        "y": 2,
                        "z": 1237.9
                    },
                    "035TP": {
                        "x": 3439.8,
                        "y": 2,
                        "z": 573.9
                    },
                    "034C": {
                        "x": 3193,
                        "y": 2,
                        "z": 549.7
                    },
                    "026": {
                        "x": 3850.1,
                        "y": 2,
                        "z": 566.4
                    },
                    "027": {
                        "x": 3850.1,
                        "y": 2,
                        "z": 308.8
                    },
                    "028": {
                        "x": 4347.3,
                        "y": 2,
                        "z": 302.6
                    },
                    "02A": {
                        "x": 4097,
                        "y": 2,
                        "z": 266.7
                    },
                    "029": {
                        "x": 4329.9,
                        "y": 2,
                        "z": 566.4
                    },
                    "030": {
                        "x": 4361.2,
                        "y": 2,
                        "z": 1098.4
                    },
                    "031": {
                        "x": 4343.8,
                        "y": 2,
                        "z": 1305.6
                    },
                    "031A": {
                        "x": 4107.4,
                        "y": 2,
                        "z": 1380.7
                    },
                    "032": {
                        "x": 3874.4,
                        "y": 2,
                        "z": 1309.4
                    },
                    "033": {
                        "x": 3864,
                        "y": 2,
                        "z": 1091
                    }
                },
                "graphNodes": {
                    "MAIN_W_ENTRY": {
                        "x": 380,
                        "z": 865,
                        "landmark": "West Main Entrance"
                    },
                    "MAIN_W_SPINE": {
                        "x": 627,
                        "z": 865,
                        "landmark": "West Corridor Crossing"
                    },
                    "MAIN_021_PROJ": {
                        "x": 1169,
                        "z": 865,
                        "landmark": "Outside Faculty Room 021"
                    },
                    "MAIN_022_PROJ": {
                        "x": 1475,
                        "z": 865,
                        "landmark": "Outside Record Room 022"
                    },
                    "MAIN_ADMIN_JUNCT": {
                        "x": 1500,
                        "z": 865,
                        "landmark": "Admin & Staff Wing Corridor Junction"
                    },
                    "MAIN_008_PROJ": {
                        "x": 1591,
                        "z": 865,
                        "landmark": "Outside Staff Room 008"
                    },
                    "MAIN_001_PROJ": {
                        "x": 1883,
                        "z": 865,
                        "landmark": "Outside Server Room 001"
                    },
                    "MAIN_SERVER_PASSAGE": {
                        "x": 2150,
                        "z": 865,
                        "landmark": "Server Rooms & Reception Passage"
                    },
                    "MAIN_CENTRAL_FOYER": {
                        "x": 2285,
                        "z": 865,
                        "landmark": "Outside Reception Desk"
                    },
                    "MAIN_NORTH_PASSAGE": {
                        "x": 2465,
                        "z": 865,
                        "landmark": "Central Passage & Lift Junction"
                    },
                    "MAIN_EXAM_PASSAGE": {
                        "x": 2715,
                        "z": 865,
                        "landmark": "Exam Section Corridor Junction"
                    },
                    "MAIN_034C_PROJ": {
                        "x": 3193,
                        "z": 865,
                        "landmark": "Outside Classroom 034"
                    },
                    "MAIN_MACHINE_JUNCT": {
                        "x": 3240,
                        "z": 865,
                        "landmark": "Machine Lab Branch Junction"
                    },
                    "MAIN_034B_PROJ": {
                        "x": 3343,
                        "z": 865,
                        "landmark": "Outside 034(B) Men's Washroom"
                    },
                    "MAIN_035TP_PROJ": {
                        "x": 3439,
                        "z": 865,
                        "landmark": "Outside T&P Cell 035"
                    },
                    "MAIN_034A_PROJ": {
                        "x": 3499,
                        "z": 865,
                        "landmark": "Outside 034(A) Ladies Washroom"
                    },
                    "MAIN_E_SPINE": {
                        "x": 4100,
                        "z": 865,
                        "landmark": "East Lab Corridor Crossing"
                    },
                    "MAIN_E_ENTRY": {
                        "x": 4360,
                        "z": 865,
                        "landmark": "East Wing Entrance & Stairs"
                    },
                    "W_N_017": {
                        "x": 627,
                        "z": 261,
                        "landmark": "Corridor outside 017 Classroom"
                    },
                    "W_N_018": {
                        "x": 627,
                        "z": 305,
                        "landmark": "Corridor outside 018 Biology Lab"
                    },
                    "W_N_016": {
                        "x": 627,
                        "z": 442,
                        "landmark": "Corridor outside 016 Physics Lab"
                    },
                    "W_N_019": {
                        "x": 627,
                        "z": 481,
                        "landmark": "Corridor outside 019 Fisheries Lab"
                    },
                    "W_N_020": {
                        "x": 627,
                        "z": 608,
                        "landmark": "Corridor outside 020 Classroom"
                    },
                    "W_N_015": {
                        "x": 627,
                        "z": 626,
                        "landmark": "Corridor outside 015 Classroom"
                    },
                    "W_S_010": {
                        "x": 627,
                        "z": 1100,
                        "landmark": "Corridor outside 010 Computer Lab"
                    },
                    "W_S_014": {
                        "x": 627,
                        "z": 1142,
                        "landmark": "Corridor outside 014 Digital Electronics Lab"
                    },
                    "W_S_011": {
                        "x": 627,
                        "z": 1234,
                        "landmark": "Corridor outside 011 Lab"
                    },
                    "W_S_012": {
                        "x": 627,
                        "z": 1385,
                        "landmark": "Corridor outside 012 Staff Room"
                    },
                    "W_S_013": {
                        "x": 627,
                        "z": 1394,
                        "landmark": "Corridor outside 013 Chemistry Lab"
                    },
                    "NORTH_TOP_W": {
                        "x": 1400,
                        "z": 120,
                        "landmark": "North Top Corridor West End"
                    },
                    "NORTH_TOP_STUDENTS": {
                        "x": 1711,
                        "z": 120,
                        "landmark": "Corridor above Students Section"
                    },
                    "NORTH_TOP_MID": {
                        "x": 2465,
                        "z": 120,
                        "landmark": "North Top Corridor Central Junction"
                    },
                    "NORTH_TOP_ACCOUNTS": {
                        "x": 3161,
                        "z": 120,
                        "landmark": "Corridor above Accounts Section"
                    },
                    "NORTH_TOP_E": {
                        "x": 3300,
                        "z": 120,
                        "landmark": "North Top Corridor East End"
                    },
                    "VERT_CTR_PASSAGE_1": {
                        "x": 2465,
                        "z": 350,
                        "landmark": "Central Vertical Passage North"
                    },
                    "VERT_CTR_PASSAGE_2": {
                        "x": 2465,
                        "z": 600,
                        "landmark": "Central Vertical Passage Mid"
                    },
                    "ADMIN_S_BRANCH_1": {
                        "x": 1500,
                        "z": 1100,
                        "landmark": "Corridor outside 009 Washrooms & 008 Staff"
                    },
                    "ADMIN_S_BRANCH_2": {
                        "x": 1500,
                        "z": 1273,
                        "landmark": "Corridor outside 007 Faculty Room"
                    },
                    "ADMIN_S_PRINCIPAL": {
                        "x": 1500,
                        "z": 1414,
                        "landmark": "Corridor outside Principal Cabin"
                    },
                    "SERVER_PASSAGE_001": {
                        "x": 2150,
                        "z": 1077,
                        "landmark": "Passage outside 001 Server Room"
                    },
                    "SERVER_PASSAGE_002": {
                        "x": 2150,
                        "z": 1208,
                        "landmark": "Passage outside 002 Server Room"
                    },
                    "SERVER_PASSAGE_003": {
                        "x": 2150,
                        "z": 1354,
                        "landmark": "Passage outside Store Room"
                    },
                    "CENTRAL_VERT_RECEPTION": {
                        "x": 2465,
                        "z": 1082,
                        "landmark": "Central Corridor outside Reception"
                    },
                    "CENTRAL_VERT_XEROX": {
                        "x": 2465,
                        "z": 1340,
                        "landmark": "Central Corridor outside Xerox Centre"
                    },
                    "CENTRAL_VERT_LIFT": {
                        "x": 2465,
                        "z": 1388,
                        "landmark": "Central Corridor outside Elevator / Lift"
                    },
                    "EXAM_S_037": {
                        "x": 2715,
                        "z": 1036,
                        "landmark": "Corridor outside 037 Faculty Room"
                    },
                    "EXAM_S_038": {
                        "x": 2715,
                        "z": 1105,
                        "landmark": "Corridor outside 038 Faculty Room"
                    },
                    "EXAM_S_039": {
                        "x": 2715,
                        "z": 1221,
                        "landmark": "Corridor outside 039 Medical Room"
                    },
                    "EXAM_S_040": {
                        "x": 2715,
                        "z": 1312,
                        "landmark": "Corridor outside 040 Faculty Room"
                    },
                    "EXAM_S_041": {
                        "x": 2715,
                        "z": 1395,
                        "landmark": "Corridor outside 041 Exam Section"
                    },
                    "MACHINE_BRANCH_VERT": {
                        "x": 3240,
                        "z": 1240,
                        "landmark": "Machine Lab Branch Entry"
                    },
                    "MACHINE_BRANCH_035M": {
                        "x": 3074,
                        "z": 1240,
                        "landmark": "Corridor outside 035 Machine Lab"
                    },
                    "MACHINE_BRANCH_036": {
                        "x": 3022,
                        "z": 1240,
                        "landmark": "Corridor outside 036 Lab"
                    },
                    "MACHINE_BRANCH_END": {
                        "x": 2950,
                        "z": 1240,
                        "landmark": "Machine Lab Corridor West End"
                    },
                    "E_N_02A": {
                        "x": 4100,
                        "z": 266,
                        "landmark": "Corridor outside 02(A) Faculty Room"
                    },
                    "E_N_028": {
                        "x": 4100,
                        "z": 302,
                        "landmark": "Corridor outside 028 Lab"
                    },
                    "E_N_027": {
                        "x": 4100,
                        "z": 308,
                        "landmark": "Corridor outside 027 Anatomy Lab"
                    },
                    "E_N_026": {
                        "x": 4100,
                        "z": 566,
                        "landmark": "Corridor outside 026 Computer Room"
                    },
                    "E_S_033": {
                        "x": 4100,
                        "z": 1091,
                        "landmark": "Corridor outside 033 Pharmaceutical Analysis"
                    },
                    "E_S_030": {
                        "x": 4100,
                        "z": 1098,
                        "landmark": "Corridor outside 030 Pharmaceutical Lab"
                    },
                    "E_S_031": {
                        "x": 4100,
                        "z": 1305,
                        "landmark": "Corridor outside 031 Pharmacology Lab"
                    },
                    "E_S_032": {
                        "x": 4100,
                        "z": 1309,
                        "landmark": "Corridor outside 032 Pharma Chemistry Lab"
                    },
                    "E_S_031A": {
                        "x": 4100,
                        "z": 1380,
                        "landmark": "Corridor outside 031(A) Aseptic Room"
                    }
                },
                "graphEdges": [
                    [
                        "MAIN_W_ENTRY",
                        "MAIN_W_SPINE"
                    ],
                    [
                        "MAIN_W_SPINE",
                        "MAIN_021_PROJ"
                    ],
                    [
                        "MAIN_021_PROJ",
                        "MAIN_022_PROJ"
                    ],
                    [
                        "MAIN_022_PROJ",
                        "MAIN_ADMIN_JUNCT"
                    ],
                    [
                        "MAIN_ADMIN_JUNCT",
                        "MAIN_008_PROJ"
                    ],
                    [
                        "MAIN_008_PROJ",
                        "MAIN_001_PROJ"
                    ],
                    [
                        "MAIN_001_PROJ",
                        "MAIN_SERVER_PASSAGE"
                    ],
                    [
                        "MAIN_SERVER_PASSAGE",
                        "MAIN_CENTRAL_FOYER"
                    ],
                    [
                        "MAIN_CENTRAL_FOYER",
                        "MAIN_NORTH_PASSAGE"
                    ],
                    [
                        "MAIN_NORTH_PASSAGE",
                        "MAIN_EXAM_PASSAGE"
                    ],
                    [
                        "MAIN_EXAM_PASSAGE",
                        "MAIN_034C_PROJ"
                    ],
                    [
                        "MAIN_034C_PROJ",
                        "MAIN_MACHINE_JUNCT"
                    ],
                    [
                        "MAIN_MACHINE_JUNCT",
                        "MAIN_034B_PROJ"
                    ],
                    [
                        "MAIN_034B_PROJ",
                        "MAIN_035TP_PROJ"
                    ],
                    [
                        "MAIN_035TP_PROJ",
                        "MAIN_034A_PROJ"
                    ],
                    [
                        "MAIN_034A_PROJ",
                        "MAIN_E_SPINE"
                    ],
                    [
                        "MAIN_E_SPINE",
                        "MAIN_E_ENTRY"
                    ],
                    [
                        "W_N_017",
                        "W_N_018"
                    ],
                    [
                        "W_N_018",
                        "W_N_016"
                    ],
                    [
                        "W_N_016",
                        "W_N_019"
                    ],
                    [
                        "W_N_019",
                        "W_N_020"
                    ],
                    [
                        "W_N_020",
                        "W_N_015"
                    ],
                    [
                        "W_N_015",
                        "MAIN_W_SPINE"
                    ],
                    [
                        "MAIN_W_SPINE",
                        "W_S_010"
                    ],
                    [
                        "W_S_010",
                        "W_S_014"
                    ],
                    [
                        "W_S_014",
                        "W_S_011"
                    ],
                    [
                        "W_S_011",
                        "W_S_012"
                    ],
                    [
                        "W_S_012",
                        "W_S_013"
                    ],
                    [
                        "NORTH_TOP_W",
                        "NORTH_TOP_STUDENTS"
                    ],
                    [
                        "NORTH_TOP_STUDENTS",
                        "NORTH_TOP_MID"
                    ],
                    [
                        "NORTH_TOP_MID",
                        "NORTH_TOP_ACCOUNTS"
                    ],
                    [
                        "NORTH_TOP_ACCOUNTS",
                        "NORTH_TOP_E"
                    ],
                    [
                        "NORTH_TOP_MID",
                        "VERT_CTR_PASSAGE_1"
                    ],
                    [
                        "VERT_CTR_PASSAGE_1",
                        "VERT_CTR_PASSAGE_2"
                    ],
                    [
                        "VERT_CTR_PASSAGE_2",
                        "MAIN_NORTH_PASSAGE"
                    ],
                    [
                        "MAIN_ADMIN_JUNCT",
                        "ADMIN_S_BRANCH_1"
                    ],
                    [
                        "ADMIN_S_BRANCH_1",
                        "ADMIN_S_BRANCH_2"
                    ],
                    [
                        "ADMIN_S_BRANCH_2",
                        "ADMIN_S_PRINCIPAL"
                    ],
                    [
                        "MAIN_SERVER_PASSAGE",
                        "SERVER_PASSAGE_001"
                    ],
                    [
                        "SERVER_PASSAGE_001",
                        "SERVER_PASSAGE_002"
                    ],
                    [
                        "SERVER_PASSAGE_002",
                        "SERVER_PASSAGE_003"
                    ],
                    [
                        "MAIN_NORTH_PASSAGE",
                        "CENTRAL_VERT_RECEPTION"
                    ],
                    [
                        "CENTRAL_VERT_RECEPTION",
                        "CENTRAL_VERT_XEROX"
                    ],
                    [
                        "CENTRAL_VERT_XEROX",
                        "CENTRAL_VERT_LIFT"
                    ],
                    [
                        "MAIN_EXAM_PASSAGE",
                        "EXAM_S_037"
                    ],
                    [
                        "EXAM_S_037",
                        "EXAM_S_038"
                    ],
                    [
                        "EXAM_S_038",
                        "EXAM_S_039"
                    ],
                    [
                        "EXAM_S_039",
                        "EXAM_S_040"
                    ],
                    [
                        "EXAM_S_040",
                        "EXAM_S_041"
                    ],
                    [
                        "MAIN_MACHINE_JUNCT",
                        "MACHINE_BRANCH_VERT"
                    ],
                    [
                        "MACHINE_BRANCH_VERT",
                        "MACHINE_BRANCH_035M"
                    ],
                    [
                        "MACHINE_BRANCH_035M",
                        "MACHINE_BRANCH_036"
                    ],
                    [
                        "MACHINE_BRANCH_036",
                        "MACHINE_BRANCH_END"
                    ],
                    [
                        "E_N_02A",
                        "E_N_028"
                    ],
                    [
                        "E_N_028",
                        "E_N_027"
                    ],
                    [
                        "E_N_027",
                        "E_N_026"
                    ],
                    [
                        "E_N_026",
                        "MAIN_E_SPINE"
                    ],
                    [
                        "MAIN_E_SPINE",
                        "E_S_033"
                    ],
                    [
                        "E_S_033",
                        "E_S_030"
                    ],
                    [
                        "E_S_030",
                        "E_S_031"
                    ],
                    [
                        "E_S_031",
                        "E_S_032"
                    ],
                    [
                        "E_S_032",
                        "E_S_031A"
                    ]
                ],
                "roomToNode": {
                    "017": "W_N_017",
                    "016": "W_N_016",
                    "015": "W_N_015",
                    "018": "W_N_018",
                    "019": "W_N_019",
                    "020": "W_N_020",
                    "014": "W_S_014",
                    "013": "W_S_013",
                    "010": "W_S_010",
                    "011": "W_S_011",
                    "012": "W_S_012",
                    "009B": "ADMIN_S_BRANCH_1",
                    "009A": "ADMIN_S_BRANCH_1",
                    "008": "MAIN_008_PROJ",
                    "007": "ADMIN_S_BRANCH_2",
                    "006": "ADMIN_S_PRINCIPAL",
                    "001": "MAIN_001_PROJ",
                    "002": "SERVER_PASSAGE_002",
                    "003_store": "SERVER_PASSAGE_003",
                    "021": "MAIN_021_PROJ",
                    "022": "MAIN_022_PROJ",
                    "034C": "MAIN_034C_PROJ",
                    "035TP": "MAIN_035TP_PROJ",
                    "034B": "MAIN_034B_PROJ",
                    "034A": "MAIN_034A_PROJ",
                    "students_sec": "NORTH_TOP_STUDENTS",
                    "accounts_sec": "NORTH_TOP_ACCOUNTS",
                    "reception": "MAIN_CENTRAL_FOYER",
                    "xerox": "CENTRAL_VERT_XEROX",
                    "lift": "CENTRAL_VERT_LIFT",
                    "037": "EXAM_S_037",
                    "038": "EXAM_S_038",
                    "039": "EXAM_S_039",
                    "040": "EXAM_S_040",
                    "041": "EXAM_S_041",
                    "036": "MACHINE_BRANCH_036",
                    "035M": "MACHINE_BRANCH_035M",
                    "02A": "E_N_02A",
                    "028": "E_N_028",
                    "027": "E_N_027",
                    "026": "E_N_026",
                    "029": "E_N_026",
                    "033": "E_S_033",
                    "030": "E_S_030",
                    "031": "E_S_031",
                    "032": "E_S_032",
                    "031A": "E_S_031A"
                }
            }
        }
    },
    "B": {
        "name": "B-Block",
        "badge": "B-BLOCK",
        "availableFloors": [
            1,
            2,
            3,
            4
        ],
        "defaultFloor": 1,
        "floorConfigs": {
            "1": {
                "name": "1st Floor",
                "shortName": "1F",
                "folder": "B-Block/1st floor/",
                "mtlFile": "1st_floor.mtl",
                "objFile": "1st floor.obj",
                "planImage": "B-Block/1st final.jpg",
                "planSize": {
                    "width": 3790,
                    "depth": 1972.5
                },
                "rooms": [
                    {
                        "id": "107A",
                        "name": "Smart Room",
                        "category": "class",
                        "labelGroup": "label_139_607"
                    },
                    {
                        "id": "118",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_151_619"
                    },
                    {
                        "id": "119",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_152_620"
                    },
                    {
                        "id": "120",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_153_621"
                    },
                    {
                        "id": "121",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_154_622"
                    },
                    {
                        "id": "124",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_158_626"
                    },
                    {
                        "id": "126",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_157_625"
                    },
                    {
                        "id": "102",
                        "name": "Lab",
                        "category": "lab",
                        "labelGroup": "label_134_602"
                    },
                    {
                        "id": "103A",
                        "name": "A Lab",
                        "category": "lab",
                        "labelGroup": "label_128_596"
                    },
                    {
                        "id": "103B",
                        "name": "B Lab",
                        "category": "lab",
                        "labelGroup": "label_129_597"
                    },
                    {
                        "id": "104",
                        "name": "Block Chain Technology Lab",
                        "category": "lab",
                        "labelGroup": "label_135_603"
                    },
                    {
                        "id": "106",
                        "name": "Robotics Lab",
                        "category": "lab",
                        "labelGroup": "label_138_606"
                    },
                    {
                        "id": "108",
                        "name": "Physics Lab",
                        "category": "lab",
                        "labelGroup": "label_141_609"
                    },
                    {
                        "id": "111",
                        "name": "Physics Lab",
                        "category": "lab",
                        "labelGroup": "label_142_610"
                    },
                    {
                        "id": "123",
                        "name": "Language Lab",
                        "category": "lab",
                        "labelGroup": "label_156_624"
                    },
                    {
                        "id": "125",
                        "name": "AR-VR Lab",
                        "category": "lab",
                        "labelGroup": "label_159_627"
                    },
                    {
                        "id": "122",
                        "name": "Dean First Year Cabin",
                        "category": "dept",
                        "labelGroup": "label_155_623"
                    },
                    {
                        "id": "107B",
                        "name": "Staff Room",
                        "category": "staff",
                        "labelGroup": "label_140_608"
                    },
                    {
                        "id": "110",
                        "name": "Staff Room",
                        "category": "staff",
                        "labelGroup": "label_143_611"
                    },
                    {
                        "id": "105",
                        "name": "Dean Block",
                        "category": "staff",
                        "labelGroup": "label_137_605"
                    },
                    {
                        "id": "director_office",
                        "name": "Director sir Office",
                        "category": "staff",
                        "labelGroup": "label_149_617"
                    },
                    {
                        "id": "101",
                        "name": "Dr. APJ Abdul Kalam Hall",
                        "category": "seminar",
                        "labelGroup": "label_133_601"
                    },
                    {
                        "id": "114",
                        "name": "Board Room",
                        "category": "special",
                        "labelGroup": "label_146_614"
                    },
                    {
                        "id": "115",
                        "name": "Room 115",
                        "category": "special",
                        "labelGroup": "label_147_615"
                    },
                    {
                        "id": "116",
                        "name": "Room 116",
                        "category": "special",
                        "labelGroup": "label_148_616"
                    },
                    {
                        "id": "112",
                        "name": "Girls Washroom",
                        "category": "utility",
                        "labelGroup": "label_144_612"
                    },
                    {
                        "id": "113",
                        "name": "Boys Washroom",
                        "category": "utility",
                        "labelGroup": "label_145_613"
                    },
                    {
                        "id": "117",
                        "name": "Girls Common Room",
                        "category": "utility",
                        "labelGroup": "label_150_618"
                    },
                    {
                        "id": "atrium",
                        "name": "ATRIUM",
                        "category": "utility",
                        "labelGroup": "label_160_628"
                    }
                ],
                "roomCoords": {
                    "101": {
                        "x": 762.2,
                        "y": 2,
                        "z": 1385.7
                    },
                    "102": {
                        "x": 510,
                        "y": 2,
                        "z": 1415.6
                    },
                    "104": {
                        "x": 160.5,
                        "y": 2,
                        "z": 1079
                    },
                    "105": {
                        "x": 150.6,
                        "y": 2,
                        "z": 678.7
                    },
                    "106": {
                        "x": 133.1,
                        "y": 2,
                        "z": 356.7
                    },
                    "108": {
                        "x": 672.4,
                        "y": 2,
                        "z": 76.9
                    },
                    "109": {
                        "x": 673.1,
                        "y": 2,
                        "z": 435
                    },
                    "110": {
                        "x": 1038.9,
                        "y": 2,
                        "z": 103.5
                    },
                    "111": {
                        "x": 1011.3,
                        "y": 2,
                        "z": 412
                    },
                    "112": {
                        "x": 1383.7,
                        "y": 2,
                        "z": 38.7
                    },
                    "113": {
                        "x": 1638.4,
                        "y": 2,
                        "z": 55.7
                    },
                    "114": {
                        "x": 1640.9,
                        "y": 2,
                        "z": 315.3
                    },
                    "115": {
                        "x": 1848,
                        "y": 2,
                        "z": 384.7
                    },
                    "116": {
                        "x": 1970.4,
                        "y": 2,
                        "z": 377.7
                    },
                    "117": {
                        "x": 2157.6,
                        "y": 2,
                        "z": 252.4
                    },
                    "118": {
                        "x": 2926.4,
                        "y": 2,
                        "z": 443.1
                    },
                    "119": {
                        "x": 2911.5,
                        "y": 2,
                        "z": 148.5
                    },
                    "120": {
                        "x": 3528,
                        "y": 2,
                        "z": 147.5
                    },
                    "121": {
                        "x": 3510.6,
                        "y": 2,
                        "z": 431.6
                    },
                    "122": {
                        "x": 3523.3,
                        "y": 2,
                        "z": 897
                    },
                    "123": {
                        "x": 3523,
                        "y": 2,
                        "z": 1219.4
                    },
                    "124": {
                        "x": 3518,
                        "y": 2,
                        "z": 1482.5
                    },
                    "125": {
                        "x": 2928.9,
                        "y": 2,
                        "z": 1486
                    },
                    "126": {
                        "x": 2923.9,
                        "y": 2,
                        "z": 1236.9
                    },
                    "103A": {
                        "x": 153.9,
                        "y": 2,
                        "z": 1424.2
                    },
                    "103B": {
                        "x": 148.3,
                        "y": 2,
                        "z": 1525.5
                    },
                    "103C": {
                        "x": 150.5,
                        "y": 2,
                        "z": 1621.6
                    },
                    "107A": {
                        "x": 125.6,
                        "y": 2,
                        "z": 105.1
                    },
                    "107B": {
                        "x": 397.7,
                        "y": 2,
                        "z": 52.2
                    },
                    "staff_room": {
                        "x": 147.9,
                        "y": 2,
                        "z": 1309.5
                    },
                    "director_office": {
                        "x": 1921.9,
                        "y": 2,
                        "z": 87.3
                    },
                    "lift1": {
                        "x": 619.9,
                        "y": 2,
                        "z": 891.4
                    },
                    "lift2": {
                        "x": 2027.7,
                        "y": 2,
                        "z": 844.5
                    },
                    "atrium": {
                        "x": 1687.2,
                        "y": 2,
                        "z": 1446.7
                    }
                },
                "graphNodes": {
                    "rd_101": {
                        "x": 700,
                        "z": 1371,
                        "px": 351,
                        "py": 550,
                        "type": "door",
                        "landmark": "Room 101 Dr. APJ Abdul Kalam Hall door"
                    },
                    "rd_102": {
                        "x": 571,
                        "z": 1377,
                        "px": 299,
                        "py": 552,
                        "type": "door",
                        "landmark": "Room 102 Lab door"
                    },
                    "rd_104": {
                        "x": 253,
                        "z": 1065,
                        "px": 171,
                        "py": 438,
                        "type": "door",
                        "landmark": "Room 104 Block Chain Technology door"
                    },
                    "rd_105": {
                        "x": 231,
                        "z": 657,
                        "px": 162,
                        "py": 289,
                        "type": "door",
                        "landmark": "Room 105 Dean Block door"
                    },
                    "rd_106": {
                        "x": 218,
                        "z": 411,
                        "px": 157,
                        "py": 199,
                        "type": "door",
                        "landmark": "Room 106 Robotics Lab door"
                    },
                    "rd_108": {
                        "x": 568,
                        "z": 140,
                        "px": 298,
                        "py": 100,
                        "type": "door",
                        "landmark": "Room 108 Physics Lab door"
                    },
                    "rd_110": {
                        "x": 1189,
                        "z": 403,
                        "px": 548,
                        "py": 196,
                        "type": "door",
                        "landmark": "Room 110 Staff Room door"
                    },
                    "rd_111": {
                        "x": 1189,
                        "z": 403,
                        "px": 548,
                        "py": 196,
                        "type": "door",
                        "landmark": "Room 111 Physics Lab door"
                    },
                    "rd_112": {
                        "x": 1308,
                        "z": -16,
                        "px": 596,
                        "py": 43,
                        "type": "door",
                        "landmark": "Room 112 Girls Washroom door"
                    },
                    "rd_113": {
                        "x": 1549,
                        "z": 74,
                        "px": 693,
                        "py": 76,
                        "type": "door",
                        "landmark": "Room 113 Boys Washroom door"
                    },
                    "rd_114": {
                        "x": 1589,
                        "z": 419,
                        "px": 709,
                        "py": 202,
                        "type": "door",
                        "landmark": "Room 114 Board Room door"
                    },
                    "rd_115": {
                        "x": 1822,
                        "z": 414,
                        "px": 803,
                        "py": 200,
                        "type": "door",
                        "landmark": "Room 115 door"
                    },
                    "rd_116": {
                        "x": 1974,
                        "z": 408,
                        "px": 864,
                        "py": 198,
                        "type": "door",
                        "landmark": "Room 116 door"
                    },
                    "rd_117": {
                        "x": 2170,
                        "z": 384,
                        "px": 943,
                        "py": 189,
                        "type": "door",
                        "landmark": "Room 117 Girls Common Room door"
                    },
                    "rd_118": {
                        "x": 3034,
                        "z": 583,
                        "px": 1291,
                        "py": 262,
                        "type": "door",
                        "landmark": "Room 118 Class Room door"
                    },
                    "rd_119": {
                        "x": 3034,
                        "z": 195,
                        "px": 1291,
                        "py": 120,
                        "type": "door",
                        "landmark": "Room 119 Class Room door"
                    },
                    "rd_120": {
                        "x": 3367,
                        "z": 184,
                        "px": 1425,
                        "py": 116,
                        "type": "door",
                        "landmark": "Room 120 Class Room door"
                    },
                    "rd_121": {
                        "x": 3386,
                        "z": 581,
                        "px": 1433,
                        "py": 261,
                        "type": "door",
                        "landmark": "Room 121 Class Room door"
                    },
                    "rd_122": {
                        "x": 3379,
                        "z": 821,
                        "px": 1430,
                        "py": 349,
                        "type": "door",
                        "landmark": "Room 122 Dean First Year door"
                    },
                    "rd_123": {
                        "x": 3376,
                        "z": 1232,
                        "px": 1429,
                        "py": 499,
                        "type": "door",
                        "landmark": "Room 123 Language Lab door"
                    },
                    "rd_124": {
                        "x": 3379,
                        "z": 1629,
                        "px": 1430,
                        "py": 644,
                        "type": "door",
                        "landmark": "Room 124 Class Room door"
                    },
                    "rd_125": {
                        "x": 3024,
                        "z": 1585,
                        "px": 1287,
                        "py": 628,
                        "type": "door",
                        "landmark": "Room 125 AR-VR Lab door"
                    },
                    "rd_126": {
                        "x": 3024,
                        "z": 1341,
                        "px": 1287,
                        "py": 539,
                        "type": "door",
                        "landmark": "Room 126 Class Room door"
                    },
                    "rd_107A": {
                        "x": 201,
                        "z": 137,
                        "px": 150,
                        "py": 99,
                        "type": "door",
                        "landmark": "Room 107A Smart Room door"
                    },
                    "rd_107B": {
                        "x": 370,
                        "z": 31,
                        "px": 218,
                        "py": 60,
                        "type": "door",
                        "landmark": "Room 107B Staff Room door"
                    },
                    "rd_103A": {
                        "x": 241,
                        "z": 1497,
                        "px": 166,
                        "py": 596,
                        "type": "door",
                        "landmark": "Room 103A Lab door"
                    },
                    "rd_103B": {
                        "x": 238,
                        "z": 1609,
                        "px": 165,
                        "py": 637,
                        "type": "door",
                        "landmark": "Room 103B Lab door"
                    },
                    "rd_director_office": {
                        "x": 1758,
                        "z": 553,
                        "px": 777,
                        "py": 251,
                        "type": "door",
                        "landmark": "Director Office door"
                    },
                    "rd_atrium": {
                        "x": 1641,
                        "z": 1453,
                        "px": 730,
                        "py": 580,
                        "type": "door",
                        "landmark": "Atrium entrance"
                    },
                    "cp_left_top": {
                        "x": 422,
                        "z": 31,
                        "px": 239,
                        "py": 60,
                        "type": "corridor",
                        "landmark": "Left corridor top end"
                    },
                    "cp_j_top_left": {
                        "x": 422,
                        "z": 586,
                        "px": 239,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Top-Left corridor junction"
                    },
                    "cp_j_bot_left": {
                        "x": 422,
                        "z": 1229,
                        "px": 239,
                        "py": 498,
                        "type": "corridor",
                        "landmark": "Bottom-Left corridor junction"
                    },
                    "cp_left_bot": {
                        "x": 422,
                        "z": 1645,
                        "px": 239,
                        "py": 650,
                        "type": "corridor",
                        "landmark": "Left corridor south end"
                    },
                    "cp_j_top_wash": {
                        "x": 1353,
                        "z": 586,
                        "px": 614,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Top-Washroom corridor junction"
                    },
                    "cp_j_top_east": {
                        "x": 2182,
                        "z": 586,
                        "px": 948,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Top-East corridor junction"
                    },
                    "cp_wash_top": {
                        "x": 1353,
                        "z": -16,
                        "px": 614,
                        "py": 43,
                        "type": "corridor",
                        "landmark": "Washroom entrance corridor"
                    },
                    "cp_j_bot_wash": {
                        "x": 1353,
                        "z": 1229,
                        "px": 614,
                        "py": 498,
                        "type": "corridor",
                        "landmark": "Bottom-Washroom corridor junction"
                    },
                    "cp_j_bridge_east": {
                        "x": 2182,
                        "z": 838,
                        "px": 948,
                        "py": 355,
                        "type": "corridor",
                        "landmark": "East corridor & Right Wing bridge junction"
                    },
                    "cp_j_bot_east": {
                        "x": 2182,
                        "z": 1229,
                        "px": 948,
                        "py": 498,
                        "type": "corridor",
                        "landmark": "Bottom-East corridor junction"
                    },
                    "cp_j_bridge_rw": {
                        "x": 3215,
                        "z": 838,
                        "px": 1364,
                        "py": 355,
                        "type": "corridor",
                        "landmark": "Right Wing & bridge junction"
                    },
                    "cp_rw_top": {
                        "x": 3215,
                        "z": 61,
                        "px": 1364,
                        "py": 71,
                        "type": "corridor",
                        "landmark": "Right wing north stairs"
                    },
                    "cp_rw_bot": {
                        "x": 3215,
                        "z": 1749,
                        "px": 1364,
                        "py": 688,
                        "type": "corridor",
                        "landmark": "Right wing south end"
                    },
                    "cp_proj_rd_101": {
                        "x": 700,
                        "z": 1229,
                        "px": 351,
                        "py": 498,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 101 Dr. APJ Abdul Kalam Hall door"
                    },
                    "cp_proj_rd_102": {
                        "x": 571,
                        "z": 1229,
                        "px": 299,
                        "py": 498,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 102 Lab door"
                    },
                    "cp_proj_rd_104": {
                        "x": 422,
                        "z": 1065,
                        "px": 239,
                        "py": 438,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 104 Block Chain Technology door"
                    },
                    "cp_proj_rd_105": {
                        "x": 422,
                        "z": 657,
                        "px": 239,
                        "py": 289,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 105 Dean Block door"
                    },
                    "cp_proj_rd_106": {
                        "x": 422,
                        "z": 411,
                        "px": 239,
                        "py": 199,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 106 Robotics Lab door"
                    },
                    "cp_proj_rd_108": {
                        "x": 568,
                        "z": 586,
                        "px": 298,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 108 Physics Lab door"
                    },
                    "cp_proj_rd_110": {
                        "x": 1189,
                        "z": 586,
                        "px": 548,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 110 Staff Room door"
                    },
                    "cp_proj_rd_111": {
                        "x": 1189,
                        "z": 586,
                        "px": 548,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 111 Physics Lab door"
                    },
                    "cp_proj_rd_112": {
                        "x": 1353,
                        "z": -16,
                        "px": 614,
                        "py": 43,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 112 Girls Washroom door"
                    },
                    "cp_proj_rd_113": {
                        "x": 1353,
                        "z": 74,
                        "px": 614,
                        "py": 76,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 113 Boys Washroom door"
                    },
                    "cp_proj_rd_114": {
                        "x": 1589,
                        "z": 586,
                        "px": 709,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 114 Board Room door"
                    },
                    "cp_proj_rd_115": {
                        "x": 1822,
                        "z": 586,
                        "px": 803,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 115 door"
                    },
                    "cp_proj_rd_116": {
                        "x": 1974,
                        "z": 586,
                        "px": 864,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 116 door"
                    },
                    "cp_proj_rd_117": {
                        "x": 2170,
                        "z": 586,
                        "px": 943,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 117 Girls Common Room door"
                    },
                    "cp_proj_rd_118": {
                        "x": 3215,
                        "z": 583,
                        "px": 1364,
                        "py": 262,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 118 Class Room door"
                    },
                    "cp_proj_rd_119": {
                        "x": 3215,
                        "z": 195,
                        "px": 1364,
                        "py": 120,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 119 Class Room door"
                    },
                    "cp_proj_rd_120": {
                        "x": 3215,
                        "z": 184,
                        "px": 1364,
                        "py": 116,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 120 Class Room door"
                    },
                    "cp_proj_rd_121": {
                        "x": 3215,
                        "z": 581,
                        "px": 1364,
                        "py": 261,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 121 Class Room door"
                    },
                    "cp_proj_rd_122": {
                        "x": 3215,
                        "z": 821,
                        "px": 1364,
                        "py": 349,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 122 Dean First Year door"
                    },
                    "cp_proj_rd_123": {
                        "x": 3215,
                        "z": 1232,
                        "px": 1364,
                        "py": 499,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 123 Language Lab door"
                    },
                    "cp_proj_rd_124": {
                        "x": 3215,
                        "z": 1629,
                        "px": 1364,
                        "py": 644,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 124 Class Room door"
                    },
                    "cp_proj_rd_125": {
                        "x": 3215,
                        "z": 1585,
                        "px": 1364,
                        "py": 628,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 125 AR-VR Lab door"
                    },
                    "cp_proj_rd_126": {
                        "x": 3215,
                        "z": 1341,
                        "px": 1364,
                        "py": 539,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 126 Class Room door"
                    },
                    "cp_proj_rd_107A": {
                        "x": 422,
                        "z": 137,
                        "px": 239,
                        "py": 99,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 107A Smart Room door"
                    },
                    "cp_proj_rd_107B": {
                        "x": 422,
                        "z": 31,
                        "px": 239,
                        "py": 60,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 107B Staff Room door"
                    },
                    "cp_proj_rd_103A": {
                        "x": 422,
                        "z": 1497,
                        "px": 239,
                        "py": 596,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 103A Lab door"
                    },
                    "cp_proj_rd_103B": {
                        "x": 422,
                        "z": 1609,
                        "px": 239,
                        "py": 637,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 103B Lab door"
                    },
                    "cp_proj_rd_director_office": {
                        "x": 1758,
                        "z": 586,
                        "px": 777,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Corridor outside Director Office door"
                    },
                    "cp_proj_rd_atrium": {
                        "x": 1641,
                        "z": 1229,
                        "px": 730,
                        "py": 498,
                        "type": "corridor",
                        "landmark": "Corridor outside Atrium entrance"
                    }
                },
                "graphEdges": [
                    [
                        "cp_left_top",
                        "cp_proj_rd_107B"
                    ],
                    [
                        "cp_proj_rd_107B",
                        "cp_proj_rd_107A"
                    ],
                    [
                        "cp_proj_rd_107A",
                        "cp_proj_rd_106"
                    ],
                    [
                        "cp_proj_rd_106",
                        "cp_j_top_left"
                    ],
                    [
                        "cp_j_top_left",
                        "cp_proj_rd_105"
                    ],
                    [
                        "cp_proj_rd_105",
                        "cp_proj_rd_104"
                    ],
                    [
                        "cp_proj_rd_104",
                        "cp_j_bot_left"
                    ],
                    [
                        "cp_j_bot_left",
                        "cp_proj_rd_103A"
                    ],
                    [
                        "cp_proj_rd_103A",
                        "cp_proj_rd_103B"
                    ],
                    [
                        "cp_proj_rd_103B",
                        "cp_left_bot"
                    ],
                    [
                        "cp_j_top_left",
                        "cp_proj_rd_108"
                    ],
                    [
                        "cp_proj_rd_108",
                        "cp_proj_rd_110"
                    ],
                    [
                        "cp_proj_rd_110",
                        "cp_proj_rd_111"
                    ],
                    [
                        "cp_proj_rd_111",
                        "cp_j_top_wash"
                    ],
                    [
                        "cp_j_top_wash",
                        "cp_proj_rd_114"
                    ],
                    [
                        "cp_proj_rd_114",
                        "cp_proj_rd_director_office"
                    ],
                    [
                        "cp_proj_rd_director_office",
                        "cp_proj_rd_115"
                    ],
                    [
                        "cp_proj_rd_115",
                        "cp_proj_rd_116"
                    ],
                    [
                        "cp_proj_rd_116",
                        "cp_proj_rd_117"
                    ],
                    [
                        "cp_proj_rd_117",
                        "cp_j_top_east"
                    ],
                    [
                        "cp_wash_top",
                        "cp_proj_rd_112"
                    ],
                    [
                        "cp_proj_rd_112",
                        "cp_proj_rd_113"
                    ],
                    [
                        "cp_proj_rd_113",
                        "cp_j_top_wash"
                    ],
                    [
                        "cp_j_top_wash",
                        "cp_j_bot_wash"
                    ],
                    [
                        "cp_j_top_east",
                        "cp_j_bridge_east"
                    ],
                    [
                        "cp_j_bridge_east",
                        "cp_j_bot_east"
                    ],
                    [
                        "cp_j_bridge_east",
                        "cp_j_bridge_rw"
                    ],
                    [
                        "cp_rw_top",
                        "cp_proj_rd_120"
                    ],
                    [
                        "cp_proj_rd_120",
                        "cp_proj_rd_119"
                    ],
                    [
                        "cp_proj_rd_119",
                        "cp_proj_rd_121"
                    ],
                    [
                        "cp_proj_rd_121",
                        "cp_proj_rd_118"
                    ],
                    [
                        "cp_proj_rd_118",
                        "cp_proj_rd_122"
                    ],
                    [
                        "cp_proj_rd_122",
                        "cp_j_bridge_rw"
                    ],
                    [
                        "cp_j_bridge_rw",
                        "cp_proj_rd_123"
                    ],
                    [
                        "cp_proj_rd_123",
                        "cp_proj_rd_126"
                    ],
                    [
                        "cp_proj_rd_126",
                        "cp_proj_rd_125"
                    ],
                    [
                        "cp_proj_rd_125",
                        "cp_proj_rd_124"
                    ],
                    [
                        "cp_proj_rd_124",
                        "cp_rw_bot"
                    ],
                    [
                        "cp_j_bot_left",
                        "cp_proj_rd_102"
                    ],
                    [
                        "cp_proj_rd_102",
                        "cp_proj_rd_101"
                    ],
                    [
                        "cp_proj_rd_101",
                        "cp_j_bot_wash"
                    ],
                    [
                        "cp_j_bot_wash",
                        "cp_proj_rd_atrium"
                    ],
                    [
                        "cp_proj_rd_atrium",
                        "cp_j_bot_east"
                    ],
                    [
                        "rd_101",
                        "cp_proj_rd_101"
                    ],
                    [
                        "rd_102",
                        "cp_proj_rd_102"
                    ],
                    [
                        "rd_104",
                        "cp_proj_rd_104"
                    ],
                    [
                        "rd_105",
                        "cp_proj_rd_105"
                    ],
                    [
                        "rd_106",
                        "cp_proj_rd_106"
                    ],
                    [
                        "rd_108",
                        "cp_proj_rd_108"
                    ],
                    [
                        "rd_110",
                        "cp_proj_rd_110"
                    ],
                    [
                        "rd_111",
                        "cp_proj_rd_111"
                    ],
                    [
                        "rd_112",
                        "cp_proj_rd_112"
                    ],
                    [
                        "rd_113",
                        "cp_proj_rd_113"
                    ],
                    [
                        "rd_114",
                        "cp_proj_rd_114"
                    ],
                    [
                        "rd_115",
                        "cp_proj_rd_115"
                    ],
                    [
                        "rd_116",
                        "cp_proj_rd_116"
                    ],
                    [
                        "rd_117",
                        "cp_proj_rd_117"
                    ],
                    [
                        "rd_118",
                        "cp_proj_rd_118"
                    ],
                    [
                        "rd_119",
                        "cp_proj_rd_119"
                    ],
                    [
                        "rd_120",
                        "cp_proj_rd_120"
                    ],
                    [
                        "rd_121",
                        "cp_proj_rd_121"
                    ],
                    [
                        "rd_122",
                        "cp_proj_rd_122"
                    ],
                    [
                        "rd_123",
                        "cp_proj_rd_123"
                    ],
                    [
                        "rd_124",
                        "cp_proj_rd_124"
                    ],
                    [
                        "rd_125",
                        "cp_proj_rd_125"
                    ],
                    [
                        "rd_126",
                        "cp_proj_rd_126"
                    ],
                    [
                        "rd_107A",
                        "cp_proj_rd_107A"
                    ],
                    [
                        "rd_107B",
                        "cp_proj_rd_107B"
                    ],
                    [
                        "rd_103A",
                        "cp_proj_rd_103A"
                    ],
                    [
                        "rd_103B",
                        "cp_proj_rd_103B"
                    ],
                    [
                        "rd_director_office",
                        "cp_proj_rd_director_office"
                    ],
                    [
                        "rd_atrium",
                        "cp_proj_rd_atrium"
                    ]
                ],
                "roomToNode": {
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
            "2": {
                "name": "2nd Floor",
                "shortName": "2F",
                "folder": "B-Block/2th floor/",
                "mtlFile": "2nd_floor.mtl",
                "objFile": "2nd floor.obj",
                "planImage": "B-Block/2nd floor.jpg",
                "planSize": {
                    "width": 3790,
                    "depth": 1947.5
                },
                "rooms": [
                    {
                        "id": "201",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_120_563"
                    },
                    {
                        "id": "202",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_125_568"
                    },
                    {
                        "id": "207",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_128_571"
                    },
                    {
                        "id": "208",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_129_572"
                    },
                    {
                        "id": "209",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_130_573"
                    },
                    {
                        "id": "216",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_136_579"
                    },
                    {
                        "id": "204",
                        "name": "Surveying Lab (204 A & 204 B)",
                        "category": "lab",
                        "labelGroup": "label_121_564"
                    },
                    {
                        "id": "206",
                        "name": "Geotechnical Engineering Lab",
                        "category": "lab",
                        "labelGroup": "label_127_570"
                    },
                    {
                        "id": "210",
                        "name": "Matrix analysis of structure Lab",
                        "category": "lab",
                        "labelGroup": "label_144_587"
                    },
                    {
                        "id": "211",
                        "name": "Environmental Engineering Lab",
                        "category": "lab",
                        "labelGroup": "label_131_574"
                    },
                    {
                        "id": "218",
                        "name": "Lab",
                        "category": "lab",
                        "labelGroup": "label_138_581"
                    },
                    {
                        "id": "219",
                        "name": "Computer Application Lab",
                        "category": "lab",
                        "labelGroup": "label_139_582"
                    },
                    {
                        "id": "220",
                        "name": "Dynamics of machines Lab",
                        "category": "lab",
                        "labelGroup": "label_140_583"
                    },
                    {
                        "id": "221",
                        "name": "PG research Lab & automation in production Lab",
                        "category": "lab",
                        "labelGroup": "label_141_584"
                    },
                    {
                        "id": "222",
                        "name": "Engineering Metallurgy Lab",
                        "category": "lab",
                        "labelGroup": "label_142_585"
                    },
                    {
                        "id": "205",
                        "name": "Department of Civil Engineering (205 A & 205 B)",
                        "category": "dept",
                        "labelGroup": "label_126_569"
                    },
                    {
                        "id": "215",
                        "name": "HOD Cabin",
                        "category": "dept",
                        "labelGroup": "label_135_578"
                    },
                    {
                        "id": "223",
                        "name": "Department of Diploma in Mechanical Engineering",
                        "category": "dept",
                        "labelGroup": "label_143_586"
                    },
                    {
                        "id": "203",
                        "name": "Ekalavya Seminar Hall",
                        "category": "seminar",
                        "labelGroup": "label_124_567"
                    },
                    {
                        "id": "212",
                        "name": "Dance Room",
                        "category": "special",
                        "labelGroup": "label_132_575"
                    },
                    {
                        "id": "224",
                        "name": "Examination Cell",
                        "category": "special",
                        "labelGroup": ""
                    },
                    {
                        "id": "213",
                        "name": "Girls Washroom",
                        "category": "utility",
                        "labelGroup": "label_133_576"
                    },
                    {
                        "id": "214",
                        "name": "Boys Washroom",
                        "category": "utility",
                        "labelGroup": "label_134_577"
                    },
                    {
                        "id": "217",
                        "name": "Girls Common Room",
                        "category": "utility",
                        "labelGroup": "label_137_580"
                    },
                    {
                        "id": "lift1",
                        "name": "Elevator 1",
                        "category": "utility",
                        "labelGroup": "label_122_565"
                    },
                    {
                        "id": "lift2",
                        "name": "Elevator 2",
                        "category": "utility",
                        "labelGroup": "label_123_566"
                    }
                ],
                "roomCoords": {
                    "201": {
                        "x": 810.1,
                        "y": 2,
                        "z": 1502
                    },
                    "202": {
                        "x": 802.3,
                        "y": 2,
                        "z": 1352.4
                    },
                    "203": {
                        "x": 541.6,
                        "y": 2,
                        "z": 1445.6
                    },
                    "204": {
                        "x": 196.3,
                        "y": 2,
                        "z": 1423
                    },
                    "205": {
                        "x": 163.5,
                        "y": 2,
                        "z": 1061.9
                    },
                    "206": {
                        "x": 159.2,
                        "y": 2,
                        "z": 732.7
                    },
                    "207": {
                        "x": 133.1,
                        "y": 2,
                        "z": 356.7
                    },
                    "208": {
                        "x": 125.6,
                        "y": 2,
                        "z": 105.1
                    },
                    "209": {
                        "x": 744.1,
                        "y": 2,
                        "z": 97
                    },
                    "210": {
                        "x": 721.8,
                        "y": 2,
                        "z": 392.2
                    },
                    "211": {
                        "x": 1068.6,
                        "y": 2,
                        "z": 365.6
                    },
                    "212": {
                        "x": 1038.9,
                        "y": 2,
                        "z": 103.5
                    },
                    "213": {
                        "x": 1383.7,
                        "y": 2,
                        "z": 38.7
                    },
                    "214": {
                        "x": 1638.4,
                        "y": 2,
                        "z": 55.7
                    },
                    "215": {
                        "x": 1640.9,
                        "y": 2,
                        "z": 315.3
                    },
                    "216": {
                        "x": 1836.6,
                        "y": 2,
                        "z": 263.5
                    },
                    "217": {
                        "x": 1984.7,
                        "y": 2,
                        "z": 262.4
                    },
                    "218": {
                        "x": 2157.6,
                        "y": 2,
                        "z": 255.9
                    },
                    "219": {
                        "x": 2929.3,
                        "y": 2,
                        "z": 461.7
                    },
                    "220": {
                        "x": 2911.5,
                        "y": 2,
                        "z": 127
                    },
                    "221": {
                        "x": 3530.9,
                        "y": 2,
                        "z": 146.5
                    },
                    "222": {
                        "x": 3516.3,
                        "y": 2,
                        "z": 475
                    },
                    "223": {
                        "x": 3523.3,
                        "y": 2,
                        "z": 909.5
                    },
                    "224": {
                        "x": 3222,
                        "y": 2,
                        "z": 1420
                    },
                    "lift1": {
                        "x": 619.9,
                        "y": 2,
                        "z": 891.4
                    },
                    "lift2": {
                        "x": 2027.8,
                        "y": 2,
                        "z": 844.5
                    }
                },
                "dynamicLabels": [
                    {
                        "textLines": [
                            "224",
                            "Examination Cell"
                        ],
                        "width": 240,
                        "height": 120,
                        "position": {
                            "x": 3222,
                            "y": 1.8,
                            "z": 1420
                        },
                        "roomId": "224",
                        "category": "special"
                    }
                ],
                "graphNodes": {
                    "rd_208": {
                        "x": 320,
                        "z": 137,
                        "px": 320,
                        "py": 137,
                        "type": "door",
                        "landmark": "Room 208 Class Room door"
                    },
                    "rd_207": {
                        "x": 320,
                        "z": 357,
                        "px": 320,
                        "py": 357,
                        "type": "door",
                        "landmark": "Room 207 Class Room door"
                    },
                    "rd_206": {
                        "x": 320,
                        "z": 733,
                        "px": 320,
                        "py": 733,
                        "type": "door",
                        "landmark": "Room 206 Geotechnical Engineering Lab door"
                    },
                    "rd_205": {
                        "x": 320,
                        "z": 1062,
                        "px": 320,
                        "py": 1062,
                        "type": "door",
                        "landmark": "Room 205 Dept of Civil Engineering door"
                    },
                    "rd_204": {
                        "x": 350,
                        "z": 1256,
                        "px": 350,
                        "py": 1256,
                        "type": "door",
                        "landmark": "Room 204 Surveying Lab door"
                    },
                    "rd_203": {
                        "x": 542,
                        "z": 1256,
                        "px": 542,
                        "py": 1256,
                        "type": "door",
                        "landmark": "Room 203 Ekalavya Seminar Hall door"
                    },
                    "rd_202": {
                        "x": 802,
                        "z": 1256,
                        "px": 802,
                        "py": 1256,
                        "type": "door",
                        "landmark": "Room 202 Class Room door"
                    },
                    "rd_201": {
                        "x": 915,
                        "z": 1502,
                        "px": 915,
                        "py": 1502,
                        "type": "door",
                        "landmark": "Room 201 Class Room door"
                    },
                    "rd_209": {
                        "x": 540,
                        "z": 137,
                        "px": 540,
                        "py": 137,
                        "type": "door",
                        "landmark": "Room 209 Class Room door"
                    },
                    "rd_210": {
                        "x": 540,
                        "z": 357,
                        "px": 540,
                        "py": 357,
                        "type": "door",
                        "landmark": "Room 210 Matrix analysis of structure Lab door"
                    },
                    "rd_212": {
                        "x": 1255,
                        "z": 140,
                        "px": 1255,
                        "py": 140,
                        "type": "door",
                        "landmark": "Room 212 Dance Room door"
                    },
                    "rd_211": {
                        "x": 1255,
                        "z": 470,
                        "px": 1255,
                        "py": 470,
                        "type": "door",
                        "landmark": "Room 211 Environmental Engineering Lab door"
                    },
                    "rd_213": {
                        "x": 1353,
                        "z": 60,
                        "px": 1353,
                        "py": 60,
                        "type": "door",
                        "landmark": "Room 213 Girls Washroom door"
                    },
                    "rd_214": {
                        "x": 1515,
                        "z": 80,
                        "px": 1515,
                        "py": 80,
                        "type": "door",
                        "landmark": "Room 214 Boys Washroom door"
                    },
                    "rd_215": {
                        "x": 1640,
                        "z": 495,
                        "px": 1640,
                        "py": 495,
                        "type": "door",
                        "landmark": "Room 215 HOD Cabin door"
                    },
                    "rd_216": {
                        "x": 1836,
                        "z": 495,
                        "px": 1836,
                        "py": 495,
                        "type": "door",
                        "landmark": "Room 216 Class Room door"
                    },
                    "rd_217": {
                        "x": 1984,
                        "z": 495,
                        "px": 1984,
                        "py": 495,
                        "type": "door",
                        "landmark": "Room 217 Girls Common Room door"
                    },
                    "rd_218": {
                        "x": 2157,
                        "z": 495,
                        "px": 2157,
                        "py": 495,
                        "type": "door",
                        "landmark": "Room 218 Lab door"
                    },
                    "rd_lift1": {
                        "x": 540,
                        "z": 838,
                        "px": 540,
                        "py": 838,
                        "type": "door",
                        "landmark": "Elevator 1"
                    },
                    "rd_lift2": {
                        "x": 2028,
                        "z": 838,
                        "px": 2028,
                        "py": 838,
                        "type": "door",
                        "landmark": "Elevator 2"
                    },
                    "rd_220": {
                        "x": 3108,
                        "z": 195,
                        "px": 3108,
                        "py": 195,
                        "type": "door",
                        "landmark": "Room 220 Dynamics of machines Lab door"
                    },
                    "rd_219": {
                        "x": 3108,
                        "z": 462,
                        "px": 3108,
                        "py": 462,
                        "type": "door",
                        "landmark": "Room 219 Computer Application Lab door"
                    },
                    "rd_221": {
                        "x": 3343,
                        "z": 184,
                        "px": 3343,
                        "py": 184,
                        "type": "door",
                        "landmark": "Room 221 PG research Lab door"
                    },
                    "rd_222": {
                        "x": 3343,
                        "z": 475,
                        "px": 3343,
                        "py": 475,
                        "type": "door",
                        "landmark": "Room 222 Engineering Metallurgy Lab door"
                    },
                    "rd_223": {
                        "x": 3343,
                        "z": 890,
                        "px": 3343,
                        "py": 890,
                        "type": "door",
                        "landmark": "Room 223 Dept of Mechanical Diploma door"
                    },
                    "rd_224": {
                        "x": 3215,
                        "z": 1110,
                        "px": 3215,
                        "py": 1110,
                        "type": "door",
                        "landmark": "Room 224 Examination Cell door"
                    },
                    "cp_left_top": {
                        "x": 422,
                        "z": 31,
                        "px": 239,
                        "py": 60,
                        "type": "corridor",
                        "landmark": "West corridor north end"
                    },
                    "cp_j_top_left": {
                        "x": 422,
                        "z": 580,
                        "px": 239,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Top-Left corridor junction"
                    },
                    "cp_j_bot_left": {
                        "x": 422,
                        "z": 1180,
                        "px": 239,
                        "py": 498,
                        "type": "corridor",
                        "landmark": "Bottom-Left corridor junction"
                    },
                    "cp_left_bot": {
                        "x": 422,
                        "z": 1256,
                        "px": 239,
                        "py": 650,
                        "type": "corridor",
                        "landmark": "West corridor south end outside Room 204"
                    },
                    "cp_j_top_mid": {
                        "x": 1353,
                        "z": 580,
                        "px": 614,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Top-Middle corridor junction"
                    },
                    "cp_j_bot_mid": {
                        "x": 1353,
                        "z": 1180,
                        "px": 614,
                        "py": 498,
                        "type": "corridor",
                        "landmark": "Bottom-Middle corridor junction"
                    },
                    "cp_mid_top": {
                        "x": 1353,
                        "z": 60,
                        "px": 614,
                        "py": 43,
                        "type": "corridor",
                        "landmark": "Middle corridor north end (Washrooms)"
                    },
                    "cp_j_top_east": {
                        "x": 2182,
                        "z": 580,
                        "px": 948,
                        "py": 263,
                        "type": "corridor",
                        "landmark": "Top-East corridor junction"
                    },
                    "cp_j_bridge_east": {
                        "x": 2182,
                        "z": 838,
                        "px": 948,
                        "py": 355,
                        "type": "corridor",
                        "landmark": "East corridor & Right Wing bridge junction"
                    },
                    "cp_j_bot_east": {
                        "x": 2182,
                        "z": 1180,
                        "px": 948,
                        "py": 498,
                        "type": "corridor",
                        "landmark": "Bottom-East corridor junction"
                    },
                    "cp_j_bridge_rw": {
                        "x": 3215,
                        "z": 838,
                        "px": 1364,
                        "py": 355,
                        "type": "corridor",
                        "landmark": "Right Wing & bridge junction"
                    },
                    "cp_rw_top": {
                        "x": 3215,
                        "z": 61,
                        "px": 1364,
                        "py": 71,
                        "type": "corridor",
                        "landmark": "Right wing north stairs"
                    },
                    "cp_rw_bot": {
                        "x": 3215,
                        "z": 1450,
                        "px": 1364,
                        "py": 688,
                        "type": "corridor",
                        "landmark": "Right wing south end"
                    },
                    "cp_proj_rd_208": {
                        "x": 422,
                        "z": 137,
                        "px": 422,
                        "py": 137,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 208 and 209"
                    },
                    "cp_proj_rd_207": {
                        "x": 422,
                        "z": 357,
                        "px": 422,
                        "py": 357,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 207 and 210"
                    },
                    "cp_proj_rd_206": {
                        "x": 422,
                        "z": 733,
                        "px": 422,
                        "py": 733,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 206"
                    },
                    "cp_proj_rd_lift1": {
                        "x": 422,
                        "z": 838,
                        "px": 422,
                        "py": 838,
                        "type": "corridor",
                        "landmark": "Corridor outside Elevator 1"
                    },
                    "cp_proj_rd_205": {
                        "x": 422,
                        "z": 1062,
                        "px": 422,
                        "py": 1062,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 205"
                    },
                    "cp_proj_rd_214": {
                        "x": 1353,
                        "z": 80,
                        "px": 1353,
                        "py": 80,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 214 Boys Washroom"
                    },
                    "cp_proj_rd_212": {
                        "x": 1353,
                        "z": 140,
                        "px": 1353,
                        "py": 140,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 212 Dance Room"
                    },
                    "cp_proj_rd_211": {
                        "x": 1353,
                        "z": 470,
                        "px": 1353,
                        "py": 470,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 211 Environmental Lab"
                    },
                    "cp_proj_rd_215": {
                        "x": 1640,
                        "z": 580,
                        "px": 1640,
                        "py": 580,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 215 HOD Cabin"
                    },
                    "cp_proj_rd_216": {
                        "x": 1836,
                        "z": 580,
                        "px": 1836,
                        "py": 580,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 216 Class Room"
                    },
                    "cp_proj_rd_217": {
                        "x": 1984,
                        "z": 580,
                        "px": 1984,
                        "py": 580,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 217 Girls Common Room"
                    },
                    "cp_proj_rd_218": {
                        "x": 2157,
                        "z": 580,
                        "px": 2157,
                        "py": 580,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 218 Lab"
                    },
                    "cp_proj_rd_203": {
                        "x": 542,
                        "z": 1180,
                        "px": 542,
                        "py": 1180,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 203 Ekalavya Seminar Hall"
                    },
                    "cp_proj_rd_202": {
                        "x": 802,
                        "z": 1180,
                        "px": 802,
                        "py": 1180,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 202 Class Room"
                    },
                    "cp_j_south_stairs": {
                        "x": 960,
                        "z": 1180,
                        "px": 960,
                        "py": 1180,
                        "type": "corridor",
                        "landmark": "South corridor junction to stairs and Room 201"
                    },
                    "cp_south_stub_bot": {
                        "x": 960,
                        "z": 1502,
                        "px": 960,
                        "py": 1502,
                        "type": "corridor",
                        "landmark": "South hallway outside Room 201 Class Room"
                    },
                    "cp_proj_rd_221": {
                        "x": 3215,
                        "z": 184,
                        "px": 3215,
                        "py": 184,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 221 PG research Lab"
                    },
                    "cp_proj_rd_220": {
                        "x": 3215,
                        "z": 195,
                        "px": 3215,
                        "py": 195,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 220 Dynamics of machines Lab"
                    },
                    "cp_proj_rd_219": {
                        "x": 3215,
                        "z": 462,
                        "px": 3215,
                        "py": 462,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 219 Computer Application Lab"
                    },
                    "cp_proj_rd_222": {
                        "x": 3215,
                        "z": 475,
                        "px": 3215,
                        "py": 475,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 222 Engineering Metallurgy Lab"
                    },
                    "cp_proj_rd_223": {
                        "x": 3215,
                        "z": 890,
                        "px": 3215,
                        "py": 890,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 223 Dept of Mechanical Diploma"
                    },
                    "cp_proj_rd_224": {
                        "x": 3215,
                        "z": 1110,
                        "px": 3215,
                        "py": 1110,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 224 Examination Cell"
                    }
                },
                "graphEdges": [
                    [
                        "cp_left_top",
                        "cp_proj_rd_208"
                    ],
                    [
                        "cp_proj_rd_208",
                        "cp_proj_rd_207"
                    ],
                    [
                        "cp_proj_rd_207",
                        "cp_j_top_left"
                    ],
                    [
                        "cp_j_top_left",
                        "cp_proj_rd_206"
                    ],
                    [
                        "cp_proj_rd_206",
                        "cp_proj_rd_lift1"
                    ],
                    [
                        "cp_proj_rd_lift1",
                        "cp_proj_rd_205"
                    ],
                    [
                        "cp_proj_rd_205",
                        "cp_j_bot_left"
                    ],
                    [
                        "cp_j_bot_left",
                        "cp_left_bot"
                    ],
                    [
                        "cp_j_top_left",
                        "cp_j_top_mid"
                    ],
                    [
                        "cp_j_top_mid",
                        "cp_proj_rd_215"
                    ],
                    [
                        "cp_proj_rd_215",
                        "cp_proj_rd_216"
                    ],
                    [
                        "cp_proj_rd_216",
                        "cp_proj_rd_217"
                    ],
                    [
                        "cp_proj_rd_217",
                        "cp_proj_rd_218"
                    ],
                    [
                        "cp_proj_rd_218",
                        "cp_j_top_east"
                    ],
                    [
                        "cp_mid_top",
                        "cp_proj_rd_214"
                    ],
                    [
                        "cp_proj_rd_214",
                        "cp_proj_rd_212"
                    ],
                    [
                        "cp_proj_rd_212",
                        "cp_proj_rd_211"
                    ],
                    [
                        "cp_proj_rd_211",
                        "cp_j_top_mid"
                    ],
                    [
                        "cp_j_top_mid",
                        "cp_j_bot_mid"
                    ],
                    [
                        "cp_j_bot_left",
                        "cp_proj_rd_203"
                    ],
                    [
                        "cp_proj_rd_203",
                        "cp_proj_rd_202"
                    ],
                    [
                        "cp_proj_rd_202",
                        "cp_j_south_stairs"
                    ],
                    [
                        "cp_j_south_stairs",
                        "cp_j_bot_mid"
                    ],
                    [
                        "cp_j_bot_mid",
                        "cp_j_bot_east"
                    ],
                    [
                        "cp_j_south_stairs",
                        "cp_south_stub_bot"
                    ],
                    [
                        "cp_j_top_east",
                        "cp_j_bridge_east"
                    ],
                    [
                        "cp_j_bridge_east",
                        "cp_j_bot_east"
                    ],
                    [
                        "cp_j_bridge_east",
                        "cp_j_bridge_rw"
                    ],
                    [
                        "cp_rw_top",
                        "cp_proj_rd_221"
                    ],
                    [
                        "cp_proj_rd_221",
                        "cp_proj_rd_220"
                    ],
                    [
                        "cp_proj_rd_220",
                        "cp_proj_rd_219"
                    ],
                    [
                        "cp_proj_rd_219",
                        "cp_proj_rd_222"
                    ],
                    [
                        "cp_proj_rd_222",
                        "cp_j_bridge_rw"
                    ],
                    [
                        "cp_j_bridge_rw",
                        "cp_proj_rd_223"
                    ],
                    [
                        "cp_proj_rd_223",
                        "cp_proj_rd_224"
                    ],
                    [
                        "cp_proj_rd_224",
                        "cp_rw_bot"
                    ],
                    [
                        "rd_208",
                        "cp_proj_rd_208"
                    ],
                    [
                        "rd_209",
                        "cp_proj_rd_208"
                    ],
                    [
                        "rd_207",
                        "cp_proj_rd_207"
                    ],
                    [
                        "rd_210",
                        "cp_proj_rd_207"
                    ],
                    [
                        "rd_206",
                        "cp_proj_rd_206"
                    ],
                    [
                        "rd_lift1",
                        "cp_proj_rd_lift1"
                    ],
                    [
                        "rd_205",
                        "cp_proj_rd_205"
                    ],
                    [
                        "rd_204",
                        "cp_left_bot"
                    ],
                    [
                        "rd_203",
                        "cp_proj_rd_203"
                    ],
                    [
                        "rd_202",
                        "cp_proj_rd_202"
                    ],
                    [
                        "rd_201",
                        "cp_south_stub_bot"
                    ],
                    [
                        "rd_212",
                        "cp_proj_rd_212"
                    ],
                    [
                        "rd_211",
                        "cp_proj_rd_211"
                    ],
                    [
                        "rd_213",
                        "cp_mid_top"
                    ],
                    [
                        "rd_214",
                        "cp_proj_rd_214"
                    ],
                    [
                        "rd_215",
                        "cp_proj_rd_215"
                    ],
                    [
                        "rd_216",
                        "cp_proj_rd_216"
                    ],
                    [
                        "rd_217",
                        "cp_proj_rd_217"
                    ],
                    [
                        "rd_218",
                        "cp_proj_rd_218"
                    ],
                    [
                        "rd_lift2",
                        "cp_j_bridge_east"
                    ],
                    [
                        "rd_220",
                        "cp_proj_rd_220"
                    ],
                    [
                        "rd_219",
                        "cp_proj_rd_219"
                    ],
                    [
                        "rd_221",
                        "cp_proj_rd_221"
                    ],
                    [
                        "rd_222",
                        "cp_proj_rd_222"
                    ],
                    [
                        "rd_223",
                        "cp_proj_rd_223"
                    ],
                    [
                        "rd_224",
                        "cp_proj_rd_224"
                    ]
                ],
                "roomToNode": {
                    "201": "rd_201",
                    "202": "rd_202",
                    "203": "rd_203",
                    "204": "rd_204",
                    "205": "rd_205",
                    "206": "rd_206",
                    "207": "rd_207",
                    "208": "rd_208",
                    "209": "rd_209",
                    "210": "rd_210",
                    "211": "rd_211",
                    "212": "rd_212",
                    "213": "rd_213",
                    "214": "rd_214",
                    "215": "rd_215",
                    "216": "rd_216",
                    "217": "rd_217",
                    "218": "rd_218",
                    "219": "rd_219",
                    "220": "rd_220",
                    "221": "rd_221",
                    "222": "rd_222",
                    "223": "rd_223",
                    "224": "rd_224",
                    "lift1": "rd_lift1",
                    "lift2": "rd_lift2"
                }
            },
            "3": {
                "name": "3rd Floor",
                "shortName": "3F",
                "folder": "B-Block/3th floor/",
                "mtlFile": "3rd_floor.mtl",
                "objFile": "3rd floor.obj",
                "planImage": "B-Block/3rd floor.jpg",
                "planSize": {
                    "width": 3307.9,
                    "depth": 1644.9
                },
                "rooms": [
                    {
                        "id": "304",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_182_774"
                    },
                    {
                        "id": "304B",
                        "name": "Smart Room",
                        "category": "class",
                        "labelGroup": "label_181_773"
                    },
                    {
                        "id": "309",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_187_779"
                    },
                    {
                        "id": "310",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_188_780"
                    },
                    {
                        "id": "317C",
                        "name": "Music Room",
                        "category": "class",
                        "labelGroup": "label_171_763"
                    },
                    {
                        "id": "325",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_175_767"
                    },
                    {
                        "id": "326",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_176_768"
                    },
                    {
                        "id": "327",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_179_771"
                    },
                    {
                        "id": "328",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_178_770"
                    },
                    {
                        "id": "302",
                        "name": "Embedded System Lab",
                        "category": "lab",
                        "labelGroup": "label_180_772"
                    },
                    {
                        "id": "305",
                        "name": "Drone Lab & Robotic Lab",
                        "category": "lab",
                        "labelGroup": "label_183_775"
                    },
                    {
                        "id": "306",
                        "name": "Analog Electronic Lab",
                        "category": "lab",
                        "labelGroup": "label_184_776"
                    },
                    {
                        "id": "308",
                        "name": "Communication & Biomedical Lab",
                        "category": "lab",
                        "labelGroup": "label_186_778"
                    },
                    {
                        "id": "311",
                        "name": "Digital Comm. Lab & VLSI Lab",
                        "category": "lab",
                        "labelGroup": "label_189_781"
                    },
                    {
                        "id": "312",
                        "name": "IOT Lab",
                        "category": "lab",
                        "labelGroup": "label_190_782"
                    },
                    {
                        "id": "313",
                        "name": "Project Lab",
                        "category": "lab",
                        "labelGroup": "label_191_783"
                    },
                    {
                        "id": "319",
                        "name": "Incubation Centre & Project Lab",
                        "category": "lab",
                        "labelGroup": "label_164_756"
                    },
                    {
                        "id": "320",
                        "name": "Computer Aided Design Lab",
                        "category": "lab",
                        "labelGroup": "label_172_764"
                    },
                    {
                        "id": "321",
                        "name": "Heat Transfer Lab",
                        "category": "lab",
                        "labelGroup": "label_177_769"
                    },
                    {
                        "id": "322",
                        "name": "Solar Lab",
                        "category": "lab",
                        "labelGroup": "label_174_766"
                    },
                    {
                        "id": "323",
                        "name": "Mechanical Measurement & Metrology Lab",
                        "category": "lab",
                        "labelGroup": "label_173_765"
                    },
                    {
                        "id": "407",
                        "name": "Department of ETC",
                        "category": "dept",
                        "labelGroup": "label_185_777"
                    },
                    {
                        "id": "317",
                        "name": "Department of Civil & ETC Diploma",
                        "category": "dept",
                        "labelGroup": "label_170_762"
                    },
                    {
                        "id": "324",
                        "name": "Department of Mechanical",
                        "category": "dept",
                        "labelGroup": "label_168_760"
                    },
                    {
                        "id": "301",
                        "name": "Dr. CV Raman Seminar Hall",
                        "category": "seminar",
                        "labelGroup": "label_165_757"
                    },
                    {
                        "id": "314",
                        "name": "Girls Washroom",
                        "category": "utility",
                        "labelGroup": "label_162_754"
                    },
                    {
                        "id": "315_316",
                        "name": "315 Washroom & 316 Staff Washroom",
                        "category": "utility",
                        "labelGroup": "label_169_761"
                    },
                    {
                        "id": "318",
                        "name": "Girls Common Room",
                        "category": "utility",
                        "labelGroup": "label_163_755"
                    },
                    {
                        "id": "329",
                        "name": "Central Library",
                        "category": "utility",
                        "labelGroup": "room_155_746"
                    },
                    {
                        "id": "lift1",
                        "name": "LIFT (West)",
                        "category": "utility",
                        "labelGroup": "label_166_758"
                    },
                    {
                        "id": "lift2",
                        "name": "LIFT (East)",
                        "category": "utility",
                        "labelGroup": "label_167_759"
                    }
                ],
                "roomCoords": {
                    "301": {
                        "x": 854,
                        "y": 2,
                        "z": 1091
                    },
                    "302": {
                        "x": 684,
                        "y": 2,
                        "z": 1091
                    },
                    "304": {
                        "x": 243,
                        "y": 2,
                        "z": 1368
                    },
                    "305": {
                        "x": 245,
                        "y": 2,
                        "z": 1234
                    },
                    "306": {
                        "x": 247,
                        "y": 2,
                        "z": 878
                    },
                    "308": {
                        "x": 238,
                        "y": 2,
                        "z": 492
                    },
                    "309": {
                        "x": 222,
                        "y": 2,
                        "z": 268
                    },
                    "310": {
                        "x": 490,
                        "y": 2,
                        "z": 254
                    },
                    "311": {
                        "x": 540,
                        "y": 2,
                        "z": 527
                    },
                    "312": {
                        "x": 923,
                        "y": 2,
                        "z": 478
                    },
                    "313": {
                        "x": 904,
                        "y": 2,
                        "z": 256
                    },
                    "314": {
                        "x": 1016,
                        "y": 2,
                        "z": 121
                    },
                    "317": {
                        "x": 1317,
                        "y": 2,
                        "z": 515
                    },
                    "318": {
                        "x": 1978,
                        "y": 2,
                        "z": 519
                    },
                    "319": {
                        "x": 2237,
                        "y": 2,
                        "z": 515
                    },
                    "320": {
                        "x": 2738,
                        "y": 2,
                        "z": 597
                    },
                    "321": {
                        "x": 2765,
                        "y": 2,
                        "z": 273
                    },
                    "322": {
                        "x": 3047,
                        "y": 2,
                        "z": 293
                    },
                    "323": {
                        "x": 3054,
                        "y": 2,
                        "z": 595
                    },
                    "324": {
                        "x": 3031,
                        "y": 2,
                        "z": 756
                    },
                    "325": {
                        "x": 3045,
                        "y": 2,
                        "z": 1012
                    },
                    "326": {
                        "x": 3047,
                        "y": 2,
                        "z": 1329
                    },
                    "327": {
                        "x": 2762,
                        "y": 2,
                        "z": 1308
                    },
                    "328": {
                        "x": 2763,
                        "y": 2,
                        "z": 1022
                    },
                    "329": {
                        "x": 1647.4,
                        "y": 2,
                        "z": 1334.1
                    },
                    "407": {
                        "x": 245,
                        "y": 2,
                        "z": 643
                    },
                    "304B": {
                        "x": 564,
                        "y": 2,
                        "z": 1387
                    },
                    "315_316": {
                        "x": 1278,
                        "y": 2,
                        "z": 186
                    },
                    "317C": {
                        "x": 1737,
                        "y": 2,
                        "z": 508
                    },
                    "lift1": {
                        "x": 536,
                        "y": 2,
                        "z": 844
                    },
                    "lift2": {
                        "x": 2092,
                        "y": 2,
                        "z": 823
                    }
                },
                "dynamicLabels": [
                    {
                        "textLines": [
                            "329",
                            "Library"
                        ],
                        "width": 380,
                        "height": 190,
                        "position": {
                            "x": 1647.4,
                            "y": 1.8,
                            "z": 1334.1
                        },
                        "roomId": "329",
                        "category": "utility"
                    }
                ],
                "graphNodes": {
                    "rd_301": {
                        "x": 854,
                        "z": 1091,
                        "px": 770,
                        "py": 1028,
                        "type": "door",
                        "landmark": "Room 301 Dr. CV Raman Seminar Hall door"
                    },
                    "rd_302": {
                        "x": 684,
                        "z": 1091,
                        "px": 617,
                        "py": 1028,
                        "type": "door",
                        "landmark": "Room 302 Embedded System Lab door"
                    },
                    "rd_304B": {
                        "x": 564,
                        "z": 1387,
                        "px": 508,
                        "py": 1307,
                        "type": "door",
                        "landmark": "Room 304 Smart Room door"
                    },
                    "rd_304": {
                        "x": 243,
                        "z": 1368,
                        "px": 219,
                        "py": 1289,
                        "type": "door",
                        "landmark": "Room 304 Class Room door"
                    },
                    "rd_305": {
                        "x": 245,
                        "z": 1234,
                        "px": 221,
                        "py": 1163,
                        "type": "door",
                        "landmark": "Room 305 Drone Lab & Robotic Lab door"
                    },
                    "rd_306": {
                        "x": 247,
                        "z": 878,
                        "px": 223,
                        "py": 827,
                        "type": "door",
                        "landmark": "Room 306 Analog Electronic Lab door"
                    },
                    "rd_407": {
                        "x": 245,
                        "z": 643,
                        "px": 221,
                        "py": 606,
                        "type": "door",
                        "landmark": "Room 407 Department of ETC door"
                    },
                    "rd_308": {
                        "x": 238,
                        "z": 492,
                        "px": 215,
                        "py": 464,
                        "type": "door",
                        "landmark": "Room 308 Communication & Biomedical Lab door"
                    },
                    "rd_309": {
                        "x": 222,
                        "z": 268,
                        "px": 200,
                        "py": 253,
                        "type": "door",
                        "landmark": "Room 309 Class Room door"
                    },
                    "rd_310": {
                        "x": 490,
                        "z": 254,
                        "px": 442,
                        "py": 239,
                        "type": "door",
                        "landmark": "Room 310 Class Room door"
                    },
                    "rd_311": {
                        "x": 540,
                        "z": 527,
                        "px": 487,
                        "py": 497,
                        "type": "door",
                        "landmark": "Room 311 Digital Comm Lab door"
                    },
                    "rd_312": {
                        "x": 923,
                        "z": 478,
                        "px": 832,
                        "py": 450,
                        "type": "door",
                        "landmark": "Room 312 IOT Lab door"
                    },
                    "rd_313": {
                        "x": 904,
                        "z": 256,
                        "px": 815,
                        "py": 241,
                        "type": "door",
                        "landmark": "Room 313 Project Lab door"
                    },
                    "rd_314": {
                        "x": 1016,
                        "z": 121,
                        "px": 916,
                        "py": 114,
                        "type": "door",
                        "landmark": "Room 314 Girls Washroom door"
                    },
                    "rd_315_316": {
                        "x": 1278,
                        "z": 186,
                        "px": 1152,
                        "py": 175,
                        "type": "door",
                        "landmark": "Room 315 & 316 Washrooms door"
                    },
                    "rd_317": {
                        "x": 1317,
                        "z": 515,
                        "px": 1187,
                        "py": 485,
                        "type": "door",
                        "landmark": "Room 317 Department of Civil & ETC door"
                    },
                    "rd_317C": {
                        "x": 1737,
                        "z": 508,
                        "px": 1566,
                        "py": 479,
                        "type": "door",
                        "landmark": "Room 317 C Music Room door"
                    },
                    "rd_318": {
                        "x": 1978,
                        "z": 519,
                        "px": 1783,
                        "py": 489,
                        "type": "door",
                        "landmark": "Room 318 Girls Common Room door"
                    },
                    "rd_319": {
                        "x": 2237,
                        "z": 515,
                        "px": 2017,
                        "py": 485,
                        "type": "door",
                        "landmark": "Room 319 Incubation Centre door"
                    },
                    "rd_320": {
                        "x": 2738,
                        "z": 597,
                        "px": 2468,
                        "py": 563,
                        "type": "door",
                        "landmark": "Room 320 CAD Lab door"
                    },
                    "rd_321": {
                        "x": 2765,
                        "z": 273,
                        "px": 2493,
                        "py": 257,
                        "type": "door",
                        "landmark": "Room 321 Heat Transfer Lab door"
                    },
                    "rd_322": {
                        "x": 3047,
                        "z": 293,
                        "px": 2747,
                        "py": 276,
                        "type": "door",
                        "landmark": "Room 322 Solar Lab door"
                    },
                    "rd_323": {
                        "x": 3054,
                        "z": 595,
                        "px": 2753,
                        "py": 561,
                        "type": "door",
                        "landmark": "Room 323 Measurement & Metrology Lab door"
                    },
                    "rd_324": {
                        "x": 3031,
                        "z": 756,
                        "px": 2732,
                        "py": 712,
                        "type": "door",
                        "landmark": "Room 324 Department of Mechanical door"
                    },
                    "rd_325": {
                        "x": 3045,
                        "z": 1012,
                        "px": 2745,
                        "py": 954,
                        "type": "door",
                        "landmark": "Room 325 Class Room door"
                    },
                    "rd_326": {
                        "x": 3047,
                        "z": 1329,
                        "px": 2747,
                        "py": 1252,
                        "type": "door",
                        "landmark": "Room 326 Class Room door"
                    },
                    "rd_327": {
                        "x": 2762,
                        "z": 1308,
                        "px": 2490,
                        "py": 1233,
                        "type": "door",
                        "landmark": "Room 327 Class Room door"
                    },
                    "rd_328": {
                        "x": 2763,
                        "z": 1022,
                        "px": 2491,
                        "py": 963,
                        "type": "door",
                        "landmark": "Room 328 Class Room door"
                    },
                    "rd_329": {
                        "x": 1400,
                        "z": 1091,
                        "px": 1262,
                        "py": 1028,
                        "type": "door",
                        "landmark": "Library entrance door"
                    },
                    "rd_lift1": {
                        "x": 536,
                        "z": 844,
                        "px": 483,
                        "py": 795,
                        "type": "door",
                        "landmark": "Lift 1 door"
                    },
                    "rd_lift2": {
                        "x": 2092,
                        "z": 823,
                        "px": 1886,
                        "py": 775,
                        "type": "door",
                        "landmark": "Lift 2 door"
                    },
                    "cp_left_top": {
                        "x": 377,
                        "z": 156,
                        "px": 340,
                        "py": 147,
                        "type": "corridor",
                        "landmark": "West corridor north end"
                    },
                    "cp_j_top_left": {
                        "x": 377,
                        "z": 649,
                        "px": 340,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Top-Left corridor junction"
                    },
                    "cp_j_bot_left": {
                        "x": 377,
                        "z": 1004,
                        "px": 340,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Bottom-Left corridor junction"
                    },
                    "cp_left_bot": {
                        "x": 377,
                        "z": 1454,
                        "px": 340,
                        "py": 1370,
                        "type": "corridor",
                        "landmark": "West corridor south end"
                    },
                    "cp_midlab_left": {
                        "x": 377,
                        "z": 393,
                        "px": 340,
                        "py": 370,
                        "type": "corridor",
                        "landmark": "Labs west hallway junction"
                    },
                    "cp_midlab_right": {
                        "x": 1056,
                        "z": 393,
                        "px": 952,
                        "py": 370,
                        "type": "corridor",
                        "landmark": "Labs east hallway junction"
                    },
                    "cp_j_top_wash": {
                        "x": 1056,
                        "z": 649,
                        "px": 952,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Top-Washroom corridor junction"
                    },
                    "cp_j_top_east": {
                        "x": 2224,
                        "z": 649,
                        "px": 2005,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Top-East corridor junction"
                    },
                    "cp_wash_top": {
                        "x": 1056,
                        "z": 121,
                        "px": 952,
                        "py": 114,
                        "type": "corridor",
                        "landmark": "Girls Washroom corridor entrance"
                    },
                    "cp_j_bot_wash": {
                        "x": 1056,
                        "z": 1004,
                        "px": 952,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Bottom-Washroom corridor junction"
                    },
                    "cp_j_bot_east": {
                        "x": 2224,
                        "z": 1004,
                        "px": 2005,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Bottom-East courtyard junction"
                    },
                    "cp_j_bridge_east": {
                        "x": 2224,
                        "z": 809,
                        "px": 2005,
                        "py": 762,
                        "type": "corridor",
                        "landmark": "East courtyard & bridge junction"
                    },
                    "cp_j_bridge_rw": {
                        "x": 2913,
                        "z": 809,
                        "px": 2626,
                        "py": 762,
                        "type": "corridor",
                        "landmark": "Right Wing & bridge junction"
                    },
                    "cp_rw_top": {
                        "x": 2913,
                        "z": 273,
                        "px": 2626,
                        "py": 257,
                        "type": "corridor",
                        "landmark": "Right wing north end"
                    },
                    "cp_rw_bot": {
                        "x": 2913,
                        "z": 1410,
                        "px": 2626,
                        "py": 1329,
                        "type": "corridor",
                        "landmark": "Right wing south end"
                    },
                    "cp_proj_rd_301": {
                        "x": 854,
                        "z": 1004,
                        "px": 770,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Corridor outside Seminar Hall"
                    },
                    "cp_proj_rd_302": {
                        "x": 684,
                        "z": 1004,
                        "px": 617,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Corridor outside Embedded Lab"
                    },
                    "cp_proj_rd_304B": {
                        "x": 377,
                        "z": 1387,
                        "px": 340,
                        "py": 1307,
                        "type": "corridor",
                        "landmark": "Corridor outside Smart Room"
                    },
                    "cp_proj_rd_304": {
                        "x": 377,
                        "z": 1368,
                        "px": 340,
                        "py": 1289,
                        "type": "corridor",
                        "landmark": "Corridor outside Class Room 304"
                    },
                    "cp_proj_rd_305": {
                        "x": 377,
                        "z": 1234,
                        "px": 340,
                        "py": 1163,
                        "type": "corridor",
                        "landmark": "Corridor outside Drone Lab"
                    },
                    "cp_proj_rd_306": {
                        "x": 377,
                        "z": 878,
                        "px": 340,
                        "py": 827,
                        "type": "corridor",
                        "landmark": "Corridor outside Analog Lab"
                    },
                    "cp_proj_rd_407": {
                        "x": 377,
                        "z": 643,
                        "px": 340,
                        "py": 606,
                        "type": "corridor",
                        "landmark": "Corridor outside ETC Dept"
                    },
                    "cp_proj_rd_308": {
                        "x": 377,
                        "z": 492,
                        "px": 340,
                        "py": 464,
                        "type": "corridor",
                        "landmark": "Corridor outside Communication Lab"
                    },
                    "cp_proj_rd_309": {
                        "x": 377,
                        "z": 268,
                        "px": 340,
                        "py": 253,
                        "type": "corridor",
                        "landmark": "Corridor outside Class Room 309"
                    },
                    "cp_proj_rd_310": {
                        "x": 490,
                        "z": 393,
                        "px": 442,
                        "py": 370,
                        "type": "corridor",
                        "landmark": "Corridor outside Class Room 310"
                    },
                    "cp_proj_rd_311": {
                        "x": 540,
                        "z": 649,
                        "px": 487,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside VLSI Lab"
                    },
                    "cp_proj_rd_312": {
                        "x": 923,
                        "z": 649,
                        "px": 832,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside IOT Lab"
                    },
                    "cp_proj_rd_313": {
                        "x": 904,
                        "z": 393,
                        "px": 815,
                        "py": 370,
                        "type": "corridor",
                        "landmark": "Corridor outside Project Lab"
                    },
                    "cp_proj_rd_314": {
                        "x": 1056,
                        "z": 121,
                        "px": 952,
                        "py": 114,
                        "type": "corridor",
                        "landmark": "Corridor outside Girls Washroom"
                    },
                    "cp_proj_rd_315_316": {
                        "x": 1056,
                        "z": 186,
                        "px": 952,
                        "py": 175,
                        "type": "corridor",
                        "landmark": "Corridor outside Washrooms"
                    },
                    "cp_proj_rd_317": {
                        "x": 1317,
                        "z": 649,
                        "px": 1187,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Civil & ETC"
                    },
                    "cp_proj_rd_317C": {
                        "x": 1737,
                        "z": 649,
                        "px": 1566,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Music Room"
                    },
                    "cp_proj_rd_318": {
                        "x": 1978,
                        "z": 649,
                        "px": 1783,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Girls Common Room"
                    },
                    "cp_proj_rd_319": {
                        "x": 2237,
                        "z": 649,
                        "px": 2017,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Incubation Centre"
                    },
                    "cp_proj_rd_320": {
                        "x": 2913,
                        "z": 597,
                        "px": 2626,
                        "py": 563,
                        "type": "corridor",
                        "landmark": "Corridor outside CAD Lab"
                    },
                    "cp_proj_rd_321": {
                        "x": 2913,
                        "z": 273,
                        "px": 2626,
                        "py": 257,
                        "type": "corridor",
                        "landmark": "Corridor outside Heat Transfer Lab"
                    },
                    "cp_proj_rd_322": {
                        "x": 2913,
                        "z": 293,
                        "px": 2626,
                        "py": 276,
                        "type": "corridor",
                        "landmark": "Corridor outside Solar Lab"
                    },
                    "cp_proj_rd_323": {
                        "x": 2913,
                        "z": 595,
                        "px": 2626,
                        "py": 561,
                        "type": "corridor",
                        "landmark": "Corridor outside Measurement Lab"
                    },
                    "cp_proj_rd_324": {
                        "x": 2913,
                        "z": 756,
                        "px": 2626,
                        "py": 712,
                        "type": "corridor",
                        "landmark": "Corridor outside Mechanical Dept"
                    },
                    "cp_proj_rd_325": {
                        "x": 2913,
                        "z": 1012,
                        "px": 2626,
                        "py": 954,
                        "type": "corridor",
                        "landmark": "Corridor outside Class Room 325"
                    },
                    "cp_proj_rd_326": {
                        "x": 2913,
                        "z": 1329,
                        "px": 2626,
                        "py": 1252,
                        "type": "corridor",
                        "landmark": "Corridor outside Class Room 326"
                    },
                    "cp_proj_rd_327": {
                        "x": 2913,
                        "z": 1308,
                        "px": 2626,
                        "py": 1233,
                        "type": "corridor",
                        "landmark": "Corridor outside Class Room 327"
                    },
                    "cp_proj_rd_328": {
                        "x": 2913,
                        "z": 1022,
                        "px": 2626,
                        "py": 963,
                        "type": "corridor",
                        "landmark": "Corridor outside Class Room 328"
                    },
                    "cp_proj_rd_329": {
                        "x": 1400,
                        "z": 1004,
                        "px": 1262,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Corridor outside Library"
                    }
                },
                "graphEdges": [
                    [
                        "cp_left_top",
                        "cp_proj_rd_309"
                    ],
                    [
                        "cp_proj_rd_309",
                        "cp_midlab_left"
                    ],
                    [
                        "cp_midlab_left",
                        "cp_proj_rd_308"
                    ],
                    [
                        "cp_proj_rd_308",
                        "cp_proj_rd_407"
                    ],
                    [
                        "cp_proj_rd_407",
                        "cp_j_top_left"
                    ],
                    [
                        "cp_j_top_left",
                        "cp_proj_rd_306"
                    ],
                    [
                        "cp_proj_rd_306",
                        "cp_j_bot_left"
                    ],
                    [
                        "cp_j_bot_left",
                        "cp_proj_rd_305"
                    ],
                    [
                        "cp_proj_rd_305",
                        "cp_proj_rd_304"
                    ],
                    [
                        "cp_proj_rd_304",
                        "cp_proj_rd_304B"
                    ],
                    [
                        "cp_proj_rd_304B",
                        "cp_left_bot"
                    ],
                    [
                        "cp_midlab_left",
                        "cp_proj_rd_310"
                    ],
                    [
                        "cp_proj_rd_310",
                        "cp_proj_rd_313"
                    ],
                    [
                        "cp_proj_rd_313",
                        "cp_midlab_right"
                    ],
                    [
                        "cp_j_top_left",
                        "cp_proj_rd_311"
                    ],
                    [
                        "cp_proj_rd_311",
                        "cp_proj_rd_312"
                    ],
                    [
                        "cp_proj_rd_312",
                        "cp_j_top_wash"
                    ],
                    [
                        "cp_j_top_wash",
                        "cp_proj_rd_317"
                    ],
                    [
                        "cp_proj_rd_317",
                        "cp_proj_rd_317C"
                    ],
                    [
                        "cp_proj_rd_317C",
                        "cp_proj_rd_318"
                    ],
                    [
                        "cp_proj_rd_318",
                        "cp_j_top_east"
                    ],
                    [
                        "cp_j_top_east",
                        "cp_proj_rd_319"
                    ],
                    [
                        "cp_wash_top",
                        "cp_proj_rd_314"
                    ],
                    [
                        "cp_proj_rd_314",
                        "cp_proj_rd_315_316"
                    ],
                    [
                        "cp_proj_rd_315_316",
                        "cp_midlab_right"
                    ],
                    [
                        "cp_midlab_right",
                        "cp_j_top_wash"
                    ],
                    [
                        "cp_j_top_wash",
                        "cp_j_bot_wash"
                    ],
                    [
                        "cp_j_top_east",
                        "cp_j_bridge_east"
                    ],
                    [
                        "cp_j_bridge_east",
                        "cp_j_bot_east"
                    ],
                    [
                        "cp_j_bridge_east",
                        "cp_j_bridge_rw"
                    ],
                    [
                        "cp_rw_top",
                        "cp_proj_rd_321"
                    ],
                    [
                        "cp_proj_rd_321",
                        "cp_proj_rd_322"
                    ],
                    [
                        "cp_proj_rd_322",
                        "cp_proj_rd_323"
                    ],
                    [
                        "cp_proj_rd_323",
                        "cp_proj_rd_320"
                    ],
                    [
                        "cp_proj_rd_320",
                        "cp_proj_rd_324"
                    ],
                    [
                        "cp_proj_rd_324",
                        "cp_j_bridge_rw"
                    ],
                    [
                        "cp_j_bridge_rw",
                        "cp_proj_rd_325"
                    ],
                    [
                        "cp_proj_rd_325",
                        "cp_proj_rd_328"
                    ],
                    [
                        "cp_proj_rd_328",
                        "cp_proj_rd_327"
                    ],
                    [
                        "cp_proj_rd_327",
                        "cp_proj_rd_326"
                    ],
                    [
                        "cp_proj_rd_326",
                        "cp_rw_bot"
                    ],
                    [
                        "cp_j_bot_left",
                        "cp_proj_rd_302"
                    ],
                    [
                        "cp_proj_rd_302",
                        "cp_proj_rd_301"
                    ],
                    [
                        "cp_proj_rd_301",
                        "cp_j_bot_wash"
                    ],
                    [
                        "cp_j_bot_wash",
                        "cp_proj_rd_329"
                    ],
                    [
                        "cp_proj_rd_329",
                        "cp_j_bot_east"
                    ],
                    [
                        "rd_301",
                        "cp_proj_rd_301"
                    ],
                    [
                        "rd_302",
                        "cp_proj_rd_302"
                    ],
                    [
                        "rd_304B",
                        "cp_proj_rd_304B"
                    ],
                    [
                        "rd_304",
                        "cp_proj_rd_304"
                    ],
                    [
                        "rd_305",
                        "cp_proj_rd_305"
                    ],
                    [
                        "rd_306",
                        "cp_proj_rd_306"
                    ],
                    [
                        "rd_407",
                        "cp_proj_rd_407"
                    ],
                    [
                        "rd_308",
                        "cp_proj_rd_308"
                    ],
                    [
                        "rd_309",
                        "cp_proj_rd_309"
                    ],
                    [
                        "rd_310",
                        "cp_proj_rd_310"
                    ],
                    [
                        "rd_311",
                        "cp_proj_rd_311"
                    ],
                    [
                        "rd_312",
                        "cp_proj_rd_312"
                    ],
                    [
                        "rd_313",
                        "cp_proj_rd_313"
                    ],
                    [
                        "rd_314",
                        "cp_proj_rd_314"
                    ],
                    [
                        "rd_315_316",
                        "cp_proj_rd_315_316"
                    ],
                    [
                        "rd_317",
                        "cp_proj_rd_317"
                    ],
                    [
                        "rd_317C",
                        "cp_proj_rd_317C"
                    ],
                    [
                        "rd_318",
                        "cp_proj_rd_318"
                    ],
                    [
                        "rd_319",
                        "cp_proj_rd_319"
                    ],
                    [
                        "rd_320",
                        "cp_proj_rd_320"
                    ],
                    [
                        "rd_321",
                        "cp_proj_rd_321"
                    ],
                    [
                        "rd_322",
                        "cp_proj_rd_322"
                    ],
                    [
                        "rd_323",
                        "cp_proj_rd_323"
                    ],
                    [
                        "rd_324",
                        "cp_proj_rd_324"
                    ],
                    [
                        "rd_325",
                        "cp_proj_rd_325"
                    ],
                    [
                        "rd_326",
                        "cp_proj_rd_326"
                    ],
                    [
                        "rd_327",
                        "cp_proj_rd_327"
                    ],
                    [
                        "rd_328",
                        "cp_proj_rd_328"
                    ],
                    [
                        "rd_329",
                        "cp_proj_rd_329"
                    ],
                    [
                        "rd_lift1",
                        "cp_j_bot_left"
                    ],
                    [
                        "rd_lift2",
                        "cp_j_bridge_east"
                    ]
                ],
                "roomToNode": {
                    "301": "rd_301",
                    "302": "rd_302",
                    "304": "rd_304",
                    "305": "rd_305",
                    "306": "rd_306",
                    "307": "rd_407",
                    "308": "rd_308",
                    "309": "rd_309",
                    "310": "rd_310",
                    "311": "rd_311",
                    "312": "rd_312",
                    "313": "rd_313",
                    "314": "rd_314",
                    "317": "rd_317",
                    "318": "rd_318",
                    "319": "rd_319",
                    "320": "rd_320",
                    "321": "rd_321",
                    "322": "rd_322",
                    "323": "rd_323",
                    "324": "rd_324",
                    "325": "rd_325",
                    "326": "rd_326",
                    "327": "rd_327",
                    "328": "rd_328",
                    "329": "rd_329",
                    "407": "rd_407",
                    "304B": "rd_304B",
                    "315_316": "rd_315_316",
                    "317C": "rd_317C",
                    "lift1": "rd_lift1",
                    "lift2": "rd_lift2"
                }
            },
            "4": {
                "name": "4th Floor",
                "shortName": "4F",
                "folder": "B-Block/4th floor/",
                "mtlFile": "4th_floor.mtl",
                "objFile": "4th floor.obj",
                "planImage": "B-Block/4th floor.jpg",
                "planSize": {
                    "width": 3307.9,
                    "depth": 1644.9
                },
                "rooms": [
                    {
                        "id": "403",
                        "name": "Smart Room",
                        "category": "class",
                        "labelGroup": "label_186_799"
                    },
                    {
                        "id": "404",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_187_800"
                    },
                    {
                        "id": "409A",
                        "name": "409(A) Class Room",
                        "category": "class",
                        "labelGroup": "label_192_805"
                    },
                    {
                        "id": "410",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_193_806"
                    },
                    {
                        "id": "418",
                        "name": "Music Room",
                        "category": "class",
                        "labelGroup": "label_176_789"
                    },
                    {
                        "id": "421",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_177_790"
                    },
                    {
                        "id": "422",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_182_795"
                    },
                    {
                        "id": "429",
                        "name": "Class Room",
                        "category": "class",
                        "labelGroup": "label_183_796"
                    },
                    {
                        "id": "402",
                        "name": "Wireless Communication & Computing Lab",
                        "category": "lab",
                        "labelGroup": "label_185_798"
                    },
                    {
                        "id": "405",
                        "name": "Operating System Lab",
                        "category": "lab",
                        "labelGroup": "label_188_801"
                    },
                    {
                        "id": "406",
                        "name": "Digital & Microcontroller Lab",
                        "category": "lab",
                        "labelGroup": "label_189_802"
                    },
                    {
                        "id": "408",
                        "name": "DMS Lab",
                        "category": "lab",
                        "labelGroup": "label_191_804"
                    },
                    {
                        "id": "411",
                        "name": "Project Lab",
                        "category": "lab",
                        "labelGroup": "label_194_807"
                    },
                    {
                        "id": "412",
                        "name": "Web Technology & DSA Lab",
                        "category": "lab",
                        "labelGroup": "label_195_808"
                    },
                    {
                        "id": "413",
                        "name": "Computer Network Lab",
                        "category": "lab",
                        "labelGroup": "label_196_809"
                    },
                    {
                        "id": "423",
                        "name": "Switchgear & Protection Lab",
                        "category": "lab",
                        "labelGroup": "label_179_792"
                    },
                    {
                        "id": "424",
                        "name": "Electrical Workshop & Hardware Lab",
                        "category": "lab",
                        "labelGroup": "label_178_791"
                    },
                    {
                        "id": "426",
                        "name": "BEE Lab",
                        "category": "lab",
                        "labelGroup": "label_180_793"
                    },
                    {
                        "id": "427",
                        "name": "Power Electronic & Network Theory Lab",
                        "category": "lab",
                        "labelGroup": "label_181_794"
                    },
                    {
                        "id": "428",
                        "name": "Control System & Sensor Transducer Lab",
                        "category": "lab",
                        "labelGroup": "label_184_797"
                    },
                    {
                        "id": "407",
                        "name": "Department of CSE & IT",
                        "category": "dept",
                        "labelGroup": "label_190_803"
                    },
                    {
                        "id": "417",
                        "name": "Department of CSE & Electrical Diploma",
                        "category": "dept",
                        "labelGroup": "label_175_788"
                    },
                    {
                        "id": "425",
                        "name": "Department of Electrical",
                        "category": "dept",
                        "labelGroup": "label_173_786"
                    },
                    {
                        "id": "409B",
                        "name": "409(B) Staff Room",
                        "category": "staff",
                        "labelGroup": "label_192_805"
                    },
                    {
                        "id": "420",
                        "name": "Teacher Staff Room",
                        "category": "staff",
                        "labelGroup": "label_169_782"
                    },
                    {
                        "id": "401",
                        "name": "Dr. Vijay Bhatkar Seminar Hall",
                        "category": "seminar",
                        "labelGroup": "label_170_783"
                    },
                    {
                        "id": "414",
                        "name": "Girls Washroom",
                        "category": "utility",
                        "labelGroup": "label_167_780"
                    },
                    {
                        "id": "415_416",
                        "name": "415 Washroom & 416 Staff Washroom",
                        "category": "utility",
                        "labelGroup": "label_174_787"
                    },
                    {
                        "id": "419",
                        "name": "Girls Common Room",
                        "category": "utility",
                        "labelGroup": "label_168_781"
                    }
                ],
                "roomCoords": {
                    "401": {
                        "x": 854,
                        "y": 2,
                        "z": 1091
                    },
                    "402": {
                        "x": 684,
                        "y": 2,
                        "z": 1091
                    },
                    "403": {
                        "x": 564,
                        "y": 2,
                        "z": 1387
                    },
                    "404": {
                        "x": 243,
                        "y": 2,
                        "z": 1368
                    },
                    "405": {
                        "x": 245,
                        "y": 2,
                        "z": 1234
                    },
                    "406": {
                        "x": 247,
                        "y": 2,
                        "z": 878
                    },
                    "407": {
                        "x": 245,
                        "y": 2,
                        "z": 643
                    },
                    "408": {
                        "x": 238,
                        "y": 2,
                        "z": 492
                    },
                    "410": {
                        "x": 490,
                        "y": 2,
                        "z": 254
                    },
                    "411": {
                        "x": 540,
                        "y": 2,
                        "z": 527
                    },
                    "412": {
                        "x": 923,
                        "y": 2,
                        "z": 478
                    },
                    "413": {
                        "x": 904,
                        "y": 2,
                        "z": 256
                    },
                    "414": {
                        "x": 1016,
                        "y": 2,
                        "z": 121
                    },
                    "417": {
                        "x": 1317,
                        "y": 2,
                        "z": 515
                    },
                    "418": {
                        "x": 1737,
                        "y": 2,
                        "z": 508
                    },
                    "419": {
                        "x": 1978,
                        "y": 2,
                        "z": 519
                    },
                    "420": {
                        "x": 2237,
                        "y": 2,
                        "z": 515
                    },
                    "421": {
                        "x": 2738,
                        "y": 2,
                        "z": 597
                    },
                    "422": {
                        "x": 2765,
                        "y": 2,
                        "z": 273
                    },
                    "423": {
                        "x": 3047,
                        "y": 2,
                        "z": 293
                    },
                    "424": {
                        "x": 3054,
                        "y": 2,
                        "z": 595
                    },
                    "425": {
                        "x": 3031,
                        "y": 2,
                        "z": 756
                    },
                    "426": {
                        "x": 3045,
                        "y": 2,
                        "z": 1012
                    },
                    "427": {
                        "x": 3047,
                        "y": 2,
                        "z": 1329
                    },
                    "428": {
                        "x": 2762,
                        "y": 2,
                        "z": 1308
                    },
                    "429": {
                        "x": 2763,
                        "y": 2,
                        "z": 1022
                    },
                    "409A": {
                        "x": 222,
                        "y": 2,
                        "z": 268
                    },
                    "409B": {
                        "x": 371,
                        "y": 2,
                        "z": 156
                    },
                    "415_416": {
                        "x": 1278,
                        "y": 2,
                        "z": 186
                    }
                },
                "graphNodes": {
                    "rd_401": {
                        "x": 854,
                        "z": 1091,
                        "px": 770,
                        "py": 1028,
                        "type": "door",
                        "landmark": "Room 401 Dr. Vijay Bhatkar Seminar Hall door"
                    },
                    "rd_402": {
                        "x": 684,
                        "z": 1091,
                        "px": 617,
                        "py": 1028,
                        "type": "door",
                        "landmark": "Room 402 Wireless Communication & Computing Lab door"
                    },
                    "rd_403": {
                        "x": 564,
                        "z": 1387,
                        "px": 508,
                        "py": 1307,
                        "type": "door",
                        "landmark": "Room 403 Smart Room door"
                    },
                    "rd_404": {
                        "x": 243,
                        "z": 1368,
                        "px": 219,
                        "py": 1289,
                        "type": "door",
                        "landmark": "Room 404 Class Room door"
                    },
                    "rd_405": {
                        "x": 245,
                        "z": 1234,
                        "px": 221,
                        "py": 1163,
                        "type": "door",
                        "landmark": "Room 405 Operating System Lab door"
                    },
                    "rd_406": {
                        "x": 247,
                        "z": 878,
                        "px": 223,
                        "py": 827,
                        "type": "door",
                        "landmark": "Room 406 Digital & Microcontroller Lab door"
                    },
                    "rd_407": {
                        "x": 245,
                        "z": 643,
                        "px": 221,
                        "py": 606,
                        "type": "door",
                        "landmark": "Room 407 Department of CSE & IT door"
                    },
                    "rd_408": {
                        "x": 238,
                        "z": 492,
                        "px": 215,
                        "py": 464,
                        "type": "door",
                        "landmark": "Room 408 DMS Lab door"
                    },
                    "rd_410": {
                        "x": 490,
                        "z": 254,
                        "px": 442,
                        "py": 239,
                        "type": "door",
                        "landmark": "Room 410 Class Room door"
                    },
                    "rd_411": {
                        "x": 540,
                        "z": 527,
                        "px": 487,
                        "py": 497,
                        "type": "door",
                        "landmark": "Room 411 Project Lab door"
                    },
                    "rd_412": {
                        "x": 923,
                        "z": 478,
                        "px": 832,
                        "py": 450,
                        "type": "door",
                        "landmark": "Room 412 Web Technology & DSA Lab door"
                    },
                    "rd_413": {
                        "x": 904,
                        "z": 256,
                        "px": 815,
                        "py": 241,
                        "type": "door",
                        "landmark": "Room 413 Computer Network Lab door"
                    },
                    "rd_414": {
                        "x": 1016,
                        "z": 121,
                        "px": 916,
                        "py": 114,
                        "type": "door",
                        "landmark": "Room 414 Girls Washroom door"
                    },
                    "rd_417": {
                        "x": 1317,
                        "z": 515,
                        "px": 1187,
                        "py": 485,
                        "type": "door",
                        "landmark": "Room 417 Department of CSE & Electrical Diploma door"
                    },
                    "rd_418": {
                        "x": 1737,
                        "z": 508,
                        "px": 1566,
                        "py": 479,
                        "type": "door",
                        "landmark": "Room 418 Music Room door"
                    },
                    "rd_419": {
                        "x": 1978,
                        "z": 519,
                        "px": 1783,
                        "py": 489,
                        "type": "door",
                        "landmark": "Room 419 Girls Common Room door"
                    },
                    "rd_420": {
                        "x": 2237,
                        "z": 515,
                        "px": 2017,
                        "py": 485,
                        "type": "door",
                        "landmark": "Room 420 Teacher Staff Room door"
                    },
                    "rd_421": {
                        "x": 2738,
                        "z": 597,
                        "px": 2468,
                        "py": 563,
                        "type": "door",
                        "landmark": "Room 421 Class Room door"
                    },
                    "rd_422": {
                        "x": 2765,
                        "z": 273,
                        "px": 2493,
                        "py": 257,
                        "type": "door",
                        "landmark": "Room 422 Class Room door"
                    },
                    "rd_423": {
                        "x": 3047,
                        "z": 293,
                        "px": 2747,
                        "py": 276,
                        "type": "door",
                        "landmark": "Room 423 Switchgear & Protection Lab door"
                    },
                    "rd_424": {
                        "x": 3054,
                        "z": 595,
                        "px": 2753,
                        "py": 561,
                        "type": "door",
                        "landmark": "Room 424 Electrical Workshop & Hardware Lab door"
                    },
                    "rd_425": {
                        "x": 3031,
                        "z": 756,
                        "px": 2732,
                        "py": 712,
                        "type": "door",
                        "landmark": "Room 425 Electrical Department door"
                    },
                    "rd_426": {
                        "x": 3045,
                        "z": 1012,
                        "px": 2745,
                        "py": 954,
                        "type": "door",
                        "landmark": "Room 426 BEE Lab door"
                    },
                    "rd_427": {
                        "x": 3047,
                        "z": 1329,
                        "px": 2747,
                        "py": 1252,
                        "type": "door",
                        "landmark": "Room 427 Power Electronic & Network Theory Lab door"
                    },
                    "rd_428": {
                        "x": 2762,
                        "z": 1308,
                        "px": 2490,
                        "py": 1233,
                        "type": "door",
                        "landmark": "Room 428 Control System & Sensor Transducer Lab door"
                    },
                    "rd_429": {
                        "x": 2763,
                        "z": 1022,
                        "px": 2491,
                        "py": 963,
                        "type": "door",
                        "landmark": "Room 429 Class Room door"
                    },
                    "rd_409A": {
                        "x": 222,
                        "z": 268,
                        "px": 200,
                        "py": 253,
                        "type": "door",
                        "landmark": "Room 409(A) Class Room door"
                    },
                    "rd_409B": {
                        "x": 371,
                        "z": 156,
                        "px": 334,
                        "py": 147,
                        "type": "door",
                        "landmark": "Room 409(B) Staff Room door"
                    },
                    "rd_415_416": {
                        "x": 1278,
                        "z": 186,
                        "px": 1152,
                        "py": 175,
                        "type": "door",
                        "landmark": "Room 415 & 416 Washrooms door"
                    },
                    "cp_left_top": {
                        "x": 377,
                        "z": 156,
                        "px": 340,
                        "py": 147,
                        "type": "corridor",
                        "landmark": "Left corridor north end (409B)"
                    },
                    "cp_j_top_left": {
                        "x": 377,
                        "z": 649,
                        "px": 340,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Top-Left corridor junction"
                    },
                    "cp_j_bot_left": {
                        "x": 377,
                        "z": 1004,
                        "px": 340,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Bottom-Left corridor junction"
                    },
                    "cp_left_bot": {
                        "x": 377,
                        "z": 1454,
                        "px": 340,
                        "py": 1370,
                        "type": "corridor",
                        "landmark": "Left corridor south end (404)"
                    },
                    "cp_midlab_left": {
                        "x": 377,
                        "z": 393,
                        "px": 340,
                        "py": 370,
                        "type": "corridor",
                        "landmark": "Labs 410-413 west hallway junction"
                    },
                    "cp_midlab_right": {
                        "x": 1056,
                        "z": 393,
                        "px": 952,
                        "py": 370,
                        "type": "corridor",
                        "landmark": "Labs 410-413 east hallway junction"
                    },
                    "cp_j_top_wash": {
                        "x": 1056,
                        "z": 649,
                        "px": 952,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Top-Washroom corridor junction"
                    },
                    "cp_j_top_east": {
                        "x": 2224,
                        "z": 649,
                        "px": 2005,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Top-East corridor junction (420)"
                    },
                    "cp_wash_top": {
                        "x": 1056,
                        "z": 121,
                        "px": 952,
                        "py": 114,
                        "type": "corridor",
                        "landmark": "Girls Washroom corridor entrance (414)"
                    },
                    "cp_j_bot_wash": {
                        "x": 1056,
                        "z": 1004,
                        "px": 952,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Bottom-Washroom corridor junction"
                    },
                    "cp_j_bridge_east": {
                        "x": 2224,
                        "z": 809,
                        "px": 2005,
                        "py": 762,
                        "type": "corridor",
                        "landmark": "East courtyard & bridge junction"
                    },
                    "cp_j_bot_east": {
                        "x": 2224,
                        "z": 1004,
                        "px": 2005,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Bottom-East courtyard junction"
                    },
                    "cp_j_bridge_rw": {
                        "x": 2913,
                        "z": 809,
                        "px": 2626,
                        "py": 762,
                        "type": "corridor",
                        "landmark": "Right Wing & bridge junction"
                    },
                    "cp_rw_top": {
                        "x": 2913,
                        "z": 273,
                        "px": 2626,
                        "py": 257,
                        "type": "corridor",
                        "landmark": "Right wing north end (422/423)"
                    },
                    "cp_rw_bot": {
                        "x": 2913,
                        "z": 1410,
                        "px": 2626,
                        "py": 1329,
                        "type": "corridor",
                        "landmark": "Right wing south end (427/428)"
                    },
                    "cp_proj_rd_401": {
                        "x": 854,
                        "z": 1004,
                        "px": 770,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 401 Dr. Vijay Bhatkar Seminar Hall door"
                    },
                    "cp_proj_rd_402": {
                        "x": 684,
                        "z": 1004,
                        "px": 617,
                        "py": 946,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 402 Wireless Communication & Computing Lab door"
                    },
                    "cp_proj_rd_403": {
                        "x": 377,
                        "z": 1387,
                        "px": 340,
                        "py": 1307,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 403 Smart Room door"
                    },
                    "cp_proj_rd_404": {
                        "x": 377,
                        "z": 1368,
                        "px": 340,
                        "py": 1289,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 404 Class Room door"
                    },
                    "cp_proj_rd_405": {
                        "x": 377,
                        "z": 1234,
                        "px": 340,
                        "py": 1163,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 405 Operating System Lab door"
                    },
                    "cp_proj_rd_406": {
                        "x": 377,
                        "z": 878,
                        "px": 340,
                        "py": 827,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 406 Digital & Microcontroller Lab door"
                    },
                    "cp_proj_rd_407": {
                        "x": 377,
                        "z": 643,
                        "px": 340,
                        "py": 606,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 407 Department of CSE & IT door"
                    },
                    "cp_proj_rd_408": {
                        "x": 377,
                        "z": 492,
                        "px": 340,
                        "py": 464,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 408 DMS Lab door"
                    },
                    "cp_proj_rd_410": {
                        "x": 490,
                        "z": 393,
                        "px": 442,
                        "py": 370,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 410 Class Room door"
                    },
                    "cp_proj_rd_411": {
                        "x": 540,
                        "z": 649,
                        "px": 487,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 411 Project Lab door"
                    },
                    "cp_proj_rd_412": {
                        "x": 923,
                        "z": 649,
                        "px": 832,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 412 Web Technology & DSA Lab door"
                    },
                    "cp_proj_rd_413": {
                        "x": 904,
                        "z": 393,
                        "px": 815,
                        "py": 370,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 413 Computer Network Lab door"
                    },
                    "cp_proj_rd_414": {
                        "x": 1056,
                        "z": 121,
                        "px": 952,
                        "py": 114,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 414 Girls Washroom door"
                    },
                    "cp_proj_rd_417": {
                        "x": 1317,
                        "z": 649,
                        "px": 1187,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 417 Department of CSE & Electrical Diploma door"
                    },
                    "cp_proj_rd_418": {
                        "x": 1737,
                        "z": 649,
                        "px": 1566,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 418 Music Room door"
                    },
                    "cp_proj_rd_419": {
                        "x": 1978,
                        "z": 649,
                        "px": 1783,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 419 Girls Common Room door"
                    },
                    "cp_proj_rd_420": {
                        "x": 2237,
                        "z": 649,
                        "px": 2017,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 420 Teacher Staff Room door"
                    },
                    "cp_proj_rd_421": {
                        "x": 2913,
                        "z": 597,
                        "px": 2626,
                        "py": 563,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 421 Class Room door"
                    },
                    "cp_proj_rd_422": {
                        "x": 2913,
                        "z": 273,
                        "px": 2626,
                        "py": 257,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 422 Class Room door"
                    },
                    "cp_proj_rd_423": {
                        "x": 2913,
                        "z": 293,
                        "px": 2626,
                        "py": 276,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 423 Switchgear & Protection Lab door"
                    },
                    "cp_proj_rd_424": {
                        "x": 2913,
                        "z": 595,
                        "px": 2626,
                        "py": 561,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 424 Electrical Workshop & Hardware Lab door"
                    },
                    "cp_proj_rd_425": {
                        "x": 2913,
                        "z": 756,
                        "px": 2626,
                        "py": 712,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 425 Electrical Department door"
                    },
                    "cp_proj_rd_426": {
                        "x": 2913,
                        "z": 1012,
                        "px": 2626,
                        "py": 954,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 426 BEE Lab door"
                    },
                    "cp_proj_rd_427": {
                        "x": 2913,
                        "z": 1329,
                        "px": 2626,
                        "py": 1252,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 427 Power Electronic & Network Theory Lab door"
                    },
                    "cp_proj_rd_428": {
                        "x": 2913,
                        "z": 1308,
                        "px": 2626,
                        "py": 1233,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 428 Control System & Sensor Transducer Lab door"
                    },
                    "cp_proj_rd_429": {
                        "x": 2913,
                        "z": 1022,
                        "px": 2626,
                        "py": 963,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 429 Class Room door"
                    },
                    "cp_proj_rd_409A": {
                        "x": 377,
                        "z": 268,
                        "px": 340,
                        "py": 253,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 409(A) Class Room door"
                    },
                    "cp_proj_rd_409B": {
                        "x": 371,
                        "z": 649,
                        "px": 334,
                        "py": 612,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 409(B) Staff Room door"
                    },
                    "cp_proj_rd_415_416": {
                        "x": 1056,
                        "z": 186,
                        "px": 952,
                        "py": 175,
                        "type": "corridor",
                        "landmark": "Corridor outside Room 415 & 416 Washrooms door"
                    }
                },
                "graphEdges": [
                    [
                        "cp_left_top",
                        "cp_proj_rd_409A"
                    ],
                    [
                        "cp_proj_rd_409A",
                        "cp_midlab_left"
                    ],
                    [
                        "cp_midlab_left",
                        "cp_proj_rd_408"
                    ],
                    [
                        "cp_proj_rd_408",
                        "cp_proj_rd_407"
                    ],
                    [
                        "cp_proj_rd_407",
                        "cp_j_top_left"
                    ],
                    [
                        "cp_j_top_left",
                        "cp_proj_rd_406"
                    ],
                    [
                        "cp_proj_rd_406",
                        "cp_j_bot_left"
                    ],
                    [
                        "cp_j_bot_left",
                        "cp_proj_rd_405"
                    ],
                    [
                        "cp_proj_rd_405",
                        "cp_proj_rd_404"
                    ],
                    [
                        "cp_proj_rd_404",
                        "cp_proj_rd_403"
                    ],
                    [
                        "cp_proj_rd_403",
                        "cp_left_bot"
                    ],
                    [
                        "cp_midlab_left",
                        "cp_proj_rd_410"
                    ],
                    [
                        "cp_proj_rd_410",
                        "cp_proj_rd_413"
                    ],
                    [
                        "cp_proj_rd_413",
                        "cp_midlab_right"
                    ],
                    [
                        "cp_proj_rd_409B",
                        "cp_j_top_left"
                    ],
                    [
                        "cp_j_top_left",
                        "cp_proj_rd_411"
                    ],
                    [
                        "cp_proj_rd_411",
                        "cp_proj_rd_412"
                    ],
                    [
                        "cp_proj_rd_412",
                        "cp_j_top_wash"
                    ],
                    [
                        "cp_j_top_wash",
                        "cp_proj_rd_417"
                    ],
                    [
                        "cp_proj_rd_417",
                        "cp_proj_rd_418"
                    ],
                    [
                        "cp_proj_rd_418",
                        "cp_proj_rd_419"
                    ],
                    [
                        "cp_proj_rd_419",
                        "cp_j_top_east"
                    ],
                    [
                        "cp_j_top_east",
                        "cp_proj_rd_420"
                    ],
                    [
                        "cp_wash_top",
                        "cp_proj_rd_414"
                    ],
                    [
                        "cp_proj_rd_414",
                        "cp_proj_rd_415_416"
                    ],
                    [
                        "cp_proj_rd_415_416",
                        "cp_midlab_right"
                    ],
                    [
                        "cp_midlab_right",
                        "cp_j_top_wash"
                    ],
                    [
                        "cp_j_top_wash",
                        "cp_j_bot_wash"
                    ],
                    [
                        "cp_j_top_east",
                        "cp_j_bridge_east"
                    ],
                    [
                        "cp_j_bridge_east",
                        "cp_j_bot_east"
                    ],
                    [
                        "cp_j_bridge_east",
                        "cp_j_bridge_rw"
                    ],
                    [
                        "cp_rw_top",
                        "cp_proj_rd_422"
                    ],
                    [
                        "cp_proj_rd_422",
                        "cp_proj_rd_423"
                    ],
                    [
                        "cp_proj_rd_423",
                        "cp_proj_rd_424"
                    ],
                    [
                        "cp_proj_rd_424",
                        "cp_proj_rd_421"
                    ],
                    [
                        "cp_proj_rd_421",
                        "cp_proj_rd_425"
                    ],
                    [
                        "cp_proj_rd_425",
                        "cp_j_bridge_rw"
                    ],
                    [
                        "cp_j_bridge_rw",
                        "cp_proj_rd_426"
                    ],
                    [
                        "cp_proj_rd_426",
                        "cp_proj_rd_429"
                    ],
                    [
                        "cp_proj_rd_429",
                        "cp_proj_rd_428"
                    ],
                    [
                        "cp_proj_rd_428",
                        "cp_proj_rd_427"
                    ],
                    [
                        "cp_proj_rd_427",
                        "cp_rw_bot"
                    ],
                    [
                        "cp_j_bot_left",
                        "cp_proj_rd_402"
                    ],
                    [
                        "cp_proj_rd_402",
                        "cp_proj_rd_401"
                    ],
                    [
                        "cp_proj_rd_401",
                        "cp_j_bot_wash"
                    ],
                    [
                        "cp_j_bot_wash",
                        "cp_j_bot_east"
                    ],
                    [
                        "rd_401",
                        "cp_proj_rd_401"
                    ],
                    [
                        "rd_402",
                        "cp_proj_rd_402"
                    ],
                    [
                        "rd_403",
                        "cp_proj_rd_403"
                    ],
                    [
                        "rd_404",
                        "cp_proj_rd_404"
                    ],
                    [
                        "rd_405",
                        "cp_proj_rd_405"
                    ],
                    [
                        "rd_406",
                        "cp_proj_rd_406"
                    ],
                    [
                        "rd_407",
                        "cp_proj_rd_407"
                    ],
                    [
                        "rd_408",
                        "cp_proj_rd_408"
                    ],
                    [
                        "rd_410",
                        "cp_proj_rd_410"
                    ],
                    [
                        "rd_411",
                        "cp_proj_rd_411"
                    ],
                    [
                        "rd_412",
                        "cp_proj_rd_412"
                    ],
                    [
                        "rd_413",
                        "cp_proj_rd_413"
                    ],
                    [
                        "rd_414",
                        "cp_proj_rd_414"
                    ],
                    [
                        "rd_417",
                        "cp_proj_rd_417"
                    ],
                    [
                        "rd_418",
                        "cp_proj_rd_418"
                    ],
                    [
                        "rd_419",
                        "cp_proj_rd_419"
                    ],
                    [
                        "rd_420",
                        "cp_proj_rd_420"
                    ],
                    [
                        "rd_421",
                        "cp_proj_rd_421"
                    ],
                    [
                        "rd_422",
                        "cp_proj_rd_422"
                    ],
                    [
                        "rd_423",
                        "cp_proj_rd_423"
                    ],
                    [
                        "rd_424",
                        "cp_proj_rd_424"
                    ],
                    [
                        "rd_425",
                        "cp_proj_rd_425"
                    ],
                    [
                        "rd_426",
                        "cp_proj_rd_426"
                    ],
                    [
                        "rd_427",
                        "cp_proj_rd_427"
                    ],
                    [
                        "rd_428",
                        "cp_proj_rd_428"
                    ],
                    [
                        "rd_429",
                        "cp_proj_rd_429"
                    ],
                    [
                        "rd_409A",
                        "cp_proj_rd_409A"
                    ],
                    [
                        "rd_409B",
                        "cp_proj_rd_409B"
                    ],
                    [
                        "rd_415_416",
                        "cp_proj_rd_415_416"
                    ]
                ],
                "roomToNode": {
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
                    "415_416": "rd_415_416"
                }
            }
        }
    },
    "C": {
        "name": "C-Block",
        "badge": "C-BLOCK",
        "availableFloors": [0],
        "defaultFloor": 0,
        "floorConfigs": {
            "0": {
                "name": "Ground Floor",
                "shortName": "0F",
                "folder": "C-Block/",
                "mtlFile": "C-block.mtl",
                "objFile": "C-block.obj",
                "planImage": "C-Block/C-block OG.jpg",
                "planSize": {
                    "width": 3375.7,
                    "depth": 2734.4
                },
                "rooms": [
                    { "id": "C001", "name": "C-001 Staff Room", "category": "faculty", "labelGroup": "label_90_423" },
                    { "id": "C002", "name": "C-002 Staff Room", "category": "faculty", "labelGroup": "label_91_424" },
                    { "id": "C003", "name": "C-003 Board Room", "category": "admin", "labelGroup": "label_92_425" },
                    { "id": "C004", "name": "C-004 HoD Cabin (Cyber Security)", "category": "faculty", "labelGroup": "label_93_426" },
                    { "id": "C005", "name": "C-005 Power Control Room", "category": "service", "labelGroup": "label_95_428" },
                    { "id": "C006", "name": "C-006 Elevator / Lift", "category": "service", "labelGroup": "label_96_429" },
                    { "id": "C007", "name": "C-007 HoD Cabin (Data Science)", "category": "faculty", "labelGroup": "label_94_427" },
                    { "id": "C008", "name": "C-008 Class Room", "category": "class", "labelGroup": "label_97_430" },
                    { "id": "C009", "name": "C-009 Lab", "category": "lab", "labelGroup": "label_98_431" },
                    { "id": "C011", "name": "C-011 Girls Washroom", "category": "washroom", "labelGroup": "label_99_432" },
                    { "id": "C012", "name": "C-012 Class Room", "category": "class", "labelGroup": "label_100_433" },
                    { "id": "C013", "name": "C-013 Class Room", "category": "class", "labelGroup": "label_101_434" },
                    { "id": "C014", "name": "C-014 Class Room", "category": "class", "labelGroup": "label_102_435" },
                    { "id": "C015", "name": "C-015 Registrar Office", "category": "admin", "labelGroup": "label_103_436" },
                    { "id": "C016", "name": "C-016 Students Section", "category": "admin", "labelGroup": "label_104_437" },
                    { "id": "C017", "name": "C-017 Class Room", "category": "class", "labelGroup": "label_105_438" },
                    { "id": "C018", "name": "C-018 Class Room", "category": "class", "labelGroup": "label_106_439" },
                    { "id": "C019", "name": "C-019 Class Room", "category": "class", "labelGroup": "label_107_440" },
                    { "id": "C020", "name": "C-020 Class Room", "category": "class", "labelGroup": "label_108_441" },
                    { "id": "C021", "name": "C-021 Boys Washroom", "category": "washroom", "labelGroup": "label_109_442" },
                    { "id": "atrium", "name": "ATRIUM Central Quad", "category": "service", "labelGroup": "label_110_443" }
                ],
                "roomCoords": {
                    "C001": { "x": 1296.5, "y": 2, "z": 239.0 },
                    "C002": { "x": 1633.4, "y": 2, "z": 241.9 },
                    "C003": { "x": 1544.3, "y": 2, "z": 617.6 },
                    "C004": { "x": 1444.3, "y": 2, "z": 1365.6 },
                    "C005": { "x": 1905.6, "y": 2, "z": 264.4 },
                    "C006": { "x": 2120.9, "y": 2, "z": 247.1 },
                    "C007": { "x": 2476.4, "y": 2, "z": 1400.3 },
                    "C008": { "x": 2399.0, "y": 2, "z": 587.5 },
                    "C009": { "x": 2674.6, "y": 2, "z": 559.9 },
                    "C011": { "x": 3090.2, "y": 2, "z": 258.4 },
                    "C012": { "x": 3163.5, "y": 2, "z": 674.2 },
                    "C013": { "x": 3172.0, "y": 2, "z": 870.8 },
                    "C014": { "x": 3070.0, "y": 2, "z": 1985.9 },
                    "C015": { "x": 2200.9, "y": 2, "z": 2029.0 },
                    "C016": { "x": 1070.3, "y": 2, "z": 1999.5 },
                    "C017": { "x": 235.9, "y": 2, "z": 2004.9 },
                    "C018": { "x": 244.6, "y": 2, "z": 896.5 },
                    "C019": { "x": 241.2, "y": 2, "z": 700.8 },
                    "C020": { "x": 213.1, "y": 2, "z": 268.7 },
                    "C021": { "x": 857.2, "y": 2, "z": 264.2 },
                    "atrium": { "x": 1688.3, "y": 2, "z": 2534.0 }
                },
                "graphNodes": {
                    "N_NW_W": { "x": 340, "z": 630, "landmark": "North-West Hallway end" },
                    "N_NW_C020": { "x": 560, "z": 630, "landmark": "Hallway outside C-020 Class Room" },
                    "N_NW_C021": { "x": 1000, "z": 630, "landmark": "Hallway outside C-021 Boys Washroom" },
                    "N_NW_JUNCT": { "x": 1000, "z": 630, "landmark": "North-West Hallway Junction" },
                    "NW_VERT_MID": { "x": 1000, "z": 850, "landmark": "North-West Connector Hallway" },
                    "NW_MID_JUNCT": { "x": 1000, "z": 1050, "landmark": "Middle Corridor NW Junction" },
                    "NC_C001": { "x": 1350, "z": 540, "landmark": "Hallway outside C-001 Staff Room" },
                    "NC_C002": { "x": 1670, "z": 540, "landmark": "Hallway outside C-002 Staff Room" },
                    "NC_JUNCT": { "x": 1335, "z": 540, "landmark": "Board Room North-West Corner" },
                    "BR_C003_DOOR": { "x": 1335, "z": 670, "landmark": "Hallway outside C-003 Board Room" },
                    "BR_MID_JUNCT": { "x": 1335, "z": 1050, "landmark": "Middle Corridor Board Room Junction" },
                    "CTR_VERT_TOP": { "x": 2070, "z": 600, "landmark": "Upper Corridor outside Lift & Power Room" },
                    "CTR_VERT_C005": { "x": 1995, "z": 600, "landmark": "Corridor outside C-005 Power Control Room" },
                    "CTR_VERT_C006": { "x": 2150, "z": 600, "landmark": "Corridor outside C-006 Elevator / Lift" },
                    "CTR_VERT_C008": { "x": 2070, "z": 830, "landmark": "Corridor outside C-008 Class Room" },
                    "CTR_VERT_C009": { "x": 2070, "z": 800, "landmark": "Corridor junction to C-009 Lab" },
                    "CTR_C009_DOOR": { "x": 2705, "z": 800, "landmark": "Hallway outside C-009 Lab" },
                    "CTR_MID_JUNCT": { "x": 2070, "z": 1050, "landmark": "Central Main Crossing (Middle Corridor)" },
                    "CTR_VERT_CABINS": { "x": 2070, "z": 1400, "landmark": "Central Corridor between HoD Cabins" },
                    "CTR_SOUTH_JUNCT": { "x": 2070, "z": 1760, "landmark": "Central South Corridor Junction" },
                    "NE_C011": { "x": 3150, "z": 600, "landmark": "Hallway outside C-011 Girls Washroom" },
                    "NE_JUNCT": { "x": 2920, "z": 600, "landmark": "North-East Hallway Corner" },
                    "NE_C012": { "x": 2920, "z": 730, "landmark": "Hallway outside C-012 Class Room" },
                    "NE_C013": { "x": 2920, "z": 1050, "landmark": "Hallway outside C-013 Class Room" },
                    "NE_MID_JUNCT": { "x": 2880, "z": 1050, "landmark": "Middle Corridor East Junction" },
                    "MID_WEST_JUNCT": { "x": 690, "z": 1050, "landmark": "Middle Corridor West Junction" },
                    "MID_C004_DOOR": { "x": 1730, "z": 1050, "landmark": "Corridor outside C-004 HoD Cyber Security" },
                    "MID_C007_DOOR": { "x": 2495, "z": 1050, "landmark": "Corridor outside C-007 HoD Data Science" },
                    "WEST_C019": { "x": 690, "z": 808, "landmark": "Corridor outside C-019 Class Room" },
                    "WEST_C018": { "x": 690, "z": 1010, "landmark": "Corridor outside C-018 Class Room" },
                    "WEST_VERT_MID": { "x": 690, "z": 1400, "landmark": "West Vertical Corridor Midpoint" },
                    "WEST_SOUTH_JUNCT": { "x": 690, "z": 1760, "landmark": "South-West Corridor Junction" },
                    "EAST_BYPASS_TOP": { "x": 3030, "z": 1144, "landmark": "East Corridor Bypass Top" },
                    "EAST_BYPASS_MID": { "x": 3030, "z": 1474, "landmark": "East Corridor Bypass Middle" },
                    "EAST_SOUTH_JUNCT": { "x": 3030, "z": 1760, "landmark": "South-East Corridor Junction" },
                    "EAST_C014_DOOR": { "x": 2950, "z": 1760, "landmark": "Corridor outside C-014 Class Room" },
                    "SOUTH_C017_DOOR": { "x": 690, "z": 1760, "landmark": "Corridor outside C-017 Class Room" },
                    "SOUTH_C016_DOOR": { "x": 1336, "z": 1760, "landmark": "Corridor outside C-016 Students Section" },
                    "SOUTH_ATRIUM_JUNCT": { "x": 1650, "z": 1760, "landmark": "South Corridor Atrium T-Junction" },
                    "SOUTH_C015_DOOR": { "x": 1995, "z": 1760, "landmark": "Corridor outside C-015 Registrar Office" },
                    "ATRIUM_SPINE_1": { "x": 1650, "z": 1960, "landmark": "Atrium Entry Path 1" },
                    "ATRIUM_SPINE_2": { "x": 1650, "z": 2250, "landmark": "Atrium Entry Path 2" },
                    "ATRIUM_SPINE_3": { "x": 1650, "z": 2600, "landmark": "ATRIUM Central Quad" }
                },
                "graphEdges": [
                    ["N_NW_W", "N_NW_C020"],
                    ["N_NW_C020", "N_NW_C021"],
                    ["N_NW_C021", "N_NW_JUNCT"],
                    ["N_NW_JUNCT", "NW_VERT_MID"],
                    ["NW_VERT_MID", "NW_MID_JUNCT"],
                    ["NC_JUNCT", "NC_C001"],
                    ["NC_C001", "NC_C002"],
                    ["NC_JUNCT", "BR_C003_DOOR"],
                    ["BR_C003_DOOR", "BR_MID_JUNCT"],
                    ["CTR_VERT_C005", "CTR_VERT_TOP"],
                    ["CTR_VERT_TOP", "CTR_VERT_C006"],
                    ["CTR_VERT_TOP", "CTR_VERT_C009"],
                    ["CTR_VERT_C009", "CTR_C009_DOOR"],
                    ["CTR_VERT_TOP", "CTR_VERT_C008"],
                    ["CTR_VERT_C008", "CTR_MID_JUNCT"],
                    ["CTR_MID_JUNCT", "CTR_VERT_CABINS"],
                    ["CTR_VERT_CABINS", "CTR_SOUTH_JUNCT"],
                    ["NE_C011", "NE_JUNCT"],
                    ["NE_JUNCT", "NE_C012"],
                    ["NE_C012", "NE_C013"],
                    ["NE_C013", "NE_MID_JUNCT"],
                    ["MID_WEST_JUNCT", "NW_MID_JUNCT"],
                    ["NW_MID_JUNCT", "BR_MID_JUNCT"],
                    ["BR_MID_JUNCT", "MID_C004_DOOR"],
                    ["MID_C004_DOOR", "CTR_MID_JUNCT"],
                    ["CTR_MID_JUNCT", "MID_C007_DOOR"],
                    ["MID_C007_DOOR", "NE_MID_JUNCT"],
                    ["NE_MID_JUNCT", "EAST_BYPASS_TOP"],
                    ["WEST_C019", "WEST_C018"],
                    ["WEST_C018", "MID_WEST_JUNCT"],
                    ["MID_WEST_JUNCT", "WEST_VERT_MID"],
                    ["WEST_VERT_MID", "WEST_SOUTH_JUNCT"],
                    ["WEST_SOUTH_JUNCT", "SOUTH_C017_DOOR"],
                    ["EAST_BYPASS_TOP", "EAST_BYPASS_MID"],
                    ["EAST_BYPASS_MID", "EAST_SOUTH_JUNCT"],
                    ["EAST_SOUTH_JUNCT", "EAST_C014_DOOR"],
                    ["SOUTH_C017_DOOR", "SOUTH_C016_DOOR"],
                    ["SOUTH_C016_DOOR", "SOUTH_ATRIUM_JUNCT"],
                    ["SOUTH_ATRIUM_JUNCT", "SOUTH_C015_DOOR"],
                    ["SOUTH_C015_DOOR", "CTR_SOUTH_JUNCT"],
                    ["CTR_SOUTH_JUNCT", "EAST_C014_DOOR"],
                    ["SOUTH_ATRIUM_JUNCT", "ATRIUM_SPINE_1"],
                    ["ATRIUM_SPINE_1", "ATRIUM_SPINE_2"],
                    ["ATRIUM_SPINE_2", "ATRIUM_SPINE_3"]
                ],
                "roomToNode": {
                    "C001": "NC_C001",
                    "C002": "NC_C002",
                    "C003": "BR_C003_DOOR",
                    "C004": "MID_C004_DOOR",
                    "C005": "CTR_VERT_C005",
                    "C006": "CTR_VERT_C006",
                    "C007": "MID_C007_DOOR",
                    "C008": "CTR_VERT_C008",
                    "C009": "CTR_C009_DOOR",
                    "C011": "NE_C011",
                    "C012": "NE_C012",
                    "C013": "NE_C013",
                    "C014": "EAST_C014_DOOR",
                    "C015": "SOUTH_C015_DOOR",
                    "C016": "SOUTH_C016_DOOR",
                    "C017": "SOUTH_C017_DOOR",
                    "C018": "WEST_C018",
                    "C019": "WEST_C019",
                    "C020": "N_NW_C020",
                    "C021": "N_NW_C021",
                    "atrium": "ATRIUM_SPINE_3"
                }
            }
        }
    }
};

// Category Colors for Visual Highlighting & Glowing Badges
const CATEGORY_COLORS = {
    class: 0x3b82f6,    // Vibrant Blue
    lab: 0x10b981,      // Emerald Green
    dept: 0x8b5cf6,     // Royal Purple
    admin: 0x8b5cf6,    // Royal Purple
    staff: 0xf59e0b,    // Warm Amber
    faculty: 0xf59e0b,  // Warm Amber
    seminar: 0x06b6d4,  // Cyan
    special: 0x6366f1,  // Indigo
    service: 0x06b6d4,  // Cyan
    utility: 0xec4899,  // Magenta / Rose
    washroom: 0xec4899  // Magenta / Rose
};

// ==========================================
// 2. STATE & GLOBAL VARIABLES
// ==========================================

let currentBlock = 'A'; // 'A', 'B', 'C'
let currentFloor = 0;   // A: 0, B: 1, 2, 3, 4
let currentViewMode = '2d'; // '2d' or '3d'

let scene, camera, renderer, controls;
let currentModel = null;
let planMesh2D = null;
let roomMeshes = [];
let wallMeshes = [];
let originalMaterials = new Map();
let currentSelectedRoomId = null;

// Route Visuals
let routeGroup = null;
let selectionPinGroup = null;
let categoryPinsGroup = null;
let startDestPinsGroup = null;
let dynamicLabelsGroup = null;
let routeLine = null;
let startMarker = null;
let destMarker = null;
let pulseMarkers = [];
let airportTrackTexture = null;
let activeRouteCurve = null;

// Raycasting & Interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// DOM Element References
const container = document.getElementById('canvas-container');
const startSelect = document.getElementById('start-select');
const destSelect = document.getElementById('dest-select');
const findRouteBtn = document.getElementById('find-route-btn');
const clearRouteBtn = document.getElementById('clear-route-btn');
const swapBtn = document.getElementById('swap-btn');
const globalInput = document.getElementById('global-search-input');
const globalClear = document.getElementById('global-search-clear');
const globalResults = document.getElementById('global-search-results');
const popupElement = document.getElementById('room-popup');
const popupClose = document.getElementById('popup-close');
const popupRoomBadge = document.getElementById('popup-room-badge');
const popupRoomName = document.getElementById('popup-room-name');
const popupRoomDesc = document.getElementById('popup-room-desc');
const popupRoomFloor = document.getElementById('popup-room-floor');
const popupSetStart = document.getElementById('popup-set-start');
const popupSetDest = document.getElementById('popup-set-dest');
const popupBtnInfo = document.getElementById('popup-btn-info');
const popupBtnFaculty = document.getElementById('popup-btn-faculty');
const popupTabContent = document.getElementById('popup-tab-content');
const popupInfoView = document.getElementById('popup-info-view');
const popupFacultyView = document.getElementById('popup-faculty-view');
const popupInfoDetails = document.getElementById('popup-info-details');
const popupFacultyDetails = document.getElementById('popup-faculty-details');
const popupInfoTypeTag = document.getElementById('popup-info-type-tag');
const popupFacultyCountBadge = document.getElementById('popup-faculty-count-badge');
const mode2DBtn = document.getElementById('mode-2d-btn');
const mode3DBtn = document.getElementById('mode-3d-btn');

const headerBlockBtn = document.getElementById('header-block-btn');
const headerBlockMenu = document.getElementById('header-block-menu');
const activeBlockBadgeText = document.getElementById('active-block-badge-text');

const headerFloorBtn = document.getElementById('header-floor-btn');
const headerFloorMenu = document.getElementById('header-floor-menu');
const headerFloorIndicator = document.getElementById('header-floor-indicator');
const activeFloorBadgeText = document.getElementById('active-floor-badge-text');
const floatFloorIndicator = document.getElementById('float-floor-indicator');
const floorSwitcherBtn = document.getElementById('floor-switcher-btn');
const floorSwitcherDropdown = document.getElementById('floor-switcher-dropdown');

const floorModal = document.getElementById('floor-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');

const resetViewBtn = document.getElementById('reset-view-btn');
const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
const sidebar = document.getElementById('sidebar');

// ==========================================
// 3. INITIALIZATION
// ==========================================

function init() {
    setupScene();
    setupEventListeners();
    switchBlockAndFloor('A', 0);
    animate();
}

function setupScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 10, 35000);
    camera.position.set(0, 3600, 1);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 200;
    controls.maxDistance = 14000;
    controls.enableRotate = false; // 2D start mode

    // Groups
    routeGroup = new THREE.Group();
    scene.add(routeGroup);

    selectionPinGroup = new THREE.Group();
    scene.add(selectionPinGroup);

    categoryPinsGroup = new THREE.Group();
    scene.add(categoryPinsGroup);

    startDestPinsGroup = new THREE.Group();
    scene.add(startDestPinsGroup);

    dynamicLabelsGroup = new THREE.Group();
    scene.add(dynamicLabelsGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(1500, 4000, 1500);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe0f2fe, 0.8);
    dirLight2.position.set(-1500, 3000, -1500);
    scene.add(dirLight2);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    if (!container || !camera || !renderer) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// ==========================================
// 4. BLOCK & FLOOR SWITCHING LOGIC
// ==========================================

function switchBlockAndFloor(blockKey, floorNum) {
    const block = BLOCK_CONFIGS[blockKey];
    if (!block) return;

    currentBlock = blockKey;
    if (floorNum === undefined || floorNum === null || !block.availableFloors.includes(floorNum)) {
        floorNum = block.defaultFloor;
    }
    currentFloor = floorNum;

    const config = block.floorConfigs[floorNum];
    if (!config) {
        showModal('Floor Not Available', `Floor ${floorNum} is not available in ${block.name}.`);
        return;
    }

    // Update Header UI Indicators
    if (activeBlockBadgeText) activeBlockBadgeText.innerText = block.name;
    if (headerFloorIndicator) headerFloorIndicator.innerText = `${block.name} • ${config.name} (${config.shortName})`;
    if (activeFloorBadgeText) activeFloorBadgeText.innerText = config.name;
    if (floatFloorIndicator) floatFloorIndicator.innerText = config.shortName;

    // Update Block Switcher Tabs & Dropdowns
    updateBlockSwitcherUI();

    // Show loading overlay
    const overlay = document.getElementById('loading-overlay');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = '0%';
    progressText.innerText = `Loading ${block.name} ${config.name}... 0%`;
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    overlay.style.display = 'flex';

    let overlayHidden = false;
    function hideLoadingOverlay() {
        if (overlayHidden) return;
        overlayHidden = true;
        progressBar.style.width = '100%';
        progressText.innerText = 'Ready';
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.visibility = 'hidden';
                overlay.style.display = 'none';
            }, 350);
        }, 200);
    }

    // Safety fallback timer so loading screen never hangs
    const safetyTimer = setTimeout(hideLoadingOverlay, 3500);

    // Clear previous models & states
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
    if (dynamicLabelsGroup) {
        while (dynamicLabelsGroup.children.length > 0) {
            dynamicLabelsGroup.remove(dynamicLabelsGroup.children[0]);
        }
    }

    roomMeshes = [];
    wallMeshes = [];
    originalMaterials.clear();

    // Populate Sidebar Dropdowns
    populateDropdowns(config.rooms);

    // Create 2D Architectural Blueprint Plan Mesh
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
        progressText.innerText = `Loading ${block.name} ${config.name}... ${percent}%`;
    };

    manager.onLoad = function () {
        clearTimeout(safetyTimer);
        hideLoadingOverlay();
    };

    manager.onError = function (url) {
        console.warn('Resource load error:', url);
        clearTimeout(safetyTimer);
        hideLoadingOverlay();
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
            
            // Center model automatically
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            object.position.x = -center.x;
            object.position.y = -center.y;
            object.position.z = -center.z;
            
            // Traverse meshes and adjust materials & layering (matching B-Block standard)
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

                        // Standard B-Block Label Material Properties
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

                    let geomCenter = new THREE.Vector3();
                    if (child.geometry) {
                        if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();
                        child.geometry.boundingBox.getCenter(geomCenter);
                    }

                    if (isGround) {
                        child.position.y = -2.0;
                    } else if (isFloor) {
                        if (child.geometry && child.geometry.boundingBox.min.y > 150) {
                            child.visible = false; // Hide ceiling
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

                        let geomSize = new THREE.Vector3();
                        if (child.geometry && child.geometry.boundingBox) {
                            child.geometry.boundingBox.getSize(geomSize);
                        }

                        const isHallway = geomSize.x > 1500 || geomSize.z > 1100;
                        if (!isHallway) {
                            let closestRoom = null;
                            let minDist = Infinity;
                            config.rooms.forEach(r => {
                                if (r.id === 'lift' || r.id === 'lift1' || r.id === 'lift2' || r.id === 'atrium') return;
                                const pos = config.roomCoords[r.id];
                                if (pos) {
                                    const dist = Math.hypot(geomCenter.x - pos.x, geomCenter.z - pos.z);
                                    if (dist < minDist && dist < 480) {
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
                        // Matching B-Block label mesh assignment
                        child.visible = true;
                        const matchedRoom = config.rooms.find(r => {
                            const lg = (r.labelGroup || '').toLowerCase();
                            return lg && (nameLower.includes(lg) || parentLower.includes(lg));
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
                camera.position.set(0, 3600, 1);
                controls.target.set(0, 0, 0);
                controls.enableRotate = true;
            }
            controls.update();
            updateWallVisibilityForMode(currentViewMode);
            hideLoadingOverlay();
        }, undefined, function (err) {
            console.error('OBJ load error:', err);
            hideLoadingOverlay();
        });
    }, undefined, function (err) {
        console.error('MTL load error:', err);
        hideLoadingOverlay();
    });
}

function updateBlockSwitcherUI() {
    // 1. Update Header Block Tabs
    document.querySelectorAll('.block-tab-btn').forEach(btn => {
        const blk = btn.dataset.blockTab;
        if (blk === currentBlock) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. Update Sidebar Block Cards
    document.querySelectorAll('.sidebar-blk-card').forEach(card => {
        const blk = card.dataset.blkCard;
        if (blk === currentBlock) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    // 3. Update Header Floor Selector Pills Bar
    const headerFloorBar = document.getElementById('header-floor-tabs-bar');
    const sidebarFloorContainer = document.getElementById('sidebar-floor-buttons');
    const block = BLOCK_CONFIGS[currentBlock];

    if (headerFloorBar && block) {
        let barHtml = '';
        block.availableFloors.forEach(fl => {
            const flConfig = block.floorConfigs[fl];
            const isActive = (currentFloor === fl);
            barHtml += `<button class="floor-tab-btn ${isActive ? 'active' : ''}" data-floor-tab="${fl}">${flConfig.shortName}</button>`;
        });
        headerFloorBar.innerHTML = barHtml;

        headerFloorBar.querySelectorAll('.floor-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetFloor = parseInt(btn.dataset.floorTab, 10);
                switchBlockAndFloor(currentBlock, targetFloor);
            });
        });
    }

    // 4. Update Sidebar Floor Pills
    if (sidebarFloorContainer && block) {
        let sideHtml = '';
        block.availableFloors.forEach(fl => {
            const flConfig = block.floorConfigs[fl];
            const isActive = (currentFloor === fl);
            sideHtml += `<button class="sidebar-floor-pill ${isActive ? 'active' : ''}" data-sidebar-floor="${fl}">${flConfig.shortName} ${flConfig.name}</button>`;
        });
        sidebarFloorContainer.innerHTML = sideHtml;

        sidebarFloorContainer.querySelectorAll('.sidebar-floor-pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetFloor = parseInt(btn.dataset.sidebarFloor, 10);
                switchBlockAndFloor(currentBlock, targetFloor);
            });
        });
    }

    // 5. Update Dropdown menus
    updateBlockDropdownUI();
    updateFloorDropdownUI();
}

function updateBlockDropdownUI() {
    if (!headerBlockMenu) return;
    headerBlockMenu.innerHTML = `
        <a href="#" data-block="A" class="${currentBlock === 'A' ? 'active' : ''}">
            <span class="floor-pill-num">A</span>
            <span class="floor-pill-name">A-Block (Ground Floor)</span>
        </a>
        <a href="#" data-block="B" class="${currentBlock === 'B' ? 'active' : ''}">
            <span class="floor-pill-num">B</span>
            <span class="floor-pill-name">B-Block (1st - 4th Floor)</span>
        </a>
        <a href="#" data-block="C" class="${currentBlock === 'C' ? 'active' : ''}">
            <span class="floor-pill-num">C</span>
            <span class="floor-pill-name">C-Block (Ground Floor)</span>
        </a>
    `;

    headerBlockMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const blk = a.dataset.block;
            switchBlockAndFloor(blk);
            headerBlockMenu.classList.remove('show');
        });
    });
}

function updateFloorDropdownUI() {
    const block = BLOCK_CONFIGS[currentBlock];
    if (!block || !headerFloorMenu) return;

    let html = '';
    if (currentBlock === 'A') {
        html += `
            <a href="#" data-floor="0" class="${currentFloor === 0 ? 'active' : ''}">
                <span class="floor-pill-num">0F</span>
                <span class="floor-pill-name">Ground Floor (0th)</span>
            </a>
            <div class="menu-divider-label">Other Blocks</div>
            <a href="#" data-switch-block="B" data-switch-floor="1">
                <span class="floor-pill-num">B</span>
                <span class="floor-pill-name">B-Block (1F - 4F)</span>
            </a>
            <a href="#" data-switch-block="C" data-switch-floor="0">
                <span class="floor-pill-num">C</span>
                <span class="floor-pill-name">C-Block (0F)</span>
            </a>
        `;
    } else if (currentBlock === 'B') {
        html += `
            <div class="menu-divider-label">B-Block Floors</div>
            <a href="#" data-floor="1" class="${currentFloor === 1 ? 'active' : ''}">
                <span class="floor-pill-num">1F</span>
                <span class="floor-pill-name">1st Floor</span>
            </a>
            <a href="#" data-floor="2" class="${currentFloor === 2 ? 'active' : ''}">
                <span class="floor-pill-num">2F</span>
                <span class="floor-pill-name">2nd Floor</span>
            </a>
            <a href="#" data-floor="3" class="${currentFloor === 3 ? 'active' : ''}">
                <span class="floor-pill-num">3F</span>
                <span class="floor-pill-name">3rd Floor</span>
            </a>
            <a href="#" data-floor="4" class="${currentFloor === 4 ? 'active' : ''}">
                <span class="floor-pill-num">4F</span>
                <span class="floor-pill-name">4th Floor</span>
            </a>
            <div class="menu-divider-label">Other Blocks</div>
            <a href="#" data-switch-block="A" data-switch-floor="0">
                <span class="floor-pill-num">A</span>
                <span class="floor-pill-name">A-Block (Ground Floor)</span>
            </a>
            <a href="#" data-switch-block="C" data-switch-floor="0">
                <span class="floor-pill-num">C</span>
                <span class="floor-pill-name">C-Block (0F)</span>
            </a>
        `;
    } else if (currentBlock === 'C') {
        html += `
            <a href="#" data-floor="0" class="${currentFloor === 0 ? 'active' : ''}">
                <span class="floor-pill-num">0F</span>
                <span class="floor-pill-name">Ground Floor (0th)</span>
            </a>
            <div class="menu-divider-label">Other Blocks</div>
            <a href="#" data-switch-block="A" data-switch-floor="0">
                <span class="floor-pill-num">A</span>
                <span class="floor-pill-name">A-Block (0F)</span>
            </a>
            <a href="#" data-switch-block="B" data-switch-floor="1">
                <span class="floor-pill-num">B</span>
                <span class="floor-pill-name">B-Block (1F - 4F)</span>
            </a>
        `;
    }

    headerFloorMenu.innerHTML = html;
    if (floorSwitcherDropdown) floorSwitcherDropdown.innerHTML = html;

    const bindDropdownEvents = (menuEl) => {
        if (!menuEl) return;
        menuEl.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                if (a.dataset.switchBlock) {
                    switchBlockAndFloor(a.dataset.switchBlock, parseInt(a.dataset.switchFloor, 10));
                } else if (a.dataset.floor !== undefined) {
                    switchBlockAndFloor(currentBlock, parseInt(a.dataset.floor, 10));
                }
                menuEl.classList.remove('show');
            });
        });
    };

    bindDropdownEvents(headerFloorMenu);
    bindDropdownEvents(floorSwitcherDropdown);
}

function showModal(title, message) {
    modalTitle.innerText = title;
    modalMessage.innerText = message;
    floorModal.style.display = 'flex';
}

function getRoomDisplayName(room) {
    if (!room) return '';
    let name = (room.name || '').trim();
    let id = (room.id || '').trim();

    if (/^room\s+/i.test(name)) return name;
    if (/^[0-9]/.test(name)) {
        return `Room ${name}`;
    }
    if (/^[0-9]+[A-Za-z]?$/.test(id)) {
        return `Room ${id} - ${name}`;
    }
    return name;
}

function populateDropdowns(rooms) {
    startSelect.innerHTML = '<option value="">Choose start location</option>';
    destSelect.innerHTML = '<option value="">Choose destination</option>';

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
        const displayName = getRoomDisplayName(room);
        const opt = new Option(displayName, room.id);
        startSelect.add(opt.cloneNode(true));
        destSelect.add(opt);
    });
}

// ==========================================
// 5. VIEW MODE TOGGLE (2D / 3D)
// ==========================================

function setViewMode(mode) {
    if (currentViewMode === mode) return;
    currentViewMode = mode;

    if (mode === '2d') {
        mode2DBtn.classList.add('active');
        mode3DBtn.classList.remove('active');
        if (planMesh2D) planMesh2D.visible = true;
        controls.enableRotate = false;
        updateWallVisibilityForMode('2d');
        animateCameraTo(new THREE.Vector3(0, 3600, 1), new THREE.Vector3(0, 0, 0), 600);
    } else {
        mode3DBtn.classList.add('active');
        mode2DBtn.classList.remove('active');
        if (planMesh2D) planMesh2D.visible = false;
        controls.enableRotate = true;
        updateWallVisibilityForMode('3d');
        animateCameraTo(new THREE.Vector3(0, 3600, 1), new THREE.Vector3(0, 0, 0), 600);
    }
}

function updateWallVisibilityForMode(mode) {
    const showWalls = (mode === '3d');
    wallMeshes.forEach(mesh => {
        mesh.visible = showWalls;
    });
}

function animateCameraTo(targetPos, targetLookAt, duration = 600) {
    const startPos = camera.position.clone();
    const startLook = controls.target.clone();
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1.0);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;

        camera.position.lerpVectors(startPos, targetPos, ease);
        controls.target.lerpVectors(startLook, targetLookAt, ease);
        controls.update();

        if (progress < 1.0) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// ==========================================
// 6. ROOM SELECTION, HIGHLIGHTING & POPUP
// ==========================================

function onPointerDown(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        let hitRoomId = null;
        for (const hit of intersects) {
            if (hit.object.userData && hit.object.userData.roomId) {
                hitRoomId = hit.object.userData.roomId;
                break;
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
    const block = BLOCK_CONFIGS[currentBlock];
    const config = block.floorConfigs[currentFloor];
    currentSelectedRoomId = roomId;
    const room = config.rooms.find(r => r.id === roomId);
    if (!room) return;

    const displayName = getRoomDisplayName(room);
    popupRoomBadge.innerText = room.category.toUpperCase();
    popupRoomName.innerText = displayName;
    popupRoomDesc.innerText = `Category: ${room.category.toUpperCase()} • ${block.name} ${config.name}`;
    popupRoomFloor.innerText = `${block.name}, ${config.name}`;
    popupElement.style.display = 'block';

    // Reset popup tab state
    if (popupTabContent) popupTabContent.style.display = 'none';
    if (popupInfoView) popupInfoView.style.display = 'none';
    if (popupFacultyView) popupFacultyView.style.display = 'none';
    if (popupBtnInfo) popupBtnInfo.classList.remove('active');
    if (popupBtnFaculty) popupBtnFaculty.classList.remove('active');

    // Faculty option visibility (classroom/lab/office/faculty/room)
    const cat = (room.category || '').toLowerCase();
    const nonRoomCats = ['lift', 'stairs', 'restroom', 'washroom', 'atrium', 'entrance', 'corridor'];
    const isRoomOrLab = !nonRoomCats.includes(cat);
    if (popupBtnFaculty) {
        popupBtnFaculty.style.display = isRoomOrLab ? 'flex' : 'none';
    }
    
    updateSelectionPin(roomId);

    // Highlight room floor & text
    roomMeshes.forEach(mesh => {
        if (mesh.userData.roomId === roomId) {
            if (mesh.material) {
                if (mesh.userData.isFloor) {
                    mesh.material.transparent = false;
                    mesh.material.opacity = 1.0;
                    mesh.material.color.setHex(0x10b981);
                    if (mesh.material.emissive) mesh.material.emissive.setHex(0x064e3b);
                } else if (mesh.userData.isLabel || mesh.userData.isDynamicLabel) {
                    mesh.material.transparent = true;
                    mesh.material.opacity = 1.0;
                    mesh.renderOrder = 100;
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

    const roomPos = getRoomPos(roomId);
    if (roomPos && currentModel) {
        const targetWorld = roomPos.clone().add(currentModel.position);
        animateCameraTo(
            new THREE.Vector3(targetWorld.x, 2000, targetWorld.z + 1),
            targetWorld,
            450
        );
    }
}

function updateSelectionPin(roomId) {
    if (!selectionPinGroup) return;
    while (selectionPinGroup.children.length > 0) {
        selectionPinGroup.remove(selectionPinGroup.children[0]);
    }
    if (!roomId || !currentModel) return;
    const config = BLOCK_CONFIGS[currentBlock].floorConfigs[currentFloor];
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
    const config = BLOCK_CONFIGS[currentBlock].floorConfigs[currentFloor];

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

    if (popupTabContent) popupTabContent.style.display = 'none';
    if (popupInfoView) popupInfoView.style.display = 'none';
    if (popupFacultyView) popupFacultyView.style.display = 'none';
    if (popupBtnInfo) popupBtnInfo.classList.remove('active');
    if (popupBtnFaculty) popupBtnFaculty.classList.remove('active');

    if (selectionPinGroup) {
        while (selectionPinGroup.children.length > 0) {
            selectionPinGroup.remove(selectionPinGroup.children[0]);
        }
    }

    document.querySelectorAll('.filter-pill').forEach(b => {
        if (b.dataset.filter === 'all') b.classList.add('active');
        else b.classList.remove('active');
    });
    filterRooms('all');

    if (globalInput) globalInput.value = '';
    if (globalClear) globalClear.style.display = 'none';
    if (globalResults) globalResults.style.display = 'none';
}

function updatePopupPosition() {
    if (!popupElement || popupElement.style.display === 'none' || !currentSelectedRoomId || !currentModel) return;
    const roomPos = getRoomPos(currentSelectedRoomId);
    if (!roomPos) return;

    const worldPos = roomPos.clone().add(currentModel.position);
    worldPos.y += 20;

    const screenPos = worldPos.clone().project(camera);
    const hw = container.clientWidth / 2;
    const hh = container.clientHeight / 2;

    const x = (screenPos.x * hw) + hw;
    const y = -(screenPos.y * hh) + hh;

    popupElement.style.left = `${Math.round(x)}px`;
    popupElement.style.top = `${Math.round(y)}px`;
}

// ==========================================
// 7. CATEGORY FILTERING & RADIANT FLOOR AURA
// ==========================================

const auraTextureCache = new Map();

function createAuraTexture(colorHex) {
    if (auraTextureCache.has(colorHex)) {
        return auraTextureCache.get(colorHex);
    }
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const color = new THREE.Color(colorHex);
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);

    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0.0, `rgba(${r}, ${g}, ${b}, 0.98)`);
    gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.88)`);
    gradient.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, 0.58)`);
    gradient.addColorStop(0.72, `rgba(${r}, ${g}, ${b}, 0.22)`);
    gradient.addColorStop(1.0, `rgba(${r}, ${g}, ${b}, 0.0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    auraTextureCache.set(colorHex, texture);
    return texture;
}

const CATEGORY_ALIASES = {
    class: ['class', 'classroom'],
    lab: ['lab', 'laboratory'],
    faculty: ['faculty', 'staff', 'hod'],
    admin: ['admin', 'dept', 'office', 'special', 'seminar', 'auditorium'],
    service: ['service', 'utility', 'lift', 'power'],
    washroom: ['washroom', 'restroom', 'toilet']
};

function matchCategory(roomCategory, selectedCategory) {
    if (!roomCategory || !selectedCategory) return false;
    if (selectedCategory === 'all') return true;
    const rCat = roomCategory.toLowerCase().trim();
    const sCat = selectedCategory.toLowerCase().trim();
    if (rCat === sCat) return true;
    const aliases = CATEGORY_ALIASES[sCat];
    return aliases ? aliases.includes(rCat) : false;
}

function filterRooms(category) {
    const config = BLOCK_CONFIGS[currentBlock].floorConfigs[currentFloor];
    if (!config || !currentModel) return;

    while (categoryPinsGroup.children.length > 0) {
        categoryPinsGroup.remove(categoryPinsGroup.children[0]);
    }

    if (category === 'all') {
        if (planMesh2D && planMesh2D.material) {
            planMesh2D.material.color.setHex(0xffffff);
            planMesh2D.material.opacity = 1.0;
        }
        roomMeshes.forEach(mesh => {
            const orig = originalMaterials.get(mesh);
            if (orig && mesh.material) {
                mesh.material.copy(orig);
                mesh.position.y = mesh.userData.isFloor ? 0.4 : 0.6;
                mesh.renderOrder = (mesh.userData.isLabel || mesh.userData.isDynamicLabel) ? ((currentViewMode === '2d') ? 80 : 90) : 20;
            }
        });
        wallMeshes.forEach(mesh => {
            mesh.visible = (currentViewMode === '3d');
            const orig = originalMaterials.get(mesh);
            if (orig && mesh.material) mesh.material.copy(orig);
        });
        return;
    }

    const catColor = CATEGORY_COLORS[category] || 0x38bdf8;
    const auraTex = createAuraTexture(catColor);

    // Option 3: Cast radiant ambient aura pools of light on the floor of matching rooms
    config.rooms.forEach(room => {
        if (matchCategory(room.category, category)) {
            const coord = config.roomCoords[room.id];
            if (coord) {
                const worldX = coord.x + currentModel.position.x;
                const worldZ = coord.z + currentModel.position.z;

                const auraPlane = new THREE.Mesh(
                    new THREE.PlaneGeometry(280, 280),
                    new THREE.MeshBasicMaterial({
                        map: auraTex,
                        transparent: true,
                        opacity: 0.95,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false,
                        depthTest: false
                    })
                );
                auraPlane.rotation.x = -Math.PI / 2;
                auraPlane.position.set(worldX, 2.8, worldZ);
                auraPlane.userData.isAura = true;
                auraPlane.userData.roomId = room.id;
                auraPlane.renderOrder = 800;
                categoryPinsGroup.add(auraPlane);
            }
        }
    });

    // 2D Mode: Dim non-matching backdrop so radiant auras pop
    if (planMesh2D && planMesh2D.material) {
        planMesh2D.material.color.setHex(0x718096);
    }

    // 3D Mode: Illuminate matching room floors & dim out non-matching areas
    roomMeshes.forEach(mesh => {
        const isMatch = matchCategory(mesh.userData.category, category);
        if (isMatch) {
            if (mesh.userData.isFloor) {
                mesh.material.transparent = false;
                mesh.material.opacity = 1.0;
                mesh.material.color.setHex(catColor);
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x0f172a);
            } else if (mesh.userData.isLabel || mesh.userData.isDynamicLabel) {
                mesh.material.transparent = true;
                mesh.material.opacity = 1.0;
            }
        } else {
            if (mesh.userData.isFloor) {
                mesh.material.transparent = true;
                mesh.material.opacity = 0.15;
                mesh.material.color.setHex(0x94a3b8);
                if (mesh.material.emissive) mesh.material.emissive.setHex(0x000000);
            } else if (mesh.userData.isLabel || mesh.userData.isDynamicLabel) {
                mesh.material.transparent = true;
                mesh.material.opacity = 0.15;
            }
        }
    });
}

// ==========================================
// 8. DIJKSTRA PATHFINDING & NAVIGATION
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

    const config = BLOCK_CONFIGS[currentBlock].floorConfigs[currentFloor];
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
    if (path.length > 0 && path[0] === startNodeId) {
        drawRoute(path, startId, destId);
        generateInstructions(path, startId, destId, distances[destNodeId]);
    } else {
        alert('No pathway found between these rooms.');
    }
}

function simplifyCollinearPoints(points) {
    if (points.length <= 2) return points;
    const result = [points[0]];

    for (let i = 1; i < points.length - 1; i++) {
        const prev = result[result.length - 1];
        const curr = points[i];
        const next = points[i + 1];

        if (curr.distanceTo(prev) < 0.5) continue;
        if (next.distanceTo(curr) < 0.5) continue;

        const v1 = new THREE.Vector3().subVectors(curr, prev).normalize();
        const v2 = new THREE.Vector3().subVectors(next, curr).normalize();

        const dot = v1.dot(v2);
        if (dot < 0.998) {
            result.push(curr);
        }
    }
    const last = points[points.length - 1];
    if (result[result.length - 1].distanceTo(last) > 0.5) {
        result.push(last);
    }
    return result;
}

function buildStraightRouteCurve(points, filletRadius = 24) {
    const simplified = simplifyCollinearPoints(points);
    if (simplified.length < 2) return null;

    const curvePath = new THREE.CurvePath();

    if (simplified.length === 2) {
        curvePath.add(new THREE.LineCurve3(simplified[0], simplified[1]));
        return { curvePath, points: simplified };
    }

    for (let i = 0; i < simplified.length - 1; i++) {
        const p0 = simplified[i];
        const p1 = simplified[i + 1];

        if (i === 0) {
            const dir = new THREE.Vector3().subVectors(p1, p0);
            const len = dir.length();
            const r = Math.min(filletRadius, len * 0.4);
            const cornerStart = new THREE.Vector3().addVectors(p0, dir.clone().normalize().multiplyScalar(len - r));
            curvePath.add(new THREE.LineCurve3(p0, cornerStart));
        } else if (i === simplified.length - 2) {
            const dirPrev = new THREE.Vector3().subVectors(p0, simplified[i - 1]);
            const dirCurr = new THREE.Vector3().subVectors(p1, p0);
            const lenPrev = dirPrev.length();
            const lenCurr = dirCurr.length();
            const rPrev = Math.min(filletRadius, lenPrev * 0.4);
            const rCurr = Math.min(filletRadius, lenCurr * 0.4);

            const cornerStart = new THREE.Vector3().subVectors(p0, dirPrev.clone().normalize().multiplyScalar(rPrev));
            const cornerEnd = new THREE.Vector3().addVectors(p0, dirCurr.clone().normalize().multiplyScalar(rCurr));

            curvePath.add(new THREE.QuadraticBezierCurve3(cornerStart, p0, cornerEnd));
            curvePath.add(new THREE.LineCurve3(cornerEnd, p1));
        } else {
            const dirPrev = new THREE.Vector3().subVectors(p0, simplified[i - 1]);
            const dirCurr = new THREE.Vector3().subVectors(p1, p0);
            const lenPrev = dirPrev.length();
            const lenCurr = dirCurr.length();
            const rPrev = Math.min(filletRadius, lenPrev * 0.4);
            const rCurr = Math.min(filletRadius, lenCurr * 0.4);

            const cornerStart = new THREE.Vector3().subVectors(p0, dirPrev.clone().normalize().multiplyScalar(rPrev));
            const cornerEnd = new THREE.Vector3().addVectors(p0, dirCurr.clone().normalize().multiplyScalar(rCurr));

            curvePath.add(new THREE.QuadraticBezierCurve3(cornerStart, p0, cornerEnd));

            const rNext = Math.min(filletRadius, lenCurr * 0.4);
            const nextCornerStart = new THREE.Vector3().addVectors(p0, dirCurr.clone().normalize().multiplyScalar(lenCurr - rNext));
            if (cornerEnd.distanceTo(nextCornerStart) > 0.5) {
                curvePath.add(new THREE.LineCurve3(cornerEnd, nextCornerStart));
            }
        }
    }

    return { curvePath, points: simplified };
}

function drawRoute(path, startId, destId) {
    clearRouteVisuals();
    updateStartDestPins();
    if (!path || path.length === 0 || !currentModel) return;

    const config = BLOCK_CONFIGS[currentBlock].floorConfigs[currentFloor];
    const rawPoints = [];

    // Corridor Nodes along path (strictly bounded between Start Pin and Destination Pin)
    path.forEach(nodeId => {
        const node = config.graphNodes[nodeId];
        if (node) {
            rawPoints.push(new THREE.Vector3(node.x + currentModel.position.x, 4.0, node.z + currentModel.position.z));
        }
    });

    if (rawPoints.length < 2) return;

    const routeData = buildStraightRouteCurve(rawPoints, 24);
    if (!routeData) return;
    const { curvePath, points } = routeData;
    activeRouteCurve = curvePath;
    const curvePoints = activeRouteCurve.getPoints(Math.max(60, points.length * 20));

    // Dynamic Airport-Runway Track Texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(2, 132, 199, 0.45)';
    ctx.fillRect(0, 0, 512, 32);

    ctx.fillStyle = '#38bdf8';
    for (let x = 0; x < 512; x += 64) {
        ctx.fillRect(x + 10, 6, 36, 20);
    }
    ctx.fillStyle = '#ffffff';
    for (let x = 0; x < 512; x += 64) {
        ctx.fillRect(x + 18, 11, 20, 10);
    }

    airportTrackTexture = new THREE.CanvasTexture(canvas);
    airportTrackTexture.wrapS = THREE.RepeatWrapping;
    airportTrackTexture.wrapT = THREE.RepeatWrapping;
    const totalDist = activeRouteCurve.getLength();
    airportTrackTexture.repeat.set(Math.max(2, Math.round(totalDist / 80)), 1);

    const tubeGeo = new THREE.TubeGeometry(activeRouteCurve, 120, 6.5, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
        map: airportTrackTexture,
        transparent: true,
        opacity: 0.95,
        depthTest: false
    });
    routeLine = new THREE.Mesh(tubeGeo, tubeMat);
    routeLine.renderOrder = 998;
    routeGroup.add(routeLine);

    // Glowing Chevrons along route (Problem 2)
    const numArrows = Math.max(4, Math.min(16, Math.floor(totalDist / 200)));
    const chevronGeo = new THREE.ConeGeometry(8.5, 22, 4);
    chevronGeo.rotateX(Math.PI / 2);

    const chevronMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1.0,
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

        const glowMesh = new THREE.Mesh(chevronGeo, glowMat);
        glowMesh.scale.set(1.28, 1.0, 1.28);
        glowMesh.renderOrder = 1001;
        arrowGroup.add(glowMesh);

        const coreMesh = new THREE.Mesh(chevronGeo, chevronMat);
        coreMesh.position.y = 0.5;
        coreMesh.renderOrder = 1002;
        arrowGroup.add(coreMesh);

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
    animateCameraTo(new THREE.Vector3(centerPoint.x, 2600, centerPoint.z + 1), centerPoint, 500);
}

function clearRouteVisuals() {
    if (routeGroup) {
        while (routeGroup.children.length > 0) {
            routeGroup.remove(routeGroup.children[0]);
        }
    }
    activeRouteCurve = null;
    airportTrackTexture = null;
    pulseMarkers = [];
    startMarker = null;
    destMarker = null;
    routeLine = null;
}

function getRoomPos(roomId) {
    const config = BLOCK_CONFIGS[currentBlock].floorConfigs[currentFloor];
    const coords = config.roomCoords[roomId];
    if (!coords) return null;
    return new THREE.Vector3(coords.x, 12, coords.z);
}

function getTurnDirection(prevNode, currNode, nextNode) {
    const config = BLOCK_CONFIGS[currentBlock].floorConfigs[currentFloor];
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
    const config = BLOCK_CONFIGS[currentBlock].floorConfigs[currentFloor];
    const tbtSection = document.getElementById('tbt-section');
    const tbtList = document.getElementById('tbt-list');
    const distanceBadge = document.getElementById('distance-badge');
    
    tbtSection.style.display = 'block';
    const distMeters = (totalDist / 100).toFixed(1);
    const mins = Math.ceil(parseFloat(distMeters) / 80);
    distanceBadge.innerText = `~ ${distMeters} m walk (${mins} min)`;
    
    const sRoom = config.rooms.find(r => r.id === startId);
    const dRoom = config.rooms.find(r => r.id === destId);
    const sName = getRoomDisplayName(sRoom);
    const dName = getRoomDisplayName(dRoom);

    let html = '';
    html += `<div class="tbt-step"><span class="step-icon">🟢</span><span>Start at ${sName}</span></div>`;

    for (let i = 1; i < path.length - 1; i++) {
        const node = config.graphNodes[path[i]];
        const turnDir = getTurnDirection(path[i - 1], path[i], path[i + 1]);
        
        const isDoorway = path[i].startsWith('D_') || path[i].startsWith('d_') || path[i].startsWith('rd_');
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

    html += `<div class="tbt-step"><span class="step-icon">🔴</span><span>Arrive at ${dName}</span></div>`;
    tbtList.innerHTML = html;
}

function clearRoute() {
    clearRouteVisuals();
    document.getElementById('tbt-section').style.display = 'none';
    startSelect.value = '';
    destSelect.value = '';
    updateStartDestPins();
}

// ==========================================
// 9. ANIMATION LOOP
// ==========================================

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    updatePopupPosition();

    if (startMarker && destMarker) {
        const pulse = 1.0 + 0.18 * Math.sin(performance.now() * 0.006);
        startMarker.scale.set(pulse, pulse, pulse);
        destMarker.scale.set(pulse, pulse, pulse);
    }

    if (airportTrackTexture) {
        airportTrackTexture.offset.x -= 0.008;
    }

    if (activeRouteCurve && pulseMarkers.length > 0) {
        const time = performance.now() * 0.00045;
        pulseMarkers.forEach((marker, index) => {
            const offset = (time + index / pulseMarkers.length) % 1.0;
            const pt = activeRouteCurve.getPointAt(offset);
            const tangent = activeRouteCurve.getTangentAt(offset);

            marker.position.copy(pt);
            marker.position.y += 2.0;

            const lookTarget = pt.clone().add(tangent);
            marker.lookAt(lookTarget);
        });
    }

    if (categoryPinsGroup && categoryPinsGroup.children.length > 0) {
        const auraPulse = 0.94 + 0.12 * Math.sin(performance.now() * 0.0035);
        categoryPinsGroup.children.forEach(child => {
            if (child.userData && child.userData.isAura) {
                child.scale.set(auraPulse, auraPulse, 1.0);
            }
        });
    }

    renderer.render(scene, camera);
}

// ==========================================
// 10. EVENT LISTENERS SETUP
// ==========================================

function setupEventListeners() {
    container.addEventListener('pointerdown', onPointerDown);

    findRouteBtn.addEventListener('click', findRoute);
    clearRouteBtn.addEventListener('click', clearRoute);
    swapBtn.addEventListener('click', () => {
        const tmp = startSelect.value;
        startSelect.value = destSelect.value;
        destSelect.value = tmp;
        updateStartDestPins();
        if (startSelect.value && destSelect.value) {
            findRoute();
        }
    });

    startSelect.addEventListener('change', updateStartDestPins);
    destSelect.addEventListener('change', updateStartDestPins);

    popupClose.addEventListener('click', hidePopupAndResetMap);
    popupSetStart.addEventListener('click', () => {
        if (currentSelectedRoomId) {
            startSelect.value = currentSelectedRoomId;
            updateStartDestPins();
            popupElement.style.display = 'none';
        }
    });
    popupSetDest.addEventListener('click', () => {
        if (currentSelectedRoomId) {
            destSelect.value = currentSelectedRoomId;
            updateStartDestPins();
            popupElement.style.display = 'none';
            if (startSelect.value && startSelect.value !== currentSelectedRoomId) {
                findRoute();
            }
        }
    });

    mode2DBtn.addEventListener('click', () => setViewMode('2d'));
    mode3DBtn.addEventListener('click', () => setViewMode('3d'));

    // Block Switcher Header Tabs Click
    document.querySelectorAll('.block-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const blk = btn.dataset.blockTab;
            switchBlockAndFloor(blk);
        });
    });

    // Block Switcher Sidebar Cards Click
    document.querySelectorAll('.sidebar-blk-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const blk = card.dataset.blkCard;
            switchBlockAndFloor(blk);
        });
    });

    if (headerBlockBtn) {
        headerBlockBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (headerFloorMenu) headerFloorMenu.classList.remove('show');
            if (floorSwitcherDropdown) floorSwitcherDropdown.classList.remove('show');
            headerBlockMenu.classList.toggle('show');
        });
    }

    if (headerFloorBtn) {
        headerFloorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (headerBlockMenu) headerBlockMenu.classList.remove('show');
            if (floorSwitcherDropdown) floorSwitcherDropdown.classList.remove('show');
            headerFloorMenu.classList.toggle('show');
        });
    }

    if (floorSwitcherBtn) {
        floorSwitcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (headerBlockMenu) headerBlockMenu.classList.remove('show');
            if (headerFloorMenu) headerFloorMenu.classList.remove('show');
            floorSwitcherDropdown.classList.toggle('show');
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            floorModal.style.display = 'none';
        });
    }

    document.addEventListener('click', () => {
        if (headerBlockMenu) headerBlockMenu.classList.remove('show');
        if (headerFloorMenu) headerFloorMenu.classList.remove('show');
        if (floorSwitcherDropdown) floorSwitcherDropdown.classList.remove('show');
    });

    resetViewBtn.addEventListener('click', () => {
        animateCameraTo(new THREE.Vector3(0, 3600, 1), new THREE.Vector3(0, 0, 0), 450);
    });

    zoomInBtn.addEventListener('click', () => {
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        camera.position.addScaledVector(dir, 400);
        controls.update();
    });

    zoomOutBtn.addEventListener('click', () => {
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        camera.position.addScaledVector(dir, -400);
        controls.update();
    });

    sidebarToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        setTimeout(onWindowResize, 300);
    });

    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
            filterRooms(e.currentTarget.dataset.filter);
        });
    });

    // Global Search Autocomplete
    globalInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
            globalClear.style.display = 'none';
            globalResults.style.display = 'none';
            return;
        }
        globalClear.style.display = 'block';
        const config = BLOCK_CONFIGS[currentBlock].floorConfigs[currentFloor];
        const matches = config.rooms.filter(r => 
            r.id.toLowerCase().includes(query) ||
            r.name.toLowerCase().includes(query) ||
            r.category.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            globalResults.innerHTML = '<li class="no-match">No matching rooms on this floor</li>';
            globalResults.style.display = 'block';
            return;
        }

        let html = '';
        matches.slice(0, 8).forEach(m => {
            const displayName = getRoomDisplayName(m);
            html += `<li data-room-id="${m.id}">
                <span class="res-num">${displayName}</span>
                <span class="res-cat">${m.category.toUpperCase()}</span>
            </li>`;
        });
        globalResults.innerHTML = html;
        globalResults.style.display = 'block';
    });

    globalClear.addEventListener('click', () => {
        globalInput.value = '';
        globalClear.style.display = 'none';
        globalResults.style.display = 'none';
    });

    globalResults.addEventListener('click', (e) => {
        const li = e.target.closest('li[data-room-id]');
        if (li) {
            const roomId = li.dataset.roomId;
            selectRoom(roomId);
            globalResults.style.display = 'none';
        }
    });

    // Room Popup Info & Faculty Tab Event Handlers
    if (popupBtnInfo) {
        popupBtnInfo.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!currentSelectedRoomId) return;
            const isOpening = (popupInfoView.style.display === 'none' || popupTabContent.style.display === 'none');
            if (isOpening) {
                popupTabContent.style.display = 'block';
                popupInfoView.style.display = 'block';
                popupFacultyView.style.display = 'none';
                popupBtnInfo.classList.add('active');
                if (popupBtnFaculty) popupBtnFaculty.classList.remove('active');
                
                const config = BLOCK_CONFIGS[currentBlock].floorConfigs[currentFloor];
                const room = config.rooms.find(r => r.id === currentSelectedRoomId);
                if (room) {
                    const displayName = getRoomDisplayName(room);
                    if (popupInfoTypeTag) popupInfoTypeTag.innerText = (room.category || 'ROOM').toUpperCase();
                    if (popupInfoDetails) {
                        popupInfoDetails.innerHTML = `
                            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.76rem;">
                                <div><strong>Room Name:</strong> ${displayName}</div>
                                <div><strong>Room ID:</strong> ${room.id}</div>
                                <div><strong>Category:</strong> ${(room.category || '').toUpperCase()}</div>
                                <div><strong>Location:</strong> Block ${currentBlock}, Floor ${currentFloor}</div>
                                <div><strong>Status:</strong> Active / Accessible</div>
                            </div>
                        `;
                    }
                }
            } else {
                popupTabContent.style.display = 'none';
                popupInfoView.style.display = 'none';
                popupBtnInfo.classList.remove('active');
            }
        });
    }

    if (popupBtnFaculty) {
        popupBtnFaculty.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!currentSelectedRoomId) return;
            const isOpening = (popupFacultyView.style.display === 'none' || popupTabContent.style.display === 'none');
            if (isOpening) {
                popupTabContent.style.display = 'block';
                popupFacultyView.style.display = 'block';
                popupInfoView.style.display = 'none';
                popupBtnFaculty.classList.add('active');
                if (popupBtnInfo) popupBtnInfo.classList.remove('active');

                if (popupFacultyDetails) {
                    popupFacultyDetails.innerHTML = '<div class="popup-spinner">Loading faculty details...</div>';
                }
                if (popupFacultyCountBadge) {
                    popupFacultyCountBadge.innerText = 'Searching...';
                }

                const blockName = `BLOCK ${currentBlock}`;
                const roomNoParam = currentSelectedRoomId || '';

                fetch(`/api/faculty?block=${encodeURIComponent(blockName)}&floor=${currentFloor}&roomNo=${encodeURIComponent(roomNoParam)}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.success && data.data && data.data.length > 0) {
                            if (popupFacultyCountBadge) popupFacultyCountBadge.innerText = `${data.data.length} Faculty`;
                            let rowsHtml = '';
                            data.data.forEach(fac => {
                                rowsHtml += `
                                    <tr>
                                        <td>
                                            <div class="faculty-name">${fac.name || 'N/A'}</div>
                                            <div style="font-size:0.68rem; color:#64748b;">${fac.designation || 'Faculty'}</div>
                                        </td>
                                        <td>
                                            <div class="faculty-dept">${fac.department || 'N/A'}</div>
                                        </td>
                                        <td>
                                            <div style="font-size:0.68rem; color:#2563eb;">${fac.email || fac.phone || '-'}</div>
                                        </td>
                                    </tr>
                                `;
                            });
                            popupFacultyDetails.innerHTML = `
                                <table class="faculty-table">
                                    <thead>
                                        <tr>
                                            <th>Faculty</th>
                                            <th>Dept</th>
                                            <th>Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${rowsHtml}
                                    </tbody>
                                </table>
                            `;
                        } else {
                            if (popupFacultyCountBadge) popupFacultyCountBadge.innerText = '0 Found';
                            popupFacultyDetails.innerHTML = `
                                <div class="popup-empty-state">
                                    No faculty assigned to Room ${currentSelectedRoomId || ''}.
                                </div>
                            `;
                        }
                    })
                    .catch(err => {
                        console.error('Error fetching faculty data:', err);
                        if (popupFacultyCountBadge) popupFacultyCountBadge.innerText = 'Error';
                        popupFacultyDetails.innerHTML = `
                            <div class="popup-empty-state" style="color: #ef4444;">
                                Unable to load faculty details.
                            </div>
                        `;
                    });
            } else {
                popupTabContent.style.display = 'none';
                popupFacultyView.style.display = 'none';
                popupBtnFaculty.classList.remove('active');
            }
        });
    }
}

init();
