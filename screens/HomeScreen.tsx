import React from "react";
import { RootTabScreenProps } from "../types/types";

import { ScrollView, View, Text } from "react-native";

import { useJobRequest } from "../state-store/job-requests-provider";
import UpcomingJobToWorker from "../components/home/upcoming-job-to-worker";
import { JobStatus } from "../src/API";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  const { jobToWorker, nearybyJobs } = useJobRequest();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {jobToWorker.length > 0 &&
          jobToWorker.map((job) => {
            if (job.status !== JobStatus.ACCEPTED) return;
            return <UpcomingJobToWorker job={job} key={job.id} />;
          })}
        {nearybyJobs.length > 0 &&
          nearybyJobs.map((job) => {
            if (job.status !== JobStatus.ACCEPTED) return;
            // @ts-ignore
            return <UpcomingJobToWorker job={job} key={job.id} />;
          })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
