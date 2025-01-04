import React, { use, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import "core-js/stable/atob";
import { jwtDecode } from 'jwt-decode';
import { decode } from "base-64";
import Feather from '@expo/vector-icons/Feather';

 
const ProfileScreen = () => {
    global.atob = decode;
    const { logout, validEmail, validPassword } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [token, setToken] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: validEmail,  // Chỉ có thể set mặc định mor_2314 và 83r5^_ (Lý do bên dưới)
                password: validPassword
            }),
            headers: {
                'Content-Type': 'application/json' // User login not working with documenation #131 github.com/keikaavousi/fake-store-api 
            }
        })
            .then(res => res.json())
            .then(json => {
                const token = json.token;
                setToken(token);
                const decoded = jwtDecode(token);
                console.log(decoded); // Login Token should contain User Id #61 github.com/keikaavousi/fake-store-api => No userid = Hết cứu 
                // Issue 2022 vẫn chưa fix => THUA (last commit 2022)
            }
            )
    }, [validEmail, validPassword]);

    useEffect(() => {
        if (token) {
            fetch('https://fakestoreapi.com/users/2')
                .then(res => res.json())
                .then(json => setUserInfo(json))
                .then(json => console.log(json))
                .then(setLoading(false))
        }
    }, [token]);

    const handleLogout = () => {
        setUserInfo(null);
        setToken(null);
        logout(navigation);
    };

    const handleEditProfile = () => {
        navigation.navigate('EditProfile', { userInfo, setUserInfo });
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#24A0ED" />
            </View>
        );
    }

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/George-W-Bush.jpeg' }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    <Text style={styles.title}>
                        {userInfo?.name?.firstname || "First"} {userInfo?.name?.lastname || "Last"}
                    </Text>
                    <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                        <Feather name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>Name</Text>
                    <Text style={styles.info}>{`${userInfo?.name?.firstname || ""} ${userInfo?.name?.lastname || ""}`}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>Username:</Text>
                    <Text style={styles.info}>{userInfo?.username || "N/A"}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>Email:</Text>
                    <Text style={styles.info}>{userInfo?.email || "N/A"}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>Phone:</Text>
                    <Text style={styles.info}>{userInfo?.phone || "N/A"}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>Address:</Text>
                    <Text style={styles.info}>
                        {userInfo?.address?.number || ""}, {userInfo?.address?.street || ""}, {userInfo?.address?.city || ""}
                    </Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>LOG OUT</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 20,
        paddingBlock: 50,
        backgroundColor: '#fff',

    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoHeader: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    info: {
        fontSize: 18,
        marginVertical: 5,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        marginInlineStart: 40,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#24A0ED',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ProfileScreen;
