import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- TEMP FIX: Use a web image instead of the missing local file ---
const BACKGROUND = {
  uri: "https://placehold.co/600x800/1a1a1a/FFF?text=Skate+Shop",
};

export default function ClosetScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={BACKGROUND} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>SKATE SHOP</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <Ionicons name="construct-outline" size={64} color="#FFF" />
          <Text style={styles.comingSoon}>Shop & Closet Coming Soon</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 2,
    fontStyle: "italic",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    margin: 20,
    borderRadius: 20,
  },
  comingSoon: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});
