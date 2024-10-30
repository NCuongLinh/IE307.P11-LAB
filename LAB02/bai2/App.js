import { StatusBar } from 'expo-status-bar';
import { ScrollView, Image, StyleSheet, Text, View, Switch, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';

// Nguyễn Cương Lĩnh 22520767


export default function App() {

  const [darkModeIsEnabled, setDarkModeIsEnabled] = useState(false);
  const [notificationIsEnabled, setNotificationIsEnabled] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]); 

  const SwitchButton = (props) => {
    return (
      <View style={styles.switchContainer}>

        <Text style={darkModeIsEnabled ? styles.switchTitleDark : styles.switchTitle}>{props.title}</Text>

        <Switch style={styles.switchButton} onValueChange={props.toggleSwitch} value={props.isEnabled} />

      </View>

    )
  }

  const showAlert = () => {
     notificationIsEnabled && Alert.alert(
      'Thank you for your feedback!',
      '',
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
    );
    setSubmittedFeedback(feedback);
    setFeedbackList([...feedbackList, feedback]); 
    setFeedback('');
    
  }

  return (
    <ScrollView style={darkModeIsEnabled == true ? styles.containerDark : styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={darkModeIsEnabled == true ? require('./assets/logo/logo_dark.png') : require('./assets/logo/logo.png')} />
        <Text style={darkModeIsEnabled == true ? styles.logoTitleDark : styles.logoTitle}>React Native App</Text>
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
        <Text style={darkModeIsEnabled == true ? styles.feedbackTitleDark : styles.feedbackTitle}>
          FeedBack
        </Text>
        <TextInput
          style={darkModeIsEnabled == true ? styles.inputDark : styles.input}
          placeholderTextColor={darkModeIsEnabled ? 'white' : 'black'}g
          placeholder='Your feedback here...'
          value={feedback}
          onChangeText={setFeedback}
        />
        <Button title="SEND FEEDBACK"  onPress={() => feedback !== '' && showAlert()} />
        <Text style={darkModeIsEnabled == true ? styles.faqTitleDark : styles.faqTitle}>Frequently Asked Questions</Text>
        <View>
        {feedbackList.map((item, index) => (
            <Text key={index} style={darkModeIsEnabled ? styles.faqDark : styles.faq}>Q: {item}</Text>
          ))}
        </View>
      </View>
    </ScrollView>

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
    backgroundColor: 'white',
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
    backgroundColor: '#2F2F2F',
    color: 'white',


  },
  faqTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  faqTitleDark: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white'
  },
  faq:{
    marginBottom: 10,
    color: 'black'
  },
  faqDark:{
    marginBottom: 10,
    color: 'white'
  }
});
