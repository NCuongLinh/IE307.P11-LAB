import { StatusBar } from 'expo-status-bar';
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Feed from './Feed';


export default function App() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Social Media Feed
        </Text>
      </View>
      <Feed />
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F2F4F7',
  },
  title: {
    backgroundColor: '#4267B2',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  }
  ,
  titleText: {
    fontSize: 25,
    paddingTop: 20,
    color: 'white',
    fontWeight: 'bold',

  },

});
