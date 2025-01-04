import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField.js'
import Logo from '../components/Logo';
import AuthButton from '../components/AuthButton'

 
const RegisterScreen = ({ navigation }) => (
    <View style={styles.body}>
        <View style={styles.container}>
            <Logo title={"Create New Account"} />

            <InputField symbol="user" placeholder="Enter username" />
            <InputField symbol="mail" placeholder="Enter email" />
            <InputField symbol="password" placeholder="Enter password" secure={true} />
            <InputField symbol="password" placeholder="Confirm password" secure={true} />

            <AuthButton title="CREATE" />

            <View style={styles.nagivationTextContainer}>
                <Text style={styles.text}> Already have an account?  </Text>
                <TouchableOpacity title="Login now!" onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.navigationText}>Login now!</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#F2F4F7',
        flex: 1,

    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2F4F7',
        justifyContent: 'center',
        marginHorizontal: 25

    },
    navigationText: {
        color: 'blue',
        fontSize: 20,
        fontWeight: 'bold'

    },
    nagivationTextContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    text: {
        fontSize: 20
    }
});

export default RegisterScreen;
