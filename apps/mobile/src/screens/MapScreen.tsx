import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// --- 1. IMPORT THE SCHEMA ---
import { SkateSpot } from '../types/schema';

export default function MapScreen() {
  const [selectedSpot, setSelectedSpot] = useState<SkateSpot | null>(null);

  // --- 2. STRICTLY TYPED MOCK DATA ---
  const mockSpots: SkateSpot[] = [
    {
      id: 's1',
      name: 'El Toro High School',
      description: 'The legendary 20 stair. huge rails, massive impact.',
      location: { latitude: 33.6189, longitude: -117.6749 }, // Example coords
      type: 'Street',
      difficulty: 'Gnarly',
      checkedInUsers: ['u123', 'u456'],
      imageUrl: 'https://skatespotter.com/images/eltoro.jpg' 
    },
    {
      id: 's2',
      name: 'Venice Beach Skatepark',
      description: 'Classic snake run and bowls right on the beach.',
      location: { latitude: 33.9850, longitude: -118.4695 },
      type: 'Park',
      difficulty: 'Medium',
      checkedInUsers: ['u789'],
      imageUrl: 'https://skatespotter.com/images/venice.jpg'
    },
    {
      id: 's3',
      name: 'Burnside DIY',
      description: 'Under the bridge. Fast concrete, tight transitions.',
      location: { latitude: 45.5226, longitude: -122.6653 }, // Portland example
      type: 'DIY',
      difficulty: 'Pro',
      checkedInUsers: [],
      imageUrl: 'https://skatespotter.com/images/burnside.jpg'
    }
  ];

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: 33.6189, // Centered near first spot
          longitude: -117.6749,
          latitudeDelta: 0.5, // Zoomed out a bit to see multiple
          longitudeDelta: 0.5,
        }}
      >
        {mockSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={spot.location}
            onPress={() => setSelectedSpot(spot)}
          >
            {/* Custom Marker Icon based on Type */}
            <View style={[styles.markerBase, spot.type === 'DIY' ? styles.markerDIY : styles.markerStreet]}>
               <Ionicons name="location" size={20} color="white" />
            </View>

            <Callout tooltip onPress={() => router.push('/map')}>
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

      {/* Floating Action Button (for user centered actions) */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/profile/me')}>
         <Ionicons name="person" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  
  // Custom Marker Styles
  markerBase: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3,
  },
  markerStreet: { backgroundColor: '#F59E0B' }, // Amber
  markerDIY: { backgroundColor: '#EF4444' },    // Red
  
  // Custom Callout Styles
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
