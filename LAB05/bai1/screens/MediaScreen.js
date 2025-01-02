import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Video } from 'expo-av'; // Để hiển thị video
import { getMediaData, getPlaces } from '../database/data'; // Import hàm lấy dữ liệu từ cơ sở dữ liệu

const MediaScreen = ({ navigation }) => {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    getMediaData((videoData, placeData) => {
      const combinedData = [
        ...videoData.map(item => ({ ...item, type: 'video' })),
        ...placeData.map(item => ({ ...item, type: 'image' }))
      ];
      const sortedData = combinedData.sort((a, b) => b.timestamp - a.timestamp);
      setMediaItems(sortedData);  // Cập nhật mediaItems sau khi có dữ liệu mới
    });
  }, []); 

  const renderItem = useCallback(({ item }) => {
    if (item.type === 'video') {
      return (
        <View style={styles.mediaContainer}>
          <Video
            source={{ uri: item.uri }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
          />
        </View>
      );
    }

    if (item.type === 'image') {
      return (
        <View style={styles.mediaContainer}>
          <Image
            source={{ uri: item.imageUri }}
            style={styles.image}
          />
        </View>
      );
    }
  }, []);  

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <FlatList
          data={mediaItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id ? item.id.toString() : index.toString()} // Dùng id làm key
          numColumns={2} 
          columnWrapperStyle={styles.columnWrapperStyle}
          extraData={mediaItems}  // Đảm bảo FlatList biết về sự thay đổi của dữ liệu
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between', 
  },
  mediaContainer: {
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default MediaScreen;
