import React from 'react';
import { motion } from 'framer-motion';
import { Mic, BookOpen, PenTool, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const practiceAreas = [
  {
    id: 'pronunciation',
    title: 'Pronunciation Practice',
    description: 'Perfect your German accent with speech recognition.',
    icon: Mic,
    color: 'blue',
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary Builder',
    description: 'Expand your German vocabulary through interactive exercises.',
    icon: BookOpen,
    color: 'green',
  },
  {
    id: 'grammar',
    title: 'Grammar Exercises',
    description: 'Master German grammar with targeted practice.',
    icon: PenTool,
    color: 'purple',
  },
  {
    id: 'conversation',
    title: 'Conversation Practice',
    description: 'Practice dialogues and improve your speaking skills.',
    icon: MessageSquare,
    color: 'orange',
  },
];

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Practice Area</h1>
          <p className="text-xl text-gray-600">Strengthen your skills with targeted exercises</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practiceAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link to={`/practice/${area.id}`} className="block p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-${area.color}-100`}>
                    <area.icon className={`w-6 h-6 text-${area.color}-600`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Daily Practice Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Pronunciation</h3>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '70%' }} />
              </div>
              <p className="text-sm text-gray-600 mt-2">14/20 exercises completed</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">Vocabulary</h3>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '45%' }} />
              </div>
              <p className="text-sm text-gray-600 mt-2">9/20 words learned</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold mb-2">Grammar</h3>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '30%' }} />
              </div>
              <p className="text-sm text-gray-600 mt-2">6/20 exercises completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}