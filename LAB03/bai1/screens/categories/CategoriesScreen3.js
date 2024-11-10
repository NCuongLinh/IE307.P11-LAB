import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

const CategoriesScreen3 = () => {
    return (
        <View style={styles.body}>

            <View style={styles.container}>
                <Text style={styles.title}>Categories3 </Text>
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
    }
});
export default CategoriesScreen3
