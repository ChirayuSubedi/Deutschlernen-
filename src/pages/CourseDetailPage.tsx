import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Clock, Award, Users } from 'lucide-react';
import { CourseModule } from '../components/courses/CourseModule';
import { courseContent } from '../data/courseContent';
import { useCourseStore } from '../store/useCourseStore';

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { setCurrentCourse, getCourseProgress, getActiveLearnersCount } = useCourseStore();
  const course = courseId ? courseContent[courseId as keyof typeof courseContent] : null;

  React.useEffect(() => {
    if (courseId) {
      setCurrentCourse(courseId);
    }
  }, [courseId, setCurrentCourse]);

  if (!course || !courseId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
          <button
            onClick={() => navigate('/courses')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Return to Courses
          </button>
        </div>
      </div>
    );
  }

  const totalProgress = getCourseProgress(courseId);
  const activeLearnersCount = getActiveLearnersCount(courseId);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{course.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>{activeLearnersCount} active learners</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Book className="w-5 h-5" />
              <span>{totalProgress}% Complete</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Award className="w-5 h-5" />
              <span>Certificate on completion</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          {course.modules?.map((module) => (
            <CourseModule
              key={module.id}
              courseId={courseId}
              moduleId={module.id}
              title={module.title}
              description={module.description}
              lessons={module.lessons || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}