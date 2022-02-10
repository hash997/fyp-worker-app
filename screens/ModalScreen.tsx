import { View, Switch, Platform, StyleSheet, Button, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";
import { updateWorker } from "../src/graphql/mutations";
import { useAuth, useDispatchAuth } from "../state-store/auth-state";
import * as Location from "expo-location";
import { jobsByCityAndSpeciality } from "../src/graphql/queries";
import { JobRequest } from "../src/API";

interface LngLtd {
  lat: number;
  lng: number;
}
interface LocationInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  lng: string;
  lat: string;
}

const apiKey = "AIzaSyDJHF_JXu4QD7YeJCRgyRp-Yqez7JLR29A";

export default function ModalScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  const { user, isActive, congnitoUser } = currentUser;
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [lngLat, setLngLat] = useState<LngLtd | undefined>();
  const [isLoading, setIsLoading] = useState({
    gettingLocation: false,
    updatingStatus: false,
  });
  const [placeInfo, setPlaceInfo] = useState<LocationInfo>();
  const [jobs, setJobs] = useState<JobRequest[] | undefined>();

  const disptachAuth = useDispatchAuth();

  // console.log("toggleSwitch => ", errorMsg);
  console.log("this is the error msg => ", errorMsg);

  const toggleSwitch = async () => {
    try {
      if (!user) {
        setErrorMsg("user is undefined");
        return;
      }

      if (!isEnabled) {
        await getCurretnLoc();

        console.log("lngLat => ", lngLat);
        if (!lngLat?.lat || !lngLat?.lng) {
          setErrorMsg("location info is undefined");
          return;
        }

        if (!placeInfo?.city) {
          setErrorMsg("placeInfo is undefined");
          return;
        }

        setIsLoading({ ...isLoading, updatingStatus: true });
        const updateRes = await API.graphql({
          query: updateWorker,
          variables: {
            updateWorkerInput: {
              id: user.id,
              isActive: !isEnabled,
              lng: lngLat.lat,
              lat: lngLat.lng,
            },
            // id:
          },
        });

        setIsEnabled((previousState) => !previousState);

        disptachAuth({
          type: "update",
          payload: {
            ...currentUser,
            isActive: isEnabled,
            location: placeInfo,
          },
        });

        return;
      }

      setIsLoading({ ...isLoading, updatingStatus: true });
      const updateRes = await API.graphql({
        query: updateWorker,
        variables: {
          updateWorkerInput: {
            id: user.id,
            isActive: !isEnabled,
          },
          // id:
        },
      });

      console.log("updateRes => ", updateRes);
      setIsLoading({ ...isLoading, updatingStatus: false });
    } catch (error) {
      setIsLoading({ ...isLoading, updatingStatus: false });

      console.log("shit went sout =>", error);
    }

    setIsEnabled((previousState) => !previousState);
  };

  const getCurretnLoc = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    setIsLoading({ gettingLocation: true, updatingStatus: false });
    let location = await Location.getCurrentPositionAsync({});
    // THIS SETLNGLAT IS USED IN THE MAPVIEW COMPONENT TO POINT AT THE CUSTOMER CURRENT LOCAITON
    setLngLat({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

    // THIS FUNCTION WILL GIVE THE PLACE ID BASED ON THE LNG AND LAT TO BE USED TO GET MORE INFORMATION ABOUT THE USER'S PLACE
    // TO BE USED IN THE BACKEND.
    getPlaceInformation(location.coords.latitude, location.coords.longitude);
    setIsLoading({ gettingLocation: false, updatingStatus: false });
  };

  const getPlaceInformation = async (lat: number, lng: number) => {
    setIsLoading({ gettingLocation: true, updatingStatus: false });

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await res.json();
      getAddressCityCountry(data);
      setIsLoading({ gettingLocation: false, updatingStatus: false });
    } catch (error) {
      setIsLoading({ gettingLocation: false, updatingStatus: false });

      setErrorMsg("Something went wrong while getting your location");
    }
  };

  const getAddressCityCountry = (jsonRes: any) => {
    let city, state, country;
    const lat = jsonRes?.results[0].geometry.location.lat;
    const lng = jsonRes?.results[0].geometry.location.lng;

    const address = jsonRes?.results[0]?.formatted_address;
    for (let i = 0; i < jsonRes?.results[0]?.address_components.length; i++) {
      for (
        let j = 0;
        j < jsonRes?.results[0]?.address_components[i]?.types.length;
        j++
      ) {
        switch (jsonRes?.results[0]?.address_components[i]?.types[j]) {
          case "locality":
            city = jsonRes?.results[0]?.address_components[i]?.long_name;
            break;
          case "administrative_area_level_1":
            state = jsonRes?.results[0]?.address_components[i]?.long_name;
            break;
          case "country":
            country = jsonRes?.results[0]?.address_components[i]?.long_name;
            break;
        }
      }
    }
    setPlaceInfo({
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
    });
  };

  useEffect(() => {
    setIsEnabled(isActive);
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <View style={styles.container}>
      {isLoading.gettingLocation ? (
        <Text>Loading...</Text>
      ) : (
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled}
          disabled={loading}
        />
      )}
      <Button title="Sign Out" onPress={() => Auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
