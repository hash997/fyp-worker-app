import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import NearbyJobRequest from "../components/NearbyJobs/NearbyJobRequest";
import { AppStyles } from "../AppStyles";
import { API } from "aws-amplify";
import { useAuth } from "../state-store/auth-state";
import { jobsByCityAndSpeciality } from "../src/graphql/queries";
import { JobRequest } from "../src/API";
import { getCurretnLoc } from "../helpers/get-current-loc";
import { getPlaceInformation } from "../helpers/get-location-details";
import { useJobRequest } from "../state-store/job-requests-provider";

export const NearByJobsScreen = () => {
  const { user, isActive } = useAuth();
  const { nearybyJobs } = useJobRequest();

  useEffect(() => {}, [nearybyJobs]);

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

  if (!nearybyJobs || nearybyJobs.length === 0) {
    return (
      <View style={AppStyles.container}>
        <Text>No jobs nearby</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {nearybyJobs &&
          nearybyJobs.length > 0 &&
          nearybyJobs.map((job: any) => (
            <NearbyJobRequest key={job.id} job={job} />
          ))}
      </ScrollView>
    </View>
  );
};
