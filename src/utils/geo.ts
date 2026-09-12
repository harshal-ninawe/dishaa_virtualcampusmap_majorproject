import type { Coordinates, Place } from '../types';

const EARTH_RADIUS_M = 6_371_000;

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

/** Great-circle distance between two coordinates, in meters. */
export function distanceMeters(a: Coordinates, b: Coordinates): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)));
}

/**
 * Returns the real campus place closest to `point`, but only when it falls
 * within `maxMeters`. Used to label a dropped map pin with a genuine POI name
 * instead of raw coordinates. Never fabricates data — returns null on no match.
 */
export function findNearestPlace(point: Coordinates, places: Place[], maxMeters = 25): Place | null {
  let nearest: Place | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const place of places) {
    const distance = distanceMeters(point, { lat: place.location.lat, lng: place.location.lng });
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = place;
    }
  }

  return nearest && nearestDistance <= maxMeters ? nearest : null;
}
