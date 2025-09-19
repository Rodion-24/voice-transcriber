import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Animated,
} from 'react-native';

interface RecordButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  pulseAnimation: Animated.Value;
  onPress: () => void;
}

export const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  isProcessing,
  pulseAnimation,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isProcessing}
    >
      <Animated.View
        style={[
          styles.recordButton,
          isRecording && styles.recordingButton,
          { transform: [{ scale: isRecording ? pulseAnimation : 1 }] }
        ]}
      >
        {isProcessing ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            <View style={[
              styles.micIcon,
              isRecording && styles.micIconRecording
            ]} />
            <Text style={styles.buttonText}>
              {isRecording ? 'Stop' : 'Record'}
            </Text>
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recordButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  recordingButton: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  micIcon: {
    width: 32,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 8,
  },
  micIconRecording: {
    backgroundColor: '#fff',
    opacity: 0.9,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
});