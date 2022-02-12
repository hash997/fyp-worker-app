import { View, Switch, Platform, StyleSheet, Button, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";
import { updateWorker } from "../src/graphql/mutations";
import { useAuth, useDispatchAuth } from "../state-store/auth-state";
import * as Location from "expo-location";
import { jobsByCityAndSpeciality } from "../src/graphql/queries";
import { JobRequest } from "../src/API";
import { getCurretnLoc } from "../helpers/get-current-loc";
import { getPlaceInformation } from "../helpers/get-location-details";

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
  const [isLoading, setIsLoading] = useState({
    gettingLocation: false,
    updatingStatus: false,
  });
  const [placeInfo, setPlaceInfo] = useState<LocationInfo>();
  const disptachAuth = useDispatchAuth();

  const toggleSwitch = async () => {
    try {
      if (!user) {
        setErrorMsg("user is undefined");
        return;
      }

      if (!isEnabled) {
        setIsLoading({ ...isLoading, gettingLocation: true });
        const locRes = await getCurretnLoc();
        if (locRes.error) {
          throw new Error(locRes.error);
        }

        if (!locRes?.lat || !locRes?.lng) {
          setErrorMsg("location info is undefined");
          return;
        }

        const placeInfoRes = await getPlaceInformation(locRes.lat, locRes.lng);
        if (!placeInfoRes.lat || !placeInfoRes.lng || !placeInfoRes.city) {
          throw new Error(placeInfoRes.error);
        }

        setIsLoading({ gettingLocation: false, updatingStatus: true });
        const updateRes = await API.graphql({
          query: updateWorker,
          variables: {
            updateWorkerInput: {
              id: user.id,
              isActive: !isEnabled,
              lng: locRes.lat,
              lat: locRes.lng,
              city: placeInfoRes.city,
            },
          },
        });

        setIsEnabled((previousState) => !previousState);

        disptachAuth({
          type: "update",
          payload: {
            ...currentUser,
            isActive: !isEnabled,
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
        },
      });

      setIsLoading({ ...isLoading, updatingStatus: false });
    } catch (error) {
      setIsLoading({ ...isLoading, updatingStatus: false });
    }

    setIsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    setIsEnabled(isActive);
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading.gettingLocation ? (
        <Text>getting location...</Text>
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
