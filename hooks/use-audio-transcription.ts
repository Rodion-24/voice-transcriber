import apiInstance from '@/services/api';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export interface TranscriptionResult {
  text: string;
  vtt?: string;
  wordCount?: number;
  words?: { word: string; start: number; end: number }[];
}

export interface UseAudioTranscriptionResult {
  transcribedText: string;
  isTranscribing: boolean;
  error: string | null;
  transcribe: (audioUri: string) => Promise<void>;
  clearTranscription: () => void;
}

export const useAudioTranscription = (): UseAudioTranscriptionResult => {
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transcribe = useCallback(async (audioUri: string) => {
    if (!audioUri || isTranscribing) return;

    setIsTranscribing(true);
    setError(null);

    try {
      const response = await fetch(audioUri);
      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error('Audio file is empty. Try recording for longer.');
      }

      const arrayBuffer = await new Response(blob).arrayBuffer();

      const apiResponse = await apiInstance.post<{
        result: TranscriptionResult;
        success: boolean;
        errors?: { message: string }[];
      }>('/ai/run/@cf/openai/whisper', arrayBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        timeout: 30000,
      });

      if (apiResponse.data?.result?.text) {
        setTranscribedText(apiResponse.data.result.text);
      } else if (!apiResponse.data?.success) {
        throw new Error(apiResponse.data?.errors?.[0]?.message || 'Transcription failed');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.errors?.[0]?.message || err.message || 'Unknown error';
      setError(errorMessage);
      Alert.alert('Transcription Error', errorMessage);
    } finally {
      setIsTranscribing(false);
    }
  }, [isTranscribing]);

  const clearTranscription = useCallback(() => {
    setTranscribedText('');
    setError(null);
  }, []);

  return {
    transcribedText,
    isTranscribing,
    error,
    transcribe,
    clearTranscription,
  };
};