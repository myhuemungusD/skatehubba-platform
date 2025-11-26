import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Standard Expo Icons
import { LinearGradient } from 'expo-linear-gradient'; // You might need to install this: npx expo install expo-linear-gradient

// --- Types (The "Senior" Part: Strict Data Shape) ---
type ChallengeData = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Pro';
  xpReward: number;
  timeLeft: string;
  participants: number;
  bgImage: string; // URL for the background
};

// --- Mock Data (Replace with API later) ---
const activeChallenge: ChallengeData = {
  id: 'c1',
  title: 'Kickflip the 3-Block',
  description: 'Land a clean kickflip down a 3-stair set or higher. No toe drag allowed! Upload your best angle.',
  difficulty: 'Medium',
  xpReward: 500,
  timeLeft: '14h 20m',
  participants: 124,
  bgImage: 'https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
};

export default function ChallengeScreen() {
  return (
    <View style={styles.container}>
      {/* 1. HERO SECTION: Full bleed image with gradient overlay */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: activeChallenge.bgImage }} style={styles.heroImage} />
        <LinearGradient
          colors={['transparent', '#000000']}
          style={styles.heroGradient}
        />
        
        {/* Header Actions (Back / Menu) */}
        <SafeAreaView style={styles.headerSafe}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Hero Content */}
        <View style={styles.heroContent}>
          <View style={styles.tagContainer}>
            <View style={[styles.badge, styles.badgeDifficulty]}>
              <Text style={styles.badgeText}>{activeChallenge.difficulty.toUpperCase()}</Text>
            </View>
            <View style={[styles.badge, styles.badgeTime]}>
              <Ionicons name="time-outline" size={14} color="#FFF" />
              <Text style={styles.badgeText}> {activeChallenge.timeLeft}</Text>
            </View>
          </View>
          <Text style={styles.title}>{activeChallenge.title}</Text>
        </View>
      </View>

      {/* 2. BODY SECTION: Stats and Details */}
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{activeChallenge.xpReward}</Text>
            <Text style={styles.statLabel}>XP Reward</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{activeChallenge.participants}</Text>
            <Text style={styles.statLabel}>Skaters</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="flame" size={24} color="#FF4500" />
            <Text style={styles.statLabel}>Trending</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Briefing</Text>
          <Text style={styles.description}>{activeChallenge.description}</Text>
        </View>

        {/* Requirements List (Bullet points) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rules</Text>
          {['Must be outside', 'No edit cuts', 'Board must be visible'].map((rule, index) => (
            <View key={index} style={styles.ruleRow}>
              <Ionicons name="checkmark-circle" size={20} color="#4ADE80" />
              <Text style={styles.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* 3. FOOTER: Sticky Action Button */}
      <SafeAreaView style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Ionicons name="videocam" size={24} color="#000" style={{ marginRight: 8 }} />
          <Text style={styles.primaryButtonText}>Upload Clip</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

// --- Styles (Clean & Dark Mode) ---
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Deep black background
  },
  // Hero
  heroContainer: {
    height: height * 0.45,
    width: width,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  headerSafe: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 10,
  },
  badgeDifficulty: {
    backgroundColor: '#F59E0B', // Amber color
  },
  badgeTime: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  badgeText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  // Body
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for footer
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -20, // Negative margin to overlap header slightly
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    color: '#CCC',
    fontSize: 16,
    lineHeight: 24,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleText: {
    color: '#DDD',
    fontSize: 16,
    marginLeft: 10,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#333',
    padding: 20,
  },
  primaryButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '800',
  },
});
