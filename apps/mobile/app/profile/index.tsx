import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  ScrollView, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';
import { db } from '../../firebase'; // Ensure this path is correct for your repo
import { useAuth } from '../../hooks/useAuth'; // Ensure this hook exists
// We'll use a standard TouchableOpacity if GrittyButton isn't available in context yet, 
// but designed to match the theme.
import type { UserProfile, AvatarItem } from '@skatehubba/types';

// Theme Constants
const COLORS = {
  orange: '#FF6600',
  black: '#121212',
  darkGray: '#1E1E1E',
  green: '#39FF14',
  white: '#FFFFFF',
  cardBg: '#252525'
};

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ uid?: string }>();
  const { user } = useAuth();
  
  const targetUid = params.uid || user?.uid;
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animation Values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    if (!targetUid) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', targetUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // In a real app, you might need to merge base User data with separate 'profile' stats
          // For now we assume the document matches UserProfile structure
          setProfile(docSnap.data() as UserProfile);
          
          opacity.value = withTiming(1, { duration: 500 });
          translateY.value = withSpring(0);
        } else {
          setError('Skater not found in the database.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [targetUid]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  const renderBadge = ({ item }: { item: string }) => (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{item.toUpperCase()}</Text>
    </View>
  );

  const renderGear = ({ item }: { item: AvatarItem }) => (
    <View style={styles.gearCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.gearImage} resizeMode="contain" />
      <Text style={styles.gearName} numberOfLines={1}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.orange} />
        <Text style={styles.loadingText}>LOADING SKATER...</Text>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Please login to view profile'}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isOwnProfile = user?.uid === profile.uid;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Placeholder background if asset is missing */}
      <View style={styles.headerBackground} />

      <Animated.View style={[styles.content, animatedStyle]}>
        {/* Avatar & Main Info */}
        <View style={styles.headerCard}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: profile.photoURL || profile.avatar?.outfit || 'https://github.com/shadcn.png' }} 
              style={styles.avatar} 
            />
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{profile.level || 1}</Text>
            </View>
          </View>
          
          <Text style={styles.handle}>@{profile.username || profile.handle || 'skater'}</Text>
          <Text style={styles.stance}>{profile.stance} STANCE</Text>
          
          {/* XP Bar */}
          <View style={styles.xpBarContainer}>
            <View style={[styles.xpBarFill, { width: `${(profile.xp / profile.maxXp) * 100 || 0}%` }]} />
            <Text style={styles.xpText}>{profile.xp || 0} / {profile.maxXp || 1000} XP</Text>
          </View>

          {isOwnProfile && (
             <TouchableOpacity style={[styles.button, { marginTop: 16 }]} onPress={handleEditProfile}>
               <Text style={styles.buttonText}>EDIT LOCKER</Text>
             </TouchableOpacity>
          )}
        </View>

        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CAREER STATS</Text>
          <View style={styles.statsGrid}>
            <StatBox label="WINS" value={profile.stats.wins} color={COLORS.green} />
            <StatBox label="RANK" value={profile.stats.rank} color={COLORS.orange} />
            <StatBox label="BUCKS" value={profile.extendedStats?.hubbaBucks || 0} color="#FFD700" />
            <StatBox label="KM SKATED" value={profile.extendedStats?.distanceSkated || 0} color="#00BFFF" />
          </View>
        </View>

        {/* Sponsors / Badges */}
        {profile.badges && profile.badges.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>BADGES</Text>
            <FlatList
              data={profile.badges}
              renderItem={renderBadge}
              keyExtractor={(item, index) => item + index}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        {/* Closet Preview */}
        {profile.items && profile.items.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>GEAR CLOSET</Text>
            <FlatList
              data={profile.items.slice(0, 5)} 
              renderItem={renderGear}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}

const StatBox = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <View style={[styles.statBox, { borderColor: color }]}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  headerBackground: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
    backgroundColor: '#333', // Fallback if image fails
    opacity: 0.3,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  loadingText: {
    color: COLORS.white,
    marginTop: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
  },
  content: {
    marginTop: 100,
    paddingHorizontal: 16,
  },
  headerCard: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.orange,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
    backgroundColor: '#333',
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.orange,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  levelText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 12,
  },
  handle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  stance: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 2,
  },
  xpBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#000',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#444'
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: COLORS.green,
  },
  xpText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.white,
    lineHeight: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: COLORS.orange,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    fontStyle: 'italic', 
    textTransform: 'uppercase',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    width: '48%',
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  badgeContainer: {
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  gearCard: {
    width: 90,
    marginRight: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333'
  },
  gearImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
    backgroundColor: '#000',
    borderRadius: 4
  },
  gearName: {
    color: '#AAA',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '600'
  },
  button: {
    backgroundColor: COLORS.orange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    transform: [{ skewX: '-10deg' }], // Gritty style
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: '900',
    textTransform: 'uppercase',
  }
});
