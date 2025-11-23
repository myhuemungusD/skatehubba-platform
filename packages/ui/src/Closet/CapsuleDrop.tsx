import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Mock types for now
type Capsule = {
  id: string;
  name: string;
  items: string[];
  price: number;
  dropsAt: Date;
  fallbackPrice: number;
  license: string;
};

const PD_CAPSULE: Capsule = {
  id: 'pd-dollin-chaos-2026',
  name: 'PD Dollin Chaos Capsule',
  items: ['hiy-dmc1-pd-pro', 'pd-chaos-tee', 'pd-baker-cross-tee'],
  price: 999, // Hubba Bucks
  dropsAt: new Date('2026-04-20'),
  // NFT-gated path (off-chain metadata only – no blockchain calls)
  // Fallback: purchasable with Hubba Bucks for 100% of users
  fallbackPrice: 1499,
  license: '©2026 Hours Is Yours x Piss Drunx – licensed cosmetic pack',
};

export const CapsuleDrop = ({ userHasNft }: { userHasNft: boolean }) => {
  const isAvailable = new Date() >= PD_CAPSULE.dropsAt;
  const price = userHasNft ? 0 : PD_CAPSULE.fallbackPrice;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{PD_CAPSULE.name}</Text>
      <Text style={styles.license}>{PD_CAPSULE.license}</Text>
      
      <View style={styles.itemsContainer}>
        {PD_CAPSULE.items.map(item => (
          <Text key={item} style={styles.item}>{item}</Text>
        ))}
      </View>

      <View style={styles.actionContainer}>
        {!isAvailable ? (
          <Text style={styles.lockedText}>Drops on {PD_CAPSULE.dropsAt.toLocaleDateString()}</Text>
        ) : (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {price === 0 ? 'Claim Free (NFT Holder)' : `Buy for ${price} HB`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    margin: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  license: {
    color: '#888',
    fontSize: 12,
    marginBottom: 20,
  },
  itemsContainer: {
    marginBottom: 20,
  },
  item: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 5,
  },
  actionContainer: {
    alignItems: 'center',
  },
  lockedText: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ffcc00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
