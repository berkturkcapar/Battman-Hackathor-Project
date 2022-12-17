import React from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { useFonts } from "expo-font";

const PreferenceData = [
  {
    preference_id: "1",
    wifi: 1,
    low_power_mode: 1,
    cellular_data: 1,
    airplane_mode: 1,
    bluetooth: 1,
    brightness: 1,
    preference_name: "Default",
  },
  {
    preference_id: "2",
    wifi: 1,
    low_power_mode: 1,
    cellular_data: 1,
    airplane_mode: 1,
    bluetooth: 1,
    brightness: 1,
    preference_name: "Home",
  },
];

const PreferenceCard = ({ preference }) => {
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
    <View
      style={{
        width: "100%",
        borderRadius: 20,
        padding: 20,
        backgroundColor: "#555",
        marginVertical: 10,
      }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{preference.preference_name}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>{`WIFI: ${
          preference.wifi ? "Enabled" : "Disabled"
        }`}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>{`Low Power Mode: ${
          preference.low_power_mode ? "Active" : "Inactive"
        }`}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>{`Cellular Data: ${
          preference.cellular_data ? "Enabled" : "Disabled"
        }`}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>{`Airplane Mode: ${
          preference.airplane_mode ? "Active" : "Inactive"
        }`}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>{`Bluetooth: ${
          preference.bluetooth ? "Enabled" : "Disabled"
        }`}</Text>
      </View>
      <View style={styles.card}>
        <Text
          style={styles.text}
        >{`Brightness: ${preference.brightness}`}</Text>
      </View>
    </View>
  ) : null;
};

const Preferences = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: "90%", borderRadius: 20, flexBasis: "90%" }}>
        <FlatList
          keyExtractor={(item) => item.preference_id}
          data={PreferenceData}
          renderItem={(item) => {
            return <PreferenceCard preference={item.item} />;
          }}
        />
      </View>
      <View style={{ width: "90%", flexBasis: "10%" }}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Add Preferences");
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Add Preferences</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0c0",
    padding: 20,
    borderRadius: 40,
  },
  card: { flexDirection: "row", justifyContent: "flex-start" },
  text: { color: "white", fontSize: 15, fontFamily: "Inter-Regular" },
  title: {
    color: "white",
    fontSize: 30,
    fontFamily: "Inter-Bold",
    marginBottom: 10,
  },
});

export default Preferences;
