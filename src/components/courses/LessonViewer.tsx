import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, CheckCircle, RotateCcw, ArrowRight, AlertCircle, Clock, BookOpen, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface LessonViewerProps {
  lesson: any;
  onComplete: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const addPoints = useAuthStore((state) => state.addPoints);

  const playAudio = async (word: string) => {
    try {
      setAudioError(null);
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Audio playback error:', error);
      setAudioError('Unable to play audio. Please try again.');
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const correctAnswers = lesson.content.quiz.filter(
      (q: any, index: number) => selectedAnswers[index] === q.correct
    ).length;
    const totalQuestions = lesson.content.quiz.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    if (score >= 70) { // Pass threshold
      addPoints(10); // Award points for passing
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const renderQuiz = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Quiz</h3>
      <div className="space-y-6">
        {lesson.content.quiz.map((question: any, index: number) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium mb-4">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option: string, optionIndex: number) => (
                <button
                  key={optionIndex}
                  onClick={() => !quizSubmitted && setSelectedAnswers({ ...selectedAnswers, [index]: option })}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    selectedAnswers[index] === option
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-white hover:bg-gray-100'
                  } ${
                    quizSubmitted &&
                    option === question.correct &&
                    'bg-green-100 border-green-500'
                  } ${
                    quizSubmitted &&
                    selectedAnswers[index] === option &&
                    option !== question.correct &&
                    'bg-red-100 border-red-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {quizSubmitted && selectedAnswers[index] !== question.correct && (
              <div className="mt-2 text-sm text-red-600">
                <p className="font-medium">Explanation:</p>
                <p>{question.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!quizSubmitted ? (
        <button
          onClick={handleQuizSubmit}
          disabled={Object.keys(selectedAnswers).length !== lesson.content.quiz.length}
          className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Quiz
        </button>
      ) : (
        <button
          onClick={() => setShowQuiz(false)}
          className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Continue
        </button>
      )}
    </motion.div>
  );

  const renderIntroduction = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4">Introduction</h3>
      <p className="text-gray-700">{lesson.content.introduction}</p>
    </motion.div>
  );

  const renderSections = () => (
    <div className="space-y-8">
      {lesson.content.sections?.map((section: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((item: any, itemIndex: number) => (
              <div key={itemIndex} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-lg font-medium text-blue-600">{item.german}</p>
                    <p className="text-gray-600">{item.english}</p>
                  </div>
                  <button
                    onClick={() => playAudio(item.german)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-medium">Example:</span> {item.example}
                </p>
                {item.usage && (
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Usage:</span> {item.usage}
                  </p>
                )}
                {item.timeUsage && (
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Time:</span> {item.timeUsage}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderCulturalNotes = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4">Cultural Notes</h3>
      <div className="space-y-4">
        {lesson.content.culturalNotes?.map((note: any, index: number) => (
          <div key={index} className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">{note.title}</h4>
            <p className="text-gray-700">{note.content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderPracticeDialogues = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4">Practice Dialogues</h3>
      <div className="space-y-6">
        {lesson.content.practiceDialogues?.map((dialogue: any, index: number) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">{dialogue.title}</h4>
            <div className="space-y-3">
              {dialogue.dialogue.map((line: any, lineIndex: number) => (
                <div key={lineIndex} className="flex items-start space-x-4">
                  <span className="font-medium text-blue-600 min-w-[80px]">{line.speaker}:</span>
                  <div>
                    <p className="text-gray-900">{line.text}</p>
                    <p className="text-sm text-gray-600">{line.translation}</p>
                  </div>
                  <button
                    onClick={() => playAudio(line.text)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{lesson.title}</h2>
          <span className="text-gray-600 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            {lesson.duration}
          </span>
        </div>

        {!showQuiz ? (
          <>
            {renderIntroduction()}
            {renderSections()}
            {renderCulturalNotes()}
            {renderPracticeDialogues()}
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Take Quiz
            </button>
          </>
        ) : (
          renderQuiz()
        )}
      </motion.div>
    </div>
  );
};