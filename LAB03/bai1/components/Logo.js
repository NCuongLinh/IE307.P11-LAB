import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

//22520767 Nguyễn Cương Lĩnh

const Logo = ({title}) => (
    <View style={styles.logoContainer}>
        <Image
            style={styles.logo}
            source={require('../assets/image/logo.png')}
        />
        <Text style={styles.logoTitle}>{title}</Text>
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
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 75
    },
    logoTitle: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 30
    },
    logoTitleDark: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },
});

export default Logo;
