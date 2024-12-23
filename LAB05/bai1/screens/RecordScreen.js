import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import * as FileSystem from 'expo-file-system';
import * as AudioPermissions from 'expo-av'; // Cập nhật từ expo-permissions sang expo-av
import { saveVideoToDB, getAllVideos } from '../database/data'; // Đảm bảo import đúng
import FontAwesome from '@expo/vector-icons/FontAwesome';

const RecordScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [audioPermission, setAudioPermission] = useState(null); // Quyền ghi âm
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraPermission.status === 'granted');

      // Yêu cầu quyền ghi âm từ expo-av
      const { status } = await AudioPermissions.Audio.requestPermissionsAsync(); // Cập nhật đây
      setAudioPermission(status === 'granted');
    })();

  }, []);

  const startRecording = async () => {
    if (cameraRef.current && audioPermission) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        const fileName = `${FileSystem.documentDirectory}video_${Date.now()}.mp4`;
        await FileSystem.moveAsync({
          from: video.uri,
          to: fileName,
        });
  
        // Lưu video vào cơ sở dữ liệu
saveVideoToDB(fileName, () => {
  getMediaData((videoData, placeData) => {
    const combinedData = [
      ...videoData.map(item => ({ ...item, type: 'video' })),
      ...placeData.map(item => ({ ...item, type: 'image' }))
    ];
    const sortedData = combinedData.sort((a, b) => b.timestamp - a.timestamp);
    setMediaItems(sortedData);
  });
});
  
        Alert.alert('Video saved!', `Video saved to ${fileName}`);
      } catch (error) {
        console.error('Error recording video:', error);
        Alert.alert('Error', 'Failed to record video');
      } finally {
        setIsRecording(false);
      }
    } else {
      Alert.alert('Permission denied', 'Please enable camera and microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  if (hasPermission === null || audioPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (audioPermission === false) {
    return <Text>No access to microphone</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back}>
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, isRecording && styles.buttonActive]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Text style={styles.buttonText}>
              {isRecording ?
                <FontAwesome name="square" size={24} color="white" />
                :
                <FontAwesome name="video-camera" size={24} color="white" />}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  controls: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#ff4d4d',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RecordScreen;
