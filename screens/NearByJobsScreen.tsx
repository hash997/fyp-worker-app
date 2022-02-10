import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import NearbyJobRequest from "../components/NearbyJobs/NearbyJobRequest";
import { AppStyles } from "../AppStyles";
import { API } from "aws-amplify";
import { useAuth } from "../state-store/auth-state";
import { jobsByCityAndSpeciality } from "../src/graphql/queries";
import { JobRequest } from "../src/API";

export const NearByJobsScreen = () => {
  const { user, isActive, location } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const [isLoading, setIsLoading] = useState({
    gettingLocation: false,
    gettingJobs: false,
  });
  const [jobs, setJobs] = useState<JobRequest[] | undefined>();

  const getNearbyJobs = async () => {
    setIsLoading({ ...isLoading, gettingJobs: true });

    if (!isActive) {
      setErrorMsg(
        "You are not active at the moment. Switch on your account to receive jobs"
      );
      setIsLoading({ ...isLoading, gettingJobs: false });
      return;
    }
    if (!user) {
      setErrorMsg("user is undefined");
      setIsLoading({ ...isLoading, gettingJobs: false });
      return;
    }

    if (!location) {
      setErrorMsg("placeInfo is undefined");
      setIsLoading({ ...isLoading, gettingJobs: false });
      return;
    }

    if (!user) {
      setErrorMsg("user is undefined");
      setIsLoading({ ...isLoading, gettingJobs: false });
      return;
    }
    try {
      const jobs: any = API.graphql({
        query: jobsByCityAndSpeciality,
        variables: {
          city: user.city,
          speciality: user.speciality,
        },
      });
      const jobsData = await jobs;

      setJobs(jobsData.data.jobsByCityAndSpeciality);
      setIsLoading({ ...isLoading, gettingJobs: false });
    } catch (error) {
      setIsLoading({ ...isLoading, gettingJobs: false });

      setErrorMsg("Error getting nearby jobs");
    }
  };

  useEffect(() => {
    if (!isActive || !location?.city) return;
    getNearbyJobs();
  }, [location]);

  if (!isActive) {
    return (
      <View style={AppStyles.container}>
        <Text>
          You are not active at the moment. Switch on your status to receive
          near by jobs
        </Text>
      </View>
    );
  }
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

  if (errorMsg && (!isLoading.gettingJobs || !isLoading.gettingLocation)) {
    return (
      <View style={AppStyles.container}>
        <Text>{errorMsg}</Text>
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
