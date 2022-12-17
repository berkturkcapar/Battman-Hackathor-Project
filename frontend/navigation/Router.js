import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import PropertyItem from '../components/propertyItem';
import MainPage from '../screens/MainPage';
import AddPreferences from '../screens/AddPreferences';
import Preferences from '../screens/Preferences';
import RunTimeCalculator from '../screens/RunTimeCalculator';

const routes = [
  {
    name: 'Home',
    component: () => <MainPage />,
    props: {},
  },
  {
    name: 'Preferences',
    component: () => <Preferences />,
    props: {},
  },
  {
    name: 'Add Preference',
    component: () => <AddPreferences />,
    props: {},
  },
  {
    name: 'Runtime Calculator',
    component: () => <RunTimeCalculator />,
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
              drawerActiveBackgroundColor: '#555',
              drawerActiveTintColor: '#0f0',
              drawerContentStyle: {
                backgroundColor: '#000',
              },
              drawerLabelStyle: {
                fontSize: 20,
              },
              drawerInactiveTintColor: '#fff',
              drawerType: 'slide',
              drawerStatusBarAnimation: 'slide',
              headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
              sceneContainerStyle: {
                backgroundColor: '#000',
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
