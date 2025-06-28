import { v4 as uuidv4 } from 'uuid';

export class CommunityService {
  static COMMUNITY_USERS_KEY = 'mindwell_community_users';
  static CONVERSATIONS_KEY = 'mindwell_conversations';

  static generateMockUsers() {
    const names = [
      'Sarah Johnson', 'Michael Chen', 'Emma Rodriguez', 'David Kim', 'Lisa Thompson',
      'Alex Martinez', 'Jessica Brown', 'Ryan Wilson', 'Amanda Davis', 'Chris Lee',
      'Sophia Garcia', 'James Miller', 'Olivia Taylor', 'Daniel Anderson', 'Maya Patel',
      'Jordan Smith', 'Rachel Green', 'Kevin Wong', 'Ashley Clark', 'Tyler Johnson'
    ];

    const locations = [
      'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
      'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
      'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
      'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Boston, MA'
    ];

    const bios = [
      'Mental health advocate sharing my journey with anxiety and finding peace through mindfulness.',
      'Therapist by day, meditation enthusiast by night. Here to support and connect with others.',
      'Recovering from depression and discovering the power of gratitude and self-care.',
      'Wellness coach helping others build healthy habits and positive mindsets.',
      'Student learning to manage stress and anxiety through breathing exercises and community.',
      'Parent navigating work-life balance while prioritizing mental health for my family.',
      'Artist using creativity as therapy and connecting with others on similar journeys.',
      'Fitness enthusiast who found that mental health is just as important as physical health.',
      'Survivor sharing hope and resilience with others facing similar challenges.',
      'Mindfulness teacher passionate about helping others find inner peace.',
      'Writer exploring mental health topics and building supportive communities.',
      'Healthcare worker prioritizing self-care and stress management.',
      'College student learning healthy coping mechanisms for academic pressure.',
      'Entrepreneur balancing business stress with mental wellness practices.',
      'Retiree discovering new ways to maintain mental health and social connections.',
      'Social worker dedicated to mental health awareness and community support.',
      'Teacher managing classroom stress while supporting student mental health.',
      'Tech professional finding balance in a high-pressure industry.',
      'New parent learning to care for mental health during life transitions.',
      'Volunteer passionate about mental health advocacy and peer support.'
    ];

    const interests = [
      'Anxiety Support', 'Depression Help', 'Mindfulness', 'Meditation', 'Stress Relief',
      'Self-Care', 'Therapy', 'Wellness', 'Mental Health', 'Positive Thinking',
      'Gratitude', 'Breathing Exercises', 'Sleep Health', 'Work-Life Balance',
      'Relationships', 'Personal Growth', 'Emotional Support', 'Recovery'
    ];

    const joinDates = [
      '2 months ago', '3 weeks ago', '1 month ago', '6 weeks ago', '2 weeks ago',
      '1 week ago', '3 months ago', '5 weeks ago', '4 weeks ago', '10 days ago'
    ];

    return names.map((name, index) => ({
      id: uuidv4(),
      name,
      location: locations[index % locations.length],
      bio: bios[index % bios.length],
      interests: this.getRandomInterests(interests, 3, 6),
      joinedDate: joinDates[index % joinDates.length],
      matchScore: Math.floor(Math.random() * 40) + 60, // 60-100% match
      isOnline: Math.random() > 0.3, // 70% chance of being online
      lastSeen: new Date(Date.now() - Math.random() * 86400000), // Within last 24 hours
      avatar: null // Will use initials
    }));
  }

  static getRandomInterests(allInterests, min, max) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...allInterests].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  static getCommunityUsers() {
    try {
      let users = localStorage.getItem(this.COMMUNITY_USERS_KEY);
      
      if (!users) {
        // Generate mock users on first load
        const mockUsers = this.generateMockUsers();
        localStorage.setItem(this.COMMUNITY_USERS_KEY, JSON.stringify(mockUsers));
        return mockUsers;
      }
      
      return JSON.parse(users);
    } catch (error) {
      console.error('Error loading community users:', error);
      // Return fresh mock users if there's an error
      const mockUsers = this.generateMockUsers();
      localStorage.setItem(this.COMMUNITY_USERS_KEY, JSON.stringify(mockUsers));
      return mockUsers;
    }
  }

  static getUserConversations(userId) {
    try {
      const conversations = localStorage.getItem(`${this.CONVERSATIONS_KEY}_${userId}`);
      if (!conversations) return [];
      
      return JSON.parse(conversations).map(conv => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        lastActivity: new Date(conv.lastActivity),
        messages: conv.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
    } catch (error) {
      console.error('Error loading conversations:', error);
      return [];
    }
  }

  static saveConversation(conversation) {
    try {
      conversation.participants.forEach(participantId => {
        const userConversations = this.getUserConversations(participantId);
        const existingIndex = userConversations.findIndex(conv => conv.id === conversation.id);
        
        if (existingIndex >= 0) {
          userConversations[existingIndex] = conversation;
        } else {
          userConversations.push(conversation);
        }
        
        localStorage.setItem(
          `${this.CONVERSATIONS_KEY}_${participantId}`, 
          JSON.stringify(userConversations)
        );
      });
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  }

  static updateConversation(conversation) {
    this.saveConversation(conversation);
  }

  static searchUsers(query, interests = []) {
    try {
      const users = this.getCommunityUsers();
      
      return users.filter(user => {
        const matchesQuery = !query || 
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.bio.toLowerCase().includes(query.toLowerCase());
        
        const matchesInterests = interests.length === 0 ||
          interests.some(interest => user.interests && user.interests.includes(interest));
        
        return matchesQuery && matchesInterests;
      });
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  }

  static calculateMatchScore(user1, user2) {
    try {
      if (!user1.interests || !user2.interests) return 0;
      
      const commonInterests = user1.interests.filter(interest => 
        user2.interests.includes(interest)
      );
      
      const totalInterests = new Set([...user1.interests, ...user2.interests]).size;
      
      return Math.round((commonInterests.length / totalInterests) * 100);
    } catch (error) {
      console.error('Error calculating match score:', error);
      return 0;
    }
  }
}