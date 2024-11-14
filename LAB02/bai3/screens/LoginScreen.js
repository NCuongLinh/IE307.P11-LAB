import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import InputField from '../components/InputField';
import Logo from '../components/Logo';
import AuthButton from '../components/AuthButton'
import { AuthContext } from '../context/AuthContext';

//22520767 Nguyễn Cương Lĩnh

const LoginScreen = ({ navigation }) => {
    const { login, validEmail, validPassword } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = () => {
        console.log("Email:", email, "Password:", password);
        if (email === validEmail && password === validPassword) {
            login(email, password);
            navigation.navigate('MainScreen');
        } else {
            Alert.alert('Incorrect email or password.', '');
        }
    };

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <Logo title={'Welcome'} />
                <InputField symbol="mail" placeholder="Email" onChangeText={setEmail} />
                <InputField symbol="password" placeholder="Password" secure={true} onChangeText={setPassword} />

                <TouchableOpacity>
                    <Text style={styles.forgotText}>
                        Forgot password?
                    </Text>

                </TouchableOpacity>
                <AuthButton title="LOGIN" onPress={handleLogin} />

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
        </View>
    );
}


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
