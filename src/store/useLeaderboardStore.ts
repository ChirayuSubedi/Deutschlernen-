import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  level: string;
  completedCourses: number;
}

interface LeaderboardState {
  leaderboard: LeaderboardEntry[];
  addUser: (user: LeaderboardEntry) => void;
  updateUser: (userId: string, updates: Partial<LeaderboardEntry>) => void;
  getUserRank: (userId: string) => number;
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  leaderboard: [],
  
  addUser: (user) => set((state) => ({
    leaderboard: [...state.leaderboard, user]
      .sort((a, b) => b.points - a.points)
  })),
  
  updateUser: (userId, updates) => set((state) => ({
    leaderboard: state.leaderboard
      .map((user) => user.id === userId ? { ...user, ...updates } : user)
      .sort((a, b) => b.points - a.points)
  })),
  
  getUserRank: (userId) => {
    const { leaderboard } = get();
    return leaderboard.findIndex((user) => user.id === userId) + 1;
  },
}));