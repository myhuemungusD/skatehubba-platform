import type React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { SKATE } from "../theme";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
}

export const GrittyButton: React.FC<Props> = ({ children, onPress }) => (
  <Pressable onPress={onPress} style={styles.button}>
    <Text style={styles.text}>{children}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: SKATE.colors.blood,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: SKATE.radius.lg,
    borderWidth: 2,
    borderColor: SKATE.colors.neon,
  },
  text: { color: "white", fontWeight: "900", textAlign: "center" },
});
