import { create } from 'zustand';
import { courseContent } from '../data/courseContent';

interface CourseProgress {
  courseId: string;
  moduleId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  lastAccessed: Date;
}

interface CourseState {
  enrolledUsers: { [courseId: string]: string[] }; // Array of user IDs enrolled in each course
  userProgress: CourseProgress[];
  currentCourseId: string | null;
  currentModuleId: string | null;
  currentLessonId: string | null;
  enrollUserInCourse: (userId: string, courseId: string) => void;
  getActiveLearnersCount: (courseId: string) => number;
  setCurrentCourse: (courseId: string) => void;
  setCurrentModule: (moduleId: string) => void;
  setCurrentLesson: (lessonId: string) => void;
  completeCourseLesson: (courseId: string, moduleId: string, lessonId: string, score?: number) => void;
  getCourseProgress: (courseId: string) => number;
  getModuleProgress: (courseId: string, moduleId: string) => number;
  canAccessModule: (courseId: string, moduleId: string) => boolean;
  canAccessLesson: (courseId: string, moduleId: string, lessonId: string) => boolean;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  enrolledUsers: {},
  userProgress: [],
  currentCourseId: null,
  currentModuleId: null,
  currentLessonId: null,

  enrollUserInCourse: (userId, courseId) =>
    set((state) => ({
      enrolledUsers: {
        ...state.enrolledUsers,
        [courseId]: [...(state.enrolledUsers[courseId] || []), userId]
      }
    })),

  getActiveLearnersCount: (courseId) => {
    const state = get();
    return state.enrolledUsers[courseId]?.length || 0;
  },

  setCurrentCourse: (courseId) => set({ currentCourseId: courseId }),
  setCurrentModule: (moduleId) => set({ currentModuleId: moduleId }),
  setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId }),

  completeCourseLesson: (courseId, moduleId, lessonId, score) =>
    set((state) => {
      const newProgress = [...state.userProgress];
      const existingProgress = newProgress.find(
        (p) =>
          p.courseId === courseId &&
          p.moduleId === moduleId &&
          p.lessonId === lessonId
      );

      if (existingProgress) {
        existingProgress.completed = true;
        existingProgress.score = score;
        existingProgress.lastAccessed = new Date();
      } else {
        newProgress.push({
          courseId,
          moduleId,
          lessonId,
          completed: true,
          score,
          lastAccessed: new Date(),
        });
      }

      return { userProgress: newProgress };
    }),

  getCourseProgress: (courseId) => {
    const state = get();
    const course = courseContent[courseId as keyof typeof courseContent];
    if (!course?.modules) return 0;

    let completedLessons = 0;
    let totalLessons = 0;

    course.modules.forEach((module) => {
      if (module.lessons) {
        module.lessons.forEach((lesson) => {
          totalLessons++;
          if (
            state.userProgress.find(
              (p) =>
                p.courseId === courseId &&
                p.moduleId === module.id &&
                p.lessonId === lesson.id &&
                p.completed
            )
          ) {
            completedLessons++;
          }
        });
      }
    });

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  },

  getModuleProgress: (courseId, moduleId) => {
    const state = get();
    const course = courseContent[courseId as keyof typeof courseContent];
    if (!course?.modules) return 0;

    const module = course.modules.find((m) => m.id === moduleId);
    if (!module?.lessons) return 0;

    let completedLessons = 0;
    const totalLessons = module.lessons.length;

    module.lessons.forEach((lesson) => {
      if (
        state.userProgress.find(
          (p) =>
            p.courseId === courseId &&
            p.moduleId === moduleId &&
            p.lessonId === lesson.id &&
            p.completed
        )
      ) {
        completedLessons++;
      }
    });

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  },

  canAccessModule: (courseId, moduleId) => {
    const state = get();
    const course = courseContent[courseId as keyof typeof courseContent];
    if (!course?.modules) return false;

    const moduleIndex = course.modules.findIndex((m) => m.id === moduleId);
    if (moduleIndex === 0) return true;

    const previousModule = course.modules[moduleIndex - 1];
    return previousModule ? state.getModuleProgress(courseId, previousModule.id) === 100 : false;
  },

  canAccessLesson: (courseId, moduleId, lessonId) => {
    const state = get();
    const course = courseContent[courseId as keyof typeof courseContent];
    if (!course?.modules) return false;

    const module = course.modules.find((m) => m.id === moduleId);
    if (!module?.lessons) return false;

    const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex === 0) return state.canAccessModule(courseId, moduleId);

    const previousLesson = module.lessons[lessonIndex - 1];
    return previousLesson ? state.userProgress.some(
      (p) =>
        p.courseId === courseId &&
        p.moduleId === moduleId &&
        p.lessonId === previousLesson.id &&
        p.completed
    ) : false;
  },
}));