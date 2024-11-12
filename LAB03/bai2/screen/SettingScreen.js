import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const SettingScreen = ({ navigation }) => {
    
    return (
      <View style={styles.body}>
              <View style={styles.container}>

        <Text> textInComponent </Text>
        </View>
      </View>
    )
  
}
const styles = StyleSheet.create({
  body: {
      backgroundColor: '#F2F4F7',
      flex: 1,

  },
  container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#F2F4F7',
      alignItems: 'center',
      marginHorizontal: 30,
      marginTop:30
  },
  title:{
      textAlign:'center'
  },
  logoutButton: {
      marginTop: 10,
      backgroundColor: '#24A0ED',
      height: 40,
      width: 120,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'

  },
  logoutButtonText: {
      color: 'white',

  }
  

});

export default SettingScreen
