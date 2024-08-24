import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, ImageBackground, Text,TouchableOpacity, Image, View } from 'react-native';
// import { supabase } from "./supabaseClient.js";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';
// const PlaceholderImage = require('@/assets/images/background-image.png');


export default function PhotoDisplay({placeholderImageSource, selectedImage} : any) {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const imageSource = selectedImage ? {uri:selectedImage }: placeholderImageSource;






  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <View style={styles.imageContainer}>
      <Image
            //source={require('@/assets/images/background-image.png')}
            source={imageSource}
            style={styles.image}
        />
        {/* <Image source={PlaceholderImage}  /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
      },
      imageContainer: {
        flex: 1,
        paddingTop: 58,
      },
      image: {
        width: 320,
        height: 440,
        borderRadius: 18,
      },
});