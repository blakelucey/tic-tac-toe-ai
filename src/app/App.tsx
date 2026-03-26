import { StatusBar } from 'expo-status-bar';

import { AppProviders } from './providers';
import { GameScreen } from '../features/game/screens/GameScreen';

export default function App() {
  return (
    <AppProviders>
      <StatusBar style="light" />
      <GameScreen />
    </AppProviders>
  );
}
