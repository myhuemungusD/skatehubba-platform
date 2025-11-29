import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Platform, Alert } from 'react-native';
import { YStack, XStack, Text, Button, Stack, Theme, Progress } from 'tamagui';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranscode } from '../hooks/useVideoTranscoder';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

type TranscodeRouteParams = {
  Transcode: {
    path: string;
  };
};

type TranscodeRouteProp = RouteProp<TranscodeRouteParams, 'Transcode'>;

// ── RPG PALETTE ─────────────────────────────────────────────────────────────
const COLORS = {
  GOLD: '#FFD700',
  ORANGE: '#FF9100',
  ORANGE_DARK: '#E65100',
  BORDER: '#000000',
  TEAL: '#00BCD4',
  BG_GRADIENT_TOP: '#263238',
  BG_GRADIENT_BOT: '#102027',
  SUCCESS: '#00e676',
  ERROR: '#ff1744',
};

export default function TranscodeComponent() {
  const navigation = useNavigation<any>();
  const route = useRoute<TranscodeRouteProp>();
  const inputPath = route.params?.path || '';

  const {
    transcode,
    reset,
    isTranscoding,
    isSuccess,
    isError,
    error,
    progress,
    result,
    isTranscoderAvailable,
    transcoderVersion,
  } = useTranscode();

  const [hasStarted, setHasStarted] = useState(false);

  // Output path - save to app documents
  const outputPath = inputPath.replace(/\.(mov|mp4)$/i, '_heshur.mp4');

  useEffect(() => {
    if (!hasStarted && inputPath && isTranscoderAvailable) {
      handleTranscode();
      setHasStarted(true);
    }
  }, [hasStarted, inputPath, isTranscoderAvailable]);

  const handleTranscode = async () => {
    if (!inputPath) {
      Alert.alert('Error', 'No input file provided');
      return;
    }

    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    const transcodeResult = await transcode(inputPath, outputPath);

    if (transcodeResult) {
      if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleRetry = () => {
    reset();
    setHasStarted(false);
  };

  const handleDone = () => {
    // Navigate to upload/review screen or back to dashboard
    navigation.navigate('dashboard');
  };

  const getStatusColor = () => {
    if (isError) return COLORS.ERROR;
    if (isTranscoding) return COLORS.ORANGE;
    if (isSuccess) return COLORS.SUCCESS;
    return COLORS.TEAL;
  };

  return (
    <Theme name="dark">
      <YStack f={1} bg={COLORS.BG_GRADIENT_BOT}>
        {/* Header */}
        <XStack
          px="$4"
          py="$3"
          ai="center"
          jc="space-between"
          borderBottomWidth={2}
          borderBottomColor={COLORS.BORDER}
          bg={COLORS.BG_GRADIENT_TOP}
        >
          <Button
            circular
            size="$3"
            bg="transparent"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color={COLORS.GOLD} />
          </Button>
          <Text
            color={COLORS.GOLD}
            fontWeight="900"
            fontSize="$6"
            textTransform="uppercase"
            letterSpacing={-1}
          >
            HESHUR ENGINE
          </Text>
          <Stack width={40} />
        </XStack>

        {/* Main Content */}
        <YStack f={1} ai="center" jc="center" px="$4" space="$4">
          {/* Status Badge */}
          <Stack
            bg={getStatusColor()}
            px="$4"
            py="$2"
            borderRadius={8}
            borderWidth={2}
            borderColor={COLORS.BORDER}
          >
            <Text
              color="#000"
              fontWeight="900"
              fontSize="$3"
              textTransform="uppercase"
              letterSpacing={2}
            >
              {isTranscoding && 'PROCESSING'}
              {isSuccess && 'COMPLETE'}
              {isError && 'FAILED'}
              {!isTranscoding && !isSuccess && !isError && 'READY'}
            </Text>
          </Stack>

          {/* Progress Bar */}
          {isTranscoding && (
            <YStack width="100%" space="$2">
              <Progress value={progress * 100} max={100} size="$2">
                <Progress.Indicator
                  animation="bouncy"
                  backgroundColor={COLORS.ORANGE}
                />
              </Progress>
              <Text
                color={COLORS.GOLD}
                fontWeight="700"
                fontSize="$2"
                textAlign="center"
              >
                {Math.round(progress * 100)}%
              </Text>
            </YStack>
          )}

          {/* Success State */}
          {isSuccess && result && (
            <YStack space="$3" ai="center">
              <CheckCircle size={64} color={COLORS.SUCCESS} />
              <Text color="#fff" fontSize="$5" fontWeight="700">
                CLIP READY TO SHRED
              </Text>
              <YStack space="$2">
                <Text color="#aaa" fontSize="$3">
                  Size: {(result.filesizeBytes / 1024 / 1024).toFixed(2)} MB
                </Text>
                <Text color="#aaa" fontSize="$3">
                  Duration: {(result.durationMs / 1000).toFixed(1)}s
                </Text>
              </YStack>
            </YStack>
          )}

          {/* Error State */}
          {isError && (
            <YStack space="$3" ai="center">
              <XCircle size={64} color={COLORS.ERROR} />
              <Text color={COLORS.ERROR} fontSize="$5" fontWeight="700">
                TRANSCODE FAILED
              </Text>
              <Text color="#aaa" fontSize="$3" textAlign="center">
                {error || 'Unknown error occurred'}
              </Text>
            </YStack>
          )}

          {/* Metadata */}
          <YStack
            bg="rgba(0,0,0,0.3)"
            borderRadius={12}
            borderWidth={1}
            borderColor="#333"
            p="$3"
            space="$2"
            width="100%"
          >
            <XStack jc="space-between">
              <Text color="#666" fontSize="$2">
                Engine Version:
              </Text>
              <Text color="#aaa" fontSize="$2" fontFamily="monospace">
                v{transcoderVersion}
              </Text>
            </XStack>
            <XStack jc="space-between">
              <Text color="#666" fontSize="$2">
                Status:
              </Text>
              <Text color="#aaa" fontSize="$2" fontFamily="monospace">
                {isTranscoderAvailable ? 'ONLINE' : 'OFFLINE'}
              </Text>
            </XStack>
          </YStack>
        </YStack>

        {/* Bottom Actions */}
        <YStack p="$4" space="$3">
          {isSuccess && (
            <Button
              unstyled
              bg={COLORS.ORANGE}
              borderColor={COLORS.BORDER}
              borderWidth={3}
              borderBottomWidth={8}
              borderRadius={12}
              height={60}
              onPress={handleDone}
              pressStyle={{ borderBottomWidth: 3, marginTop: 5 }}
            >
              <Text
                color="#fff"
                fontWeight="900"
                fontSize="$5"
                textTransform="uppercase"
                letterSpacing={1}
              >
                DONE
              </Text>
            </Button>
          )}

          {isError && (
            <Button
              unstyled
              bg={COLORS.ORANGE}
              borderColor={COLORS.BORDER}
              borderWidth={3}
              borderBottomWidth={8}
              borderRadius={12}
              height={60}
              onPress={handleRetry}
              pressStyle={{ borderBottomWidth: 3, marginTop: 5 }}
            >
              <Text
                color="#fff"
                fontWeight="900"
                fontSize="$5"
                textTransform="uppercase"
                letterSpacing={1}
              >
                RETRY
              </Text>
            </Button>
          )}
        </YStack>
      </YStack>
    </Theme>
  );
}