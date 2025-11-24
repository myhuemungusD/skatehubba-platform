import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  Vibration,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// --- Types & Game Logic ---
type GameState = 'ROSHAMBO' | 'SETTING' | 'COPYING' | 'GAME_OVER';
type Player = {
  id: string;
  name: string;
  letters: string[]; // ['S', 'K']
  isTurn: boolean;
};

const MAX_LETTERS = ['S', 'K', 'A', 'T', 'E'];

export default function SkateGameScreen() {
  // --- State Machine ---
  const [gameState, setGameState] = useState<GameState>('ROSHAMBO');
  const [turnCount, setTurnCount] = useState(1);
  const [activeTrick, setActiveTrick] = useState<string | null>(null);

  const [p1, setP1] = useState<Player>({ id: 'p1', name: 'You', letters: [], isTurn: true });
  const [p2, setP2] = useState<Player>({ id: 'p2', name: 'Opponent', letters: [], isTurn: false });

  // --- Helpers ---
  const getCurrentSetter = () => (p1.isTurn ? p1 : p2);
  const getCurrentCopier = () => (p1.isTurn ? p2 : p1);

  // --- Game Actions ---
  const handleRoshambo = (winnerId: string) => {
    Vibration.vibrate(50); // Haptic feedback
    if (winnerId === 'p1') {
      setP1({ ...p1, isTurn: true });
      setP2({ ...p2, isTurn: false });
    } else {
      setP1({ ...p1, isTurn: false });
      setP2({ ...p2, isTurn: true });
    }
    setGameState('SETTING');
  };

  const handleLand = () => {
    Vibration.vibrate(20);
    if (gameState === 'SETTING') {
      // Setter landed -> Copier must copy
      setGameState('COPYING');
    } else {
      // Copier landed -> Back to Setter (Rebate/Next Trick)
      setGameState('SETTING');
      setTurnCount(c => c + 1);
    }
  };

  const handleMiss = () => {
    Vibration.vibrate([0, 100, 50, 100]); // Heavy fail vibration
    
    if (gameState === 'SETTING') {
      // Setter missed -> Turn passes
      switchTurn();
      setGameState('SETTING');
    } else {
      // Copier missed -> GETS A LETTER!
      const copier = getCurrentCopier();
      const newLetters = [...copier.letters, MAX_LETTERS[copier.letters.length]];
      
      if (copier.id === 'p1') setP1({ ...p1, letters: newLetters });
      else setP2({ ...p2, letters: newLetters });

      if (newLetters.length === 5) {
        setGameState('GAME_OVER');
      } else {
        // Copier missed, so they stay copier? Or game continues? 
        // Standard rules: Setter keeps setting if copier misses.
        setGameState('SETTING'); 
      }
    }
  };

  const switchTurn = () => {
    setP1(prev => ({ ...prev, isTurn: !prev.isTurn }));
    setP2(prev => ({ ...prev, isTurn: !prev.isTurn }));
  };

  const resetGame = () => {
    setGameState('ROSHAMBO');
    setP1({ ...p1, letters: [], isTurn: true });
    setP2({ ...p2, letters: [], isTurn: false });
    setTurnCount(1);
  };

  // --- Renders ---
  const renderScoreboard = (player: Player) => (
    <View style={[styles.playerRow, player.isTurn && styles.activePlayerRow]}>
      <View style={styles.playerInfo}>
        <Text style={[styles.playerName, player.isTurn && styles.activeName]}>
          {player.name}
          {player.isTurn && <Text style={styles.turnIndicator}> •</Text>}
        </Text>
        <Text style={styles.stanceLabel}>{player.id === 'p1' ? 'Goofy' : 'Regular'}</Text>
      </View>
      
      <View style={styles.lettersContainer}>
        {MAX_LETTERS.map((letter, index) => {
          const hasLetter = player.letters.length > index;
          return (
            <Text key={index} style={[styles.skateLetter, hasLetter && styles.activeLetter]}>
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
      <LinearGradient colors={['#1a1a1a', '#000']} style={styles.background} />

      {/* 1. Header Area */}
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
        
        {/* Scoreboards */}
        <View style={styles.scoreboardArea}>
          {renderScoreboard(p1)}
          {renderScoreboard(p2)}
        </View>
      </SafeAreaView>

      {/* 2. Game Action Area (The "Battle" Zone) */}
      <View style={styles.arena}>
        {gameState === 'ROSHAMBO' ? (
          <View style={styles.centerMessage}>
            <Text style={styles.instruction}>WHO STARTS?</Text>
            <View style={styles.roshamboRow}>
              <TouchableOpacity onPress={() => handleRoshambo('p1')} style={styles.roshamboBtn}>
                <Text style={styles.btnText}>ME</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRoshambo('p2')} style={styles.roshamboBtn}>
                <Text style={styles.btnText}>OPPONENT</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : gameState === 'GAME_OVER' ? (
          <View style={styles.centerMessage}>
            <Ionicons name="trophy" size={64} color="#F59E0B" />
            <Text style={styles.winnerTitle}>
              {p1.letters.length === 5 ? p2.name : p1.name} WINS!
            </Text>
            <TouchableOpacity onPress={resetGame} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>RUN IT BACK</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // ACTIVE GAMEPLAY
          <View style={styles.activePlayContainer}>
             <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {gameState === 'SETTING' ? `${getCurrentSetter().name} is Setting` : `${getCurrentCopier().name} to Copy`}
                </Text>
             </View>

             <View style={styles.controlsGrid}>
               <TouchableOpacity 
                 style={[styles.actionBtn, styles.missBtn]} 
                 onPress={handleMiss}
                 activeOpacity={0.7}
                >
                 <Text style={styles.missText}>BAILED</Text>
                 <Text style={styles.subText}>Turn Over / Letter</Text>
               </TouchableOpacity>

               <TouchableOpacity 
                 style={[styles.actionBtn, styles.landBtn]} 
                 onPress={handleLand}
                 activeOpacity={0.7}
               >
                 <Text style={styles.landText}>LANDED</Text>
                 <Text style={styles.subText}>Clean Roll Away</Text>
               </TouchableOpacity>
             </View>
          </View>
        )}
      </View>
    </View>
  );
}

// --- Street Styles ---
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
  },
  header: {
    paddingTop: 10,
    backgroundColor: '#090909',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    zIndex: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gameTitle: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  scoreboardArea: {
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activePlayerRow: {
    backgroundColor: '#1A1A1A',
    borderColor: '#333',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: '#888',
    fontSize: 18,
    fontWeight: '700',
  },
  activeName: {
    color: '#FFF',
  },
  turnIndicator: {
    color: '#4ADE80', // Green dot for active turn
  },
  stanceLabel: {
    color: '#444',
    fontSize: 10,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  lettersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  skateLetter: {
    fontSize: 24,
    fontWeight: '900',
    color: '#222', // Inactive letter color
  },
  activeLetter: {
    color: '#EF4444', // RED for letters you HAVE
  },
  // Arena
  arena: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerMessage: {
    alignItems: 'center',
    gap: 20,
  },
  instruction: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  roshamboRow: {
    flexDirection: 'row',
    gap: 20,
  },
  roshamboBtn: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  winnerTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 20,
    textTransform: 'uppercase',
  },
  primaryBtn: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  primaryBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
  },
  // Active Play Controls
  activePlayContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  statusBadge: {
    alignSelf: 'center',
    backgroundColor: '#222',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 'auto', // Pushes it to top of flex area
    marginTop: 40,
  },
  statusText: {
    color: '#CCC',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  controlsGrid: {
    flexDirection: 'row',
    height: 200,
    gap: 10,
    paddingHorizontal: 10,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  missBtn: {
    backgroundColor: '#1F1F1F',
    borderWidth: 1,
    borderColor: '#333',
  },
  landBtn: {
    backgroundColor: '#FFF',
  },
  missText: {
    color: '#EF4444',
    fontSize: 28,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  landText: {
    color: '#000',
    fontSize: 28,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  subText: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: '600',
    opacity: 0.6,
    color: 'inherit',
  },
});
