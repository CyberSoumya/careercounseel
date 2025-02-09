export interface Assessment {
  id: string;
  question: string;
  options: string[];
}

export interface UserState {
  currentAssessment: string;
  mbtiAnswers: Record<string, string>;
  careerAnswers: Record<string, string>;
  emotionalState: string;
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}