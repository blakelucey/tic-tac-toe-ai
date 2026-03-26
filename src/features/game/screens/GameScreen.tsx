import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { DifficultySelector } from '../components/DifficultySelector';
import { GameBoard } from '../components/GameBoard';
import { GameStatusBanner } from '../components/GameStatusBanner';
import { ResetButton } from '../components/ResetButton';
import { useCpuTurn } from '../hooks/useCpuTurn';
import {
  selectIsBoardDisabled,
  selectStatusDetail,
  selectStatusHeadline,
  selectStatusTone,
} from '../store/gameSelectors';
import { useGameStore } from '../store/gameStore';

export function GameScreen() {
  useCpuTurn();

  const { width } = useWindowDimensions();
  const board = useGameStore((state) => state.board);
  const difficulty = useGameStore((state) => state.difficulty);
  const status = useGameStore((state) => state.status);
  const winningLine = useGameStore((state) => state.winningLine);
  const makeHumanMove = useGameStore((state) => state.makeHumanMove);
  const resetGame = useGameStore((state) => state.resetGame);
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const isBoardDisabled = useGameStore(selectIsBoardDisabled);
  const statusHeadline = useGameStore(selectStatusHeadline);
  const statusDetail = useGameStore(selectStatusDetail);
  const statusTone = useGameStore(selectStatusTone);

  const boardSize = Math.min(width - 32, 360);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>
            Single-player React Native take-home
          </Text>
          <Text style={styles.title}>Tic-Tac-Toe AI</Text>
          <Text style={styles.subtitle}>
            A small game built with a clean domain layer, deterministic state
            flow, and a CPU opponent with two strategies.
          </Text>
        </View>

        <GameStatusBanner
          detail={statusDetail}
          headline={statusHeadline}
          tone={statusTone}
        />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Difficulty</Text>
          <DifficultySelector
            difficulty={difficulty}
            onChange={setDifficulty}
          />
        </View>

        <View style={styles.boardCard}>
          <GameBoard
            board={board}
            disabled={isBoardDisabled}
            onCellPress={makeHumanMove}
            size={boardSize}
            winningLine={winningLine}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {status === 'in_progress'
              ? 'Tap any open square to place X.'
              : 'Start a fresh round with the current difficulty.'}
          </Text>
          <ResetButton
            label={status === 'in_progress' ? 'New game' : 'Play again'}
            onPress={() => resetGame()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FCFAF7',
  },
  content: {
    flexGrow: 1,
    gap: 20,
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 18,
  },
  hero: {
    backgroundColor: '#16324A',
    borderRadius: 28,
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  eyebrow: {
    color: '#C9D8E5',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Avenir Next',
    fontSize: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: '#DCE7F0',
    fontSize: 15,
    lineHeight: 23,
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    color: '#405161',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  boardCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E6DDD2',
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: '#16324A',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  footer: {
    alignItems: 'center',
    gap: 12,
    marginTop: 'auto',
  },
  footerText: {
    color: '#58687A',
    fontSize: 14,
    textAlign: 'center',
  },
});
