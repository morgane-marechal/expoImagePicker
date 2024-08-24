import { Image, Button, StyleSheet,SafeAreaView, Platform, Dimensions, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import StartCamera from '@/components/startCamera';
import PhotoDisplay from'@/components/PhotoDisplay';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import ButtonPerso from '@/components/ButtonPerso';
import * as ImagePicker from 'expo-image-picker';



const { height } = Dimensions.get('window');
const PlaceholderImage = require('@/assets/images/background-image.png');

export default function HomeScreen() {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photoVisible, setPhotoVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.');
    }
  };

  function openMedia() {
    setPhotoVisible(!photoVisible); //masquer element photo
  }

  function toggleCamera() {
    setIsCameraVisible(!isCameraVisible); // Masquer la caméra
  }

  return (
      <View
        // headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      //   headerImage={
      //     <Image
      //       source={require('@/assets/images/partial-react-logo.png')}
      //       style={styles.reactLogo}
      //     />
      // }
      > 
      {/* <ThemedView style={styles.titleContainer}> */}
        {/* <ThemedText type="title">Welcome Morgane!</ThemedText>
        <HelloWave /> */}
      {/* </ThemedView > */}

      <ThemedView style={styles.titleContainer}>
        <Button onPress={openMedia} title="photos" />
      </ThemedView >
      <ThemedView style={styles.photoDisplay}>
        <PhotoDisplay placeholderImageSource ={PlaceholderImage} selectedImage={selectedImage}/>
        <View style={styles.footerContainer}>
          <ButtonPerso theme='primary' label="Choisis une photo" onPress={pickImageAsync}/>
          <ButtonPerso theme='' label= "Utilise cette photo" onPress={alert}/>
        </View>
      </ThemedView>

      {/* <ThemedView style={styles.titleContainer}>
        <Button onPress={toggleCamera} title="start camera" />
      </ThemedView > */}

      {/* <ThemedView style={styles.camera}>
        {isCameraVisible ? <StartCamera />:<ThemedText>Camera stopped</ThemedText>}
      </ThemedView> */}




      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
    {/* </ParallaxScrollView> */}

      </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  stepBigContainer: {
    gap: 16,
    marginBottom: 4,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  camera: {
    height: height * 0.75, // 75% de la hauteur de l'écran
  },
  photoDisplay: {
    height: height * 0.75,
    zIndex: 1,
  },
  footerContainer:{
    flex:1/3,
    alignItems:'center',
    color:'black',
    
  }
});
