import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, PlayCircle, BookOpen, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface LessonContent {
  type: 'video' | 'text' | 'exercise';
  content: string;
  duration?: string;
}

interface CourseLessonProps {
  title: string;
  description: string;
  content: LessonContent[];
  points: number;
  onComplete: () => void;
}

export const CourseLesson: React.FC<CourseLessonProps> = ({
  title,
  description,
  content,
  points,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const addPoints = useAuthStore((state) => state.addPoints);

  const handleComplete = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      addPoints(points);
      onComplete();
    }
  };

  const renderContent = (item: LessonContent) => {
    switch (item.type) {
      case 'video':
        return (
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-4">
            <div className="flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-blue-600" />
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="prose max-w-none mb-4">
            <p className="text-gray-700">{item.content}</p>
          </div>
        );
      case 'exercise':
        return (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Practice Exercise</h4>
            <p className="text-gray-700">{item.content}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </motion.div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Step {currentStep + 1} of {content.length}
          </h3>
          {content[currentStep].duration && (
            <span className="text-gray-500">
              Duration: {content[currentStep].duration}
            </span>
          )}
        </div>
        {renderContent(content[currentStep])}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 text-blue-600 disabled:text-gray-400"
        >
          Previous
        </button>
        {currentStep < content.length - 1 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-400"
          >
            {isCompleted ? 'Completed' : 'Complete Lesson'}
          </button>
        )}
      </div>
    </div>
  );
};