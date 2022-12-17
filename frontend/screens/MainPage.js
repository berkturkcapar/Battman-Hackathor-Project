import { FlatList, View, Text, StyleSheet } from "react-native"
import Battery from "../components/Battery";
import PropertyItem from "../components/propertyItem"

const TYPES = [
  {
    id: 1,
    type: "brightness",
  },
  {
    id: 2,
    type: "network",
  },
  {
    id: 3,
    type: "version",
  },
  {
    id: 4,
    type: "cellular"
  }
];

const renderItem = ({ item }) => (
  <PropertyItem type={item.type}/>
);

const MainPage = () => {
  return(
    <View style={{flex: 1}}>
      <Battery percentage={75}/>
      <FlatList 
        data={TYPES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: 0
  }
});

export default MainPage;