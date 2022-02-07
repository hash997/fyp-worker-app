import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import NearbyJobRequest from "../components/NearbyJobs/NearbyJobRequest";
import { AppStyles } from "../AppStyles";

import * as Location from "expo-location";
import { API } from "aws-amplify";
import { useAuth } from "../state-store/auth-state";
import { jobsByCityAndSpeciality } from "../src/graphql/queries";
import { JobRequest } from "../src/API";

const apiKey = "AIzaSyDJHF_JXu4QD7YeJCRgyRp-Yqez7JLR29A";

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
export const NearByJobsScreen = () => {
  const { user } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [lngLat, setLngLat] = useState<LngLtd | undefined>();
  const [isLoading, setIsLoading] = useState({
    gettingLocation: false,
    gettingJobs: false,
  });
  const [placeInfo, setPlaceInfo] = useState<LocationInfo>();
  const [jobs, setJobs] = useState<JobRequest[] | undefined>();

  const getNearbyJobs = async () => {
    setIsLoading({ ...isLoading, gettingJobs: true });
    if (!placeInfo) {
      console.log("placeInfo is undefined");
      setIsLoading({ ...isLoading, gettingJobs: false });

      return;
    }
    try {
      const jobs: any = API.graphql({
        query: jobsByCityAndSpeciality,
        variables: {
          city: "Cyberjaya",
          speciality: "DRIVER",
        },
      });
      const jobsData = await jobs;
      console.log("nearby jobs", jobsData);
      setJobs(jobsData.data.jobsByCityAndSpeciality);
      setIsLoading({ ...isLoading, gettingJobs: false });
    } catch (error) {
      setIsLoading({ ...isLoading, gettingJobs: false });
      console.log("shit went south while getting nearby jobs", error);
      setErrorMsg("Error getting nearby jobs");
    }
  };

  const getCurretnLoc = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    setIsLoading({ gettingLocation: true, gettingJobs: false });
    let location = await Location.getCurrentPositionAsync({});
    // THIS SETLNGLAT IS USED IN THE MAPVIEW COMPONENT TO POINT AT THE CUSTOMER CURRENT LOCAITON
    setLngLat({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

    // THIS FUNCTION WILL GIVE THE PLACE ID BASED ON THE LNG AND LAT TO BE USED TO GET MORE INFORMATION ABOUT THE USER'S PLACE
    // TO BE USED IN THE BACKEND.
    getPlaceInformation(location.coords.latitude, location.coords.longitude);
    setIsLoading({ gettingLocation: false, gettingJobs: false });
  };

  const getPlaceInformation = async (lat: number, lng: number) => {
    setIsLoading({ gettingLocation: true, gettingJobs: false });

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await res.json();
      getAddressCityCountry(data);
      setIsLoading({ gettingLocation: false, gettingJobs: false });
    } catch (error) {
      setIsLoading({ gettingLocation: false, gettingJobs: false });

      console.log("shit went south while getting current location", error);
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
    getCurretnLoc();
  }, []);

  useEffect(() => {
    getNearbyJobs();
  }, [placeInfo]);

  if (isLoading.gettingLocation) {
    return (
      <View style={AppStyles.container}>
        <Text>Getting current location...</Text>
      </View>
    );
  }
  if (isLoading.gettingJobs) {
    return (
      <View style={AppStyles.container}>
        <Text>Getting Nearby Jobs...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {jobs &&
          jobs.length > 0 &&
          jobs.map((job: any) => <NearbyJobRequest key={job.id} job={job} />)}
      </ScrollView>
    </View>
  );
};
