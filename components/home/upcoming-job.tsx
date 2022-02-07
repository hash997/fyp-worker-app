import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { AppStyles } from "../../AppStyles";

import { ScrollView, StyleSheet, Text, View } from "react-native";

const UpcomingJob = () => {
  const theme = useColorScheme();

  return (
    <View style={AppStyles.container}>
      <View
        style={{
          height: 200,
          width: "100%",
          borderColor: "#136494",
          borderWidth: 1.4,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "50%",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <View
            style={{
              width: "60%",
              padding: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 70,
                width: 70,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: "#0C4160",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 25,
                  color: "#0C4160",
                }}
              >
                H
              </Text>
            </View>
            <View style={{ padding: 5, marginLeft: 5 }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 20,
                  marginBottom: 5,
                  color: "#0C4160",
                }}
              >
                Jerry p.Smith
              </Text>
              <Text
                style={{
                  fontWeight: "200",
                  marginBottom: 5,
                  color: "#0C4160",
                }}
              >
                Tools needed
              </Text>
              <Text style={{ color: "#0C4160" }}>Today 6:30pm</Text>
            </View>
          </View>
          <View
            style={{
              width: "50%",
              padding: 5,
              display: "flex",

              marginRight: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#0C4160",
                fontStyle: "italic",
              }}
            >
              dis. 10km
            </Text>
            <View
              style={{
                width: "60%",
                backgroundColor: "#0C4160",
                borderRadius: 10,
                padding: 7,
                margin: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Text style={{ fontSize: 16, color: "white" }}>Chat</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "60%",
                backgroundColor: "#ffc0cb",
                padding: 7,
                margin: 3,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#ff0000" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 20, color: "#0C4160", fontWeight: "700" }}>
            Job Title
          </Text>
          <Text style={{ color: "#0C4160" }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed...
          </Text>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  avtrCntr: {
    width: "50%",
  },
});

export default UpcomingJob;
