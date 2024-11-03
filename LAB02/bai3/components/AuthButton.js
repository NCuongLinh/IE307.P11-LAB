import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


//22520767 Nguyễn Cương Lĩnh

const AuthButton = ({ title }) => (
    <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
            {title}
        </Text>
    </Pressable>

);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#E77105',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    }
});

export default AuthButton;
