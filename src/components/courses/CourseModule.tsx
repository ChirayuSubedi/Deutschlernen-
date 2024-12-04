import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, PlayCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCourseStore } from '../../store/useCourseStore';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'exercise' | 'quiz';
  content: any;
  completed: boolean;
  locked: boolean;
}

interface CourseModuleProps {
  courseId: string;
  moduleId: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const CourseModule: React.FC<CourseModuleProps> = ({
  courseId,
  moduleId,
  title,
  description,
  lessons
}) => {
  const { getModuleProgress, canAccessModule, canAccessLesson } = useCourseStore();

  const progress = getModuleProgress(courseId, moduleId);
  const isAccessible = canAccessModule(courseId, moduleId);

  const getIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return PlayCircle;
      case 'exercise':
        return BookOpen;
      default:
        return BookOpen;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-blue-600 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">{progress}% complete</p>
        </div>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson) => {
          const Icon = getIcon(lesson.type);
          const canAccess = canAccessLesson(courseId, moduleId, lesson.id);
          
          return (
            <div
              key={lesson.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                !isAccessible || !canAccess ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    lesson.completed
                      ? 'bg-green-100'
                      : !isAccessible || !canAccess
                      ? 'bg-gray-100'
                      : 'bg-blue-100'
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : !isAccessible || !canAccess ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Icon className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{lesson.title}</h4>
                  <p className="text-sm text-gray-500">{lesson.duration}</p>
                </div>
              </div>
              {(isAccessible && canAccess) && (
                <Link
                  to={`/lesson/${courseId}/${moduleId}/${lesson.id}`}
                  className="px-4 py-1 text-sm bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  {lesson.completed ? 'Review' : 'Start'}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};