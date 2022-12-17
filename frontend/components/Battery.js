import React from 'react';
import { View, StyleSheet } from 'react-native';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';

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
//const BoltIcon = () => {
//  return <Icon name={'bolt'} />;
//};
const Battery = ({ percentage }) => {
  let cnt = Math.floor(percentage / 20);
  cnt = cnt === 0 ? 1 : cnt;
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
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 100,
        justifyContent: 'center',
        marginVertical: 20,
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
        }}
      >
        {arr.map((item) => item)}
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
  );
};

export default Battery;
