import { useRef, useEffect } from 'react';
import { Button, StatusBar, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Jadoo() {
  const animation = useRef<LottieView>(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <StatusBar backgroundColor='#000000'/>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../../assets/animation2.json')}
      />
      <View style={styles.buttonContainer}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
