import { useEffect } from "react";
import { useBatteryLevel, useBatteryState } from "expo-battery";
import { StyleSheet, View, Text, StatusBar,} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

export default function Battery() {
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();
  const fillLevel = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const flashPosition = useSharedValue(0);
  const flashScale = useSharedValue(1);

  useEffect(() => {
    fillLevel.value = 0;
    textOpacity.value = 0;

    fillLevel.value = withTiming(
      batteryLevel,
      {
        duration: 1500,
      },
      (finished) => {
        if (finished) {
          textOpacity.value = withTiming(1, {
            duration: 500,
          });
        }
      }
    );
  }, [batteryLevel]);

  // Charging animation effect
  useEffect(() => {
    if (batteryState === 2) {
      // Charging
      flashPosition.value = withRepeat(
        withSequence(
          withTiming(100, { duration: 1000 }),
          withTiming(0, { duration: 0 })
        ),
        -1
      );

      flashScale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 500 }),
          withTiming(0.8, { duration: 500 })
        ),
        -1,
        true
      );
    } else {
      flashPosition.value = withTiming(0);
      flashScale.value = withTiming(0);
    }
  }, [batteryState]);

  const animatedStyles = useAnimatedStyle(() => ({
    height: `${fillLevel.value * 100}%`,
    backgroundColor: interpolateColor(
      fillLevel.value,
      [0, 0.2, 0.5, 1],
      ["#ff0000", "#ff6b00", "#ffcc00", "#4caf50"]
    ),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.batteryOutline}>
        <View style={styles.batteryTop} />
        <Animated.View style={[styles.batteryFill, animatedStyles]}>
          {batteryState === 2 ? (
            <Animated.View style={[styles.flashContainer]}>
              <Ionicons name="flash" size={30} color="#000000" />
            </Animated.View>
          ) : (
            <Animated.Text style={[styles.percentage]}>
              {(batteryLevel * 100).toFixed()}
              <Text style={{fontSize:18}}>%</Text>
            </Animated.Text>
          )}
        </Animated.View>
      </View>
      <StatusBar backgroundColor='#000000'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  batteryOutline: {
    width: 160,
    height: 280,
    borderWidth: 6,
    borderColor: "#ffffff",
    borderRadius: 20,
    position: "relative",
  },
  batteryTop: {
    width: 40,
    height: 20,
    backgroundColor: "#ffffff",
    position: "absolute",
    top: -20,
    left: "50%",
    marginLeft: -20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  batteryFill: {
    position: "absolute",
    bottom: 4,
    left: 4,
    right: 4,
    borderRadius: 14,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flashContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  percentage: {
    fontSize: 30,
    fontWeight: "900",
    color: "#000000",
  },
});
