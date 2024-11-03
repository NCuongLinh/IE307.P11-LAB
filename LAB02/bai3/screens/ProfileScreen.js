import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const { logout } = useContext(AuthContext);
    const navigation = useNavigation();
    const handleLogout = () => {
        logout(navigation);
    };

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.title}>Profile Screen</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>
                        LOG OUT
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
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
    title: {
        textAlign: 'center'
    },
    logoutButton: {
        marginTop: 10,
        backgroundColor: '#24A0ED',
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'

    },
    logoutButtonText: {
        color: 'white',

    }
});
export default ProfileScreen
