import type { Coordinates } from '../types';

export function decodePolyline(encodedShape: string | null, precision = 6): Coordinates[] {
  if (!encodedShape) return [];

  let index = 0;
  let latitude = 0;
  let longitude = 0;
  const factor = 10 ** precision;
  const coordinates: Coordinates[] = [];

  while (index < encodedShape.length) {
    let shift = 0;
    let result = 0;
    let byte: number;
    do {
      byte = encodedShape.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20 && index < encodedShape.length);
    latitude += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      byte = encodedShape.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20 && index < encodedShape.length);
    longitude += result & 1 ? ~(result >> 1) : result >> 1;

    coordinates.push({ lat: latitude / factor, lng: longitude / factor });
  }

  return coordinates;
}

export function encodePolyline(points: ([number, number] | Coordinates)[], precision = 6): string {
  let result = '';
  let prevLat = 0;
  let prevLng = 0;
  const factor = 10 ** precision;

  for (const point of points) {
    const lat = Array.isArray(point) ? point[0] : point.lat;
    const lng = Array.isArray(point) ? point[1] : point.lng;

    const latScaled = Math.round(lat * factor);
    const lngScaled = Math.round(lng * factor);

    let dLat = latScaled - prevLat;
    let dLng = lngScaled - prevLng;

    prevLat = latScaled;
    prevLng = lngScaled;

    for (let val of [dLat, dLng]) {
      val = val < 0 ? ~(val << 1) : val << 1;
      while (val >= 0x20) {
        result += String.fromCharCode((0x20 | (val & 0x1f)) + 63);
        val >>= 5;
      }
      result += String.fromCharCode(val + 63);
    }
  }

  return result;
}
