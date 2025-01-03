import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as AudioPermissions from 'expo-av';
import * as Notifications from 'expo-notifications';
import { saveVideoToDB, getAllVideos } from '../database/data';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const RecordScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [audioPermission, setAudioPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [videoUri, setVideoUri] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraPermission.status === 'granted');

      const { status } = await AudioPermissions.Audio.requestPermissionsAsync();
      setAudioPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
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

        setVideoUri(fileName);
        setHasRecorded(true);
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
      setHasRecorded(true);
    }
  };

  const handleReRecord = () => {
    setHasRecorded(false);
    setVideoUri(null);
  };

  const handleSave = () => {
    if (videoUri) {
      saveVideoToDB(videoUri, () => {
        getAllVideos((videos) => {
          console.log('Updated videos:', videos);
        });
      });

      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Video Saved',
          body: 'Your video has been successfully saved.',
        },
        trigger: null,
      });

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
      {!hasRecorded ? (
        <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back}>
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.button, isRecording && styles.buttonActive]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <FontAwesome name={isRecording ? 'square' : 'video-camera'} size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          <Video
            source={{ uri: videoUri }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.reRecordButton} onPress={handleReRecord}>
              <Text style={styles.buttonText}>Re-record</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  buttonGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonActive: {
    backgroundColor: '#ff4d4d',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  video: {
    width: '100%',
    height: '92%',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reRecordButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    width: 100,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#24a0ed',
    padding: 10,
    borderRadius: 5,
    width: 80,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default RecordScreen;
