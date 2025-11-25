import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';

// --- Imports from your setup ---
import { SkateSpot } from '../types/schema';
import { db } from '../lib/firebase'; // <--- Now connecting to real DB

export default function MapScreen() {
  const [spots, setSpots] = useState<SkateSpot[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH REAL DATA ---
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'spots'));
        const realSpots: SkateSpot[] = [];
        
        querySnapshot.forEach((doc) => {
          realSpots.push(doc.data() as SkateSpot);
        });

        setSpots(realSpots);
      } catch (error) {
        console.error("Error fetching spots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={styles.loadingText}>Scouting Spots...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: 33.6189, 
          longitude: -117.6749,
          latitudeDelta: 20, // Zoomed out to see the world
          longitudeDelta: 20,
        }}
      >
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={spot.location}
          >
            <View style={[styles.markerBase, spot.type === 'DIY' ? styles.markerDIY : styles.markerStreet]}>
               <Ionicons name="location" size={20} color="white" />
            </View>

            <Callout tooltip onPress={() => router.push(`/spot/${spot.id}`)}>
               <View style={styles.calloutBubble}>
                 <Text style={styles.calloutTitle}>{spot.name}</Text>
                 <Text style={styles.calloutType}>{spot.type} • {spot.difficulty}</Text>
                 <View style={styles.calloutBtn}>
                    <Text style={styles.calloutBtnText}>CHECK IN</Text>
                 </View>
               </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/profile/me')}>
         <Ionicons name="person" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  loadingContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#FFF', marginTop: 10, fontWeight: 'bold' },
  
  markerBase: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3,
  },
  markerStreet: { backgroundColor: '#F59E0B' },
  markerDIY: { backgroundColor: '#EF4444' },
  
  calloutBubble: {
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 1,
  },
  calloutTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  calloutType: { color: '#888', fontSize: 10, textTransform: 'uppercase', marginBottom: 8 },
  calloutBtn: { backgroundColor: '#FFF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4 },
  calloutBtnText: { color: '#000', fontWeight: '900', fontSize: 10 },

  fab: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#000',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 5,
  }
});