import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "../../lib/auth";
import { db } from "../../lib/firebase";

const { width, height } = Dimensions.get("window");

interface UserProfile {
  username: string;
  level: number;
  currency: {
    hardware: number;
    bearings: number;
  };
  avatarUrl: string;
}

const DEFAULT_PROFILE: UserProfile = {
  username: "New Skater",
  level: 1,
  currency: { hardware: 10, bearings: 5 },
  avatarUrl: "https://via.placeholder.com/300x600/transparent/png?text=Skater",
};

export default function AvatarScreen() {
  const { user: authUser, loading: authLoading } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!authUser) {
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", authUser.uid);

    const unsubscribe = onSnapshot(
      userRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          try {
            // Create profile if it doesn't exist
            await setDoc(userRef, DEFAULT_PROFILE);
            // No need to setProfile here, the snapshot will fire again immediately after writing!
          } catch (err) {
            console.error("Error creating profile:", err);
          }
        }
        setLoading(false);
      },
      (error) => {
        console.error("Profile Sync Error:", error);
        Alert.alert("Connection Issue", "Could not sync profile data.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [authUser, authLoading]);

  if (loading || authLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#FBBF24" />
        <Text style={styles.loadingText}>Syncing Garage...</Text>
      </View>
    );
  }

  if (!authUser) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.loadingText}>
          Please Log In to view your Avatar.
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1585920806256-227956696727?q=80&w=1000&auto=format&fit=crop",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* SafeAreaView keeps content out of the notch/battery area */}
        <SafeAreaView style={styles.safeArea}>
          {/* CENTER AVATAR LAYER */}
          {/* We place this absolutely so it sits behind the UI controls */}
          {profile && (
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: profile.avatarUrl }}
                style={styles.avatarImage}
                resizeMode="contain"
              />
            </View>
          )}

          {/* UI CONTROLS LAYER */}
          <View style={styles.controlsContainer}>
            {/* LEFT COLUMN */}
            <View style={styles.column}>
              <RetroButton text="TOP" onPress={() => console.log("Edit Top")} />
              <View style={styles.spacer} />
              <RetroButton
                text="BOTTOM"
                onPress={() => console.log("Edit Bottom")}
              />
            </View>

            {/* RIGHT COLUMN */}
            <View style={styles.column}>
              <RetroButton
                text="SKATEHUB"
                onPress={() => console.log("Go to Hub")}
              />
              <View style={styles.spacer} />
              <RetroButton
                text="EQUIP"
                highlight
                onPress={() => console.log("Equip Item")}
              />
            </View>
          </View>

          {/* BOTTOM STATS BAR */}
          <View style={styles.statsBar}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>HARDWARE:</Text>
              <Text style={styles.statValue}>
                × {profile?.currency.hardware ?? 0}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>BEARINGS:</Text>
              <Text style={styles.statValue}>
                × {profile?.currency.bearings ?? 0}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

// -- REUSABLE UI COMPONENT --
const RetroButton = ({
  text,
  onPress,
  highlight,
}: {
  text: string;
  onPress: () => void;
  highlight?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.btnFrame, highlight && styles.btnHighlight]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.btnInner}>
      <Text style={styles.btnText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

// -- STYLES --
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)" },
  safeArea: { flex: 1 },

  centeredContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { color: "#666", marginTop: 10 },

  // Avatar is absolutely positioned to stay centered regardless of UI
  avatarContainer: {
    position: "absolute",
    width: "100%",
    height: "80%",
    top: "10%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: width * 0.8, // Responsive width
    height: "100%",
  },

  // Container to hold left/right columns
  controlsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: "40%", // Push buttons down visually
    zIndex: 10,
  },
  column: {
    flexDirection: "column",
  },
  spacer: { height: 20 },

  // Buttons
  btnFrame: {
    borderWidth: 2,
    borderColor: "#FBBF24",
    borderRadius: 8,
    backgroundColor: "#000",
    padding: 2,
    width: 140,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
  },
  btnHighlight: {
    borderColor: "#FFF",
    shadowColor: "#FFF",
  },
  btnInner: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  btnText: {
    color: "#FFF",
    fontSize: 16, // Slightly smaller for better fit
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // Stats
  statsBar: {
    alignSelf: "center", // Center the bar horizontally
    marginBottom: 20, // Lift off the bottom
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#FBBF24",
    borderRadius: 8,
    padding: 12,
    width: "90%", // Take up most width
    maxWidth: 400,
    zIndex: 20,
    flexDirection: "row", // Align items side by side
    justifyContent: "space-around",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statLabel: {
    color: "#FBBF24",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
  },
  statValue: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
