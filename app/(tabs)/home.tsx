import { Text, StyleSheet, View, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'

export default function Home() {
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);

  async function loadSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/got.mp3'),
        { isLooping: true }
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error loading sound', error);
    }
  }

  useEffect(() => {
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();    
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name='logo-tux' size={200}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})