import * as Location from "expo-location";

export const getCurretnLoc = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Location permission not granted");
    }

    const location = await Location.getCurrentPositionAsync({});

    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      error: null,
    };
  } catch (error: any) {
    return {
      lat: undefined,
      lng: undefined,
      error: error,
    };
  }
};
