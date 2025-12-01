import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GrittyButton, SKATE } from "@skatehubba/ui";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";

// Default avatar background color for DiceBear API
const DEFAULT_AVATAR_BG = "b6e3f4";

interface UserStats {
  wins: number;
  losses: number;
  checkIns: number;
  hubbaBucks: number;
  distanceKm: number;
}

interface ProfileData {
  uid: string;
  username: string;
  avatarUrl: string;
  level: number;
  xp: number;
  stats: UserStats;
  sponsors: string[];
  badges: string[];
}

async function fetchProfile(uid: string): Promise<ProfileData> {
  const profileDoc = await getDoc(doc(db, "users", uid));
  if (!profileDoc.exists()) {
    // Return default profile if not found
    return {
      uid,
      username: "Skater",
      avatarUrl: `https://api.dicebear.com/9.x/avataaars/png?seed=${uid}&backgroundColor=${DEFAULT_AVATAR_BG}`,
      level: 1,
      xp: 0,
      stats: {
        wins: 0,
        losses: 0,
        checkIns: 0,
        hubbaBucks: 0,
        distanceKm: 0,
      },
      sponsors: [],
      badges: [],
    };
  }
  return profileDoc.data() as ProfileData;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // Animation values
  const avatarScale = useSharedValue(1);
  const statsOpacity = useSharedValue(0);

  // Fetch profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.uid],
    queryFn: () => fetchProfile(user?.uid ?? ""),
    enabled: !!user?.uid,
  });

  // Animate on mount
  React.useEffect(() => {
    avatarScale.value = withTiming(1.1, { duration: SKATE.timing.slow });
    statsOpacity.value = withTiming(1, { duration: SKATE.timing.norm });
  }, [avatarScale, statsOpacity]);

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }],
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
  }));

  const statsData = [
    { label: "WINS", value: profile?.stats.wins ?? 0, icon: "trophy" as const },
    {
      label: "LOSSES",
      value: profile?.stats.losses ?? 0,
      icon: "close-circle" as const,
    },
    {
      label: "CHECK-INS",
      value: profile?.stats.checkIns ?? 0,
      icon: "location" as const,
    },
    {
      label: "BUCKS",
      value: profile?.stats.hubbaBucks ?? 0,
      icon: "cash" as const,
    },
    {
      label: "DISTANCE",
      value: `${(profile?.stats.distanceKm ?? 0).toFixed(1)}km`,
      icon: "walk" as const,
    },
  ];

  const badgeData = profile?.badges ?? [];
  const sponsorData = profile?.sponsors ?? [];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={SKATE.colors.paper} />
        </TouchableOpacity>
        <Text style={styles.title}>PROFILE</Text>
        <TouchableOpacity
          onPress={() => router.push("/closet")}
          style={styles.settingsBtn}
        >
          <Ionicons name="shirt" size={24} color={SKATE.colors.paper} />
        </TouchableOpacity>
      </View>

      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <Animated.View style={[styles.avatarWrapper, avatarAnimatedStyle]}>
          <Image
            source={{
              uri:
                profile?.avatarUrl ??
                `https://api.dicebear.com/9.x/avataaars/png?seed=default`,
            }}
            style={styles.avatar}
          />
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>LVL {profile?.level ?? 1}</Text>
          </View>
        </Animated.View>
        <Text style={styles.username}>{profile?.username ?? "Skater"}</Text>
        <Text style={styles.xpText}>{profile?.xp ?? 0} XP</Text>
      </View>

      {/* Stats Grid */}
      <Animated.View style={[styles.statsGrid, statsAnimatedStyle]}>
        <FlatList
          data={statsData}
          numColumns={3}
          scrollEnabled={false}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <View style={styles.statBox}>
              <Ionicons name={item.icon} size={20} color={SKATE.colors.gold} />
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          )}
          contentContainerStyle={styles.statsContainer}
        />
      </Animated.View>

      {/* Sponsors Section */}
      {sponsorData.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SPONSORS</Text>
          <FlatList
            horizontal
            data={sponsorData}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.sponsorBadge}>
                <Text style={styles.sponsorText}>{item}</Text>
              </View>
            )}
          />
        </View>
      )}

      {/* Badges Section */}
      {badgeData.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BADGES</Text>
          <FlatList
            horizontal
            data={badgeData}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.badge}>
                <Ionicons
                  name="ribbon"
                  size={16}
                  color={SKATE.colors.gold}
                />
                <Text style={styles.badgeText}>{item}</Text>
              </View>
            )}
          />
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <GrittyButton onPress={() => router.push("/profile/friends")}>
          FRIENDS
        </GrittyButton>
        <GrittyButton onPress={() => router.push("/map")}>
          CHECK-INS
        </GrittyButton>
        <GrittyButton onPress={() => router.push("/closet")}>
          CLOSET
        </GrittyButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SKATE.colors.ink,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: SKATE.colors.ink,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: SKATE.colors.neon,
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SKATE.colors.grime,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SKATE.colors.grime,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: SKATE.colors.paper,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 2,
    fontStyle: "italic",
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: SKATE.colors.neon,
  },
  levelBadge: {
    position: "absolute",
    bottom: 0,
    right: -10,
    backgroundColor: SKATE.colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: SKATE.colors.ink,
  },
  levelText: {
    fontWeight: "900",
    fontSize: 12,
    color: SKATE.colors.ink,
  },
  username: {
    color: SKATE.colors.paper,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 1,
  },
  xpText: {
    color: SKATE.colors.neon,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  statsGrid: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  statsContainer: {
    justifyContent: "center",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: SKATE.colors.grime,
    margin: 4,
    padding: 16,
    borderRadius: SKATE.radius.lg,
    borderWidth: 1,
    borderColor: SKATE.colors.ink,
  },
  statValue: {
    color: SKATE.colors.paper,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },
  statLabel: {
    color: SKATE.colors.gold,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    color: SKATE.colors.gold,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 12,
  },
  sponsorBadge: {
    backgroundColor: SKATE.colors.grime,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: SKATE.colors.neon,
  },
  sponsorText: {
    color: SKATE.colors.neon,
    fontSize: 12,
    fontWeight: "700",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SKATE.colors.grime,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: SKATE.colors.gold,
  },
  badgeText: {
    color: SKATE.colors.paper,
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: "auto",
  },
});
