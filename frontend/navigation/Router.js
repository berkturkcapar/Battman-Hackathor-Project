import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../stores/useAuthStore";

const NotLoggedInRoutes = [
  {
    name: "SignUpMail",
    component: () => <Text>SignUpMail</Text>,
    screenOptions: {
      headerShown: true,
      headerBackTitleVisible: false,
      headerTintColor: "#fff",
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#000",
        shadowColor: "transparent",
        height: 0,
      },
    },
  },
  {
    name: "HomePage",
    component: () => <Text>Home</Text>,
    screenOptions: {
      headerShown: false,
    },
  },
];

const LoggedInRoutes = [
  {
    name: "SignUpMail",
    component: () => <Text>SignUpMail2</Text>,
    screenOptions: {
      headerShown: true,
      headerBackTitleVisible: false,
      headerTintColor: "#fff",
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#fff",
        shadowColor: "transparent",
        height: 0,
      },
    },
  },
  {
    name: "HomePage",
    component: () => <Text>HomePage2</Text>,
    screenOptions: {
      headerShown: false,
    },
  },
];

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NonAuthRouter() {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
          width: "100%",
        },
      }}
    >
      {NotLoggedInRoutes.map((route, index) => (
        <Stack.Screen
          options={{
            ...route.screenOptions,
            contentStyle: {
              backgroundColor: "#fff",
              width: "100%",
              alignItems: "center",
            },
          }}
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
}

function AuthRouter() {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
          width: "100%",
        },
      }}
    >
      {LoggedInRoutes.map((route, index) => (
        <Tab.Screen
          options={{
            ...route.screenOptions,
            contentStyle: {
              backgroundColor: "#fff",
              width: "100%",
              alignItems: "center",
            },
          }}
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function Router() {
  const user = useAuthStore((state) => state.user);
  return (
    <NavigationContainer>
      {user ? <AuthRouter /> : <NonAuthRouter />}
    </NavigationContainer>
  );
}
