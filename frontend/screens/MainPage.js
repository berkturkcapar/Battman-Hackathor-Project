import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Battery from '../components/Battery';
import PropertyItem from '../components/propertyItem';
import * as BatteryExpo from 'expo-battery';
import * as Notification from "expo-notifications";
import * as Permissions from "expo-permissions";
import { USER_FACING_NOTIFICATIONS } from "expo-permissions";

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

  //Exectute at the launch of app for ios
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          alert("Notifications will be unavailable now");
          return;
        }
      });
  }, []);

  useEffect(() => {
    //When app is closed
    const backgroundSubscription =
      Notification.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });
    //When the app is open
    const foregroundSubscription = Notification.addNotificationReceivedListener(
      (notification) => {
        // console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);
  //=======================================================

  //Trigger Function Called by click of the button to
  //trigger notification

  //=======================================================
  const triggerNotification = ( batteryLevel ) => {
    // console.log("battery level", batteryLevel);
    Notification.scheduleNotificationAsync({
      content: {
        title: "Battery Alert ⚠️",
        body: batteryLevel <= 20 ? 
        ("Charge your phone! Your charge should not go below 20% for long-lasting battery life") 
        : ("Don't overcharge your phone! Your charge should not go above 80% for long-lasting battery life"),
      },
      trigger: {
        seconds: 2,
      },
    });
  };

  useEffect(() => {
    if (batteryLevel && (batteryLevel <= 20 || batteryLevel >= 80)) {
      triggerNotification(batteryLevel);
    }
  }, [batteryLevel])
  

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
    const bLevel = Math.ceil(bState.batteryLevel * 100);
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
  useEffect(() => {
    const subscription = BatteryExpo.addBatteryLevelListener((bState) => {
      const bLevel = Math.ceil(bState.batteryLevel * 100);
      if (bLevel <= 0) {
        setBatteryLevel(20);
      } else {
        setBatteryLevel(bLevel);
      }
    });
    return () => {
      subscription.remove();
    };
  }, [batteryLevel]);
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
