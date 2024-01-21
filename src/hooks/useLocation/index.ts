import { useEffect, useState } from "react";

export const useLocation = (): ICoords => {
  const [location, setLocation] = useState<ICoords>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => {
            setLocation({
              latitude: null,
              longitude: null,
              error: `Error: ${error.message}`,
            });
          }
        );
      } else {
        setLocation({
          latitude: null,
          longitude: null,
          error: "Geolocation is not supported by your browser.",
        });
      }
    };

    getLocation();
  }, []);

  return location;
};
