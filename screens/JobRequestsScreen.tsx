import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { AppStyles } from "../AppStyles";
import JobRequests from "../components/JobRequests/JobRequests";
import { JobRequestToWorker } from "../src/API";
import { jobsToWorkerByWorkerId } from "../src/graphql/queries";
import { useAuth } from "../state-store/auth-state";
import { RootTabScreenProps } from "../types/types";

const JobRequestsScreen = ({
  navigation,
}: RootTabScreenProps<"JobRequests">) => {
  const [jobs, setJobs] = useState<JobRequestToWorker[] | undefined>(undefined);
  const { user } = useAuth();

  const getJobs = async () => {
    if (!user) {
      console.log("user is not defined");
      return;
    }
    try {
      const jobs: any = await API.graphql({
        query: jobsToWorkerByWorkerId,
        variables: { workerId: user.id },
      });

      setJobs(jobs?.data?.jobsToWorkerByWorkerId);
    } catch (error) {
      console.log("shit went south getting jobs to worker", error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    getJobs();
  }, [user]);

  if (!jobs || jobs.length === 0) {
    return (
      <View style={AppStyles.container}>
        <Text>You have no Jobs at the moments</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {jobs.map((job) => (
          <JobRequests job={job} key={job.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default JobRequestsScreen;
