import React from "react";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types/types";
import { AppStyles } from "../AppStyles";

const AppointmentsScreen = ({
  navigation,
}: RootTabScreenProps<"Appointments">) => {
  return (
    <View style={[AppStyles.container, { justifyContent: "flex-start" }]}>
      <View
        style={{
          width: "100%",
          borderWidth: 1.5,
          borderColor: "#eee",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Time</Text>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>3:30pm</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>See Details</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AppointmentsScreen;
