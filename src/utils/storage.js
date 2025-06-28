import { EncryptionService } from './encryption';

export class SecureStorage {
  static USERS_KEY = 'mindwell_users';
  static CURRENT_USER_KEY = 'mindwell_current_user';
  static SESSIONS_KEY = 'mindwell_sessions';
  static REMEMBER_ME_KEY = 'mindwell_remember_me';

  static reviveDates(obj) {
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
      const result = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          result[key] = this.reviveDates(obj[key]);
        }
      }
      return result;
    }
    
    return obj;
  }

  static saveUser(user) {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  static getUsers() {
    try {
      const users = localStorage.getItem(this.USERS_KEY);
      const parsedUsers = users ? JSON.parse(users) : [];
      return this.reviveDates(parsedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  }

  static getCurrentUser() {
    try {
      const userId = localStorage.getItem(this.CURRENT_USER_KEY);
      if (!userId) return null;
      
      const users = this.getUsers();
      return users.find(u => u.id === userId) || null;
    } catch (error) {
      console.error('Error loading current user:', error);
      return null;
    }
  }

  static setCurrentUser(userId) {
    localStorage.setItem(this.CURRENT_USER_KEY, userId);
  }

  static setRememberMe(remember) {
    if (remember) {
      localStorage.setItem(this.REMEMBER_ME_KEY, 'true');
    } else {
      localStorage.removeItem(this.REMEMBER_ME_KEY);
    }
  }

  static getRememberMe() {
    return localStorage.getItem(this.REMEMBER_ME_KEY) === 'true';
  }

  static logout() {
    if (!this.getRememberMe()) {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
    localStorage.removeItem(this.REMEMBER_ME_KEY);
  }

  static saveMoodEntry(entry, userKey) {
    const key = `mood_entries_${entry.userId}`;
    const entries = this.getEncryptedData(key, userKey) || [];
    entries.push(entry);
    this.saveEncryptedData(key, entries, userKey);
  }

  static getMoodEntries(userId, userKey) {
    const key = `mood_entries_${userId}`;
    return this.getEncryptedData(key, userKey) || [];
  }

  static saveJournalEntry(entry, userKey) {
    const key = `journal_entries_${entry.userId}`;
    const entries = this.getEncryptedData(key, userKey) || [];
    entries.push(entry);
    this.saveEncryptedData(key, entries, userKey);
  }

  static getJournalEntries(userId, userKey) {
    const key = `journal_entries_${userId}`;
    return this.getEncryptedData(key, userKey) || [];
  }

  static saveChatMessage(message, userId, userKey) {
    const key = `chat_messages_${userId}`;
    const messages = this.getEncryptedData(key, userKey) || [];
    messages.push(message);
    this.saveEncryptedData(key, messages, userKey);
  }

  static getChatMessages(userId, userKey) {
    const key = `chat_messages_${userId}`;
    return this.getEncryptedData(key, userKey) || [];
  }

  static saveUserSession(session) {
    const sessions = this.getUserSessions(session.userId);
    sessions.push(session);
    localStorage.setItem(`${this.SESSIONS_KEY}_${session.userId}`, JSON.stringify(sessions));
  }

  static getUserSessions(userId) {
    try {
      const sessions = localStorage.getItem(`${this.SESSIONS_KEY}_${userId}`);
      const parsedSessions = sessions ? JSON.parse(sessions) : [];
      return this.reviveDates(parsedSessions);
    } catch (error) {
      console.error('Error loading user sessions:', error);
      return [];
    }
  }

  static saveEncryptedData(key, data, userKey) {
    try {
      const encrypted = EncryptionService.encrypt(JSON.stringify(data), userKey);
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Error saving encrypted data:', error);
    }
  }

  static getEncryptedData(key, userKey) {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      
      const decrypted = EncryptionService.decrypt(encrypted, userKey);
      const parsedData = JSON.parse(decrypted);
      return this.reviveDates(parsedData);
    } catch (error) {
      console.error('Failed to decrypt data:', error);
      return null;
    }
  }
}