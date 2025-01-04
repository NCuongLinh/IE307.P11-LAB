import Slider from '@react-native-community/slider';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { SettingsContext } from '../context/SettingsContext';

 
const SettingScreen = ({ navigation }) => {
    const { isDarkMode, toggleDarkMode, fontSize, updateFontSize } = useContext(SettingsContext);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: isDarkMode ? '#333' : '#F2F4F7' },
            headerTintColor: isDarkMode ? 'white' : '#000',
        });
    }, [isDarkMode]);

    return (
        <View style={[styles.body, { backgroundColor: isDarkMode ? '#111111' : '#F2F4F7' }]}>
            <View style={styles.container}>
                <View style={styles.switchContainer}>
                    <Text style={[styles.text, { color: isDarkMode ? '#FFF' : '#000', fontSize }]}>Dark Mode</Text>
                    <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
                </View>
                <View style={styles.sliderContainer}>
                    <Text style={{ color: isDarkMode ? '#FFF' : '#000', fontSize }}>Font Size: {fontSize.toFixed(0)}  </Text>
                    <Slider
                        minimumValue={10}
                        maximumValue={45}
                        value={fontSize}
                        onValueChange={(value) => updateFontSize(value)}
                        maximumTrackTintColor={isDarkMode ? '#FFF' : 'black'}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 30,
        justifyContent: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    sliderContainer: {
        width: '100%',
    },
    text: {
        fontSize: 16,
    },
});

export default SettingScreen;