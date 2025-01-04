import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedbackList = ({ feedbackList, darkMode }) => (
    <View style={styles.feedbackListContainer}>
        <Text style={darkMode ? styles.faqTitleDark : styles.faqTitle}>Frequently Asked Questions</Text>
        {feedbackList.map((item, index) => (
            <Text key={index} style={darkMode ? styles.faqDark : styles.faq}>Q: {item}</Text>
        ))}
    </View>
);

const styles = StyleSheet.create({
    feedbackListContainer: {
        marginHorizontal: 20,

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
        color: 'white',
    },
    faq: {
        marginBottom: 10,
        color: 'black'
    },
    faqDark: {
        marginBottom: 10,
        color: 'white'
    },
});

export default FeedbackList;
