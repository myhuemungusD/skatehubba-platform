import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";

// --- 1. IMPORT THE SCHEMA ---
import type { GameSession } from "@/types/schema";

const MAX_LETTERS = ["S", "K", "A", "T", "E"];

export default function SkateGameScreen() {
  // --- 2. SINGLE SOURCE OF TRUTH STATE ---
  // Instead of separate variables, we use one "GameSession" object.
  const [session, setSession] = useState<GameSession>({
    id: "game_123",
    status: "WAITING", // 'WAITING' | 'ACTIVE' | 'FINISHED'
    players: {
      p1: { uid: "u123", letters: [] }, // You
      p2: { uid: "u456", letters: [] }, // Opponent
    },
    turn: "", // UID of whose turn it is
    createdAt: Date.now(),
  });

  // --- Helpers ---
  const isP1Turn = session.turn === session.players.p1.uid;

  // Who is setting the trick? (The person whose turn it is)
  const _getSetter = () => (isP1Turn ? session.players.p1 : session.players.p2);
  const _getCopier = () => (isP1Turn ? session.players.p2 : session.players.p1);
  const getSetterName = () => (isP1Turn ? "YOU" : "OPPONENT");
  const _getCopierName = () => (isP1Turn ? "OPPONENT" : "YOU");

  // --- Game Actions ---
  const handleRoshambo = (winner: "p1" | "p2") => {
    Vibration.vibrate(50);
    const winnerUid = session.players[winner].uid;

    setSession((prev) => ({
      ...prev,
      status: "ACTIVE",
      turn: winnerUid,
    }));
  };

  const _handleLand = () => {
    Vibration.vibrate(20);
    // If Setter lands, Copier must copy. Turn stays with Setter.
    // If Copier lands, they successfully defended. Turn goes back to Setter?
    // (Standard Rules: Copier lands -> Game continues, Setter sets again.
    // If Copier misses -> Copier gets letter, Setter sets again.
    // If Setter misses -> Turn passes to Copier.)

    // Simplification for UI demo:
    // We need a sub-state for "Is this a Set or a Copy attempt?"
    // For now, let's assume this button means "The Active Player Landed"

    // Ideally, we'd add 'phase': 'SETTING' | 'COPYING' to the schema,
    // but for now let's just vibrate.
  };

  const handleMiss = () => {
    Vibration.vibrate([0, 100, 50, 100]);

    // 1. Identify who just missed
    const _currentTurnUid = session.turn;

    // Logic:
    // If I am Setting and I miss -> Turn goes to Opponent.
    // If I am Copying and I miss -> I get a letter. Turn stays with Opponent.

    // For this UI Demo, let's implement a simple "Toggle Turn" to show state changes
    const nextTurnUid = isP1Turn
      ? session.players.p2.uid
      : session.players.p1.uid;

    setSession((prev) => ({
      ...prev,
      turn: nextTurnUid,
    }));
  };

  const addLetterToPlayer = (target: "p1" | "p2") => {
    // This is how you cleanly update nested state
    setSession((prev) => {
      const currentLetters = prev.players[target].letters;
      const nextLetter = MAX_LETTERS[currentLetters.length];

      if (!nextLetter) return prev; // Already lost

      const newLetters = [...currentLetters, nextLetter];

      // Check Game Over
      if (newLetters.length === 5) {
        return {
          ...prev,
          players: {
            ...prev.players,
            [target]: { ...prev.players[target], letters: newLetters },
          },
          status: "FINISHED",
          winner: target === "p1" ? prev.players.p2.uid : prev.players.p1.uid,
        };
      }

      return {
        ...prev,
        players: {
          ...prev.players,
          [target]: { ...prev.players[target], letters: newLetters },
        },
      };
    });
  };

  const resetGame = () => {
    setSession({
      id: "new_game",
      status: "WAITING",
      players: {
        p1: { uid: "u123", letters: [] },
        p2: { uid: "u456", letters: [] },
      },
      turn: "",
      createdAt: Date.now(),
    });
  };

  // --- Renders ---
  const renderScoreboard = (
    label: string,
    letters: string[],
    isActive: boolean,
  ) => (
    <View style={[styles.playerRow, isActive && styles.activePlayerRow]}>
      <View style={styles.playerInfo}>
        <Text style={[styles.playerName, isActive && styles.activeName]}>
          {label}
          {isActive && <Text style={styles.turnIndicator}> •</Text>}
        </Text>
      </View>

      <View style={styles.lettersContainer}>
        {MAX_LETTERS.map((letter, index) => {
          const hasLetter = letters.length > index;
          return (
            <Text
              key={index}
              style={[styles.skateLetter, hasLetter && styles.activeLetter]}
            >
              {letter}
            </Text>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#1a1a1a", "#000"]} style={styles.background} />

      {/* Header */}
      <SafeAreaView style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={resetGame}>
            <Ionicons name="refresh-circle" size={28} color="#666" />
          </TouchableOpacity>
          <Text style={styles.gameTitle}>GAME OF S.K.A.T.E.</Text>
          <TouchableOpacity>
            <Ionicons name="settings-sharp" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Scoreboards (Driven by session state) */}
        <View style={styles.scoreboardArea}>
          {renderScoreboard("YOU", session.players.p1.letters, isP1Turn)}
          {renderScoreboard("OPPONENT", session.players.p2.letters, !isP1Turn)}
        </View>
      </SafeAreaView>

      {/* Arena */}
      <View style={styles.arena}>
        {session.status === "WAITING" ? (
          <View style={styles.centerMessage}>
            <Text style={styles.instruction}>WHO STARTS?</Text>
            <View style={styles.roshamboRow}>
              <TouchableOpacity
                onPress={() => handleRoshambo("p1")}
                style={styles.roshamboBtn}
              >
                <Text style={styles.btnText}>ME</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRoshambo("p2")}
                style={styles.roshamboBtn}
              >
                <Text style={styles.btnText}>THEY DO</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : session.status === "FINISHED" ? (
          <View style={styles.centerMessage}>
            <Ionicons name="trophy" size={64} color="#F59E0B" />
            <Text style={styles.winnerTitle}>
              {session.winner === session.players.p1.uid
                ? "YOU WON!"
                : "YOU LOST"}
            </Text>
            <TouchableOpacity onPress={resetGame} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>RUN IT BACK</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // ACTIVE GAMEPLAY
          <View style={styles.activePlayContainer}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{getSetterName()}'S TURN</Text>
            </View>

            <View style={styles.controlsGrid}>
              {/* DEBUG BUTTONS FOR DEMO: 
                  In a real game, landing/missing logic is complex. 
                  Here we just manually give letters to test the UI.
               */}
              <TouchableOpacity
                style={[styles.actionBtn, styles.missBtn]}
                onPress={() => addLetterToPlayer(isP1Turn ? "p1" : "p2")}
                activeOpacity={0.7}
              >
                <Text style={styles.missText}>ADD LETTER</Text>
                <Text style={styles.subText}>(Debug: Give Letter)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.landBtn]}
                onPress={handleMiss} // Swaps turn in our simple logic
                activeOpacity={0.7}
              >
                <Text style={styles.landText}>SWAP TURN</Text>
                <Text style={styles.subText}>(Debug: Next Player)</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  background: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  header: {
    paddingTop: 10,
    backgroundColor: "#090909",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    zIndex: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gameTitle: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 2,
    fontStyle: "italic",
  },
  scoreboardArea: { paddingBottom: 20, paddingHorizontal: 15 },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "transparent",
  },
  activePlayerRow: { backgroundColor: "#1A1A1A", borderColor: "#333" },
  playerInfo: { flex: 1 },
  playerName: { color: "#888", fontSize: 18, fontWeight: "700" },
  activeName: { color: "#FFF" },
  turnIndicator: { color: "#4ADE80" },
  lettersContainer: { flexDirection: "row", gap: 8 },
  skateLetter: { fontSize: 24, fontWeight: "900", color: "#222" },
  activeLetter: { color: "#EF4444" },
  arena: { flex: 1, justifyContent: "center", alignItems: "center" },
  centerMessage: { alignItems: "center", gap: 20 },
  instruction: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  roshamboRow: { flexDirection: "row", gap: 20 },
  roshamboBtn: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  btnText: { color: "#FFF", fontWeight: "bold" },
  winnerTitle: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 20,
    textTransform: "uppercase",
  },
  primaryBtn: {
    backgroundColor: "#FFF",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  primaryBtnText: { color: "#000", fontSize: 16, fontWeight: "900" },
  activePlayContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  statusBadge: {
    alignSelf: "center",
    backgroundColor: "#222",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: "auto",
    marginTop: 40,
  },
  statusText: {
    color: "#CCC",
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontSize: 12,
  },
  controlsGrid: {
    flexDirection: "row",
    height: 200,
    gap: 10,
    paddingHorizontal: 10,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  missBtn: { backgroundColor: "#1F1F1F", borderWidth: 1, borderColor: "#333" },
  landBtn: { backgroundColor: "#FFF" },
  missText: {
    color: "#EF4444",
    fontSize: 24,
    fontWeight: "900",
    fontStyle: "italic",
  },
  landText: {
    color: "#000",
    fontSize: 24,
    fontWeight: "900",
    fontStyle: "italic",
  },
  subText: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "600",
    opacity: 0.6,
    color: "inherit",
  },
});
