import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// --- 1. IMPORT THE SCHEMA ---
import { UserProfile } from '../types/schema';
import { seedDatabase } from '../utils/seed';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'STATS' | 'CLIPS'>('STATS');

  const handleEnterChambers = async () => {
    const uid = auth().currentUser?.uid;
    if (!uid) {
      Alert.alert("Sign In Required", "You must be signed in to access the Judge Chambers.");
      return;
    }
  
    try {
      // 1. Check the 'isJudge' flag on the user profile
      const userDoc = await firestore().collection('users').doc(uid).get();
      
      if (userDoc.exists && userDoc.data()?.isJudge === true) {
        // Authorized: Enter the Chamber
        // @ts-ignore - Navigation types not fully defined in this snippet
        navigation.navigate('JudgeScreen');
      } else {
        // Unauthorized: Show them the door
        Alert.alert(
          "Access Denied", 
          "You are not a Certified Shrediter. Keep skating and uploading to earn your spot."
        );
      }
    } catch (error) {
      console.error("Error checking judge status:", error);
      Alert.alert("Error", "Could not verify credentials.");
    }
  };

  // --- 2. STRICTLY TYPED MOCK DATA ---
  // This object MUST match the UserProfile interface exactly.
  const user: UserProfile = {
    uid: 'u123',
    username: 'Hesher_92',
    stance: 'Goofy',
    level: 42,
    xp: 8450,
    avatarUrl: 'https://api.dicebear.com/9.x/avataaars/png?seed=skater123&backgroundColor=b6e3f4',
    // We don't have a 'cover' field in the schema yet, so we'll hardcode it in the UI for now
    // or add it to the schema later.
    stats: {
      skateWins: 14,
      spotsOwned: 3,
      dayStreak: 8,
    },
    badges: ['Kickflip', 'Heelflip', 'Tre Flip', 'Boardslide'],
    gear: {
      deck: 'Blind Reaper',
      trucks: 'Independent 149',
      wheels: 'Spitfire F4'
    }
  };

  // Helper for Cover Image (since it's not in our strict schema yet)
  const coverImage = 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={{ uri: coverImage }} style={styles.coverImage} />
        <LinearGradient colors={['transparent', '#000']} style={styles.coverGradient} />
        
        <SafeAreaView style={styles.navBar}>
           <TouchableOpacity style={styles.iconBtn} onPress={() => seedDatabase()}><Ionicons name="settings-sharp" size={24} color="#FFF" /></TouchableOpacity>
           <TouchableOpacity style={styles.iconBtn}><Ionicons name="share-social" size={24} color="#FFF" /></TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
           <View style={styles.avatarContainer}>
             {/* Note: Schema uses 'avatarUrl', not 'avatar' */}
             <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
             <View style={styles.levelBadge}>
               <Text style={styles.levelText}>LVL {user.level}</Text>
             </View>
           </View>
           
           <View style={styles.identityRow}>
             <Text style={styles.username}>{user.username}</Text>
             <View style={styles.stanceTag}>
               <Text style={styles.stanceText}>{user.stance.toUpperCase()}</Text>
             </View>
           </View>

           {/* XP Bar */}
           <View style={styles.xpBarContainer}>
             <View style={{...styles.xpBarFill, width: '65%'}} />
             <Text style={styles.xpText}>{user.xp} / 10,000 XP</Text>
           </View>

           {/* Stats Grid - Now using the nested 'stats' object */}
           <View style={styles.statGrid}>
              <View style={styles.statBox}>
                 <Ionicons name="trophy" size={20} color="#F59E0B" />
                 <Text style={styles.statValue}>{user.stats.skateWins}</Text>
                 <Text style={styles.statLabel}>WINS</Text>
               </View>
               <View style={styles.statBox}>
                 <Ionicons name="location" size={20} color="#F59E0B" />
                 <Text style={styles.statValue}>{user.stats.spotsOwned}</Text>
                 <Text style={styles.statLabel}>OWNED</Text>
               </View>
               <View style={styles.statBox}>
                 <Ionicons name="flame" size={20} color="#F59E0B" />
                 <Text style={styles.statValue}>{user.stats.dayStreak}</Text>
                 <Text style={styles.statLabel}>STREAK</Text>
               </View>
           </View>

           {/* Judge Access Button */}
           <TouchableOpacity style={styles.judgeButton} onPress={handleEnterChambers}>
             <LinearGradient
               colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
               start={{x: 0, y: 0}} 
               end={{x: 1, y: 0}}
               style={styles.judgeGradient}
             >
               <Ionicons name="gavel" size={24} color="#FFF" style={{marginRight: 10}} />
               <Text style={styles.judgeButtonText}>ENTER JUDGE CHAMBERS</Text>
             </LinearGradient>
           </TouchableOpacity>

        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity 
            onPress={() => setActiveTab('STATS')} 
            style={[styles.tab, activeTab === 'STATS' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'STATS' && styles.activeTabText]}>TRICK BOOK</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('CLIPS')} 
            style={[styles.tab, activeTab === 'CLIPS' && styles.activeTab]}
          >
             <Text style={[styles.tabText, activeTab === 'CLIPS' && styles.activeTabText]}>MY CLIPS</Text>
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
           {activeTab === 'STATS' ? (
             <View style={styles.trickList}>
                {/* Mapping through the 'badges' array from Schema */}
                {user.badges.map((badge, i) => (
                  <View key={i} style={styles.trickRow}>
                    <Ionicons name="checkmark-circle" size={20} color="#4ADE80" />
                    <Text style={styles.trickName}>{badge}</Text>
                    <Text style={styles.masteryText}>MASTERED</Text>
                  </View>
                ))}
             </View>
           ) : (
             <View style={styles.emptyState}>
               <Ionicons name="videocam-off" size={48} color="#333" />
               <Text style={styles.emptyText}>No clips uploaded yet.</Text>
               <TouchableOpacity style={styles.uploadBtn}>
                 <Text style={styles.uploadBtnText}>UPLOAD CLIP</Text>
               </TouchableOpacity>
             </View>
           )}
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerContainer: { height: 200, width: width },
  coverImage: { width: '100%', height: '100%', opacity: 0.6 },
  coverGradient: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, position: 'absolute', width: '100%' },
  iconBtn: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20 },
  scrollContent: { marginTop: -40 },
  profileCard: {
    backgroundColor: '#111',
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.5, shadowRadius: 20,
  },
  avatarContainer: { marginTop: -50, marginBottom: 12, position: 'relative' },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 4, borderColor: '#111', backgroundColor: '#333' },
  levelBadge: { position: 'absolute', bottom: 0, right: -10, backgroundColor: '#F59E0B', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, borderWidth: 2, borderColor: '#111' },
  levelText: { fontWeight: '900', fontSize: 10, color: '#000' },
  identityRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  username: { color: '#FFF', fontSize: 24, fontWeight: '800', letterSpacing: 0.5 },
  stanceTag: { backgroundColor: '#222', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  stanceText: { color: '#888', fontSize: 10, fontWeight: '700' },
  xpBarContainer: { width: '100%', height: 6, backgroundColor: '#222', borderRadius: 3, marginBottom: 8, position: 'relative' },
  xpBarFill: { height: '100%', backgroundColor: '#4ADE80', borderRadius: 3 },
  xpText: { position: 'absolute', right: 0, top: 10, color: '#666', fontSize: 10, fontWeight: '600' },
  statGrid: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 24, borderTopWidth: 1, borderTopColor: '#222', paddingTop: 20 },
  statBox: { alignItems: 'center', flex: 1 },
  statValue: { color: '#FFF', fontSize: 18, fontWeight: '700', marginTop: 4 },
  statLabel: { color: '#666', fontSize: 10, textTransform: 'uppercase' },
  
  // Judge Button Styles
  judgeButton: { width: '100%', marginTop: 20, borderRadius: 12, overflow: 'hidden' },
  judgeGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  judgeButtonText: { color: '#FFF', fontWeight: '900', fontSize: 14, letterSpacing: 1 },

  tabRow: { flexDirection: 'row', marginTop: 24, borderBottomWidth: 1, borderBottomColor: '#222' },
  tab: { flex: 1, paddingVertical: 16, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#FFF' },
  tabText: { color: '#666', fontWeight: '700', fontSize: 12 },
  activeTabText: { color: '#FFF' },
  contentArea: { padding: 20 },
  trickList: { width: '100%' },
  trickRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 8 },
  trickName: { color: '#FFF', flex: 1, marginLeft: 12, fontWeight: '600', fontSize: 16 },
  masteryText: { color: '#F59E0B', fontSize: 10, fontWeight: '800' },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { color: '#444', marginTop: 16, marginBottom: 24 },
  uploadBtn: { backgroundColor: '#FFF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 30 },
  uploadBtnText: { fontWeight: '900', fontSize: 12 }
});
