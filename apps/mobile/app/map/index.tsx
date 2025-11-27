import MapboxGL from "@rnmapbox/maps";
import { db } from "@skatehubba/utils";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { StyleSheet, View } from "react-native";

// Ensure you have your token set in .env or config
MapboxGL.setAccessToken(
  process.env.EXPO_PUBLIC_MAPBOX_TOKEN ||
    "pk.eyJ1Ijoic2thdGVodWJiYSIsImEiOiJjbH...EXAMPLE",
);

export default function MapScreen() {
  const { data: spots } = useQuery({
    queryKey: ["spots"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "spots"));
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as any);
    },
  });

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={12} centerCoordinate={[-122.41, 37.78]} />
        {spots?.map((spot: any) => (
          <MapboxGL.PointAnnotation
            key={spot.id}
            id={spot.id}
            coordinate={[spot.geo.lng, spot.geo.lat]}
          />
        ))}
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
