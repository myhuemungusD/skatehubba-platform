import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ViroARSceneNavigator, ViroARScene, Viro3DObject, ViroAmbientLight } from '@viro-community/react-viro';
import { useTrick } from '@skatehubba/utils';
import { Button, SKATE } from '@skatehubba/ui';
import * as Haptics from 'expo-haptics';

interface ARPreviewProps { trickId: string; }

export const ARPreview: React.FC<ARPreviewProps> = ({ trickId }) => {
  // Mock useTrick hook for now if not fully implemented in utils
  // const { data: trick } = useTrick(trickId);
  const trick = { name: 'Ollie', arModelUrl: 'https://example.com/ollie.glb' }; // Mock data
  const [arActive, setArActive] = useState(false);

  const InitialScene = () => (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      {/* 3D Path Visualization */}
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
  title: { color: SKATE.colors.neon, fontSize: 20, textAlign: 'center', marginBottom: 16 },
  arView: { flex: 1 },
});
