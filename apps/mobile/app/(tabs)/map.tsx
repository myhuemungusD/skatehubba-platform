import MapboxGL from "@rnmapbox/maps";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Location from "expo-location";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Reanimated, { FadeIn } from "react-native-reanimated";
import { db } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import { SKATE } from "../../theme";

MapboxGL.setAccessToken("pk.eyJ1IjoiZGVzaWdubWFpbmxpbmUiLCJhIjoiY29kZSJ9");

const AvatarMarker = ({ coordinate }: { coordinate: [number, number] }) => (
  <MapboxGL.PointAnnotation id="user-avatar" coordinate={coordinate}>
    <View style={styles.avatarContainer}>
      <ImageBackground
        source={require("../../assets/avatar/skater_lowpoly.webp")}
        style={styles.avatar}
        resizeMode="contain"
      />
    </View>
  </MapboxGL.PointAnnotation>
);

export default function MapScreen() {
  const { user } = useAuth();
  const camera = useRef<MapboxGL.Camera>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({});
      const coord: [number, number] = [
        loc.coords.longitude,
        loc.coords.latitude,
      ];
      setUserLocation(coord);
      camera.current?.setCamera({
        centerCoordinate: coord,
        zoomLevel: 16,
        animationDuration: 2000,
      });
    })();
  }, []);

  const { data: spots = [] } = useQuery({
    queryKey: ["spots"],
    queryFn: async () => {
      const q = query(collection(db, "spots"));
      const snap = await getDocs(q);
      return snap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data(), geo: doc.data().geo }) as any,
      );
    },
  });

  const checkInMutation = useMutation({
    mutationFn: async (spotId: string) => {
      if (!userLocation) throw new Error("No location");
      const spot = spots.find((s) => s.id === spotId);
      if (!spot) throw new Error("Spot not found");
      const dist = haversine(userLocation, spot.geo);
      if (dist > 60) throw new Error("Too far (60m geo-fence)");
      await addDoc(collection(db, "checkins"), {
        uid: user?.uid,
        spotId,
        ts: serverTimestamp(),
        proofVideoUrl: null,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["checkins"] }),
  });

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL="mapbox://styles/mapbox/dark-v11"
      >
        <MapboxGL.Camera ref={camera} />
        <MapboxGL.Terrain sourceID="mapbox-dem" />
        {userLocation && <AvatarMarker coordinate={userLocation} />}
        {spots.map((spot) => (
          <MapboxGL.PointAnnotation
            key={spot.id}
            id={`spot-${spot.id}`}
            coordinate={[spot.geo.lng, spot.geo.lat]}
          >
            <View style={styles.spotMarker}>
              <Text style={styles.markerText}>🛹</Text>
            </View>
          </MapboxGL.PointAnnotation>
        ))}
        <MapboxGL.UserLocation visible={true} />
      </MapboxGL.MapView>
      <Reanimated.View entering={FadeIn} style={styles.overlay}>
        <Text style={styles.title}>Hubba Spots</Text>
        {spots.slice(0, 3).map((spot) => (
          <Pressable
            key={spot.id}
            style={styles.spotCard}
            onPress={() => checkInMutation.mutate(spot.id)}
          >
            <Text style={styles.spotName}>{spot.name}</Text>
            <Text style={styles.distance}>
              {userLocation
                ? `${haversine(userLocation, spot.geo).toFixed(0)}m`
                : "?"}
            </Text>
          </Pressable>
        ))}
      </Reanimated.View>
      <ImageBackground
        source={require("../../assets/bg/hubbagraffwall.webp")}
        style={StyleSheet.absoluteFill}
        blurRadius={3}
        opacity={0.15}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SKATE.colors.ink },
  map: { flex: 1 },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: SKATE.colors.neon,
  },
  avatar: { width: "100%", height: "100%" },
  overlay: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: `${SKATE.colors.grime}dd`,
    borderRadius: SKATE.radius.xl,
    padding: 16,
    borderWidth: 2,
    borderColor: SKATE.colors.neon,
  },
  title: {
    color: SKATE.colors.neon,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },
  spotCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: SKATE.colors.neon + "40",
  },
  spotName: { color: "#fff", fontSize: 16 },
  distance: { color: SKATE.colors.gold },
  spotMarker: {
    backgroundColor: SKATE.colors.blood,
    borderRadius: 20,
    padding: 4,
  },
  markerText: { color: "white", fontSize: 20 },
});

function haversine(
  a: [number, number],
  b: { lat: number; lng: number },
): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(b.lat - a[1]);
  const dLon = toRad(b.lng - a[0]);
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
