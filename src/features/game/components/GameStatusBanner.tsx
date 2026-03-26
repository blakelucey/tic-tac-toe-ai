import { StyleSheet, Text, View } from 'react-native';

type GameStatusBannerProps = {
  headline: string;
  detail: string;
  tone: 'neutral' | 'success' | 'danger';
};

export function GameStatusBanner({
  headline,
  detail,
  tone,
}: GameStatusBannerProps) {
  return (
    <View
      style={[
        styles.container,
        tone === 'success' && styles.success,
        tone === 'danger' && styles.danger,
      ]}
    >
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4EEE5',
    borderColor: '#D9CDBE',
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  success: {
    backgroundColor: '#E8F5EE',
    borderColor: '#8CC6A2',
  },
  danger: {
    backgroundColor: '#F7EAE6',
    borderColor: '#D5A493',
  },
  headline: {
    color: '#112233',
    fontFamily: 'Avenir Next',
    fontSize: 22,
    fontWeight: '700',
  },
  detail: {
    color: '#4D5C6A',
    fontSize: 15,
    lineHeight: 22,
  },
});
