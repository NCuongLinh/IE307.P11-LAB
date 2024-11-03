import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import InputField from '../components/InputField';
import Logo from '../components/Logo';
import AuthButton from '../components/AuthButton'


//22520767 Nguyễn Cương Lĩnh

const LoginScreen = ({ navigation }) => (
    <View style={styles.container}>
        <Logo title={'Welcome'} />


        <InputField symbol="mail" placeholder="Email" />
        <InputField symbol="password" placeholder="Password" secure={true} />

        <TouchableOpacity>
            <Text style={styles.forgotText}>
                Forgot password?
            </Text>

        </TouchableOpacity>
        <AuthButton title="LOGIN" />

        <Text style={styles.externalLoginText}>Or login with</Text>
        <View style={styles.externalLoginContainer}>
            <TouchableOpacity>
                <Image style={styles.icon} source={require('../assets/icon/facebook.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.icon} source={require('../assets/icon/google.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.nagivationTextContainer}>
            <Text style={styles.navigationTextNormal}> Don't have an account?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.navigationText}>Sign up here!</Text>
            </TouchableOpacity>
        </View>

    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2F4F7',
        justifyContent: 'center',
        marginHorizontal: 30
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
    navigationTextNormal: {
        fontSize: 20
    },
    externalLoginText: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20,
    },
    forgotText: {
        color: '#D4599E',
        textAlign: 'right',
        marginTop: 5,
    },
    externalLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    icon: {
        height: 60,
        width: 60,
        marginHorizontal: 8,
    }

});

export default LoginScreen;
