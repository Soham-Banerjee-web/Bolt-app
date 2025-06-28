// User interface
export const createUser = (data) => ({
  id: '',
  email: '',
  name: '',
  createdAt: new Date(),
  badges: [],
  streak: 0,
  totalSessions: 0,
  encryptionKey: '',
  emailVerified: false,
  verificationCode: '',
  isPremium: false,
  subscriptionDate: null,
  subscriptionStatus: 'inactive', // 'active', 'inactive', 'cancelled'
  ...data
});

// Badge interface
export const createBadge = (data) => ({
  id: '',
  name: '',
  description: '',
  icon: '',
  color: '',
  unlockedAt: new Date(),
  category: 'achievement', // 'streak', 'milestone', 'achievement', 'special'
  ...data
});

// Chat message interface
export const createChatMessage = (data) => ({
  id: '',
  content: '',
  sender: 'user', // 'user' or 'ai'
  timestamp: new Date(),
  encrypted: false,
  ...data
});

// Mood entry interface
export const createMoodEntry = (data) => ({
  id: '',
  userId: '',
  mood: 1,
  notes: '',
  timestamp: new Date(),
  encrypted: false,
  ...data
});

// Journal entry interface
export const createJournalEntry = (data) => ({
  id: '',
  userId: '',
  content: '',
  timestamp: new Date(),
  encrypted: false,
  ...data
});

// User session interface
export const createUserSession = (data) => ({
  id: '',
  userId: '',
  type: 'mood', // 'mood', 'journal', 'breathing', 'chat'
  duration: 0,
  timestamp: new Date(),
  ...data
});