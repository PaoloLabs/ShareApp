import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Alert, View } from 'react-native';
import React, { useState } from "react";
import { Button, Text, Card } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso Denegado", "Es necesario acceder a la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const shareImage = async () => {
    if (selectedImage) {
      await Sharing.shareAsync(selectedImage);
    } else {
      Alert.alert("No hay imagen", "Por favor, selecciona o toma una foto.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
          {selectedImage ? (
            <Card>
              <Image source={{ uri: selectedImage }} style={styles.image} />
            </Card>
          ) : (
            <Text style={styles.text}>Selecciona o toma una foto</Text>
          )}

          <Button
            mode="contained"
            style={styles.button}
            onPress={pickImageFromGallery}
          >
            Seleccionar desde la Galería
          </Button>

          <Button mode="contained" style={styles.button} onPress={takePhoto}>
            Tomar Foto
          </Button>

          {selectedImage && (
            <Button mode="outlined" style={styles.button} onPress={shareImage}>
              Compartir Imagen
            </Button>
          )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    width: "80%",
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
});