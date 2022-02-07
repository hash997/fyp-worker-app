import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { AppStyles } from "../../AppStyles";
import { JobRequestToWorker } from "../../src/API";

const JobRequests = ({ job }: { job: JobRequestToWorker }) => {
  const [offer, setOffer] = useState(0);
  return (
    <View style={AppStyles.container}>
      <View
        style={{
          // height: 200,
          width: "100%",
          borderColor: "#136494",
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
              Job Description
            </Text>
            <Text style={{ color: "#0C4160" }}>{job?.description}</Text>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <TextInput
            style={{
              width: "100%",
              borderColor: "#136494",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            keyboardType="numeric"
            value={offer.toString() === "0" ? "" : offer.toString()}
            onChangeText={(text) => setOffer(+text)}
            placeholder="Enter your offer here"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "#0C4160",
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => {}}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Send Offer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default JobRequests;
