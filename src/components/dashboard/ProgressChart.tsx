import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { useLearningStore } from '../../store/useLearningStore';
import { Book, Award, Star, Clock } from 'lucide-react';

export const ProgressChart = () => {
  const user = useAuthStore((state) => state.user);
  const { exercises } = useLearningStore();

  if (!user) return null;

  const completedCourses = user.completedCourses || [];
  const enrolledCourses = user.enrolledCourses || [];
  const totalPoints = user.points;
  const currentLevel = user.level;

  const calculateProgress = (category: string) => {
    const categoryExercises = exercises.filter(ex => ex.type === category);
    const completed = categoryExercises.filter(ex => ex.completed).length;
    return categoryExercises.length > 0 
      ? Math.round((completed / categoryExercises.length) * 100)
      : 0;
  };

  const progressCategories = [
    { name: 'Grammar', icon: Book, progress: calculateProgress('grammar'), color: 'blue' },
    { name: 'Vocabulary', icon: Star, progress: calculateProgress('vocabulary'), color: 'green' },
    { name: 'Pronunciation', icon: Award, progress: calculateProgress('pronunciation'), color: 'purple' },
    { name: 'Practice', icon: Clock, progress: calculateProgress('practice'), color: 'orange' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Learning Progress</h3>
        <div className="space-y-6">
          {progressCategories.map(({ name, icon: Icon, progress, color }) => (
            <div key={name}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 text-${color}-600`} />
                  <span className="font-medium">{name}</span>
                </div>
                <span className="text-gray-600">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full bg-${color}-600 rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Course Overview</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Current Level</p>
              <p className="text-2xl font-bold text-blue-600">{currentLevel}</p>
            </div>
            <Award className="w-8 h-8 text-blue-600" />
          </div>

          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-green-600">{totalPoints}</p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </div>

          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Courses Completed</p>
              <p className="text-2xl font-bold text-purple-600">{completedCourses.length}</p>
            </div>
            <Book className="w-8 h-8 text-purple-600" />
          </div>

          <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Courses In Progress</p>
              <p className="text-2xl font-bold text-orange-600">
                {enrolledCourses.length - completedCourses.length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};