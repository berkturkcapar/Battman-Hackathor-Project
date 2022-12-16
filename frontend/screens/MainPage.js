import { FlatList, View, Text, StyleSheet } from "react-native"
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
    <View>
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
    marginTop: 10
  }
});

export default MainPage;