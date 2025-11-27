import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_DEFAULT,
  type Region,
} from "react-native-maps";

// --- Types ---
interface GeoJSONFeature {
  type: "Feature";
  id: string;
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    name: string;
    description?: string;
    spotType: string;
    bustFactor: number;
    hasLights: boolean;
    images: string[];
    tags: string[];
  };
}

interface GeoJSONCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000";

export default function MapScreen() {
  const [spots, setSpots] = useState<GeoJSONFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState<Region>({
    latitude: 33.6189,
    longitude: -117.6749,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // --- FETCH SPOTS IN BOUNDS ---
  const fetchSpotsInBounds = useCallback(async (currentRegion: Region) => {
    // Calculate bounding box
    const minLat = currentRegion.latitude - currentRegion.latitudeDelta / 2;
    const maxLat = currentRegion.latitude + currentRegion.latitudeDelta / 2;
    const minLng = currentRegion.longitude - currentRegion.longitudeDelta / 2;
    const maxLng = currentRegion.longitude + currentRegion.longitudeDelta / 2;

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/spots/bounds?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}`,
      );

      if (!response.ok) throw new Error("Failed to fetch spots");

      const data: GeoJSONCollection = await response.json();
      setSpots(data.features);
    } catch (error) {
      console.error("Error fetching spots:", error);
      // Optional: Show toast or silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchSpotsInBounds(region);
  }, []);

  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    fetchSpotsInBounds(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {spots.map((feature) => (
          <Marker
            key={feature.id}
            coordinate={{
              latitude: feature.geometry.coordinates[1], // GeoJSON is [lng, lat]
              longitude: feature.geometry.coordinates[0],
            }}
          >
            <View
              style={[
                styles.markerBase,
                feature.properties.spotType === "diy"
                  ? styles.markerDIY
                  : styles.markerStreet,
              ]}
            >
              <Ionicons name="location" size={20} color="white" />
            </View>

            <Callout tooltip onPress={() => router.push(`/spot/${feature.id}`)}>
              <View style={styles.calloutBubble}>
                <Text style={styles.calloutTitle}>
                  {feature.properties.name}
                </Text>
                <Text style={styles.calloutType}>
                  {feature.properties.spotType.toUpperCase()} • Bust:{" "}
                  {feature.properties.bustFactor}/10
                </Text>
                <View style={styles.calloutBtn}>
                  <Text style={styles.calloutBtnText}>CHECK IN</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#F59E0B" />
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/profile/me")}
      >
        <Ionicons name="person" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loadingOverlay: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 20,
  },

  markerBase: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  markerStreet: { backgroundColor: "#F59E0B" },
  markerDIY: { backgroundColor: "#EF4444" },

  calloutBubble: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
    borderColor: "#333",
    borderWidth: 1,
  },
  calloutTitle: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  calloutType: {
    color: "#888",
    fontSize: 10,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  calloutBtn: {
    backgroundColor: "#FFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  calloutBtnText: { color: "#000", fontWeight: "900", fontSize: 10 },

  fab: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#000",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
