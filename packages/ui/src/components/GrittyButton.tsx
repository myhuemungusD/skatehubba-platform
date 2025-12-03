import type React from "react";
import { Pressable, Text, type StyleProp, type ViewStyle } from "react-native";
import { SKATE } from "../theme";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'ghost';
  size?: string;
}

export const GrittyButton: React.FC<Props> = ({ children, onPress, style, variant = 'default' }) => {
  const baseStyle = variant === 'ghost' ? styles.ghost : styles.button;
  return (
    <Pressable onPress={onPress} style={[baseStyle, style]}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = {
  button: {
    backgroundColor: SKATE.colors.blood,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: SKATE.radius.lg,
    borderWidth: 2,
    borderColor: SKATE.colors.neon,
  },
  ghost: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: SKATE.radius.lg,
    borderWidth: 2,
    borderColor: SKATE.colors.neon,
  },
  text: {
    color: "white",
    fontWeight: "900" as const,
    textAlign: "center" as const,
  },
};
