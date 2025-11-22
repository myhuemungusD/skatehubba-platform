import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { VideoRecorder } from '../../components/skate/VideoRecorder';
import { SKATE } from '../../theme';
import { getClient } from '../../lib/client';
import { uploadSkateClip } from '../../lib/storage';

export default function NewSkateChallenge() {
  const router = useRouter();
  const [opponentHandle, setOpponentHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRecordingComplete = async (uri: string) => {
    try {
      setIsSubmitting(true);
      // In a real app, get user ID from auth context
      const userId = 'mock-user-id'; 
      
      const url = await uploadSkateClip(uri, userId);
      const client = await getClient();
      
      const game = await client.skate.create({
        trickVideoUrl: url,
        opponentHandle: opponentHandle || undefined
      });

      router.replace(`/skate/${game.id}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create challenge');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        SET THE FIRST TRICK
      </Text>
      <Text style={styles.subtitle}>
        One take. 15 seconds. No edits. Just like curbside.
      </Text>

      <VideoRecorder
        maxDurationSec={15}
        onRecordingComplete={handleRecordingComplete}
        label={isSubmitting ? "Creating Game..." : "Record Trick"}
      />

      <TextInput
        placeholder="Tag opponent @handle"
        placeholderTextColor="#666"
        value={opponentHandle}
        onChangeText={setOpponentHandle}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // SKATE.colors.ink fallback
    padding: 20,
  },
  title: {
    color: '#0f0', // SKATE.colors.neon fallback
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 60,
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: 16,
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#222', // SKATE.colors.grime fallback
    color: '#0f0',
    margin: 32,
    padding: 16,
    borderRadius: 12,
  }
});
