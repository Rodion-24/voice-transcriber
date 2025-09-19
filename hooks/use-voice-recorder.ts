import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated } from 'react-native';

export interface UseVoiceRecorderResult {
  isRecording: boolean;
  hasPermission: boolean;
  pulseAnimation: Animated.Value;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
}

export const useVoiceRecorder = (): UseVoiceRecorderResult => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  
  const [hasPermission, setHasPermission] = useState(false);
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const setupAudioMode = async () => {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        setHasPermission(status.granted);
        
        if (!status.granted) {
          Alert.alert('Permission Required', 'Microphone permission is required to record audio');
          return;
        }

        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
        });
      } catch (error) {
        console.error('Error setting up audio mode:', error);
      }
    };

    setupAudioMode();
  }, []);

  const startRecording = useCallback(async () => {
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Microphone permission is required to record audio');
      return;
    }

    try {
      await audioRecorder.prepareToRecordAsync();
      await audioRecorder.record();
      
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } catch (error) {
      Alert.alert('Error', `Failed to start recording: ${error}`);
    }
  }, [audioRecorder, hasPermission, pulseAnimation]);

  const stopRecording = useCallback(async () => {
    try {
      pulseAnimation.stopAnimation();
      Animated.timing(pulseAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      
      await audioRecorder.stop();
      
      if (audioRecorder.uri) {
        return audioRecorder.uri;
      }
    } catch (error) {
      Alert.alert('Error', `Failed to stop recording: ${error}`);
    }
    
    return null;
  }, [audioRecorder, pulseAnimation]);

  return {
    isRecording: recorderState.isRecording,
    hasPermission,
    pulseAnimation,
    startRecording,
    stopRecording,
  };
};