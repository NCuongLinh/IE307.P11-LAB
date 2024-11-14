import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const AuthButton = ({ title, onPress }) => (
    <Pressable style={styles.button} onPress={onPress}>
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
