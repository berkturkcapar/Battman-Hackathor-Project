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
  const [brightness, setBrightness, getBrightness] = useBrightness();
  const [network, setNetwork] = useState('');
  const [isLatest, setIsLatest] = useState(false);
  const [signalQuality, setSignalQuality] = useState('');
  const handleSignalQuality = (q) => {
    if (q == 3 || q == 4) {
      setSignalQuality('Good');
    } else if (q == 2) {
      setSignalQuality('Medium');
    } else {
      setSignalQuality('Bad');
    }
  };
  const getDetails = async () => {
    const networkState = await Network.getNetworkStateAsync();
    const cellular = await Cellular.getCellularGenerationAsync();
    setNetwork(networkState.type);
    handleSignalQuality(cellular);
    setIsLatest(Device.osVersion == latestSoftware);
  };
  useEffect(() => {
    getDetails();
  });

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
            {<Text style={styles.descStyle}>{lorem}</Text>}
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
        >
          {/*<Switch
            style={styles.switchStyle}
            ios_backgroundColor='#8b8c8b'
            onValueChange={toggleSwitch}
            value={isEnabled}
          />*/}
        </View>
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
                <Text style={styles.goToSettingsText}>{'Go To Settings!'}</Text>
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
        >
          {/*<Switch
            style={styles.switchStyle}
            ios_backgroundColor='#8b8c8b'
            onValueChange={toggleSwitch}
            value={isEnabled}
          />*/}
        </View>
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
            {/*{!isLatest ? (
              <Pressable onPress={() => Linking.openSettings()}>
                <Text style={styles.goToSettingsText}>{'Go To Settings!'}</Text>
              </Pressable>
            ) : null}*/}
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
          {/*<Switch
            style={styles.switchStyle}
            ios_backgroundColor='#8b8c8b'
            onValueChange={toggleSwitch}
            value={isEnabled}
          />*/}
        </View>
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
  goToSettingsText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
export default PropertyItem;
