import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function getPercentageColor(percentage) {
  if (percentage >= 80) {
    return 'green';
  } else if (percentage >= 60) {
    return 'yellow';
  } else if (percentage >= 40) {
    return 'orange';
  } else if (percentage >= 20) {
    return 'red';
  } else {
    return 'red';
  }
}

const BoltIcon = () => {
  return <Icon name={'bolt'} size={30}/>;
};

const Battery = ({ percentage,isCharged, isLowPower }) => {
  let cnt = Math.floor(percentage / 20);
  cnt = cnt === 0 ? 1 : cnt;
  // console.log(cnt,'cnt')
  const arr = Array(cnt).fill(
    <View
      style={{
        height: '95%',
        borderRadius: 10,
        flexBasis: '18.5%',
        marginRight: 5,
        backgroundColor: getPercentageColor(percentage),
        width: `${percentage}%`,
      }}
    />
  );
  // console.log(isCharged, "is Charge")
  return (
    <>
    <View
      style={{
        flexDirection: 'row',
        height: 100,
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 15
      }}
    >
      <View
        style={{
          height: 100,
          borderColor: 'white',
          borderWidth: 5,
          flexBasis: '70%',
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 2,
          position: 'relative'
        }}
      >
        {arr.map((item) => item)}
        {
          isCharged !== "Not Charging" &&   ( <View style={{position: 'absolute', left: '50%'}}>
          <Icon name='bolt' size={50} color={'white'} />
        </View>)
        }
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: 'white',
            borderRadius: 4,
          }}
        ></View>
      </View>
    </View>
    <View style={{
      justifyContent: 'center',
      alignItems: "center",
      paddingBottom: 10,
    }}>
      <Text style={{
          color: 'white',
          fontFamily: 'Inter-Bold',
          fontSize: 20,
          }}>
        Battery Percentage: { percentage }%
      </Text>
      <Text style={{
        color: 'orange',
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        textAlign: 'center'
      }}>
        {isLowPower ? 'Low Power Mode is on' : 'Low Power mode is off'}
      </Text>
      <Text style={{
        color: '#d4d5d6',
        fontFamily: 'Inter-Light',
        fontSize: 16,
        textAlign: 'center'
      }}>
        It is most beneficial for you to keep your battery level between 20% and 80%
      </Text>
    </View>
    </>
  );
};

export default Battery;
