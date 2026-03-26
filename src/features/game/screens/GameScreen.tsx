import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { shadows, textStyles, theme } from '../../../app/theme';
import { DifficultySelector } from '../components/DifficultySelector';
import { GameBoard } from '../components/GameBoard';
import { GameStatusBanner } from '../components/GameStatusBanner';
import { ResetButton } from '../components/ResetButton';
import { SessionStats } from '../components/SessionStats';
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
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const isCpuThinking = useGameStore((state) => state.isCpuThinking);
  const sessionStats = useGameStore((state) => state.sessionStats);
  const winningLine = useGameStore((state) => state.winningLine);
  const makeHumanMove = useGameStore((state) => state.makeHumanMove);
  const resetGame = useGameStore((state) => state.resetGame);
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const isBoardDisabled = useGameStore(selectIsBoardDisabled);
  const statusHeadline = useGameStore(selectStatusHeadline);
  const statusDetail = useGameStore(selectStatusDetail);
  const statusTone = useGameStore(selectStatusTone);

  const boardSize = Math.min(width - theme.spacing.lg * 2, 348);
  const currentRound = sessionStats.rounds + (status === 'in_progress' ? 1 : 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View pointerEvents="none" style={styles.backgroundDecor}>
        <View style={styles.topGlow} />
        <View style={styles.bottomGlow} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(360)} style={styles.hero}>
          <View style={styles.heroMetaRow}>
            <View style={styles.brandBadge}>
              <View style={styles.brandDot} />
              <Text style={styles.brandLabel}>Cheddr arcade</Text>
            </View>
            <View style={styles.readyBadge}>
              <Text style={styles.readyBadgeText}>
                {isCpuThinking ? 'Live' : 'Ready'}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>Tic-Tac-Toe AI</Text>
          <Text style={styles.subtitle}>
            A fast-turn CPU challenge styled like a premium sportsbook promo
            surface: dark, crisp, intentional, and built to feel live.
          </Text>
        </Animated.View>

        <SessionStats currentRound={currentRound} stats={sessionStats} />

        <GameStatusBanner
          detail={statusDetail}
          difficulty={difficulty}
          headline={statusHeadline}
          isCpuThinking={isCpuThinking}
          tone={statusTone}
        />

        <Animated.View
          entering={FadeInDown.delay(120).duration(360)}
          style={[styles.boardCard, shadows.card]}
        >
          <View style={styles.boardHeaderRow}>
            <View>
              <Text style={styles.boardEyebrow}>Live board</Text>
              <Text style={styles.boardTitle}>Head-to-head lane control</Text>
            </View>
            <View style={styles.matchupRow}>
              <View
                style={[
                  styles.matchupChip,
                  currentPlayer === 'X' && styles.matchupChipActive,
                ]}
              >
                <Text style={styles.matchupLabel}>You</Text>
                <Text style={styles.matchupValue}>X</Text>
              </View>
              <View
                style={[
                  styles.matchupChip,
                  styles.cpuChip,
                  currentPlayer === 'O' && styles.cpuChipActive,
                ]}
              >
                <Text style={styles.matchupLabel}>CPU</Text>
                <Text style={[styles.matchupValue, styles.cpuValue]}>O</Text>
              </View>
            </View>
          </View>

          <View style={styles.boardFrame}>
            <GameBoard
              board={board}
              disabled={isBoardDisabled}
              onCellPress={makeHumanMove}
              size={boardSize}
              winningLine={winningLine}
            />
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(160).duration(360)}
          style={[styles.controlsCard, shadows.card]}
        >
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Difficulty market</Text>
            <Text style={styles.sectionBody}>
              Toggle between a quick random opponent and the deterministic
              minimax engine.
            </Text>
            <DifficultySelector
              difficulty={difficulty}
              onChange={setDifficulty}
            />
          </View>

          <View style={styles.footer}>
            <View style={styles.footerCopy}>
              <Text style={styles.footerLabel}>Reset the round</Text>
              <Text style={styles.footerText}>
                {status === 'in_progress'
                  ? 'Start a fresh board instantly with the current difficulty.'
                  : 'Queue the next round and keep the session stats rolling.'}
              </Text>
            </View>
            <ResetButton
              label={status === 'in_progress' ? 'New board' : 'Play again'}
              onPress={() => resetGame()}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backgroundDecor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
  },
  topGlow: {
    position: 'absolute',
    top: -96,
    right: -72,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: theme.colors.backgroundOrbGreen,
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -120,
    left: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: theme.colors.backgroundOrbOrange,
  },
  content: {
    flexGrow: 1,
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
    paddingTop: theme.spacing.sm,
  },
  hero: {
    backgroundColor: theme.colors.backgroundRaised,
    borderRadius: theme.radii.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
    overflow: 'hidden',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  heroMetaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  brandBadge: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  brandDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: theme.colors.accent,
  },
  brandLabel: {
    ...textStyles.sectionLabel,
    color: theme.colors.textSecondary,
  },
  readyBadge: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  readyBadgeText: {
    color: theme.colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    ...textStyles.heroTitle,
  },
  subtitle: {
    ...textStyles.body,
  },
  boardCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  boardHeaderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boardEyebrow: {
    ...textStyles.sectionLabel,
  },
  boardTitle: {
    ...textStyles.cardTitle,
    fontSize: 20,
  },
  boardFrame: {
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.sm,
  },
  matchupRow: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  matchupChip: {
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceStrong,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 2,
    minWidth: 68,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  matchupChipActive: {
    borderColor: theme.colors.accentStrong,
    backgroundColor: theme.colors.accentSoft,
  },
  cpuChip: {
    backgroundColor: theme.colors.surfaceStrong,
  },
  cpuChipActive: {
    borderColor: theme.colors.cpu,
    backgroundColor: theme.colors.cpuSoft,
  },
  matchupLabel: {
    color: theme.colors.textTertiary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  matchupValue: {
    color: theme.colors.textPrimary,
    fontFamily: 'Avenir Next',
    fontSize: 18,
    fontWeight: '700',
  },
  cpuValue: {
    color: theme.colors.cpu,
  },
  controlsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    ...textStyles.sectionLabel,
  },
  sectionBody: {
    ...textStyles.body,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
  },
  footerCopy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  footerLabel: {
    ...textStyles.sectionLabel,
  },
  footerText: {
    ...textStyles.body,
  },
});
