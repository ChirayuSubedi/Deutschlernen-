import React from 'react';
import { motion } from 'framer-motion';
import { Book, Video, MessageCircle, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const courses = [
  {
    id: 'a1-basics',
    level: 'A1',
    title: 'German Basics',
    description: 'Start your German journey with essential vocabulary and grammar.',
    modules: 12,
    duration: '6 weeks',
    icon: Book,
  },
  {
    id: 'a2-everyday',
    level: 'A2',
    title: 'Everyday German',
    description: 'Learn to communicate in daily situations with confidence.',
    modules: 10,
    duration: '8 weeks',
    icon: MessageCircle,
  },
  {
    id: 'b1-intermediate',
    level: 'B1',
    title: 'Intermediate German',
    description: 'Advance your skills with complex grammar and vocabulary.',
    modules: 15,
    duration: '10 weeks',
    icon: Video,
  },
  {
    id: 'b2-advanced',
    level: 'B2',
    title: 'Advanced Communication',
    description: 'Master advanced topics and business German.',
    modules: 14,
    duration: '12 weeks',
    icon: Award,
  },
];

export default function CoursesPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">German Courses</h1>
          <p className="text-xl text-gray-600">Choose your learning path and start your journey to fluency</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    Level {course.level}
                  </span>
                  <course.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                  <span>{course.modules} modules</span>
                  <span>{course.duration}</span>
                </div>
                <Link
                  to={`/course/${course.id}`}
                  className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {user?.level === course.level ? 'Continue Course' : 'Start Course'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}