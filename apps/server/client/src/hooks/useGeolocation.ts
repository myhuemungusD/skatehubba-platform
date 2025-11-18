import { useState, useEffect } from 'react';

export interface GeolocationState {
  lat: number | null;
  lng: number | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation(watch: boolean = false): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        lat: null,
        lng: null,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      });
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      setState({
        lat: null,
        lng: null,
        error: error.message,
        loading: false,
      });
    };

    if (watch) {
      const watchId = navigator.geolocation.watchPosition(onSuccess, onError);
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, [watch]);

  return state;
}
