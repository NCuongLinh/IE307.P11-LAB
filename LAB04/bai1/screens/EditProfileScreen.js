import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  

 
const EditProfileScreen = ({ route, navigation }) => {
    const { userInfo, setUserInfo } = route.params;  
    const [name, setName] = useState(`${userInfo.name.firstname} ${userInfo.name.lastname}`);
    const [email, setEmail] = useState(userInfo.email);
    const [phone, setPhone] = useState(userInfo.phone);
    const [address, setAddress] = useState(`${userInfo.address.number}, ${userInfo.address.street}, ${userInfo.address.city}`);

    const handleUpdateProfile = () => {
        const updatedUserInfo = {
            ...userInfo,
            name: {
                ...userInfo.name,
                firstname: name.split(' ')[0],  
                lastname: name.split(' ')[1] || '',
            },
            email,
            phone,
            address: {
                ...userInfo.address,
                number: address.split(',')[0], 
                street: address.split(',')[1] || '', 
                city: address.split(',')[2] || '', 
            },
        };

        setUserInfo(updatedUserInfo);

        Alert.alert('Success', 'Profile updated successfully.');
        navigation.goBack();  
    };

    // Cập nhật header với biểu tượng save
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleUpdateProfile}>
                    <Ionicons name="ios-save" size={24} color="blue" style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, name, email, phone, address]); 

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/George-W-Bush.jpeg' }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    <Text style={styles.title}>{userInfo.name.firstname} {userInfo.name.lastname}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>Address</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
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
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: '#24A0ED',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default EditProfileScreen;
