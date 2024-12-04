import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LessonViewer } from '../components/courses/LessonViewer';
import { courseContent } from '../data/courseContent';
import { useCourseStore } from '../store/useCourseStore';
import { ArrowLeft } from 'lucide-react';

export default function LessonPage() {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { completeCourseLesson, setCurrentCourse, setCurrentModule, setCurrentLesson } = useCourseStore();

  const course = courseContent[courseId as keyof typeof courseContent];
  const module = course?.modules.find(m => m.id === moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  useEffect(() => {
    if (courseId && moduleId && lessonId) {
      setCurrentCourse(courseId);
      setCurrentModule(moduleId);
      setCurrentLesson(lessonId);
    }
  }, [courseId, moduleId, lessonId, setCurrentCourse, setCurrentModule, setCurrentLesson]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Lesson not found</h2>
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

  const handleComplete = () => {
    if (courseId && moduleId && lessonId) {
      completeCourseLesson(courseId, moduleId, lessonId);
      
      // Find next lesson
      const currentLessonIndex = module?.lessons.findIndex(l => l.id === lessonId) ?? -1;
      if (currentLessonIndex < (module?.lessons.length ?? 0) - 1) {
        // Go to next lesson in current module
        const nextLesson = module?.lessons[currentLessonIndex + 1];
        navigate(`/lesson/${courseId}/${moduleId}/${nextLesson?.id}`);
      } else {
        // Find next module
        const currentModuleIndex = course?.modules.findIndex(m => m.id === moduleId) ?? -1;
        if (currentModuleIndex < (course?.modules.length ?? 0) - 1) {
          // Go to first lesson of next module
          const nextModule = course?.modules[currentModuleIndex + 1];
          const firstLesson = nextModule?.lessons[0];
          navigate(`/lesson/${courseId}/${nextModule?.id}/${firstLesson?.id}`);
        } else {
          // Course completed, go to course detail page
          navigate(`/course/${courseId}`);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(`/course/${courseId}`)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </button>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">{module?.title}</h1>
            <p className="text-gray-600 mt-2">{module?.description}</p>
          </div>
        </motion.div>
        
        <LessonViewer lesson={lesson} onComplete={handleComplete} />
      </div>
    </div>
  );
}