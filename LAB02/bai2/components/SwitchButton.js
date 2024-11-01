import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SwitchButton = ({ title, isEnabled, toggleSwitch, darkMode }) => (
    <View style={styles.switchContainer}>
        <Text style={darkMode ? styles.switchTitleDark : styles.switchTitle}>{title}</Text>
        <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
);

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30
    },
    switchTitle: {
        fontSize: 18
    },
    switchTitleDark: {
        fontSize: 18,
        color: 'white'
    },
});

export default SwitchButton;
