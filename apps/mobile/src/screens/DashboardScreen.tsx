
import React from 'react';
import { Dimensions, Platform, Alert } from 'react-native';
import { 
  YStack, 
  XStack, 
  Text, 
  Button, 
  Stack,
  ScrollView
} from 'tamagui';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Map, Zap, User, Camera, Menu as MenuIcon, Backpack, Shirt, Clock, Play, X, RefreshCw } from '@tamagui/lucide-icons';
import { useAuthStore } from '../../lib/auth';
import { getClient } from '../../lib/client';
import { useSession } from '../store/useStore';
import { RetryExhaustedError } from '../store/slices/sessionSlice';

const { width, height } = Dimensions.get('window');

const COLORS = {
  GOLD: '#FFD700',
  ORANGE: '#FF9100',
  ORANGE_DARK: '#E65100',
  BORDER: '#000000',
  TEAL: '#00BCD4',
  BG_GRADIENT_TOP: '#263238',
  BG_GRADIENT_BOT: '#102027',
  BUTTON_TEXT: '#FFFFFF',
};

const GameButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  width: buttonWidth = 'auto', 
  height: buttonHeight = 60,
  icon: Icon 
}: any) => {
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
      height={buttonHeight}
      width={buttonWidth}
      ai="center"
      jc="center"
      pressStyle={{ borderBottomWidth: 3, marginTop: 5 }}
      shadowColor="#000"
      shadowRadius={0}
      shadowOffset={{ width: 4, height: 4 }}
    >
      <XStack space="$2" ai="center">
        {Icon && <Icon size={24} color="#fff" strokeWidth={3} />}
        <Text 
          color="#fff" 
          fontFamily={Platform.OS === 'ios' ? 'Arial-BoldMT' : 'sans-serif-condensed'} 
          fontWeight="900" 
          fontSize={24} 
          textTransform="uppercase"
          letterSpacing={1}
          textShadowColor="#000"
          textShadowRadius={0}
          textShadowOffset={{ width: 2, height: 2 }}
        >
          {title}
        </Text>
      </XStack>
    </Button>
  );
};

