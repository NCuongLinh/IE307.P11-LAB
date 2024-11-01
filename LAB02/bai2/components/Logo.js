import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Logo = ({ darkMode }) => (
    <View style={styles.logoContainer}>
        <Image
            style={styles.logo}
            source={darkMode ? require('../assets/logo/logo_dark.png') : require('../assets/logo/logo.png')}
        />
        <Text style={darkMode ? styles.logoTitleDark : styles.logoTitle}>React Native App</Text>
    </View>
);

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 30,
        alignItems: 'center'
    },
    logo: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 75
    },
    logoTitle: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    logoTitleDark: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },
});

export default Logo;
