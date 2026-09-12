import { useCallback, useEffect, useRef, useState } from 'react';
import type { Coordinates } from '../types';

export interface LocationUpdateEvent {
  coordinates: Coordinates;
  accuracy: number | null;
  timestamp: number;
}

type LocationListener = (update: LocationUpdateEvent) => void;
const locationListeners = new Set<LocationListener>();

export function subscribeToLiveLocation(listener: LocationListener): () => void {
  locationListeners.add(listener);
  return () => {
    locationListeners.delete(listener);
  };
}

let latestConfirmedLocation: Coordinates | null = null;
export function getLatestLocation(): Coordinates | null {
  return latestConfirmedLocation;
}

/**
 * Live browser geolocation for DISHAA.
 *
 * Configured for active turn-by-turn pedestrian navigation:
 * - `enableHighAccuracy: true` ensures hardware GPS is engaged.
 * - `maximumAge: 1000` prevents stale cached positions.
 * - `timeout: 10000` provides reasonable wait time without blocking.
 */
export function useGeolocation() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(latestConfirmedLocation);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);
  const isMounted = useRef(true);

  const clearWatch = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      clearWatch();
    };
  }, [clearWatch]);

  const stopTracking = useCallback(() => {
    clearWatch();
    if (isMounted.current) setIsTracking(false);
  }, [clearWatch]);

  const requestLocation = useCallback(() => new Promise<Coordinates | null>((resolve) => {
    if (!navigator.geolocation) {
      setError('This browser does not support current location.');
      resolve(null);
      return;
    }

    setIsLocating(true);
    setError(null);

    // Clear any previous watcher to restart high-accuracy session
    clearWatch();

    let settled = false;
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const nextCoordinates: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const nextAccuracy = Number.isFinite(position.coords.accuracy) ? position.coords.accuracy : null;
        latestConfirmedLocation = nextCoordinates;

        // Notify direct listeners (e.g. high-performance Leaflet marker layer)
        const updateEvent: LocationUpdateEvent = {
          coordinates: nextCoordinates,
          accuracy: nextAccuracy,
          timestamp: position.timestamp || Date.now(),
        };
        locationListeners.forEach((fn) => {
          try { fn(updateEvent); } catch (_) {}
        });

        if (isMounted.current) {
          setCoordinates(nextCoordinates);
          setAccuracy(nextAccuracy);
          setIsTracking(true);
          setIsLocating(false);
          setError(null);
        }

        if (!settled) {
          settled = true;
          resolve(nextCoordinates);
        }
      },
      (positionError) => {
        const message = positionError.code === positionError.PERMISSION_DENIED
          ? 'Location permission was not granted. Choose a campus place as your start.'
          : 'Your location is currently unavailable. Choose a campus place as your start.';
        if (isMounted.current) {
          setError(message);
          setIsLocating(false);
          setIsTracking(false);
        }
        clearWatch();
        if (!settled) {
          settled = true;
          resolve(null);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      },
    );
  }), [clearWatch]);

  return {
    coordinates,
    accuracy,
    isLocating,
    isTracking,
    error,
    requestLocation,
    stopTracking,
  };
}

