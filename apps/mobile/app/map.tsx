import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../lib/auth";
import { SKATE } from "../theme";

export default function MapScreen() {
  const { user, signOut } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>SkateHubba™</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>
          Welcome, {user?.displayName || "Skater"}!
        </Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🗺️ Hubba Spots</Text>
          <Text style={styles.cardText}>
            Interactive map with skate spots coming soon!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 S.K.A.T.E Game</Text>
          <Text style={styles.cardText}>
            Challenge your crew to games of SKATE
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏆 Leaderboard</Text>
          <Text style={styles.cardText}>Compete with skaters worldwide</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Native Google Auth ✓ | Firebase ✓ | Zustand ✓
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SKATE.colors.ink,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 2,
    borderBottomColor: SKATE.colors.neon,
  },
  logo: {
    color: SKATE.colors.neon,
    fontSize: 24,
    fontWeight: "900",
  },
  signOutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: SKATE.colors.blood,
  },
  signOutText: {
    color: SKATE.colors.blood,
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    color: SKATE.colors.neon,
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 4,
  },
  email: {
    color: SKATE.colors.paper,
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 32,
  },
  card: {
    backgroundColor: SKATE.colors.grime,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: `${SKATE.colors.neon}40`,
  },
  cardTitle: {
    color: SKATE.colors.neon,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardText: {
    color: SKATE.colors.paper,
    fontSize: 14,
    opacity: 0.8,
  },
  footer: {
    color: SKATE.colors.paper,
    fontSize: 12,
    textAlign: "center",
    opacity: 0.5,
    padding: 20,
  },
});
