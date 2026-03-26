import { useEffect } from 'react';

import { CPU_PLAYER, CPU_THINKING_DELAY_MS } from '../lib/gameConfig';
import { useGameStore } from '../store/gameStore';

export function useCpuTurn() {
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const status = useGameStore((state) => state.status);
  const beginCpuTurn = useGameStore((state) => state.beginCpuTurn);
  const executeCpuMove = useGameStore((state) => state.executeCpuMove);

  useEffect(() => {
    const shouldScheduleCpuTurn =
      currentPlayer === CPU_PLAYER && status === 'in_progress';

    if (!shouldScheduleCpuTurn) {
      return undefined;
    }

    beginCpuTurn();

    const timeoutId = setTimeout(() => {
      executeCpuMove();
    }, CPU_THINKING_DELAY_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [beginCpuTurn, currentPlayer, executeCpuMove, status]);
}
