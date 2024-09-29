import { StyleSheet, Text, View, ImageBackground, FlatList, SectionList, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { fruits_vegetables, workouts } from './data';

export default function App() {
  const [isSelected, setSelected] = useState([]);
  const toggleSelect = (item) => {
    setSelected((prev) => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  }
  const renderWorkoutItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.type}</Text>
      <Pressable style={styles.button} onPress={() => toggleSelect(item.type)}><Text style={styles.buttonText}>{isSelected.includes(item.type) ? 'DESELECT' : 'SELECT'}</Text></Pressable>

    </View>
  );

  const renderFruitsVegetablesItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
      <Pressable style={styles.button} onPress={() => toggleSelect(item)}><Text style={styles.buttonText}>{isSelected.includes(item) ? 'DESELECT' : 'SELECT'}</Text></Pressable>

    </View>
  );

  const renderFruitsVegetablesHeader = ({ section: { title, url } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <ImageBackground source={{ uri: url }} style={styles.sectionImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView>
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1714181871329-1392197011c2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D' }}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>FlatList - Workouts</Text>
            </View>
            <FlatList
              data={workouts}
              renderItem={renderWorkoutItem}
              keyExtractor={(item) => item.id}
              style={styles.list}
              scrollEnabled={false}
            />
          </View>

        </ImageBackground>
        <View>
          <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/47/84/dd/4784ddf5883a372d8b8341b3ba149141.jpg' }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>SectionList - Fruits & Vegetables</Text>
            </View>
            <SectionList
              sections={fruits_vegetables}
              renderItem={renderFruitsVegetablesItem}
              renderSectionHeader={renderFruitsVegetablesHeader}
              keyExtractor={(item, index) => item + index}
              style={styles.list}
              scrollEnabled={false}
            />
          </ImageBackground>

        </View>
        <View style={styles.selectMenu}>
          <Text style={styles.selectMenuTitle}>SELECTED EXERCISES</Text>
          <Text style={styles.selectMenuContent}>
            {isSelected.length > 0 ? isSelected.join(', ') : ''}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    marginHorizontal: 22,
    marginTop: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  title: {
    color: 'blue',
    fontSize: 22,
    fontWeight: '900',
  },
  list: {
    marginVertical: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: '700',
  },
  sectionImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectMenu: {
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  selectMenuTitle: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  selectMenuContent: {
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#2196F3',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
