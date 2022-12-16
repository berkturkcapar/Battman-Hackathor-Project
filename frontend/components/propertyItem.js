import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Slider } from 'react-native';
import { useFonts } from 'expo-font';
import { useBrightness } from '@use-expo/brightness';
import * as Network from 'expo-network';
import * as Device from 'expo-device';
import * as Brightness from 'expo-brightness';
const PropertyItem = (props) => {
  const lorem =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolor totam animi, sunt autem iusto ratione enim consequatur illum nemo culpa nostrum voluptatibus placeat temporibus consequuntur ad atque ex repellat?';
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter/static/Inter-Black.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter/static/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter/static/Inter-ExtraBold.ttf'),
    'Inter-ExtraLight': require('../assets/fonts/Inter/static/Inter-ExtraLight.ttf'),
    'Inter-Light': require('../assets/fonts/Inter/static/Inter-Light.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter/static/Inter-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter/static/Inter-Regular.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter/static/Inter-SemiBold.ttf'),
    'Inter-Thin': require('../assets/fonts/Inter/static/Inter-Thin.ttf'),
  });

  const [brightness, setBrightness, getBrightness] = useBrightness();
  const getNetwork = async () => {
    const networkState = await Network.getNetworkStateAsync();
    console.log(networkState.type);
  };
  useEffect(() => {
    getNetwork();
  });

  function percentage(level = 0) {
    return `${Math.floor(level * 1000) / 10}%`;
  }
  return props.isSlider ? (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <View
          style={{
            padding: 10,
            paddingBottom: 0,
          }}
        >
          <Text style={styles.headerStyle}>
            {`Brightness: ${percentage(brightness)}`}
          </Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          {/*<Text style={styles.descStyle}>{lorem}</Text>*/}
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            step={0.001}
            minimumValue={0.001}
            maximumValue={1}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginLeft: 'auto',
          flexDirection: 'column',
        }}
      ></View>
    </View>
  ) : (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <View
          style={{
            padding: 10,
            paddingBottom: 0,
          }}
        >
          <Text style={styles.headerStyle}>
            {`Brightness: ${percentage(brightness)}`}
          </Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={styles.descStyle}>{lorem}</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginLeft: 'auto',
          flexDirection: 'column',
        }}
      >
        <Switch
          style={styles.switchStyle}
          ios_backgroundColor='#8b8c8b'
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#555555',
    padding: 10,
    minHeight: 180,
    margin: 10,
    borderRadius: 20,
    flexDirection: 'row',
  },
  switchStyle: {
    marginLeft: 'auto',
  },
  headerStyle: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  descStyle: {
    color: '#d4d5d6',
    fontFamily: 'Inter-Light',
    fontSize: 16,
  },
});
export default PropertyItem;
