import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from 'react-native';

// 1. THE DATA SHAPE (Match this to your Backend Response)
// In a real scenario, import this from packages/types
interface UserProfile {
  username: string;
  level: number;
  currency: {
    hardware: number;
    bearings: number;
  };
  avatarUrl: string; // URL to the rendered image of their character
}

export default function AvatarScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. CONNECT TO BACKEND
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // REPLACE with your actual localhost or IP address for testing
      // e.g. 'http://192.168.1.5:8000/api/me'
      // const response = await fetch('http://YOUR_API_URL/api/me'); 
      // const data = await response.json();
      
      // MOCKING THE RESPONSE FOR NOW SO YOU CAN SEE THE UI
      setTimeout(() => {
        setUser({
          username: "Hesher",
          level: 92,
          currency: { hardware: 24, bearings: 16 },
          avatarUrl: "https://via.placeholder.com/300x600/transparent/png?text=Avatar+Render" 
        });
        setLoading(false);
      }, 1000); // Fake 1s load time
    } catch (error) {
      Alert.alert("Error", "Could not load profile");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FBBF24" />
      </View>
    );
  }

  return (
    // Background Image (The Garage)
    <ImageBackground 
      source={{ uri: 'https://your-storage.com/garage_bg.jpg' }} // Replace with local asset
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        
        {/* CENTER AVATAR */}
        {user && (
            <Image 
                source={{ uri: user.avatarUrl }} // Use the URL from the user object
                style={styles.avatarImage} 
                resizeMode="contain" 
            />
        )}

        {/* LEFT BUTTONS */}
        <View style={styles.leftControls}>
          <RetroButton text="TOP" onPress={() => console.log('Edit Top')} />
          <View style={{ height: 20 }} />
          <RetroButton text="BOTTOM" onPress={() => console.log('Edit Bottom')} />
        </View>

        {/* RIGHT BUTTONS */}
        <View style={styles.rightControls}>
          <RetroButton text="SKATEHUBBA" onPress={() => console.log('Go to Hub')} />
          <View style={{ height: 20 }} />
          <RetroButton text="EQUIP" highlight onPress={() => console.log('Equip Item')} />
        </View>

        {/* BOTTOM STATS BAR */}
        <View style={styles.statsBar}>
            <View style={styles.statItem}>
                <Text style={styles.statLabel}>HARDWARE:</Text>
                <Text style={styles.statValue}>× {user?.currency.hardware}</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statLabel}>BEARINGS:</Text>
                <Text style={styles.statValue}>× {user?.currency.bearings}</Text>
            </View>
        </View>

      </View>
    </ImageBackground>
  );
}

// -- REUSABLE UI COMPONENT: The "Sticker" Button --
const RetroButton = ({ text, onPress, highlight }: { text: string, onPress: () => void, highlight?: boolean }) => (
  <TouchableOpacity 
    style={[styles.btnFrame, highlight ? styles.btnHighlight : null]} 
    onPress={onPress}
  >
    <View style={styles.btnInner}>
      <Text style={styles.btnText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

// -- STYLES (Matching your Image) --
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }, // Slight dark tint
  loadingContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  
  // Avatar
  avatarImage: {
    position: 'absolute',
    width: '80%',
    height: '70%',
    top: '15%',
    alignSelf: 'center',
    zIndex: 1,
  },

  // Controls Positioning
  leftControls: { position: 'absolute', left: 20, top: '40%', zIndex: 10 },
  rightControls: { position: 'absolute', right: 20, top: '40%', zIndex: 10 },

  // The Retro Button Style
  btnFrame: {
    borderWidth: 2,
    borderColor: '#FBBF24', // That specific yellow/orange
    borderRadius: 8,
    backgroundColor: '#000',
    padding: 2,
    width: 140,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
  },
  btnHighlight: {
    borderColor: '#FFF', // Highlight logic if needed
  },
  btnInner: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900', // Extra Bold
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Bottom Stats
  statsBar: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#FBBF24',
    borderRadius: 8,
    padding: 10,
    minWidth: 180,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statLabel: {
    color: '#FBBF24',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  statValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  }
});
