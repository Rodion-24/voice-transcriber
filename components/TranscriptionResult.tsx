import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
} from 'react-native';

interface TranscriptionResultProps {
  text: string;
  isVisible: boolean;
}

export const TranscriptionResult: React.FC<TranscriptionResultProps> = ({
  text,
  isVisible,
}) => {
  if (!text || !isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: text ? 1 : 0,
          transform: [{ translateY: text ? 0 : 20 }],
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>✨ Transcription</Text>
      </View>
      <ScrollView style={styles.scroll} nestedScrollEnabled={true}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  scroll: {
    maxHeight: 200,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text: {
    fontSize: 17,
    lineHeight: 26,
    color: '#475569',
    fontWeight: '400',
  },
});