import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const InspectionScreen = () => {
  const [images, setImages] = useState([]);
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();

  const takePhoto = async () => {
    if (!cameraPermission?.granted) {
      requestCameraPermission();
      return;
    }
    const photo = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    if (!photo.canceled) {
      setImages((prev) => [...prev, photo.uri]);
    }
  };

  const uploadPhotos = async () => {
    const formData = new FormData();
    images.forEach((uri, index) => {
      formData.append(`photo${index}`, {
        uri,
        name: `photo${index}.jpg`,
        type: 'image/jpeg',
      });
    });
    try {
      await axios.post('http://yourserver.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Photos uploaded successfully!');
    } catch (error) {
      alert('Failed to upload photos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vehicle Inspection</Text>
      <View style={styles.imageGrid}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
        <TouchableOpacity style={styles.addButton} onPress={takePhoto}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Button title="Finish" onPress={uploadPhotos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  imageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  image: { width: 100, height: 100, borderRadius: 10, borderWidth: 1, borderColor: '#ddd' },
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  addButtonText: { fontSize: 32, color: '#888' },
});

export default InspectionScreen;
