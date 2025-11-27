import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { FlatList, Text, View } from "react-native";
import { db } from "@/lib/firebase";
import { SKATE } from "@/theme";

interface User {
  id: string;
  handle: string;
  stats?: {
    skateWins?: number;
    skateLosses?: number;
  };
}

export default function SkateLeaderboard() {
  const { data: leaderboard } = useQuery({
    queryKey: ["skate-leaderboard"],
    queryFn: async () => {
      const snap = await getDocs(
        query(
          collection(db, "users"),
          orderBy("stats.skateWins", "desc"),
          limit(50),
        ),
      );
      return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as User[];
    },
  });

  return (
    <FlatList
      style={{ backgroundColor: SKATE.colors.ink, flex: 1 }}
      data={leaderboard}
      renderItem={({ item, index }) => (
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            backgroundColor:
              index === 0 ? SKATE.colors.gold : SKATE.colors.grime,
          }}
        >
          <Text style={{ color: SKATE.colors.ink, fontWeight: "900" }}>
            #{index + 1}
          </Text>
          <Text style={{ marginLeft: 16, color: "#fff" }}>@{item.handle}</Text>
          <Text style={{ marginLeft: "auto", color: SKATE.colors.neon }}>
            {item.stats?.skateWins || 0}W - {item.stats?.skateLosses || 0}L
          </Text>
        </View>
      )}
    />
  );
}
