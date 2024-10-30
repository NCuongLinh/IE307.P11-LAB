import { StatusBar } from 'expo-status-bar';
import { ScrollView, Image, StyleSheet, Text, View, Switch, TextInput, Button, useColorScheme } from 'react-native';
import { useState } from 'react';

// Nguyễn Cương Lĩnh 22520767


export default function App() {

  const [darkModeIsEnabled, setDarkModeIsEnabled] = useState(false);
  const [notificationIsEnabled, setNotificationIsEnabled] = useState(false);

  const SwitchButton = (props) => {
    return (
      <View style={styles.switchContainer}>

        <Text style={darkModeIsEnabled ? styles.switchTitleDark : styles.switchTitle}>{props.title}</Text>

        <Switch style={styles.switchButton} onValueChange={props.toggleSwitch} value={props.isEnabled} />

      </View>

    )
  }

  return (
    <View style={ darkModeIsEnabled == true ? styles.containerDark : styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: 'https://www.scorchsoft.com/public/capabilities/head/react-native-logo-square.webp' }} />
        <Text style={ darkModeIsEnabled == true ? styles.logoTitleDark : styles.logoTitle}>React Native App</Text>
      </View>

      <SwitchButton
        title="Dark mode"
        isEnabled={darkModeIsEnabled}
        toggleSwitch={() => setDarkModeIsEnabled(prev => !prev)}

      />
      <SwitchButton
        title="Notifications"
        isEnabled={notificationIsEnabled}
        toggleSwitch={() => setNotificationIsEnabled(prev => !prev)}
      />
      <View style={styles.feedbackContainer}>
        <Text style={ darkModeIsEnabled == true ? styles.feedbackTitleDark : styles.feedbackTitle}>
          FeedBack
        </Text>
        <TextInput style={ darkModeIsEnabled == true ? styles.inputDark  : styles.input} placeholderTextColor={darkModeIsEnabled ? 'white' : 'black'} placeholder='Your feedback here...'/>
        <Button title="SEND FEEDBACK" />

        <View>
          <Text style={ darkModeIsEnabled == true ? styles.faqTitleDark : styles.faqTitle}> Frequently Asked Questions</Text>
        </View>
      </View>




    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F2F4F7',
    marginTop: 40,
    backgroundColor: '#F3F3F3',
  },
  containerDark: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    marginTop: 40,
    backgroundColor: 'black',
  },
  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 30,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    borderRadius: 150 / 2,
    alignContent: 'center',
    justifyContent: 'center'
  },
  logoTitle: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,

  },
  logoTitleDark: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'

  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30
  },
  switchTitle: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchTitleDark: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  switchButton: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]

  },
  feedbackContainer: {
    marginTop: 30,
    marginHorizontal: 20,

  },
  feedbackTitle: {
    fontSize: 30,
    marginBottom: 10,
  },
  feedbackTitleDark: {
    fontSize: 30,
    marginBottom: 10,
    color: 'white'

  },
  input: {
    maginTop: 30,
    height: 150,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    marginBottom: 10,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,

  },
  inputDark: {
    maginTop: 30,
    height: 150,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    marginBottom: 10,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,
    placeholder: 'white'

  },
  faqTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  faqTitleDark: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white'
  }
});