const GameBanner = ({ title }: { title: string }) => (
  <Stack
    bg={COLORS.BORDER}
    px="$4"
    py="$2"
    borderRadius={8}
    borderWidth={2}
    borderColor={COLORS.GOLD}
    shadowColor="#000"
    shadowOffset={{ width: 4, height: 4 }}
    shadowRadius={0}
    transform={[{ rotate: '-2deg' }]}
  >
    <Text
      color={COLORS.GOLD}
      fontFamily={Platform.OS === 'ios' ? 'Arial-BoldMT' : 'sans-serif-condensed'}
      fontWeight="900"
      fontSize={32}
      textTransform="uppercase"
      letterSpacing={-1}
      textShadowColor="#000"
      textShadowRadius={0}
      textShadowOffset={{ width: 2, height: 2 }}
    >
      {title}
    </Text>
  </Stack>
);

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
    <Text
      color={COLORS.TEAL}
      fontSize={14}
      fontWeight="700"
      textTransform="uppercase"
      mb="$1"
    >
      {label}
    </Text>
    <Text
      color={COLORS.GOLD}
      fontSize={24}
      fontWeight="900"
      fontFamily={Platform.OS === 'ios' ? 'Arial-BoldMT' : 'sans-serif-condensed'}
    >
      {value}
    </Text>
  </Stack>
);

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { user } = useAuthStore();
  const { currentSession, currentQuest, startSession } = useSession();
  const [profile, setProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [quickSessionLoading, setQuickSessionLoading] = React.useState(false);
  const [sessionError, setSessionError] = React.useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = React.useState(0);

  React.useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      try {
        const client = await getClient();
        const { user: profileData } = await client.profile.get();
        setProfile(profileData);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProfile();
  }, [user]);

  React.useEffect(() => {
    if (!currentSession) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - currentSession.start_time;
      
      // Defensive check: if timer shows absurd values, log warning
      // Timer should be between 0 and 24 hours (86400 seconds)
      if (elapsed < 0 || elapsed > 86400) {
        console.warn('[DashboardScreen] Timer shows absurd value:', {
          elapsed,
          now,
          start_time: currentSession.start_time,
          now_ms: Date.now(),
        });
        setElapsedTime(0);
        return;
      }
      
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession]);

  const handleQuickSession = async () => {
    if (quickSessionLoading) return;
    
    setQuickSessionLoading(true);
    setSessionError(null);
    
    try {
      const client = await getClient();
      const { quests } = await client.quests.list();
      
      if (!quests || quests.length === 0) {
        throw new Error('No quests available');
      }
      
      // Quest Selection Strategy:
      // Currently using random selection for quick session start.
      // Future improvements: prefer nearby quests based on user location,
      // or recently completed quests for progression continuity.
      const selectedQuest = quests[Math.floor(Math.random() * quests.length)];
      
      // Wait for full session creation + refresh + verification
      // This ensures backend sync is confirmed before navigation
      console.log('[DashboardScreen] Starting session with verification...');
      await startSession(selectedQuest.id);
      console.log('[DashboardScreen] Session verified, navigating to session screen');
      
      navigation.navigate('session' as never);
    } catch (error: any) {
      console.error('Failed to start quick session:', error);
      
      // Handle retry exhaustion specifically
      let errorMessage: string;
      if (error instanceof RetryExhaustedError) {
        errorMessage = 'Connection failed after multiple retries. Please check your internet and try again.';
        console.warn('[DashboardScreen] Retry exhausted, user can retry');
      } else {
        errorMessage = error.message || 'Failed to start session';
      }
      
      setSessionError(errorMessage);
      
      // Also show platform-native alert for immediate feedback
      if (Platform.OS === 'web') {
        alert(errorMessage);
      } else {
        Alert.alert('Session Error', errorMessage);
      }
    } finally {
      // Always reset loading state to allow retry
      setQuickSessionLoading(false);
    }
  };

  const handleDismissError = () => {
    setSessionError(null);
  };

  const handleRetrySession = () => {
    setSessionError(null);
    handleQuickSession();
  };

  const handleResumeSession = () => {
    if (!currentSession) return;
    navigation.navigate('session' as never);
  };

  if (loading) {
    return (
      <LinearGradient colors={[COLORS.BG_GRADIENT_TOP, COLORS.BG_GRADIENT_BOT]} style={{ flex: 1 }}>
        <YStack f={1} ai="center" jc="center">
          <Text color={COLORS.GOLD}>Loading...</Text>
        </YStack>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.BG_GRADIENT_TOP, COLORS.BG_GRADIENT_BOT]}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <YStack f={1} p="$4" space="$4">
          <XStack jc="space-between" ai="center" pt="$8">
            <GameBanner title="SKATEHUBBA" />
            <Button
              unstyled
              bg="#333"
              borderWidth={3}
              borderColor={COLORS.BORDER}
              borderRadius={50}
              width={50}
              height={50}
              ai="center"
              jc="center"
              onPress={() => {
                if (Platform.OS !== 'web') Haptics.selectionAsync();
              }}
            >
              <MenuIcon size={24} color="#fff" strokeWidth={3} />
            </Button>
          </XStack>

          <YStack
            bg="#1a1a1a"
            borderWidth={4}
            borderColor={COLORS.BORDER}
            borderRadius={16}
            p="$4"
            space="$3"
            shadowColor="#000"
            shadowOffset={{ width: 6, height: 6 }}
            shadowRadius={0}
          >
            <XStack space="$3" ai="center">
              <Stack
                bg={COLORS.ORANGE}
                borderWidth={3}
                borderColor={COLORS.BORDER}
                borderRadius={50}
                width={70}
                height={70}
                ai="center"
                jc="center"
              >
                <User size={40} color="#fff" strokeWidth={3} />
              </Stack>
              <YStack flex={1}>
                <Text
                  color={COLORS.GOLD}
                  fontSize={28}
                  fontWeight="900"
                  fontFamily={Platform.OS === 'ios' ? 'Arial-BoldMT' : 'sans-serif-condensed'}
                  textTransform="uppercase"
                >
                  {profile?.displayName || user?.displayName || 'Skater'}
                </Text>
                <Text color={COLORS.TEAL} fontSize={16} fontWeight="600">
                  {profile?.stance || 'Regular'} • {profile?.handle || 'New Skater'}
                </Text>
              </YStack>
            </XStack>

            <XStack space="$3">
              <StatBox label="Wins" value={profile?.stats?.wins || 0} />
              <StatBox label="Losses" value={profile?.stats?.losses || 0} />
              <StatBox label="Board" value={profile?.board?.deck || 'None'} />
            </XStack>
          </YStack>

          <YStack space="$3">
            <GameButton
              title="EXPLORE MAP"
              icon={Map}
              onPress={() => navigation.navigate('map' as never)}
            />
            <GameButton
              title="SPOT CHECK"
              icon={Camera}
              variant="secondary"
              onPress={() => {}}
            />
            <XStack space="$3">
              <GameButton
                title="GEAR"
                icon={Backpack}
                variant="secondary"
                width="48%"
                height={80}
                onPress={() => {}}
              />
              <GameButton
                title="STYLE"
                icon={Shirt}
                variant="secondary"
                width="48%"
                height={80}
                onPress={() => {}}
              />
            </XStack>
            <GameButton
              title={quickSessionLoading ? "LOADING..." : "QUICK SESSION"}
              icon={Zap}
              onPress={handleQuickSession}
            />
          </YStack>

          {sessionError && (
            <Stack
              bg="#D32F2F"
              borderWidth={3}
              borderColor="#B71C1C"
              borderRadius={12}
              p="$4"
              mt="$2"
              shadowColor="#000"
              shadowOffset={{ width: 4, height: 4 }}
              shadowRadius={0}
            >
              <XStack jc="space-between" ai="flex-start" mb="$3">
                <YStack flex={1} mr="$2">
                  <Text
                    color="#fff"
                    fontSize={16}
                    fontWeight="900"
                    textTransform="uppercase"
                    mb="$1"
                  >
                    ⚠️ SESSION ERROR
                  </Text>
                  <Text color="#FFEBEE" fontSize={14} fontWeight="600">
                    {sessionError}
                  </Text>
                </YStack>
                <Button
                  unstyled
                  bg="transparent"
                  onPress={handleDismissError}
                  p="$1"
                >
                  <X size={20} color="#fff" strokeWidth={3} />
                </Button>
              </XStack>
              
              <XStack space="$2">
                <Button
                  unstyled
                  onPress={handleRetrySession}
                  bg="#B71C1C"
                  borderColor="#000"
                  borderWidth={2}
                  borderRadius={8}
                  height={40}
                  flex={1}
                  ai="center"
                  jc="center"
                  pressStyle={{ opacity: 0.8 }}
                >
                  <XStack space="$2" ai="center">
                    <RefreshCw size={16} color="#fff" strokeWidth={3} />
                    <Text 
                      color="#fff" 
                      fontWeight="700" 
                      fontSize={14}
                      textTransform="uppercase"
                    >
                      Retry
                    </Text>
                  </XStack>
                </Button>
                <Button
                  unstyled
                  onPress={handleDismissError}
                  bg="#555"
                  borderColor="#000"
                  borderWidth={2}
                  borderRadius={8}
                  height={40}
                  flex={1}
                  ai="center"
                  jc="center"
                  pressStyle={{ opacity: 0.8 }}
                >
                  <Text 
                    color="#fff" 
                    fontWeight="700" 
                    fontSize={14}
                    textTransform="uppercase"
                  >
                    Dismiss
                  </Text>
                </Button>
              </XStack>
            </Stack>
          )}

          {currentSession ? (
            <Stack
              bg="#1a1a1a"
              borderWidth={3}
              borderColor={COLORS.ORANGE}
              borderRadius={12}
              p="$4"
              mt="$2"
            >
              <XStack jc="space-between" ai="center" mb="$3">
                <Text
                  color={COLORS.GOLD}
                  fontSize={18}
                  fontWeight="900"
                  textTransform="uppercase"
                >
                  ACTIVE QUEST
                </Text>
                <XStack ai="center" space="$2">
                  <Clock size={16} color={COLORS.TEAL} />
                  <Text color={COLORS.TEAL} fontSize={16} fontWeight="700" fontFamily="monospace">
                    {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                  </Text>
                </XStack>
              </XStack>
              
              <Text color="#fff" fontSize={14} mb="$2">
                {currentQuest?.title || 'Quest in progress'}
              </Text>
              
              <XStack space="$2" mb="$3">
                <Stack
                  bg="#333"
                  borderRadius={8}
                  px="$2"
                  py="$1"
                >
                  <Text color={COLORS.TEAL} fontSize={12} fontWeight="700">
                    STATUS: {currentSession.status}
                  </Text>
                </Stack>
                <Stack
                  bg="#333"
                  borderRadius={8}
                  px="$2"
                  py="$1"
                >
                  <Text color={COLORS.GOLD} fontSize={12} fontWeight="700">
                    CLIPS: {currentSession.clips.length}
                  </Text>
                </Stack>
              </XStack>
              
              <GameButton
                title="RESUME SESSION"
                icon={Play}
                onPress={handleResumeSession}
                height={50}
              />
            </Stack>
          ) : (
            <Stack
              bg="#1a1a1a"
              borderWidth={3}
              borderColor={COLORS.BORDER}
              borderRadius={12}
              p="$4"
              mt="$2"
            >
              <Text
                color={COLORS.GOLD}
                fontSize={18}
                fontWeight="900"
                textTransform="uppercase"
                mb="$2"
              >
                Daily Quest
              </Text>
              <Text color="#fff" fontSize={14} mb="$2">
                Land 3 kickflips at any spot
              </Text>
              <Stack
                bg="#333"
                borderRadius={8}
                height={12}
                overflow="hidden"
              >
                <Stack bg={COLORS.TEAL} width="60%" height="100%" />
              </Stack>
              <Text color={COLORS.TEAL} fontSize={12} mt="$1">
                1/3 Complete
              </Text>
            </Stack>
          )}
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}
