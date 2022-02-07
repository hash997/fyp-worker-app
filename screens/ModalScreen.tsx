import { StatusBar } from "expo-status-bar";

import EditScreenInfo from "../components/EditScreenInfo";
import { View, Switch, Platform, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { API, Auth } from "aws-amplify";
import { updateWorker } from "../src/graphql/mutations";
import { useAuth } from "../state-store/auth-state";

export default function ModalScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const toggleSwitch = async () => {
    try {
      const updateRes = await API.graphql({
        query: updateWorker,
        variables: {
          updateWorkerInput: {
            id: user.id,
            isActive: !isEnabled,
          },
          // id:
        },
      });
    } catch (error) {
      console.log("shit went sout =>", error);
    }
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <Switch
        // trackColor={{ false: "#767577", true: "#81b0ff" }}
        // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        disabled={loading}
      />
      <Button title="Sign Out" onPress={() => Auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
