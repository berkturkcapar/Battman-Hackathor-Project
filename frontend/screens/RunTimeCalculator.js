import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as BatteryExpo from 'expo-battery';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';

const batteryCapacities = [
  {
    name: 'iPhone 11',
    capacity: 3110,
  },
  {
    name: 'iPhone SE',
    capacity: 2018,
  },
  {
    name: 'iPhone 14',
    capacity: 3279,
  },
  {
    name: 'iPhone 14 Pro',
    capacity: 3200,
  },
  {
    name: 'iPhone 14 Pro Max',
    capacity: 4323,
  },
];

const dischargeRates = [
  {
    action: 'Video Playback',
    rate: 138,
    icon: 'youtube-play'
  },
  {
    action: 'Video Playback (Streaming)',
    rate: 160,
    icon: 'video-camera'
  },
  {
    action: 'Audio Playback',
    rate: 41,
    icon: 'music'
  },
];

const RunTimeCalculator = () => {
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

  const [deviceName, setDeviceName] = useState('');
  const [model, setModel] = useState();
  const obj = batteryCapacities.find((item) => item.name === deviceName);
  const [bLevel, setBLevel] = useState(0);
  const asyncFunc = async () => {
    const batteryState = await BatteryExpo.getPowerStateAsync();
    setBLevel(batteryState.batteryLevel);
  };

  useEffect(() => {
    asyncFunc();
    setDeviceName(Device.modelName);
    setModel(obj);
  });

  return fontsLoaded
    ? dischargeRates.map((rate) => (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            borderRadius: 20,
            padding: 20,
            backgroundColor: '#555',
            marginVertical: 10,
          }}
        >
          <Icon 
            name={rate.icon} 
            size={18} 
            color={'white'} 
            style={{
              marginRight: 10, 
              lineHeight: 25
            }}/>
          <Text style={{ color: '#fff', lineHeight: 25 }}>{`${rate.action}: ${Math.floor(
            (model?.capacity / rate.rate) * bLevel
          )} hours`}</Text>
        </View>
      ))
    : null;
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0c0',
    padding: 20,
    borderRadius: 40,
  },
  card: { flexDirection: 'row', justifyContent: 'flex-start' },
  text: { color: 'white', fontSize: 15, fontFamily: 'Inter-Regular' },
  title: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
  },
});

export default RunTimeCalculator;
