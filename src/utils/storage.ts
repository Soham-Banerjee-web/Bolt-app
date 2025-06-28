import { User, MoodEntry, JournalEntry, ChatMessage, UserSession } from '../types';
import { EncryptionService } from './encryption';

export class SecureStorage {
  private static readonly USERS_KEY = 'mindwell_users';
  private static readonly CURRENT_USER_KEY = 'mindwell_current_user';
  private static readonly SESSIONS_KEY = 'mindwell_sessions';

  private static reviveDates(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    
    if (typeof obj === 'string') {
      // Check if string matches ISO 8601 date format
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
      if (isoDateRegex.test(obj)) {
        return new Date(obj);
      }
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.reviveDates(item));
    }
    
    if (typeof obj === 'object') {
      const result: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          result[key] = this.reviveDates(obj[key]);
        }
      }
      return result;
    }
    
    return obj;
  }

  static saveUser(user: User): void {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  static getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    const parsedUsers = users ? JSON.parse(users) : [];
    return this.reviveDates(parsedUsers);
  }

  static getCurrentUser(): User | null {
    const userId = localStorage.getItem(this.CURRENT_USER_KEY);
    if (!userId) return null;
    
    const users = this.getUsers();
    return users.find(u => u.id === userId) || null;
  }

  static setCurrentUser(userId: string): void {
    localStorage.setItem(this.CURRENT_USER_KEY, userId);
  }

  static logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  static saveMoodEntry(entry: MoodEntry, userKey: string): void {
    const key = `mood_entries_${entry.userId}`;
    const entries = this.getEncryptedData<MoodEntry[]>(key, userKey) || [];
    entries.push(entry);
    this.saveEncryptedData(key, entries, userKey);
  }

  static getMoodEntries(userId: string, userKey: string): MoodEntry[] {
    const key = `mood_entries_${userId}`;
    return this.getEncryptedData<MoodEntry[]>(key, userKey) || [];
  }

  static saveJournalEntry(entry: JournalEntry, userKey: string): void {
    const key = `journal_entries_${entry.userId}`;
    const entries = this.getEncryptedData<JournalEntry[]>(key, userKey) || [];
    entries.push(entry);
    this.saveEncryptedData(key, entries, userKey);
  }

  static getJournalEntries(userId: string, userKey: string): JournalEntry[] {
    const key = `journal_entries_${userId}`;
    return this.getEncryptedData<JournalEntry[]>(key, userKey) || [];
  }

  static saveChatMessage(message: ChatMessage, userId: string, userKey: string): void {
    const key = `chat_messages_${userId}`;
    const messages = this.getEncryptedData<ChatMessage[]>(key, userKey) || [];
    messages.push(message);
    this.saveEncryptedData(key, messages, userKey);
  }

  static getChatMessages(userId: string, userKey: string): ChatMessage[] {
    const key = `chat_messages_${userId}`;
    return this.getEncryptedData<ChatMessage[]>(key, userKey) || [];
  }

  static saveUserSession(session: UserSession): void {
    const sessions = this.getUserSessions(session.userId);
    sessions.push(session);
    localStorage.setItem(`${this.SESSIONS_KEY}_${session.userId}`, JSON.stringify(sessions));
  }

  static getUserSessions(userId: string): UserSession[] {
    const sessions = localStorage.getItem(`${this.SESSIONS_KEY}_${userId}`);
    const parsedSessions = sessions ? JSON.parse(sessions) : [];
    return this.reviveDates(parsedSessions);
  }

  private static saveEncryptedData<T>(key: string, data: T, userKey: string): void {
    const encrypted = EncryptionService.encrypt(JSON.stringify(data), userKey);
    localStorage.setItem(key, encrypted);
  }

  private static getEncryptedData<T>(key: string, userKey: string): T | null {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    
    try {
      const decrypted = EncryptionService.decrypt(encrypted, userKey);
      const parsedData = JSON.parse(decrypted);
      return this.reviveDates(parsedData);
    } catch (error) {
      console.error('Failed to decrypt data:', error);
      return null;
    }
  }
}