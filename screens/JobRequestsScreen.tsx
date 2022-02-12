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
  const [isError, setIsError] = useState("");

  const getJobs = async () => {
    try {
      if (!user) {
        throw new Error("user is undefined");
      }
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
    } catch (error) {
      setIsError("Something went wrong while getting jobs");
    }
  };

  // useEffect(() => {}, [currentJobs]);

  if (isError) {
    return (
      <View style={AppStyles.container}>
        <Text>{isError}</Text>
      </View>
    );
  }

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
