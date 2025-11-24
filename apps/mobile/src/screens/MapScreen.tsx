import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// 1. Mock Data (Ideally this comes from your backend later)
const SKATE_SPOTS = [
  { id: 1, title: 'Beverly Hills Skate Park', type: 'park', lat: 34.0736, lng: -118.4004 },
  { id: 2, title: 'Downtown Skate Shop', type: 'shop', lat: 34.0710, lng: -118.3950 },
  { id: 3, title: 'Hidden Hubba', type: 'spot', lat: 34.0750, lng: -118.4050 },
];

// 2. The "Retro Green" Map Style
const MAP_STYLE = [
  { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },
  { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
  { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#2e4e3a" }] }, // The Green tint
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#2e4e3a" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }
];

export default function MapScreen() {
  const [selectedSpot, setSelectedSpot] = useState(null);

  // 3. User Location (Defaulting to LA for demo)
  const initialRegion = {
    latitude: 34.0736,
    longitude: -118.4004,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  return (
    <View style={styles.container}>
      {/* Top HUD */}
      <View style={styles.hudTop}>
        <View style={styles.avatarCircle}><Text style={styles.hudText}>92</Text></View>
        <View style={styles.compass}><Text style={styles.hudText}>N</Text></View>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={MAP_STYLE}
        initialRegion={initialRegion}
      >
        {SKATE_SPOTS.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.lat, longitude: spot.lng }}
            onPress={() => setSelectedSpot(spot)}
          >
            {/* Custom Marker UI */}
            <View style={styles.markerContainer}>
               {/* Replace this View with your <Image /> when assets are ready */}
              <View style={[styles.markerIcon, spot.type === 'shop' ? styles.shopIcon : styles.parkIcon]} />
              <Text style={styles.markerText}>{spot.title}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Bottom HUD */}
      <View style={styles.hudBottom}>
        <TouchableOpacity style={styles.button}><Text style={styles.btnText}>MENU</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.btnText}>SESSIONS</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.btnText}>BAG</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  map: { width: '100%', height: '100%' },
  
  // HUD Styles
  hudTop: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
  avatarCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#000', borderWidth: 2, borderColor: '#fbbf24', justifyContent: 'center', alignItems: 'center' },
  compass: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#000', borderWidth: 2, borderColor: '#fbbf24', justifyContent: 'center', alignItems: 'center' },
  hudText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // Marker Styles
  markerContainer: { alignItems: 'center' },
  markerIcon: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: '#fbbf24' },
  parkIcon: { backgroundColor: '#0ea5e9' }, // Blue for parks
  shopIcon: { backgroundColor: '#f59e0b' }, // Orange for shops
  markerText: { color: '#fff', fontWeight: 'bold', fontSize: 10, textShadowColor: 'black', textShadowRadius: 2, marginTop: 4 },

  // Bottom Buttons
  hudBottom: { position: 'absolute', bottom: 40, width: '100%', flexDirection: 'row', justifyContent: 'space-around', zIndex: 10 },
  button: { backgroundColor: '#fbbf24', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, borderWidth: 2, borderColor: '#000' },
  btnText: { color: '#000', fontWeight: '900', fontSize: 16, textTransform: 'uppercase' }
});
