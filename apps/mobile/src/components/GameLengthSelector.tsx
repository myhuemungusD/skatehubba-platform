/**
 * GameLengthSelector Component
 *
 * UI component for selecting the game length (SKATE or SK8)
 * before starting a recording session.
 */

import type React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { GameLength } from "../types/v2-core-loop";

interface GameLengthSelectorProps {
  /** Currently selected game length */
  selectedLength: GameLength;
  /** Callback when a game length is selected */
  onSelect: (length: GameLength) => void;
  /** Whether the selector is disabled */
  disabled?: boolean;
}

export const GameLengthSelector: React.FC<GameLengthSelectorProps> = ({
  selectedLength,
  onSelect,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Game Length</Text>
      <Text style={styles.subtitle}>Select your format before recording</Text>

      <View style={styles.optionsContainer}>
        {/* SKATE Option */}
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedLength === "SKATE" && styles.optionButtonSelected,
            disabled && styles.optionButtonDisabled,
          ]}
          onPress={() => !disabled && onSelect("SKATE")}
          disabled={disabled}
        >
          <Text
            style={[
              styles.optionTitle,
              selectedLength === "SKATE" && styles.optionTitleSelected,
            ]}
          >
            SKATE
          </Text>
          <Text
            style={[
              styles.optionDescription,
              selectedLength === "SKATE" && styles.optionDescriptionSelected,
            ]}
          >
            5 letters - Classic format
          </Text>
        </TouchableOpacity>

        {/* SK8 Option */}
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedLength === "SK8" && styles.optionButtonSelected,
            disabled && styles.optionButtonDisabled,
          ]}
          onPress={() => !disabled && onSelect("SK8")}
          disabled={disabled}
        >
          <Text
            style={[
              styles.optionTitle,
              selectedLength === "SK8" && styles.optionTitleSelected,
            ]}
          >
            SK8
          </Text>
          <Text
            style={[
              styles.optionDescription,
              selectedLength === "SK8" && styles.optionDescriptionSelected,
            ]}
          >
            3 letters - Quick game
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          ⚠️ Once selected, you cannot change the game length for this challenge.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  optionButtonSelected: {
    backgroundColor: "#007aff",
    borderColor: "#0056b3",
  },
  optionButtonDisabled: {
    opacity: 0.5,
  },
  optionTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000",
    marginBottom: 4,
  },
  optionTitleSelected: {
    color: "#fff",
  },
  optionDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  optionDescriptionSelected: {
    color: "#fff",
  },
  infoBox: {
    backgroundColor: "#fff3cd",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ffc107",
  },
  infoText: {
    fontSize: 12,
    color: "#856404",
    textAlign: "center",
  },
});
