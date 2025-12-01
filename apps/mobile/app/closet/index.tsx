import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GrittyButton, SKATE } from "@skatehubba/ui";
import { CategoryTabs } from "@/components/CategoryTabs";
import { useAuth } from "@/hooks/useAuth";
import { db, functions, httpsCallable } from "@/lib/firebase";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  imageUrl: string;
  equipped: boolean;
}

interface UserInventory {
  items: InventoryItem[];
  equipped: Record<string, string>; // category -> itemId
}

const CATEGORIES = ["TOP", "BOTTOM", "DECK", "TRUCKS", "WHEELS", "SHOES", "ACCESSORIES"];

async function fetchUserInventory(uid: string): Promise<UserInventory> {
  const inventoryDoc = await getDoc(doc(db, "inventories", uid));
  if (!inventoryDoc.exists()) {
    return { items: [], equipped: {} };
  }
  return inventoryDoc.data() as UserInventory;
}

async function equipItem(uid: string, itemId: string, category: string): Promise<void> {
  const inventoryRef = doc(db, "inventories", uid);
  await updateDoc(inventoryRef, {
    [`equipped.${category}`]: itemId,
  });
}

export default function ClosetScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("top");
  const [tradeModalVisible, setTradeModalVisible] = useState(false);
  const [selectedTradeItem, setSelectedTradeItem] = useState<InventoryItem | null>(null);
  const [tradeRecipient, setTradeRecipient] = useState("");

  // Fetch user inventory
  const { data: inventory, isLoading } = useQuery({
    queryKey: ["inventory", user?.uid],
    queryFn: () => fetchUserInventory(user?.uid ?? ""),
    enabled: !!user?.uid,
  });

  // Equip mutation
  const equipMutation = useMutation({
    mutationFn: ({ itemId, category }: { itemId: string; category: string }) =>
      equipItem(user?.uid ?? "", itemId, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", user?.uid] });
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to equip item. Please try again.");
      console.error("Equip error:", error);
    },
  });

  // Trade mutation
  const tradeMutation = useMutation({
    mutationFn: async ({ itemId, recipientHandle }: { itemId: string; recipientHandle: string }) => {
      const initiateTrade = httpsCallable(functions, "initiateTrade");
      await initiateTrade({ itemId, recipientHandle });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", user?.uid] });
      setTradeModalVisible(false);
      setSelectedTradeItem(null);
      setTradeRecipient("");
      Alert.alert("Trade Initiated", "Your trade request has been sent!");
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to initiate trade. Please try again.");
      console.error("Trade error:", error);
    },
  });

  const handleEquip = (item: InventoryItem) => {
    equipMutation.mutate({ itemId: item.id, category: item.category });
  };

  const handleTradePress = (item: InventoryItem) => {
    setSelectedTradeItem(item);
    setTradeModalVisible(true);
  };

  const handleConfirmTrade = () => {
    if (!selectedTradeItem || !tradeRecipient.trim()) {
      Alert.alert("Error", "Please enter a recipient username.");
      return;
    }
    tradeMutation.mutate({
      itemId: selectedTradeItem.id,
      recipientHandle: tradeRecipient.trim(),
    });
  };

  const filteredItems = inventory?.items.filter(
    (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
  ) ?? [];

  const equippedItemId = inventory?.equipped[activeCategory.toLowerCase()];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={SKATE.colors.neon} />
        <Text style={styles.loadingText}>Loading your closet...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={SKATE.colors.paper} />
        </TouchableOpacity>
        <Text style={styles.title}>MY CLOSET</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Category Tabs */}
      <CategoryTabs
        categories={CATEGORIES}
        activeCategory={activeCategory.toUpperCase()}
        onSelect={setActiveCategory}
      />

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="shirt-outline" size={64} color={SKATE.colors.grime} />
          <Text style={styles.emptyText}>No items in this category</Text>
          <Text style={styles.emptySubtext}>Win games to earn gear!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.gridContainer}
          renderItem={({ item }) => {
            const isEquipped = equippedItemId === item.id;
            return (
              <View style={[styles.itemCard, isEquipped && styles.equippedCard]}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.itemImage}
                  resizeMode="contain"
                />
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.itemBrand}>{item.brand}</Text>

                {isEquipped ? (
                  <View style={styles.equippedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color={SKATE.colors.neon} />
                    <Text style={styles.equippedText}>EQUIPPED</Text>
                  </View>
                ) : (
                  <View style={styles.actionButtons}>
                    <Pressable
                      style={styles.equipBtn}
                      onPress={() => handleEquip(item)}
                      disabled={equipMutation.isPending}
                    >
                      <Text style={styles.equipBtnText}>EQUIP</Text>
                    </Pressable>
                    <Pressable
                      style={styles.tradeBtn}
                      onPress={() => handleTradePress(item)}
                    >
                      <Ionicons name="swap-horizontal" size={16} color={SKATE.colors.gold} />
                    </Pressable>
                  </View>
                )}
              </View>
            );
          }}
        />
      )}

      {/* Trade Modal */}
      <Modal
        visible={tradeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTradeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>INITIATE TRADE</Text>
            {selectedTradeItem && (
              <View style={styles.tradeItemPreview}>
                <Image
                  source={{ uri: selectedTradeItem.imageUrl }}
                  style={styles.tradeItemImage}
                  resizeMode="contain"
                />
                <Text style={styles.tradeItemName}>{selectedTradeItem.name}</Text>
              </View>
            )}
            <TextInput
              style={styles.tradeInput}
              placeholder="Enter recipient username"
              placeholderTextColor={SKATE.colors.grime}
              value={tradeRecipient}
              onChangeText={setTradeRecipient}
              autoCapitalize="none"
            />
            <View style={styles.modalButtons}>
              <GrittyButton onPress={() => setTradeModalVisible(false)}>
                CANCEL
              </GrittyButton>
              <GrittyButton onPress={handleConfirmTrade}>
                {tradeMutation.isPending ? "SENDING..." : "SEND TRADE"}
              </GrittyButton>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SKATE.colors.ink,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: SKATE.colors.ink,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: SKATE.colors.neon,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SKATE.colors.grime,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    width: 40,
  },
  title: {
    color: SKATE.colors.paper,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
    fontStyle: "italic",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    color: SKATE.colors.paper,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  emptySubtext: {
    color: SKATE.colors.grime,
    fontSize: 14,
    marginTop: 8,
  },
  gridContainer: {
    padding: 12,
  },
  itemCard: {
    flex: 1,
    margin: 6,
    backgroundColor: SKATE.colors.grime,
    borderRadius: SKATE.radius.lg,
    padding: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: SKATE.colors.ink,
  },
  equippedCard: {
    borderColor: SKATE.colors.neon,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  itemName: {
    color: SKATE.colors.gold,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  itemBrand: {
    color: SKATE.colors.neon,
    fontSize: 10,
    marginTop: 2,
  },
  equippedBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 4,
  },
  equippedText: {
    color: SKATE.colors.neon,
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },
  equipBtn: {
    backgroundColor: SKATE.colors.blood,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  equipBtnText: {
    color: SKATE.colors.paper,
    fontSize: 10,
    fontWeight: "bold",
  },
  tradeBtn: {
    backgroundColor: SKATE.colors.ink,
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: SKATE.colors.gold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: SKATE.colors.grime,
    borderRadius: SKATE.radius.xl,
    padding: 24,
    alignItems: "center",
    borderWidth: 2,
    borderColor: SKATE.colors.neon,
  },
  modalTitle: {
    color: SKATE.colors.gold,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 20,
  },
  tradeItemPreview: {
    alignItems: "center",
    marginBottom: 20,
  },
  tradeItemImage: {
    width: 80,
    height: 80,
  },
  tradeItemName: {
    color: SKATE.colors.paper,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  tradeInput: {
    width: "100%",
    backgroundColor: SKATE.colors.ink,
    borderRadius: 8,
    padding: 12,
    color: SKATE.colors.paper,
    fontSize: 16,
    borderWidth: 1,
    borderColor: SKATE.colors.gold,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
});
