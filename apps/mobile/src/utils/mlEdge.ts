import { loadTensorflowModel, useTensorflowModel } from 'react-native-fast-tflite';
import { useFrameProcessor } from 'react-native-vision-camera';
import { useState, useEffect } from 'react';

// Singleton model loader to avoid reloading on every render
let loadedModel: any = null;

export const useTrickDetector = () => {
  const [model, setModel] = useState<any>(null);
  const [detectedTrick, setDetectedTrick] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!loadedModel) {
        // In a real app, this would be a local asset path like require('../../assets/models/skate_tricks.tflite')
        // For now, we'll use a placeholder or assume it's bundled
        try {
            // loadedModel = await loadTensorflowModel(require('../../assets/skate_tricks.tflite'));
            console.log("Model loading simulation - waiting for actual .tflite asset");
        } catch (e) {
            console.warn("Failed to load TFLite model:", e);
        }
      }
      setModel(loadedModel);
    };
    load();
  }, []);

  // Vision Camera Frame Processor
  // Note: This requires 'worklet' directive in reanimated/vision-camera context
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    if (!model) return;

    // Run inference
    // const output = model.runSync([frame]);
    // const probabilities = output[0];
    
    // Simple threshold logic (mocked for now)
    // if (probabilities[0] > 0.85) {
    //   runOnJS(setDetectedTrick)('Kickflip');
    // }
  }, [model]);

  return { detectedTrick, frameProcessor, isModelReady: !!model };
};
