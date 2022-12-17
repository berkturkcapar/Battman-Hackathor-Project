import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Battery from '../components/Battery';
import PropertyItem from '../components/propertyItem';
import * as BatteryExpo from 'expo-battery';

const TYPES = [
  {
    id: 1,
    type: 'brightness',
  },
  {
    id: 2,
    type: 'network',
  },
  {
    id: 3,
    type: 'version',
  },
  {
    id: 4,
    type: 'cellular',
  },
  {
    id: 5,
    type: 'weather',
  },
];

const renderItem = ({ item }) => <PropertyItem type={item.type} />;

const MainPage = () => {
  const [isBatteryCharging, setisBatteryCharging] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [isLowPower, setIsLowPower] = useState(false);
  const handleBatteryState = (bState) => {
    if (bState.batteryState == 1) {
      setisBatteryCharging('Not Charging');
    } else if (bState.batteryState == 2) {
      setisBatteryCharging('Charging');
    } else {
      setisBatteryCharging('Fully Charged');
    }
    const bLevel = Math.floor(bState.batteryLevel * 100);
    if (bLevel <= 0) {
      setBatteryLevel(20);
    } else {
      setBatteryLevel(bLevel);
    }
    setIsLowPower(bState.lowPowerMode);
  };

  useEffect(() => {
    const subscription = BatteryExpo.addBatteryStateListener((bState) => {
      if (bState.batteryState == 1) {
        setisBatteryCharging('Not Charging');
      } else if (bState.batteryState == 2) {
        setisBatteryCharging('Charging');
      } else {
        setisBatteryCharging('Fully Charged');
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    const subscription = BatteryExpo.addLowPowerModeListener((e) => {
      setIsLowPower(e.lowPowerMode);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  const asyncFunc = async () => {
    const batteryState = await BatteryExpo.getPowerStateAsync();
    handleBatteryState(batteryState);
  };
  useState(() => asyncFunc(), []);
  return (
    <View style={{ flex: 1 }}>
      <Battery percentage={batteryLevel} isCharged={isBatteryCharging} isLowPower={isLowPower}/>
      <FlatList
        data={TYPES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 0,
  },
});

export default MainPage;
