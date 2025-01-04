import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

 
const FeedbackForm = ({ darkMode, feedback, setFeedback, onSubmit }) => (
    <View style={styles.feedbackContainer}>
        <Text style={darkMode ? styles.feedbackTitleDark : styles.feedbackTitle}>Feedback</Text>
        <TextInput
            style={darkMode ? styles.inputDark : styles.input}
            placeholder="Your feedback here..."
            placeholderTextColor={darkMode ? 'white' : 'black'}
            value={feedback}
            onChangeText={setFeedback}
        />
        <Button title="SEND FEEDBACK" onPress={() => feedback !== '' && onSubmit()} />
    </View>
);

const styles = StyleSheet.create({
    feedbackContainer: {
        marginTop: 30,
        marginHorizontal: 20
    },
    feedbackTitle: {
        fontSize: 30,
        marginBottom: 10
    },
    feedbackTitleDark: {
        fontSize: 30,
        marginBottom: 10,
        color: 'white'
    },
    input: {
        height: 150,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        marginBottom: 10,
        padding: 10,
        fontSize: 18,
        textAlignVertical: 'top'

    },
    inputDark: {
        height: 150,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        marginBottom: 10,
        padding: 10,
        fontSize: 18,
        backgroundColor: '#2F2F2F',
        color: 'white',
        textAlignVertical: 'top'

    },
});

export default FeedbackForm;
