import React, { useEffect } from 'react';
import { Dimensions, Platform, Image as RNImage } from 'react-native';
import { 
  YStack, 
  XStack, 
  Text, 
  Button, 
  Image, 
  Theme,
  Stack,
} from 'tamagui';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Map, Backpack, User, Camera } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// ── RPG PALETTE ────────────────────────────────────────────────────
const COLORS = {
  GOLD: '#FFD700',
  ORANGE: '#FF9100',
  ORANGE_DARK: '#E65100',
  BORDER: '#000000',
  BG_GRADIENT_TOP: '#263238',
  BG_GRADIENT_BOT: '#102027',
  TEAL: '#00BCD4',
};

// ── ANIMATED COMPONENTS ─────────────────────────────────────────────
const AnimatedStack = Animated.createAnimatedComponent(Stack);

// ── REUSABLE "GAME" COMPONENTS ──────────────────────────────────────

const GameButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  width = 'auto', 
  height = 60,
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
      height={height}
      width={width}
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
          fontSize={20} 
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
      textShadowOffset={{ width: 2, height: 2 }}
      textShadowRadius={0}
    >
      {title}
    </Text>
  </Stack>
);

// ── MAIN SCREEN ─────────────────────────────────────────────────────
export default function AvatarScreen() {
  const navigation = useNavigation<any>();

  // ── ANIMATION LOGIC ───────────────────────────────────────────────
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.02, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    translateY.value = withRepeat(
      withTiming(-5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  return (
    <Theme name="dark">
      <LinearGradient
        colors={[COLORS.BG_GRADIENT_TOP, COLORS.BG_GRADIENT_BOT]}
        style={{ flex: 1 }}
      >
        <YStack f={1} pt="$8" pb="$6" px="$4" jc="space-between">
            
            {/* TOP HUD */}
            <XStack w="100%" jc="space-between" ai="flex-start" zIndex={100}>
                <YStack space="$2">
                    <GameButton title="TOP" height={50} width={120} variant="secondary" onPress={() => {}} />
                    <GameButton title="BOTTOM" height={50} width={120} variant="secondary" onPress={() => {}} />
                </YStack>

                <GameBanner title="SKATEHUBBA" />
            </XStack>

            {/* AVATAR STAGE (Animated) */}
            <YStack 
                position="absolute" 
                top={0} 
                bottom={0} 
                left={0} 
                right={0} 
                jc="center" 
                ai="center" 
                zIndex={0}
            >
                <Animated.View style={[{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }, animatedStyle]}>
                    <Image 
                        source={{ uri: 'https://github.com/shadcn.png' }}
                        width={width * 0.9}
                        height={height * 0.6}
                        resizeMode="contain"
                    />
                </Animated.View>
                
                <Stack 
                    width={200} 
                    height={30} 
                    bg="#000" 
                    opacity={0.5} 
                    borderRadius={100} 
                    position="absolute"
                    bottom={height * 0.15}
                    zIndex={-1}
                />
            </YStack>

            {/* BOTTOM CONTROLS */}
            <YStack space="$3" w="100%" zIndex={100}>
                
                <XStack jc="space-between">
                    <GameButton 
                        title="EQUIP" 
                        icon={Backpack} 
                        width={width * 0.42} 
                        onPress={() => navigation.navigate('Profile')} 
                    />
                    <GameButton 
                        title="MAP" 
                        icon={Map} 
                        width={width * 0.42} 
                        onPress={() => navigation.navigate('Map')} 
                    />
                </XStack>

                <Stack 
                    bg="#000" 
                    borderWidth={2} 
                    borderColor={COLORS.GOLD} 
                    borderRadius={8} 
                    p="$3"
                    flexDirection="row"
                    jc="space-between"
                >
                    <Text color={COLORS.GOLD} fontWeight="900" fontSize="$4">HARDWARE: × 24</Text>
                    <Text color={COLORS.GOLD} fontWeight="900" fontSize="$4">BEARINGS: × 16</Text>
                </Stack>

            </YStack>

        </YStack>
      </LinearGradient>
    </Theme>
  );
}
