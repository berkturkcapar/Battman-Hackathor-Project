import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Switch,
  TextInput,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";

const AddPreferences = () => {
  const [preferences, setPreferences] = React.useState({
    preference_name: "",
    wifi: 0,
    low_power_mode: 0,
    cellular_data: 0,
    airplane_mode: 0,
    bluetooth: 0,
    brightness: 0,
  });
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter/static/Inter-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter/static/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter/static/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter/static/Inter-ExtraLight.ttf"),
    "Inter-Light": require("../assets/fonts/Inter/static/Inter-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter/static/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter/static/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter/static/Inter-SemiBold.ttf"),
    "Inter-Thin": require("../assets/fonts/Inter/static/Inter-Thin.ttf"),
  });

  return fontsLoaded ? (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Form</Text>

        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 20,
              alignItems: "center",
            }}
          >
            <View style={{ flexBasis: "20%" }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter-SemiBold",
                  color: "white",
                }}
              >
                Name:{" "}
              </Text>
            </View>
            <View style={{ flexBasis: "60%", marginLeft: "auto" }}>
              <TextInput
                style={{
                  borderColor: "#fff",
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              />
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 20,
            }}
          >
            <View style={{ flexBasis: "80%" }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter-SemiBold",
                  color: "white",
                }}
              >
                WIFI:{" "}
              </Text>
            </View>
            <View>
              <Switch />
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 20,
            }}
          >
            <View style={{ flexBasis: "80%" }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter-SemiBold",
                  color: "white",
                }}
              >
                Low Power Mode:{" "}
              </Text>
            </View>
            <View>
              <Switch />
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 20,
            }}
          >
            <View style={{ flexBasis: "80%" }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter-SemiBold",
                  color: "white",
                }}
              >
                Cellular Data:{" "}
              </Text>
            </View>
            <View>
              <Switch />
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 20,
            }}
          >
            <View style={{ flexBasis: "80%" }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter-SemiBold",
                  color: "white",
                }}
              >
                Airplane Mode:{" "}
              </Text>
            </View>
            <View>
              <Switch />
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 20,
            }}
          >
            <View style={{ flexBasis: "80%" }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter-SemiBold",
                  color: "white",
                }}
              >
                Bluetooth:{" "}
              </Text>
            </View>
            <View>
              <Switch />
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 20,
            }}
          >
            <View style={{ flexBasis: "80%" }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter-SemiBold",
                  color: "white",
                }}
              >
                Brightness:{" "}
              </Text>
            </View>
            <View>
              <Switch />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Pressable
              style={styles.button}
              onPress={() => {
                navigation.navigate("Add Preferences");
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>
                Add Preference
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  form: {
    backgroundColor: "#555",
    width: "95%",
    height: "90%",
    padding: 20,
  },
  text: { color: "white", fontSize: 15, fontFamily: "Inter-Regular" },
  title: {
    color: "white",
    fontSize: 30,
    fontFamily: "Inter-Bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0c0",
    padding: 20,
    borderRadius: 40,
  },
});

export default AddPreferences;
