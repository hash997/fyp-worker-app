import { Entypo } from "@expo/vector-icons";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { AppStyles } from "../../AppStyles";
import { dayToString, formatAMPM, monthToString } from "../../helpers/time";
import { JobRequestToWorker, JobStatus, Offer } from "../../src/API";
import { updateJobRequestToWorker } from "../../src/graphql/mutations";
import { useAuth } from "../../state-store/auth-state";

const JobRequests = ({
  job,
  getJobs,
}: {
  job: JobRequestToWorker;
  getJobs: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleAcceptJob = async () => {
    if (!job.id) throw new Error("job id is undefined");

    setLoading(true);
    try {
      const updateJobReqRes = await API.graphql({
        query: updateJobRequestToWorker,
        variables: {
          updateJobReqestToWorkerInput: {
            id: job?.id,
            status: JobStatus.ACCEPTED,
          },
        },
      });

      await getJobs();
      setLoading(false);
    } catch (error) {
      console.log("error => ", error);

      setError("error accepting job");
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <View style={AppStyles.container}>
  //       <Text>Loading ...</Text>
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={AppStyles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={AppStyles.container}>
      <View
        style={{
          // height: 200,
          width: "100%",
          borderColor: job.status === JobStatus.ACCEPTED ? "green" : "#0C4160",
          borderWidth: 1.4,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text
                style={{ fontSize: 10, color: "#0C4160", fontWeight: "400" }}
              >
                Job Title
              </Text>
              <Text
                style={{ fontSize: 20, color: "#0C4160", fontWeight: "700" }}
              >
                {job.title}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo name="location" size={18} color={"#0C4160"} />

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  color: "#0C4160",
                  fontWeight: "700",
                }}
              >
                {job?.location?.city}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 10, color: "#0C4160", fontWeight: "400" }}>
              Prefered Time
            </Text>
            <Text style={{ color: "#0C4160" }}>
              {dayToString(new Date(job?.time).getDay())}{" "}
              {formatAMPM(new Date(job.time))} -{" "}
              {monthToString(new Date(job?.time).getMonth())}{" "}
              {new Date(job?.time).getDate()}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 10, color: "#0C4160", fontWeight: "400" }}>
              Job Description
            </Text>
            <Text style={{ color: "#0C4160" }}>{job?.description}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor:
                job.status === JobStatus.ACCEPTED ? "green" : "#0C4160",
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={handleAcceptJob}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              {job.status === JobStatus.CREATED
                ? "Accepte Job "
                : loading
                ? "Loading ..."
                : job?.status}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default JobRequests;
