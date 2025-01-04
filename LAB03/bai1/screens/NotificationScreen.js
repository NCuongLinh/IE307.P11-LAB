import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

 
const NotificationScreen = ({ navigation }) => {
    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.title}>Notification Screen</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('NotificationDetailsScreen')}>
                    <Text style={styles.logoutButtonText}>
                        GO TO DETAILS
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
    title:{
        textAlign:'center'
    },
    logoutButton: {
        marginTop: 10,
        backgroundColor: '#24A0ED',
        height: 40,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'

    },
    logoutButtonText: {
        color: 'white',

    }
    

});
export default NotificationScreen
