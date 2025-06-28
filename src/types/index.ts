export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  badges: Badge[];
  streak: number;
  totalSessions: number;
  encryptionKey: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: Date;
  category: 'streak' | 'milestone' | 'achievement' | 'special';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  encrypted: boolean;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: number;
  notes: string;
  timestamp: Date;
  encrypted: boolean;
}

export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  encrypted: boolean;
}

export interface UserSession {
  id: string;
  userId: string;
  type: 'mood' | 'journal' | 'breathing' | 'chat';
  duration: number;
  timestamp: Date;
}