import React, { useEffect, useState } from "react";
import { RootTabScreenProps } from "../types/types";
import { AppStyles } from "../AppStyles";
import UpcomingJob from "../components/home/upcoming-job";
import { ScrollView, View } from "react-native";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <UpcomingJob />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
