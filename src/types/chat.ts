export interface Message {
  id: number;
  content: string;
  type: 'user' | 'bot';
  timestamp: string;
}

export interface Conversation {
  id: number;
  messages: Message[];
  lastUpdated: string;
}

export interface ChatResponse {
  response: string;
  error?: string | null;
  confidence: number;
}

export interface CVContent {
  sections: {
    contact: string;
    experience: string;
    skills: string;
    education: string;
    projects: string;
    internship?: string;
  };
}