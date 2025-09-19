import { RecordButton } from '@/components/RecordButton';
import { StatusIndicator } from '@/components/StatusIndicator';
import { TranscriptionResult } from '@/components/TranscriptionResult';
import { useAudioTranscription } from '@/hooks/use-audio-transcription';
import { useVoiceRecorder } from '@/hooks/use-voice-recorder';
import { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const {
    isRecording,
    hasPermission,
    pulseAnimation,
    startRecording,
    stopRecording,
  } = useVoiceRecorder();

  const {
    transcribedText,
    isTranscribing,
    transcribe,
    clearTranscription,
  } = useAudioTranscription();

  const handleRecordPress = useCallback(async () => {
    if (isRecording) {
      const uri = await stopRecording();
      if (uri) {
        await transcribe(uri);
      }
    } else {
      clearTranscription();
      await startRecording();
    }
  }, [isRecording, startRecording, stopRecording, transcribe, clearTranscription]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🎙️ Voice AI</Text>
          <Text style={styles.subtitle}>
            {hasPermission 
              ? 'Tap to record your voice' 
              : '⚠️ Microphone permission required'}
          </Text>
        </View>
        
        <View style={styles.mainButtonContainer}>
          <RecordButton
            isRecording={isRecording}
            isProcessing={isTranscribing}
            pulseAnimation={pulseAnimation}
            onPress={handleRecordPress}
          />
          
          <StatusIndicator
            isRecording={isRecording}
            isProcessing={isTranscribing}
          />
        </View>
        
        <TranscriptionResult
          text={transcribedText}
          isVisible={!isTranscribing}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: '500',
  },
  mainButtonContainer: {
    alignItems: 'center',
    marginVertical: 50,
  },
});