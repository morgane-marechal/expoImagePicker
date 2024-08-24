import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
// import { supabase } from "./supabaseClient.js";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export default function StartCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const cameraRef = useRef<CameraView>(null);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function closeCamera() {
    setIsCameraVisible(false); // Masquer la caméra
  }


  async function savePicture(photoUri: string) {
    const directory = FileSystem.documentDirectory + 'photos/';
    console.log("directory", directory)
    const fileName = `photo_${Date.now()}.jpg`;

    try {
      // Vérifie si le dossier existe, sinon il le crée
      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }
      console.log(dirInfo);

      // Déplace la photo vers le dossier
      const savedUri = await FileSystem.moveAsync({
        from: photoUri,
        to: directory + fileName,
      });

      console.log('Photo saved to:', savedUri);
      return savedUri;
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  }


  async function takePicture() {
    if (cameraRef.current) { // Vérifie que la référence de la caméra est définie
      const photo = await cameraRef.current.takePictureAsync(); // Prend une photo
      console.log(photo); // Affiche l'image capturée dans la console
      setPreviewVisible(true)
      setCapturedImage(photo)
      console.log(FileSystem.documentDirectory);
      await savePicture(photo.uri);    }
  }






  // function closeCamera(){
  //   pausePreview() 
  // }

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <ImageBackground
          source={{ uri: capturedImage.uri }}
          style={styles.camera} // Utilisez le style de la caméra pour couvrir tout l'écran
        >
          <TouchableOpacity
            style={styles.buttonPicture}
            onPress={() => setPreviewVisible(false)}
          >
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <TouchableOpacity style={styles.buttonPicture} onPress={takePicture}>
            <Text style={styles.buttonText}>📸</Text>
          </TouchableOpacity>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});