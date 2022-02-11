import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { AppStyles } from "../AppStyles";
import JobRequests from "../components/JobRequests/JobRequests";
import { JobRequestToWorker } from "../src/API";
import { jobsToWorkerByWorkerId } from "../src/graphql/queries";
import { useAuth } from "../state-store/auth-state";
import {
  useDispatchJobRequest,
  useJobRequest,
} from "../state-store/job-requests-provider";
import { RootTabScreenProps } from "../types/types";

const JobRequestsScreen = ({
  navigation,
}: RootTabScreenProps<"JobRequests">) => {
  const { user } = useAuth();
  const currentJobs = useJobRequest();
  const dispatchJobs = useDispatchJobRequest();

  const getJobs = async () => {
    if (!user) {
      return;
    }
    try {
      const jobs: any = await API.graphql({
        query: jobsToWorkerByWorkerId,
        variables: { workerId: user.id },
      });

      dispatchJobs({
        type: "update",
        payload: {
          ...currentJobs,
          jobToWorker: jobs.data.jobsToWorkerByWorkerId,
        },
      });
    } catch (error) {}
  };

  useEffect(() => {}, [currentJobs]);

  if (!currentJobs.jobToWorker || currentJobs.jobToWorker.length === 0) {
    return (
      <View style={AppStyles.container}>
        <Text>You have no Jobs at the moments</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {currentJobs.jobToWorker.map((job) => (
          <JobRequests job={job} key={job.id} getJobs={getJobs} />
        ))}
      </ScrollView>
    </View>
  );
};

export default JobRequestsScreen;
