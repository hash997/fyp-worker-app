import React from "react";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { AppStyles } from "../AppStyles";

const AppointmentsScreen = ({
  navigation,
}: RootTabScreenProps<"Appointments">) => {
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.title}>Appointments Screen</Text>
      <View
        style={AppStyles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
};

export default AppointmentsScreen;
