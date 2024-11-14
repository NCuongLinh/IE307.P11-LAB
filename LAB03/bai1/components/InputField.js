import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

//22520767 Nguyễn Cương Lĩnh

const Symbol = ({ symbol }) => {
    if (symbol === "mail") {
        return <MaterialCommunityIcons name="email-outline" size={33} color="black" />
    }
    if (symbol === "user") {
        return <FontAwesome6 name="user" size={33} color="black" />
    }
    if (symbol === "password") {
        return <Feather name="lock" size={33} color ="black" />
    }

    return null;

};

const InputField = ({ symbol, placeholder, secure = false, onChangeText  }) => (
        <View style={styles.container}>
            <Symbol symbol={symbol}/>
            <TextInput style={styles.inputField} placeholder={placeholder} secureTextEntry={secure} onChangeText={onChangeText}/>
        </View>
);

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        paddingVertical: 15,
        paddingStart: 20,
        borderRadius: 10,
        borderWidth: 0.7,
        flexDirection:'row',
        paddingVertical: 0,
        height: 60,
        alignItems: 'center',

    },
    inputField:{
        fontSize: 18,
        width: 300,
        height: 50,
        paddingStart: 20
    }

});

export default InputField;
