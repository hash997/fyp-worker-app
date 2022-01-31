import React from "react";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { AppStyles } from "../AppStyles";

const SettingsScreen = ({ navigation }: RootTabScreenProps<"Settings">) => {
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.title}>Settings Screen</Text>
      <View
        style={AppStyles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
};

export default SettingsScreen;
