import type React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type GameLength = "SKATE" | "SK8";

interface GameModeSelectorProps {
  selectedMode: GameLength | null;
  onSelectMode: (mode: GameLength) => void;
  locked: boolean; // Prevents changing mode while recording/uploading
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  selectedMode,
  onSelectMode,
  locked,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>CHOOSE YOUR FIGHT</Text>
      <View style={styles.row}>
        {/* SK8 Option */}
        <TouchableOpacity
          style={[
            styles.option,
            selectedMode === "SK8" && styles.optionSelected,
            locked && styles.optionLocked,
          ]}
          onPress={() => !locked && onSelectMode("SK8")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.optionText,
              selectedMode === "SK8" && styles.textSelected,
            ]}
          >
            SK8
          </Text>
          <Text style={styles.subText}>(3 Letters)</Text>
        </TouchableOpacity>

        {/* SKATE Option */}
        <TouchableOpacity
          style={[
            styles.option,
            selectedMode === "SKATE" && styles.optionSelected,
            locked && styles.optionLocked,
          ]}
          onPress={() => !locked && onSelectMode("SKATE")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.optionText,
              selectedMode === "SKATE" && styles.textSelected,
            ]}
          >
            SKATE
          </Text>
          <Text style={styles.subText}>(5 Letters)</Text>
        </TouchableOpacity>
      </View>

      {/* The Take Rule - Prominently Displayed as requested */}
      <View style={styles.ruleContainer}>
        <Text style={styles.ruleLabel}>⚠️ THE TAKE RULE</Text>
        <Text style={styles.ruleText}>
          "Clip must clearly start with the skater positioning for the trick and
          end with a clean roll-away and full stop."
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, width: "100%" },
  label: {
    fontSize: 14,
    fontWeight: "900",
    color: "#666",
    marginBottom: 10,
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  option: {
    flex: 0.48,
    backgroundColor: "#f0f0f0",
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionSelected: {
    borderColor: "#000",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  optionLocked: { opacity: 0.5 },
  optionText: { fontSize: 24, fontWeight: "900", color: "#999" },
  textSelected: { color: "#000" },
  subText: { fontSize: 12, color: "#666", marginTop: 4 },

  ruleContainer: {
    backgroundColor: "#fffbe6",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ffe58f",
  },
  ruleLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#d48806",
    marginBottom: 4,
  },
  ruleText: {
    fontSize: 13,
    color: "#333",
    fontStyle: "italic",
    lineHeight: 18,
  },
});
