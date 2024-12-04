import { create } from 'zustand';

interface Exercise {
  id: string;
  type: 'quiz' | 'dialogue' | 'grammar' | 'pronunciation';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  content: any;
  completed: boolean;
}

interface LearningState {
  currentExercise: Exercise | null;
  exercises: Exercise[];
  progress: {
    [key: string]: boolean;
  };
  setCurrentExercise: (exercise: Exercise) => void;
  completeExercise: (exerciseId: string) => void;
  loadExercises: (exercises: Exercise[]) => void;
}

export const useLearningStore = create<LearningState>((set) => ({
  currentExercise: null,
  exercises: [],
  progress: {},
  setCurrentExercise: (exercise) => set({ currentExercise: exercise }),
  completeExercise: (exerciseId) =>
    set((state) => ({
      progress: { ...state.progress, [exerciseId]: true },
      exercises: state.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, completed: true } : ex
      ),
    })),
  loadExercises: (exercises) => set({ exercises }),
}));