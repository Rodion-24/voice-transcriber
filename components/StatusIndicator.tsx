import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

interface StatusIndicatorProps {
  isRecording: boolean;
  isProcessing: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isRecording,
  isProcessing,
}) => {
  if (isRecording) {
    return (
      <View style={styles.recordingIndicator}>
        <View style={styles.recordingDot} />
        <Text style={styles.recordingText}>Recording...</Text>
      </View>
    );
  }

  if (isProcessing) {
    return (
      <View style={styles.processingContainer}>
        <ActivityIndicator size="small" color="#3b82f6" />
        <Text style={styles.processingText}>Processing your audio...</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fee2e2',
    borderRadius: 20,
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
    marginRight: 8,
  },
  recordingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#eff6ff',
    borderRadius: 20,
    alignSelf: 'center',
  },
  processingText: {
    fontSize: 15,
    color: '#3b82f6',
    marginLeft: 10,
    fontWeight: '600',
  },
});