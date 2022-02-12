/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, ColorSchemeName, Pressable } from "react-native";
import { Circle } from "react-native-progress";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AppointmentsScreen from "../screens/Appointments";
import HomeScreen from "../screens/HomeScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SettingsScreen from "../screens/Settings";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types/types";
import LinkingConfiguration from "./LinkingConfiguration";
import { Ionicons } from "@expo/vector-icons";

import SignIn from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";
import { useEffect } from "react";

import JobRequestsScreen from "../screens/JobRequestsScreen";
import { MaterialIcons } from "@expo/vector-icons";
import SendOfferScreen from "../screens/SendOfferScreen";
import { NearByJobsScreen } from "../screens/NearByJobsScreen";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../state-store/auth-state";
import { View, Text } from "react-native";
import { API } from "aws-amplify";
import {
  onJobCreated,
  onJobToWorkerCreatedSubcription,
} from "../src/graphql/subscriptions";
import {
  useDispatchJobRequest,
  useJobRequest,
} from "../state-store/job-requests-provider";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { user, isActive } = useAuth();
  const currentJobReq = useJobRequest();
  const dispatchCurretnJobReq = useDispatchJobRequest();
  const [showAlert, setShowAlert] = useState({
    showNearByJob: false,
    showJobRequest: false,
  });

  useEffect(() => {
    if (!isActive || !user) return;
    const onJobCreatedSub = API.graphql(
      // @ts-ignore
      {
        query: onJobCreated,
        variables: {
          city: user.city,
          speciality: user.speciality,
        },
      }
      // @ts-ignore
    ).subscribe({
      // @ts-ignore
      next: ({ _, value }) => {
        console.log("value.data.onJobCreated", value.data.onJobCreated);

        // dispatchCurretnJobReq({
        //   type: "update",
        //   payload: {
        //     ...currentJobReq,
        //     nearybyJobs: {
        //       ...currentJobReq.nearybyJobs,
        //       ...value.data.onJobCreated,
        //     },
        //   },
        // });
        console.log("value => ", value);
        setShowAlert({ showJobRequest: false, showNearByJob: true });
      },
      //@ts-ignore
      error: (error) => {
        console.warn(error);
      },
    });

    const onJobToWorkerCreatedSub = API.graphql(
      // @ts-ignore
      {
        query: onJobToWorkerCreatedSubcription,
        variables: {
          workerId: user?.id,
        },
      }
      // @ts-ignore
    ).subscribe({
      // @ts-ignore
      next: ({ _, value }) => {
        console.log(
          "value.data.onJobToWorkerCreatedSubcription",
          value.data.onJobToWorkerCreated
        );

        // dispatchCurretnJobReq({
        //   type: "update",
        //   payload: {
        //     ...currentJobReq,
        //     jobToWorker: {
        //       ...currentJobReq.jobToWorker,
        //       ...value?.data?.onJobToWorkerCreated,
        //     },
        //   },
        // });
        setShowAlert({ showJobRequest: true, showNearByJob: false });

        // console.log("values", value);
      },
      //@ts-ignore
      error: (error) => {
        console.warn(error);
      },
    });

    return () => {
      onJobCreatedSub.unsubscribe();
      onJobToWorkerCreatedSub.unsubscribe();
    };
  }, [user]);

  useEffect(() => {}, [showAlert]);

  const createTwoButtonAlert = (title: string, description: string) =>
    Alert.alert(title, description, [
      {
        text: "Cancel",
        onPress: () =>
          setShowAlert({ showNearByJob: false, showJobRequest: false }),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () =>
          setShowAlert({ showNearByJob: false, showJobRequest: false }),
      },
    ]);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {showAlert.showJobRequest &&
        createTwoButtonAlert(
          "New Job Near you",
          "New job available job near by you"
        )}
      {showAlert.showNearByJob &&
        createTwoButtonAlert(
          "New Job Request Sent to you",
          "Someone has sent you a job request"
        )}
      {user ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Group>
        <Stack.Screen name="JobRequests" component={JobRequestsScreen} />
        <Stack.Screen name="SendOffer" component={SendOfferScreen} />
      </Stack.Group>
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={"#0C4160"}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="JobRequests"
        component={JobRequestsScreen}
        options={{
          title: "Job Requests",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name="handyman" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="NearbyJobs"
        component={NearByJobsScreen}
        options={{
          title: "Nearby Jobs",
          tabBarIcon: ({ color }) => (
            <Entypo name="location" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          title: "Appointments",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-settings" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: "SignIn", headerShown: false }}
      />
      <Stack.Group
      //  screenOptions={{ presentation: "" }}
      >
        {/* <Stack.Screen name="SignIn" component={ModalScreen} /> */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
