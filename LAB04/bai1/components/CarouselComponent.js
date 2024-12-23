import React from 'react'
import { Dimensions, Text, View, StyleSheet, Image } from 'react-native';
import { withDecay } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const width = Dimensions.get('window').width;

function CarouselComponent() {

    const images = [
        require('../assets/image/carousel1.jpg'),
        require('../assets/image/carousel2.jpg'),
        require('../assets/image/carousel3.jpg'),
    ];

    return (
        <View style={styles.carousel}>
            <Carousel
                loop
                width={width - 40}
                height={width/2}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (

                        <Image
                            source={item} 
                            style={styles.image}
                        />
                )}
            />
            </View>
    );
}

const styles = StyleSheet.create({
    carousel:{
        flexDirection: 'row',
        alignSelf:'center'
    },
    image:{
        width: width - 40,
        height: width/2,
    }
});

export default CarouselComponent;