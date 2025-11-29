import React, { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { YStack, XStack, Text, Button, Stack, Theme, ScrollView } from 'tamagui';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Zap, CheckCircle } from 'lucide-react-native';
import { useSession } from '../store/useStore';

const { width, height } = Dimensions.get('window');

const COLORS = {
  GOLD: '#FFD700',
  ORANGE: '#FF9100',
  ORANGE_DARK: '#E65100',
  BORDER: '#000000',
  TEAL: '#00BCD4',
  BG_GRADIENT_TOP: '#263238',
  BG_GRADIENT_BOT: '#102027',
};

const GameButton = ({ title, onPress, variant = 'primary', width: w = 'auto' }: any) => {
  const isPrimary = variant === 'primary';
  const bg = isPrimary ? COLORS.ORANGE : '#333';

  return (
    <Button
      unstyled
      onPress={() => {
        if (Platform.OS !== 'web') Haptics.selectionAsync();
        onPress();
      }}
      bg={bg}
      borderColor={COLORS.BORDER}
      borderWidth={3}
      borderBottomWidth={8}
      borderRadius={12}
      height={60}
      width={w}
      ai="center"
      jc="center"
      pressStyle={{ borderBottomWidth: 3, marginTop: 5 }}
      shadowColor="#000"
      shadowRadius={0}
      shadowOffset={{ width: 4, height: 4 }}
    >
      <Text color="#fff" fontWeight="900" fontSize={20} textTransform="uppercase" letterSpacing={1}>
        {title}
      </Text>
    </Button>
  );
};

const StatBox = ({ label, value }: { label: string; value: string | number }) => (
  <Stack
    bg="#1a1a1a"
    borderWidth={3}
    borderColor={COLORS.BORDER}
    borderRadius={8}
    p="$3"
    flex={1}
    shadowColor="#000"
    shadowOffset={{ width: 3, height: 3 }}
    shadowRadius={0}
  >
    <Text color={COLORS.TEAL} fontSize={12} fontWeight="700" textTransform="uppercase" mb="$1">
      {label}
    </Text>
    <Text color={COLORS.GOLD} fontSize={24} fontWeight="900">
      {value}
    </Text>
  </Stack>
);

export default function SessionScreen() {
  const navigation = useNavigation<any>();
  const { currentSession, currentQuest, loading, error, endSession } = useSession();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    if (!currentSession) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - currentSession.start_time;
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession]);

  const handleCompleteSession = async () => {
    if (!currentSession) return;
    try {
      await endSession(currentSession.id, 'COMPLETED');
      setShowComplete(true);
      setTimeout(() => navigation.goBack(), 2000);
    } catch (err) {
      console.error('Error completing session:', err);
    }
  };

  const handleFailSession = async () => {
    if (!currentSession) return;
    try {
      await endSession(currentSession.id, 'FAILED');
      navigation.goBack();
    } catch (err) {
      console.error('Error failing session:', err);
    }
  };

  if (!currentSession) {
    return (
      <Theme name="dark">
        <LinearGradient colors={[COLORS.BG_GRADIENT_TOP, COLORS.BG_GRADIENT_BOT]} style={{ flex: 1 }}>
          <YStack f={1} ai="center" jc="center" px="$4">
            <Text color={COLORS.GOLD} fontSize={24} fontWeight="900" mb="$4">
              NO ACTIVE SESSION
            </Text>
            <GameButton title="BACK" onPress={() => navigation.goBack()} width={200} />
          </YStack>
        </LinearGradient>
      </Theme>
    );
  }

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <Theme name="dark">
      <LinearGradient
        colors={[COLORS.BG_GRADIENT_TOP, COLORS.BG_GRADIENT_BOT]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="transparent">
          <YStack f={1} pt="$8" pb="$6" px="$4" jc="space-between">
            {/* Header */}
            <Stack>
              <Text color={COLORS.GOLD} fontSize={32} fontWeight="900" mb="$2" textTransform="uppercase">
                QUEST ACTIVE
              </Text>
              {currentQuest && (
                <Text color={COLORS.TEAL} fontSize={16} fontWeight="700">
                  {currentQuest.title}
                </Text>
              )}
            </Stack>

            {/* Timer & Stats */}
            <YStack space="$4">
              <Stack
                bg="#000"
                borderWidth={3}
                borderColor={COLORS.GOLD}
                borderRadius={12}
                p="$6"
                ai="center"
                jc="center"
              >
                <XStack ai="center" space="$3" mb="$2">
                  <Clock size={32} color={COLORS.GOLD} strokeWidth={2} />
                  <Text color={COLORS.GOLD} fontSize={48} fontWeight="900" fontFamily="monospace">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                  </Text>
                </XStack>
              </Stack>

              {/* Clips Uploaded */}
              <XStack space="$2" ai="center">
                <StatBox label="CLIPS" value={currentSession.clips.length} />
                <StatBox label="STATUS" value={currentSession.status} />
              </XStack>
            </YStack>

            {/* Actions */}
            {!showComplete && (
              <YStack space="$3" w="100%">
                <GameButton
                  title="✓ SUBMIT"
                  onPress={handleCompleteSession}
                  variant="primary"
                  width="100%"
                />
                <GameButton
                  title="✗ BAIL"
                  onPress={handleFailSession}
                  variant="secondary"
                  width="100%"
                />
              </YStack>
            )}

            {showComplete && (
              <Stack
                bg={COLORS.ORANGE}
                borderWidth={3}
                borderColor={COLORS.BORDER}
                borderRadius={12}
                p="$4"
                ai="center"
                jc="center"
              >
                <XStack ai="center" space="$2">
                  <CheckCircle size={32} color="#fff" strokeWidth={2} />
                  <Text color="#fff" fontSize={24} fontWeight="900" textTransform="uppercase">
                    SESSION COMPLETE
                  </Text>
                </XStack>
              </Stack>
            )}
          </YStack>
        </ScrollView>
      </LinearGradient>
    </Theme>
  );
}
