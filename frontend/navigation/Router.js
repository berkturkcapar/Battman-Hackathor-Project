import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";

const routes = [
  {
    name: "Home",
    component: () => (
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis eos
        itaque aliquam. Et vero excepturi nesciunt debitis, fugiat distinctio
        iusto illum aliquam, a quae incidunt id necessitatibus nisi itaque
        similique numquam expedita consequatur modi aliquid nemo reprehenderit
        facere consectetur. Deleniti iste a earum neque quas minus quam amet
        tenetur voluptate.
      </Text>
    ),
    props: {},
  },
  {
    name: "Battery",
    component: () => (
      <Text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae modi
        eaque voluptates id ullam aspernatur deserunt atque officia, illo
        cumque?
      </Text>
    ),
    props: {},
  },
];

const Drawer = createDrawerNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {routes.map((route) => (
          <Drawer.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{
              drawerActiveBackgroundColor: "#555",
              drawerActiveTintColor: "#0f0",
              drawerContentStyle: {
                backgroundColor: "#000",
              },
              drawerLabelStyle: {
                fontSize: 20,
              },
              drawerInactiveTintColor: "#fff",
              drawerType: "slide",
              drawerStatusBarAnimation: "slide",
              headerStyle: {
                backgroundColor: "#000",
              },
              headerTintColor: "#fff",
              sceneContainerStyle: {
                backgroundColor: "#000",
              },
              headerTitle: () => null,
            }}
            {...route.props}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
