import { AppStyles } from "../../AppStyles";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { JobRequest } from "../../src/API";

const NearbyJobRequest = ({ job }: { job: JobRequest }) => {
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
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "#0C4160", fontWeight: "700" }}>
              {job.title}
            </Text>
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
                {job.city}
              </Text>
            </View>
          </View>
          <Text style={{ color: "#0C4160" }}>{job.description}</Text>
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
            <Text style={{ color: "white", fontSize: 20 }}>Accept</Text>
          </TouchableOpacity>
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
              backgroundColor: "grey",
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => {}}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NearbyJobRequest;
