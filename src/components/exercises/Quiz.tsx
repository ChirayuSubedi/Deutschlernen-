import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';

interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
  onComplete: () => void;
}

export const Quiz: React.FC<QuizProps> = ({
  question,
  options,
  correctAnswer,
  points,
  onComplete,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const addPoints = useAuthStore((state) => state.addPoints);

  const handleSubmit = () => {
    if (!selected) return;
    setShowResult(true);
    if (selected === correctAnswer) {
      addPoints(points);
    }
    setTimeout(onComplete, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4">{question}</h3>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => !showResult && setSelected(option)}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              selected === option
                ? 'bg-blue-100 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100'
            } ${
              showResult &&
              option === correctAnswer &&
              'bg-green-100 border-green-500'
            } ${
              showResult &&
              selected === option &&
              option !== correctAnswer &&
              'bg-red-100 border-red-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!selected || showResult}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
      >
        Submit Answer
      </button>
    </motion.div>
  );
};