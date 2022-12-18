import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Slider,
  Pressable,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useBrightness } from '@use-expo/brightness';
import * as Network from 'expo-network';
import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import * as Cellular from 'expo-cellular';
import axios from 'axios';

import * as Battery from 'expo-battery';
import * as Location from 'expo-location';
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
  const latestSoftware = '16.1';
  const wifiDesc = `Using WiFi is better for battery health... Good Choice!`;
  const cellularDesc =
    'Using cellular data decreases battery health. If possible, connect to WiFi';
  const upToDateDesc =
    'Software updates bring important battery improvements. Your software is up to date, Good Job!';
  const notUpToDateDesc =
    'Software updates bring important battery improvements. Please update your software to the latest version if you think about your battery!';

  const goodSig =
    'Having a good signal quality prevents your device from constantly searching for network. You have nothing to worry about!';
  const badSig =
    'Having a good signal quality prevents your device from constantly searching for network. Try to find a better cellular connection!';
  const goodWeather =
    'iPhone batteries work best between 0° and 35°C. So good job, your weather conditions seem okay!';
  const badWeather =
    'iPhone batteries work best between 0° and 35°C. So find a better climate to live!';
  const [brightness, setBrightness, getBrightness] = useBrightness();
  const [network, setNetwork] = useState('');
  const [isLatest, setIsLatest] = useState(false);
  const [signalQuality, setSignalQuality] = useState('');
  const [isBatteryCharging, setisBatteryCharging] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(-1);
  const [isLowPower, setIsLowPower] = useState(false);
  const [temp, setTemp] = useState(0);
  const [weather, setWeather] = useState('');
  const handleSignalQuality = (q) => {
    if (q == 3 || q == 4) {
      setSignalQuality('Good');
    } else if (q == 2) {
      setSignalQuality('Medium');
    } else {
      setSignalQuality('Bad');
    }
  };
  const handleWeather = (temp) => {
    setTemp(temp);
    if (temp < 0) {
      setWeather('Too Cold');
    } else if (temp > 35) {
      setWeather('Too Hot');
    } else {
      setWeather('Normal');
    }
  };
  const handleLocation = (locObject) => {
    const options = {
      method: 'GET',
      url: 'https://yahoo-weather5.p.rapidapi.com/weather',
      params: {
        lat: String(locObject.coords.latitude),
        long: String(locObject.coords.longitude),
        format: 'json',
        u: 'c',
      },
      headers: {
        'X-RapidAPI-Key': '3a2ea1c421mshfb68cbd83cb9fe5p143cf3jsn199135afa1e7',
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        handleWeather(response.data.current_observation.condition.temperature);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const handleBatteryState = (bState) => {
    if (bState.batteryState == 1) {
      setisBatteryCharging('Not Charging');
    } else if (bState.batteryState == 2) {
      setisBatteryCharging('Charging');
    } else {
      setisBatteryCharging('Fully Charged');
    }
    const bLevel = Math.floor(bState.batteryLevel * 100);
    setBatteryLevel(bLevel);
    setIsLowPower(bState.lowPowerMode);
  };
  const getDetails = async () => {
    const networkState = await Network.getNetworkStateAsync();
    const batteryState = await Battery.getPowerStateAsync();
    const cellular = await Cellular.getCellularGenerationAsync();
    //console.log(batteryState);
    handleBatteryState(batteryState);
    setNetwork(networkState.type);
    handleSignalQuality(cellular);
    setIsLatest(Device.osVersion == latestSoftware);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    handleLocation(location);
  };
  useEffect(() => {
    getDetails();
  }, []);

  function percentage(level = 0) {
    return `${Math.floor(level * 1000) / 10}%`;
  }
  if (props.type == 'brightness') {
    return (
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
            {<Text style={styles.descStyle}>
              For optimal battery usage on your iPhone device, brightness should be kept minimal. You can dim the brightness from this slider
              </Text>}
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
    );
  } else if (props.type == 'network') {
    return (
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
            <Text
              style={
                network == 'WIFI'
                  ? styles.headerStyleCorrect
                  : styles.headerStyleNotCorrect
              }
            >
              {`Network status: ${network}`}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text style={styles.descStyle}>
              {network == 'WIFI' ? wifiDesc : cellularDesc}
            </Text>
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
    );
  } else if (props.type == 'version') {
    return (
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
            <Text
              style={
                isLatest
                  ? styles.headerStyleCorrect
                  : styles.headerStyleNotCorrect
              }
            >
              {isLatest
                ? 'Your Device is up to date!'
                : 'Your Device is not up to date!'}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text style={styles.descStyle}>
              {isLatest ? upToDateDesc : notUpToDateDesc}
            </Text>
            {!isLatest ? (
              <Pressable onPress={() => Linking.openSettings()}>
                <Text style={styles.goToSettingsText}>{'Go To Settings'}</Text>
              </Pressable>
            ) : null}
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
    );
  } else if (props.type == 'cellular') {
    return (
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
            <Text
              style={
                signalQuality == 'Good'
                  ? styles.headerStyleCorrect
                  : styles.headerStyleNotCorrect
              }
            >
              {`Your signal quality is ${signalQuality}`}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text style={styles.descStyle}>
              {signalQuality == 'Good' ? goodSig : badSig}
            </Text>
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
    );
  } else if (props.type == 'weather') {
    return (
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
            <Text
              style={
                weather == 'Normal'
                  ? styles.headerStyleCorrect
                  : weather == 'Too Hot'
                  ? styles.headerStyleNotCorrect
                  : styles.headerStyleCold
              }
            >
              {`Weather outside is ${weather}`}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text style={styles.descStyle}>
              {weather == 'Normal' ? goodWeather : badWeather}
            </Text>
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
    );
  }
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
  headerStyleCorrect: {
    color: '#32CD32',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  headerStyleNotCorrect: {
    color: '#D0342C',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  headerStyleCold: {
    color: '#a2d2df',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  goToSettingsText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
export default PropertyItem;
