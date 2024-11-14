import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import Logo from './components/Logo';
import SwitchButton from './components/SwitchButton';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

//22520767 Nguyễn Cương Lĩnh

export default function App() {
  const [darkModeIsEnabled, setDarkModeIsEnabled] = useState(false);
  const [notificationIsEnabled, setNotificationIsEnabled] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

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
    setFeedbackList([...feedbackList, feedback]);
    setFeedback('');

  }


  return (
    <ScrollView style={darkModeIsEnabled ? styles.containerDark : styles.container}>
      <StatusBar backgroundColor="white" />
      <Logo darkMode={darkModeIsEnabled} />
      <SwitchButton
        title="Dark mode"
        isEnabled={darkModeIsEnabled}
        toggleSwitch={() => setDarkModeIsEnabled((prev) => !prev)}
        darkMode={darkModeIsEnabled}
      />
      <SwitchButton
        title="Notifications"
        isEnabled={notificationIsEnabled}
        toggleSwitch={() => setNotificationIsEnabled((prev) => !prev)}
        darkMode={darkModeIsEnabled}
      />
      <FeedbackForm
        darkMode={darkModeIsEnabled}
        feedback={feedback}
        setFeedback={setFeedback}
        onSubmit={showAlert}
      />
      <FeedbackList feedbackList={feedbackList} darkMode={darkModeIsEnabled} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F2F4F7',
    marginTop: 40
  },
  containerDark: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 40,
    backgroundColor: 'black'
  },
});
