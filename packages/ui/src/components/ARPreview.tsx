import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
} from "@reactvision/react-viro";
import * as Haptics from "expo-haptics";
import type React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SKATE } from "../theme";
import { Button } from "./Button";

interface ARPreviewProps {
  trickId: string;
}

export const ARPreview: React.FC<ARPreviewProps> = ({ trickId }) => {
  // Mock useTrick hook for now if not fully implemented in utils
  // const { data: trick } = useTrick(trickId);
  const trick = { name: "Ollie", arModelUrl: "https://example.com/ollie.glb" }; // Mock data
  const [arActive, setArActive] = useState(false);

  const InitialScene = () => (
    // @ts-expect-error: Viro types mismatch with React 18
    <ViroARScene>
      {/* @ts-expect-error: Viro types mismatch with React 18 */}
      <ViroAmbientLight color="#ffffff" />
      {/* 3D Path Visualization */}
      {/* @ts-expect-error: Viro types mismatch with React 18 */}
      <Viro3DObject
        source={{ uri: trick?.arModelUrl }} // e.g., glb of the ollie path from assets
        position={[0, 0, -1]}
        scale={[0.1, 0.1, 0.1]}
        type="GLB"
        animation={{ name: "loop", run: true, loop: true }}
      />
    </ViroARScene>
  );

  const startAR = async () => {
    setArActive(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trick?.name} AR Preview</Text>
      {arActive ? (
        // @ts-expect-error: Viro types mismatch with React 18
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{ scene: InitialScene }}
          style={styles.arView}
        />
      ) : (
        <Button label="Launch AR" onPress={startAR} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SKATE.colors.ink },
  title: {
    color: SKATE.colors.neon,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 16,
  },
  arView: { flex: 1 },
});
