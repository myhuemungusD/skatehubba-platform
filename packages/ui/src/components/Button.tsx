import type React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SKATE } from "../theme";

interface ButtonProps {
  label: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onPress }) => {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(scale.value, { duration: SKATE.timing.fast }) },
    ],
  }));

  return (
    <TouchableOpacity
      onPressIn={() => (scale.value = 0.95)}
      onPressOut={() => (scale.value = 1)}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.button, animStyle]}>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: SKATE.colors.neon,
    padding: 12,
    borderRadius: SKATE.radius.lg,
    alignItems: "center",
  },
  label: { color: SKATE.colors.ink, fontWeight: "bold" },
});
