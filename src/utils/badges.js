import { createBadge } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class BadgeSystem {
  static BADGE_DEFINITIONS = [
    {
      id: 'first_session',
      name: 'Getting Started',
      description: 'Completed your first session',
      icon: 'Sparkles',
      color: 'from-blue-500 to-cyan-500',
      category: 'milestone',
      condition: (user, sessions) => sessions.length >= 1
    },
    {
      id: 'streak_3',
      name: '3-Day Streak',
      description: 'Maintained a 3-day streak',
      icon: 'Flame',
      color: 'from-orange-500 to-red-500',
      category: 'streak',
      condition: (user) => user.streak >= 3
    },
    {
      id: 'streak_7',
      name: 'Week Warrior',
      description: 'Maintained a 7-day streak',
      icon: 'Trophy',
      color: 'from-yellow-500 to-orange-500',
      category: 'streak',
      condition: (user) => user.streak >= 7
    },
    {
      id: 'streak_30',
      name: 'Monthly Master',
      description: 'Maintained a 30-day streak',
      icon: 'Crown',
      color: 'from-purple-500 to-pink-500',
      category: 'streak',
      condition: (user) => user.streak >= 30
    },
    {
      id: 'sessions_10',
      name: 'Dedicated User',
      description: 'Completed 10 sessions',
      icon: 'Target',
      color: 'from-green-500 to-emerald-500',
      category: 'milestone',
      condition: (user, sessions) => sessions.length >= 10
    },
    {
      id: 'sessions_50',
      name: 'Wellness Champion',
      description: 'Completed 50 sessions',
      icon: 'Medal',
      color: 'from-indigo-500 to-purple-500',
      category: 'milestone',
      condition: (user, sessions) => sessions.length >= 50
    },
    {
      id: 'chat_explorer',
      name: 'Chat Explorer',
      description: 'Had your first AI therapy session',
      icon: 'MessageCircle',
      color: 'from-teal-500 to-blue-500',
      category: 'achievement',
      condition: (user, sessions) => 
        sessions.some(s => s.type === 'chat')
    },
    {
      id: 'mood_tracker',
      name: 'Mood Tracker',
      description: 'Tracked your mood 5 times',
      icon: 'Heart',
      color: 'from-pink-500 to-rose-500',
      category: 'achievement',
      condition: (user, sessions) => 
        sessions.filter(s => s.type === 'mood').length >= 5
    },
    {
      id: 'journal_writer',
      name: 'Journal Writer',
      description: 'Wrote 5 journal entries',
      icon: 'BookOpen',
      color: 'from-amber-500 to-yellow-500',
      category: 'achievement',
      condition: (user, sessions) => 
        sessions.filter(s => s.type === 'journal').length >= 5
    },
    {
      id: 'breath_master',
      name: 'Breath Master',
      description: 'Completed 10 breathing exercises',
      icon: 'Wind',
      color: 'from-sky-500 to-blue-500',
      category: 'achievement',
      condition: (user, sessions) => 
        sessions.filter(s => s.type === 'breathing').length >= 10
    }
  ];

  static checkAndAwardBadges(user, sessions) {
    const newBadges = [];
    const existingBadgeIds = user.badges.map(b => b.id);

    for (const badgeDef of this.BADGE_DEFINITIONS) {
      if (!existingBadgeIds.includes(badgeDef.id) && badgeDef.condition(user, sessions)) {
        const newBadge = createBadge({
          id: badgeDef.id,
          name: badgeDef.name,
          description: badgeDef.description,
          icon: badgeDef.icon,
          color: badgeDef.color,
          category: badgeDef.category,
          unlockedAt: new Date()
        });
        newBadges.push(newBadge);
      }
    }

    return newBadges;
  }

  static getBadgesByCategory(badges) {
    return badges.reduce((acc, badge) => {
      if (!acc[badge.category]) {
        acc[badge.category] = [];
      }
      acc[badge.category].push(badge);
      return acc;
    }, {});
  }
}