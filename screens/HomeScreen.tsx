import React, { useEffect, useState } from "react";
import { RootTabScreenProps } from "../types/types";

import { ScrollView, View, Text } from "react-native";

import { useJobRequest } from "../state-store/job-requests-provider";
import UpcomingJobToWorker from "../components/home/upcoming-job-to-worker";
import { JobRequest, JobStatus, OfferStatus } from "../src/API";
import { AppStyles } from "../AppStyles";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  const { jobToWorker, nearybyJobs } = useJobRequest();
  const [acceptedNearbyJobs, setAcceptedNearbyJobs] = useState<
    JobRequest[] | []
  >([]);

  const currentJobReqs = useJobRequest();
  let nearbyjobs: JobRequest[] | [] = [];
  useEffect(() => {
    const acceptedJobs = nearbyjobs.filter(
      (job) => job.status === JobStatus.ACCEPTED
    );

    setAcceptedNearbyJobs(acceptedJobs);
  }, [currentJobReqs, jobToWorker, nearybyJobs]);

  // console.log("current jobs => ", currentJobReqs);

  // if (
  //   !jobToWorker ||
  //   jobToWorker.length === 0 ||
  //   !acceptedNearbyJobs ||
  //   acceptedNearbyJobs.length === 0
  // ) {
  //   return (
  //     <View style={AppStyles.container}>
  //       <Text>No upcoming jobs</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {jobToWorker.length > 0 &&
          jobToWorker.map((job) => {
            if (job.status !== JobStatus.ACCEPTED) return;
            return <UpcomingJobToWorker job={job} key={job.id} />;
          })}
        {acceptedNearbyJobs.length > 0 &&
          acceptedNearbyJobs.map((job) => {
            if (job.status !== JobStatus.ACCEPTED) return;
            // @ts-ignore
            return <UpcomingJobToWorker job={job} key={job.id} />;
          })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
