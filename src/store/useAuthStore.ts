import { create } from 'zustand';
import { useLeaderboardStore } from './useLeaderboardStore';

type UserRole = 'student' | 'admin' | 'pending';
type UserStatus = 'pending' | 'approved' | 'rejected';

interface Course {
  id: string;
  title: string;
  progress: number;
  completed: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  points: number;
  enrolledCourses: Course[];
  completedCourses: Course[];
  progress: {
    grammar: number;
    vocabulary: number;
    pronunciation: number;
    practice: number;
  };
}

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  pendingApprovals: User[];
  login: (user: User) => void;
  logout: () => void;
  updateProgress: (progress: Partial<User['progress']>) => void;
  addPoints: (points: number) => void;
  enrollInCourse: (courseId: string, courseTitle: string) => void;
  completeCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  updateUserProfile: (updates: { name: string; email: string; level: string }) => void;
  // Admin functions
  createUser: (userData: Omit<User, 'id'>) => void;
  deleteUser: (userId: string) => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  enrollUserInCourse: (userId: string, courseId: string, courseTitle: string) => void;
  getAllUsers: () => User[];
  getPendingApprovals: () => User[];
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  users: [],
  isAuthenticated: false,
  pendingApprovals: [],

  login: (user) => {
    set({ user, isAuthenticated: true });
    if (user.role !== 'pending') {
      useLeaderboardStore.getState().addUser({
        id: user.id,
        name: user.name,
        points: user.points,
        level: user.level,
        completedCourses: user.completedCourses?.length || 0
      });
    }
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  updateProgress: (progress) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            progress: { ...state.user.progress, ...progress },
          }
        : null,
    })),

  addPoints: (points) => {
    set((state) => {
      const newPoints = (state.user?.points || 0) + points;
      const updatedUser = state.user
        ? { ...state.user, points: newPoints }
        : null;

      if (updatedUser) {
        useLeaderboardStore.getState().updateUser(updatedUser.id, {
          points: newPoints
        });
      }

      return { user: updatedUser };
    });
  },

  enrollInCourse: (courseId, courseTitle) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            enrolledCourses: [
              ...(state.user.enrolledCourses || []),
              { id: courseId, title: courseTitle, progress: 0, completed: false },
            ],
          }
        : null,
    })),

  completeCourse: (courseId) =>
    set((state) => {
      const updatedUser = state.user
        ? {
            ...state.user,
            completedCourses: [
              ...(state.user.completedCourses || []),
              state.user.enrolledCourses.find((c) => c.id === courseId)!,
            ],
            enrolledCourses: state.user.enrolledCourses.map((course) =>
              course.id === courseId
                ? { ...course, completed: true, progress: 100 }
                : course
            ),
          }
        : null;

      if (updatedUser) {
        useLeaderboardStore.getState().updateUser(updatedUser.id, {
          completedCourses: updatedUser.completedCourses.length
        });
      }

      return { user: updatedUser };
    }),

  updateCourseProgress: (courseId, progress) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            enrolledCourses: state.user.enrolledCourses.map((course) =>
              course.id === courseId ? { ...course, progress } : course
            ),
          }
        : null,
    })),

  updateUserProfile: (updates) =>
    set((state) => {
      const updatedUser = state.user
        ? {
            ...state.user,
            name: updates.name,
            email: updates.email,
            level: updates.level as User['level'],
          }
        : null;

      if (updatedUser) {
        useLeaderboardStore.getState().updateUser(updatedUser.id, {
          name: updates.name,
          level: updates.level
        });
      }

      return { user: updatedUser };
    }),

  // Admin functions
  createUser: (userData) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    };
    set((state) => ({
      users: [...state.users, newUser],
      pendingApprovals: [...state.pendingApprovals, newUser]
    }));
  },

  deleteUser: (userId) => {
    set((state) => ({
      users: state.users.filter(user => user.id !== userId),
      pendingApprovals: state.pendingApprovals.filter(user => user.id !== userId)
    }));
    useLeaderboardStore.getState().removeUser(userId);
  },

  updateUserRole: (userId, role) => {
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId ? { ...user, role } : user
      )
    }));
  },

  approveUser: (userId) => {
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId ? { ...user, role: 'student', status: 'approved' } : user
      ),
      pendingApprovals: state.pendingApprovals.filter(user => user.id !== userId)
    }));
  },

  rejectUser: (userId) => {
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId ? { ...user, status: 'rejected' } : user
      ),
      pendingApprovals: state.pendingApprovals.filter(user => user.id !== userId)
    }));
  },

  enrollUserInCourse: (userId, courseId, courseTitle) => {
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId ? {
          ...user,
          enrolledCourses: [
            ...(user.enrolledCourses || []),
            { id: courseId, title: courseTitle, progress: 0, completed: false }
          ]
        } : user
      )
    }));
  },

  getAllUsers: () => get().users,
  getPendingApprovals: () => get().pendingApprovals,
}));