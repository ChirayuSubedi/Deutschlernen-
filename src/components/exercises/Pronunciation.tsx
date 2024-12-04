import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface PronunciationProps {
  word: string;
  translation: string;
  audioUrl: string;
  points: number;
  onComplete: () => void;
}

export const Pronunciation: React.FC<PronunciationProps> = ({
  word,
  translation,
  audioUrl,
  points,
  onComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const addPoints = useAuthStore((state) => state.addPoints);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      // In a real app, we'd implement speech recognition here
      setTimeout(() => {
        stopRecording();
      }, 3000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Simulate pronunciation feedback
    const isCorrect = Math.random() > 0.3;
    if (isCorrect) {
      setFeedback('Great pronunciation!');
      addPoints(points);
    } else {
      setFeedback('Try again - focus on the vowel sounds');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">{word}</h3>
        <p className="text-gray-600">{translation}</p>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => new Audio(audioUrl).play()}
          className="px-6 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
        >
          Listen to Pronunciation
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-6 rounded-full ${
            isRecording ? 'bg-red-100 text-red-600' : 'bg-blue-600 text-white'
          }`}
        >
          {isRecording ? (
            <Square className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </button>
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-lg font-medium text-gray-700"
        >
          {feedback}
        </motion.div>
      )}
    </motion.div>
  );
};