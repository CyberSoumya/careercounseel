import { create } from 'zustand';
import type { UserState } from '../types';

const useStore = create<UserState>((set) => ({
  currentAssessment: '',
  mbtiAnswers: {},
  careerAnswers: {},
  emotionalState: 'neutral',
  recommendations: [],
  setCurrentAssessment: (assessment: string) => set({ currentAssessment: assessment }),
  setMbtiAnswer: (questionId: string, answer: string) =>
    set((state) => ({
      mbtiAnswers: { ...state.mbtiAnswers, [questionId]: answer },
    })),
  setCareerAnswer: (questionId: string, answer: string) =>
    set((state) => ({
      careerAnswers: { ...state.careerAnswers, [questionId]: answer },
    })),
  setEmotionalState: (state: string) => set({ emotionalState: state }),
  setRecommendations: (recommendations: string[]) => set({ recommendations }),
}));

export default useStore;