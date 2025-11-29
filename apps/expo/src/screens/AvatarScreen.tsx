import React from 'react';
import { Dimensions, Platform, Image as RNImage } from 'react-native';
import { 
  YStack, 
  XStack, 
  Text, 
  Button, 
  Image, 
  Theme,
  Stack,
  Avatar
} from 'tamagui';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Map, Zap, User, Camera, Menu as MenuIcon, Backpack, Shirt } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// ── RPG PALETTE (Locked to 'avatar_screen1.jpg') ────────────────────────────
const COLORS = {
  GOLD: '#FFD700',        // Main accent (Text)
  ORANGE: '#FF9100',      // Primary Buttons
  ORANGE_DARK: '#E65100', // Button Shadows
  BORDER: '#000000',      // Outlines
  TEAL: '#00BCD4',        // Secondary
  BG_GRADIENT_TOP: '#263238', // Dark Slate
  BG_GRADIENT_BOT: '#102027', // Almost Black
  BUTTON_TEXT: '#FFFFFF',
};

// ── REUSABLE "GAME" COMPONENTS ──────────────────────────────────────────────

// The Chunky 3D Button (Matches 'TOP', 'BOTTOM', 'EQUIP' style)
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
  const borderColor = isPrimary ? COLORS.ORANGE_DARK : '#555';
  
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
      borderBottomWidth={8} // The 3D Depth
      borderRadius={12}
      height={height}
      width={width}
      ai="center"
      jc="center"
      pressStyle={{ borderBottomWidth: 3, marginTop: 5 }} // Physical press effect
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

// The "SKATEHUBBA" Banner (Matches top/right logo style)
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
    transform={[{ rotate: '-2deg' }]} // Slight tilt for attitude
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

// ── MAIN SCREEN ─────────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  return (
    <Theme name="dark">
      <LinearGradient
        colors={[COLORS.BG_GRADIENT_TOP, COLORS.BG_GRADIENT_BOT]}
        style={{ flex: 1 }}
      >
        {/* Background Texture (Optional) */}
        
        <YStack f={1} pt="$8" pb="$6" px="$4" jc="space-between">
            
            {/* 1. TOP HUD (Left: Stats, Right: Logo) */}
            <XStack w="100%" jc="space-between" ai="flex-start" zIndex={100}>
                {/* Left: Quick Stats (Hardware/Bearings from screenshot) */}
                <YStack space="$2">
                    <GameButton title="TOP" height={50} width={120} variant="secondary" onPress={() => {}} />
                    <GameButton title="BOTTOM" height={50} width={120} variant="secondary" onPress={() => {}} />
                </YStack>

                {/* Right: Brand Banner */}
                <GameBanner title="SKATEHUBBA" />
            </XStack>

            {/* 2. AVATAR STAGE (Center) */}
            {/* Using absolute positioning to layer it behind UI elements if needed */}
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
                {/* Character Model */}
                <Image 
                    source={{ uri: 'https://github.com/shadcn.png' }} // Placeholder for 3D model
                    width={width * 0.9}
                    height={height * 0.6}
                    resizeMode="contain"
                />
                
                {/* Floor Shadow */}
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

            {/* 3. BOTTOM CONTROLS */}
            <YStack space="$3" w="100%" zIndex={100}>
                
                {/* Row 1: Main Actions */}
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

                {/* Row 2: Status Bar (Hardware/Bearings) */}
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
