import React from 'react';
import { motion } from 'framer-motion';
import { Book, MessageCircle, Video } from 'lucide-react';

interface VocabularyItem {
  german: string;
  english: string;
}

interface LessonContentProps {
  content: {
    vocabulary?: VocabularyItem[];
    phrases?: VocabularyItem[];
    grammar?: any[];
    exercises?: any[];
    dialogue?: VocabularyItem[];
    questions?: any[];
  };
  type: 'video' | 'exercise' | 'quiz';
}

export const LessonContent: React.FC<LessonContentProps> = ({ content, type }) => {
  const renderVocabulary = (items: VocabularyItem[]) => (
    <div className="space-y-2">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex justify-between p-3 bg-gray-50 rounded-lg"
        >
          <span className="font-medium">{item.german}</span>
          <span className="text-gray-600">{item.english}</span>
        </motion.div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (content.vocabulary) {
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Vocabulary</h3>
          {renderVocabulary(content.vocabulary)}
        </div>
      );
    }

    if (content.phrases) {
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Key Phrases</h3>
          {renderVocabulary(content.phrases)}
        </div>
      );
    }

    if (content.dialogue) {
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Dialogue</h3>
          {renderVocabulary(content.dialogue)}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        {type === 'video' && <Video className="w-6 h-6 text-blue-600" />}
        {type === 'exercise' && <Book className="w-6 h-6 text-green-600" />}
        {type === 'quiz' && <MessageCircle className="w-6 h-6 text-purple-600" />}
        <h2 className="text-xl font-semibold">Lesson Content</h2>
      </div>
      {renderContent()}
    </div>
  );
};