import React from "react";
import { RootTabScreenProps } from "../types";
import { AppStyles } from "../AppStyles";
import UpcomingJob from "../components/home/upcoming-job";
import { View } from "react-native";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  return (
    <View style={AppStyles.container}>
      <UpcomingJob />
    </View>
  );
};

export default HomeScreen;
