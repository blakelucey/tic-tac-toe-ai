import { useEffect, useEffectEvent } from 'react';

import { CPU_PLAYER, CPU_THINKING_DELAY_MS } from '../lib/gameConfig';
import { useGameStore } from '../store/gameStore';

export function useCpuTurn() {
  const shouldCpuPlay = useGameStore(
    (state) =>
      state.currentPlayer === CPU_PLAYER &&
      state.status === 'in_progress' &&
      !state.isCpuThinking,
  );
  const beginCpuTurn = useGameStore((state) => state.beginCpuTurn);
  const executeCpuMove = useGameStore((state) => state.executeCpuMove);

  const runCpuMove = useEffectEvent(() => {
    executeCpuMove();
  });

  useEffect(() => {
    if (!shouldCpuPlay) {
      return undefined;
    }

    beginCpuTurn();

    const timeoutId = setTimeout(() => {
      runCpuMove();
    }, CPU_THINKING_DELAY_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [beginCpuTurn, shouldCpuPlay]);
}
