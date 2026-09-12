export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PlaceLocation extends Coordinates {
  type: 'Point';
  coordinates: [number, number];
}

export interface Place {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  description: string | null;
  location: PlaceLocation;
  hasGeometry?: boolean;
}

/** A point chosen directly on the map, optionally matched to a real POI. */
export interface PinPoint {
  coordinates: Coordinates;
  place: Place | null;
}

export interface PlaceDetail extends Place {
  geometry: unknown | null;
  metadata: {
    source?: string;
    osmId?: string;
    osmType?: string;
  } | null;
}

export interface RouteInstruction {
  instruction: string;
  street: string;
  distanceKm: number;
  durationSec: number;
}

export interface CampusRoute {
  distanceKm: number;
  durationSec: number;
  durationMin: number;
  encodedShape: string | null;
  instructions: RouteInstruction[];
}

export interface RouteEndpoint extends Coordinates {
  id?: string;
  name: string;
  category?: string;
}

export interface RouteResponse {
  success: true;
  from: RouteEndpoint;
  to: RouteEndpoint;
  route: CampusRoute;
}

export interface HealthResponse {
  status: 'ok';
  database: string;
  valhalla: 'available' | 'unavailable';
  valhallaMessage: string;
}
