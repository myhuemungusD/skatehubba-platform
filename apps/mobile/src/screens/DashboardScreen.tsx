
import React from 'react';
import { Dimensions, Platform } from 'react-native';
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
import { Map, Zap, User, Camera, Menu as MenuIcon, Backpack, Shirt } from '@tamagui/lucide-icons';
import { useAuthStore } from '../lib/auth';

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
                  {user?.displayName || 'Skater'}
                </Text>
                <Text color={COLORS.TEAL} fontSize={16} fontWeight="600">
                  Level 12 • Pro
                </Text>
              </YStack>
            </XStack>

            <XStack space="$3">
              <StatBox label="XP" value="2,450" />
              <StatBox label="Spots" value="42" />
              <StatBox label="Rank" value="#127" />
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
              title="QUICK SESSION"
              icon={Zap}
              onPress={() => {}}
            />
          </YStack>

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
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}
