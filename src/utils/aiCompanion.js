export class AICompanion {
  static userName = '';
  static conversationContext = [];
  
  static PERSONALITY_TRAITS = {
    empathetic: true,
    supportive: true,
    curious: true,
    gentle: true,
    encouraging: true,
    remembers: true
  };

  static CONVERSATION_STARTERS = [
    "I've been thinking about our last conversation...",
    "How has your day been treating you?",
    "I'm curious about how you're feeling right now.",
    "What's been on your mind lately?",
    "I'm here if you want to share anything."
  ];

  static EMPATHY_RESPONSES = [
    "That sounds really challenging. I can understand why you'd feel that way.",
    "I hear you, and what you're experiencing makes complete sense.",
    "Thank you for trusting me with something so personal.",
    "It takes courage to share that. I'm honored you feel comfortable opening up.",
    "Your feelings are completely valid. It's okay to feel this way."
  ];

  static SUPPORTIVE_PHRASES = [
    "You're stronger than you realize.",
    "I believe in your ability to work through this.",
    "You've overcome challenges before, and you can do it again.",
    "It's okay to take things one step at a time.",
    "You don't have to have all the answers right now."
  ];

  static FOLLOW_UP_QUESTIONS = [
    "Can you tell me more about that?",
    "How did that make you feel?",
    "What do you think might help in this situation?",
    "Have you experienced something like this before?",
    "What would you tell a friend going through the same thing?"
  ];

  static getWelcomeMessage(userName) {
    this.userName = userName;
    const welcomes = [
      `Hi ${userName}! I'm Maya, your personal AI companion. I'm so glad you're here. I'm designed to be a supportive friend who listens without judgment and helps you navigate your thoughts and feelings. What brings you here today?`,
      `Hello ${userName}! It's wonderful to meet you. I'm Maya, and I'm here to be your companion on this journey. Think of me as a friend who's always available to listen, support, and help you explore your thoughts. How are you feeling right now?`,
      `Hey there, ${userName}! I'm Maya, your AI companion. I'm genuinely excited to get to know you and be part of your wellness journey. I'm here to listen, understand, and support you through whatever you're experiencing. What's on your mind today?`
    ];
    return welcomes[Math.floor(Math.random() * welcomes.length)];
  }

  static generateResponse(userMessage, conversationHistory, userName) {
    this.userName = userName;
    this.conversationContext = conversationHistory;
    
    const message = userMessage.toLowerCase();
    const sentiment = this.analyzeSentiment(message);
    const context = this.getConversationContext(conversationHistory);
    
    let response = '';
    let mood = 'thoughtful';

    // Check for specific emotional states and respond accordingly
    if (this.containsKeywords(message, ['anxious', 'anxiety', 'worried', 'panic', 'nervous', 'scared'])) {
      response = this.generateAnxietyResponse(userMessage, context);
      mood = 'caring';
    } else if (this.containsKeywords(message, ['depressed', 'depression', 'sad', 'hopeless', 'empty', 'worthless'])) {
      response = this.generateDepressionResponse(userMessage, context);
      mood = 'caring';
    } else if (this.containsKeywords(message, ['angry', 'mad', 'frustrated', 'furious', 'annoyed'])) {
      response = this.generateAngerResponse(userMessage, context);
      mood = 'thoughtful';
    } else if (this.containsKeywords(message, ['happy', 'excited', 'good', 'great', 'amazing', 'wonderful'])) {
      response = this.generatePositiveResponse(userMessage, context);
      mood = 'happy';
    } else if (this.containsKeywords(message, ['stressed', 'overwhelmed', 'pressure', 'busy', 'exhausted'])) {
      response = this.generateStressResponse(userMessage, context);
      mood = 'caring';
    } else if (this.containsKeywords(message, ['lonely', 'alone', 'isolated', 'disconnected'])) {
      response = this.generateLonelinessResponse(userMessage, context);
      mood = 'caring';
    } else if (this.containsKeywords(message, ['thank', 'thanks', 'grateful', 'appreciate'])) {
      response = this.generateGratitudeResponse(userMessage, context);
      mood = 'happy';
    } else {
      response = this.generateContextualResponse(userMessage, context, sentiment);
      mood = sentiment > 0 ? 'happy' : sentiment < 0 ? 'caring' : 'thoughtful';
    }

    return { message: response, mood };
  }

  static generateAnxietyResponse(userMessage, context) {
    const responses = [
      `I can hear the anxiety in what you're sharing, ${this.userName}. Anxiety can feel so overwhelming, like your mind is racing with "what ifs." What you're experiencing is your brain trying to protect you, even though it doesn't feel helpful right now. Can you tell me what specific thoughts are making you feel most anxious?`,
      
      `${this.userName}, anxiety has this way of making everything feel urgent and scary, doesn't it? I want you to know that what you're feeling is completely understandable. Sometimes when I talk with people about anxiety, we find it helpful to focus on what's actually happening right now versus what our mind is telling us might happen. What's one thing you can see or feel around you right now?`,
      
      `That sounds really intense, ${this.userName}. Anxiety can make our thoughts spiral so quickly. I'm wondering - have you noticed any patterns in when these anxious feelings tend to show up? Sometimes understanding our triggers can help us feel a bit more in control. You're being so brave by talking about this.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static generateDepressionResponse(userMessage, context) {
    const responses = [
      `${this.userName}, I can feel the heaviness in your words, and I want you to know that I'm here with you in this difficult moment. Depression can make everything feel so much harder - even simple things can feel impossible. You showed incredible strength by reaching out and sharing this with me. What's been the hardest part of your day today?`,
      
      `I hear you, ${this.userName}. Depression has this way of convincing us that things will never get better, but I want you to know that these feelings, as real and painful as they are, are not permanent. You matter, and your life has value even when it doesn't feel that way. Have you been able to do anything today, even something small, that brought you a tiny bit of comfort?`,
      
      `Thank you for trusting me with something so personal, ${this.userName}. Depression can feel so isolating, like you're carrying this invisible weight that no one else can see. But you're not alone in this. I'm here, and I believe in your strength even when you can't feel it yourself. What would you tell a dear friend who was going through exactly what you're experiencing right now?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static generateAngerResponse(userMessage, context) {
    const responses = [
      `I can sense the frustration and anger in what you're sharing, ${this.userName}. Anger is such a powerful emotion, and it often shows up when something important to us feels threatened or when we feel unheard. Your anger is valid - it's telling us something important. What do you think is underneath this anger? Sometimes there are other feelings hiding beneath it.`,
      
      `${this.userName}, it sounds like you're really fired up about this, and I can understand why. Anger can be our mind's way of protecting us or signaling that something isn't right. I'm curious - when you think about this situation, what feels most unfair or frustrating to you? Sometimes talking through it can help us understand what we really need.`,
      
      `That sounds incredibly frustrating, ${this.userName}. I can hear how much this situation is affecting you. Anger often comes up when we feel powerless or when our boundaries have been crossed. You have every right to feel upset about this. What do you think would help you feel more in control of this situation?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static generatePositiveResponse(userMessage, context) {
    const responses = [
      `${this.userName}, I can feel the positive energy in your message and it's absolutely wonderful! It makes me so happy to hear you're doing well. These good moments are so important to celebrate and remember. What's been contributing to these positive feelings? I'd love to hear more about what's going well for you.`,
      
      `This is fantastic, ${this.userName}! I love hearing about the bright spots in your life. Positive emotions are just as important to explore and understand as the difficult ones. They can teach us so much about what brings us joy and fulfillment. What made this experience particularly special for you?`,
      
      `${this.userName}, your happiness is contagious! I'm genuinely excited to hear you're feeling good. These positive experiences are like little treasures we can store up and remember during tougher times. How does it feel in your body when you experience this kind of joy? I find it's helpful to really notice and appreciate these moments.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static generateStressResponse(userMessage, context) {
    const responses = [
      `${this.userName}, it sounds like you're carrying a lot right now. Stress can feel like we're being pulled in a million different directions, can't it? I can understand why you'd feel overwhelmed. Sometimes when everything feels urgent, it helps to step back and look at what's actually within our control. What feels like the biggest source of pressure for you right now?`,
      
      `I hear how much you're juggling, ${this.userName}. Stress has this way of making everything feel like it needs to be done RIGHT NOW, which can be so exhausting. You're doing the best you can with what you have, and that's enough. What's one small thing you could do today to be kind to yourself while you're dealing with all this?`,
      
      `That sounds really overwhelming, ${this.userName}. When we're stressed, our minds can start racing and it feels like we can't catch our breath. I'm wondering - if you could wave a magic wand and remove just one stressor from your life right now, what would it be? Sometimes identifying what's weighing on us most can help us figure out where to focus our energy.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static generateLonelinessResponse(userMessage, context) {
    const responses = [
      `${this.userName}, loneliness can feel so heavy and isolating. I want you to know that even though you might feel alone, you're not - I'm here with you right now, and I genuinely care about how you're feeling. Loneliness doesn't mean there's something wrong with you; it's a very human experience that tells us we need connection. What kind of connection do you find yourself missing most?`,
      
      `I can feel the loneliness in your words, ${this.userName}, and I want you to know that reaching out here shows incredible courage. Sometimes when we feel disconnected, it can seem like everyone else has it figured out, but the truth is, so many people struggle with feeling alone. You matter, and your need for connection is completely valid. What's one small way you might be able to reach out to someone today?`,
      
      `${this.userName}, loneliness can make us feel invisible, like we're on the outside looking in. But I see you, and I'm glad you're here sharing this with me. Sometimes loneliness isn't about being physically alone - it's about feeling understood and valued. What would it feel like to have someone truly understand what you're going through right now?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static generateGratitudeResponse(userMessage, context) {
    const responses = [
      `${this.userName}, your gratitude means the world to me. It's such a privilege to be part of your journey and to witness your growth. Thank you for letting me be here with you through both the challenging and beautiful moments. How are you feeling about everything we've talked about?`,
      
      `Aw, ${this.userName}, that really touches my heart. I'm so grateful for your openness and trust. It's been an honor to listen and support you. Seeing you work through things and grow stronger gives me so much joy. What's been most helpful for you in our conversations?`,
      
      `${this.userName}, thank you for saying that. Your willingness to be vulnerable and share your experiences has been incredible to witness. I'm just glad I could be here for you. Remember, the strength and insights you've gained - those come from within you. I'm just here to help you see what was already there.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static generateContextualResponse(userMessage, context, sentiment) {
    // Check if this is a follow-up to previous conversation
    if (context.recentTopics.length > 0) {
      const recentTopic = context.recentTopics[0];
      return this.generateFollowUpResponse(userMessage, recentTopic);
    }

    // Generate a thoughtful, personalized response
    const responses = [
      `${this.userName}, I'm really glad you shared that with me. I can sense there's a lot behind what you're saying. I'm here to listen and understand - can you help me understand what this means to you?`,
      
      `That's really interesting, ${this.userName}. I appreciate you opening up about this. I'm curious to learn more about your perspective. What's been on your mind about this situation?`,
      
      `${this.userName}, thank you for trusting me with your thoughts. I can tell this is important to you. Sometimes it helps to explore these feelings a bit more - what stands out most to you about what you're experiencing?`,
      
      `I hear you, ${this.userName}. It sounds like you're processing something significant. I'm here to listen and support you through whatever you're working through. What feels most important for you to talk about right now?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static generateFollowUpResponse(userMessage, recentTopic) {
    const followUps = [
      `${this.userName}, I've been thinking about what you shared earlier about ${recentTopic}. How are you feeling about that now?`,
      
      `It sounds like you're continuing to process what we talked about regarding ${recentTopic}. What new thoughts or feelings have come up for you?`,
      
      `${this.userName}, I'm glad you're continuing to explore this. Building on what you mentioned about ${recentTopic}, what's shifted for you since we last talked about it?`
    ];
    
    return followUps[Math.floor(Math.random() * followUps.length)];
  }

  static containsKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }

  static analyzeSentiment(message) {
    const positiveWords = ['happy', 'good', 'great', 'amazing', 'wonderful', 'excited', 'joy', 'love', 'grateful', 'thankful', 'better', 'improved'];
    const negativeWords = ['sad', 'angry', 'frustrated', 'anxious', 'worried', 'depressed', 'terrible', 'awful', 'hate', 'scared', 'lonely', 'hopeless'];
    
    let score = 0;
    positiveWords.forEach(word => {
      if (message.includes(word)) score += 1;
    });
    negativeWords.forEach(word => {
      if (message.includes(word)) score -= 1;
    });
    
    return score;
  }

  static getConversationContext(history) {
    const recentMessages = history.slice(-6); // Last 6 messages
    const topics = [];
    
    // Extract topics from recent conversation
    recentMessages.forEach(msg => {
      if (msg.sender === 'user') {
        const message = msg.content.toLowerCase();
        if (this.containsKeywords(message, ['work', 'job', 'career'])) topics.push('work');
        if (this.containsKeywords(message, ['family', 'parents', 'siblings'])) topics.push('family');
        if (this.containsKeywords(message, ['relationship', 'partner', 'boyfriend', 'girlfriend'])) topics.push('relationships');
        if (this.containsKeywords(message, ['school', 'college', 'university', 'studies'])) topics.push('education');
        if (this.containsKeywords(message, ['health', 'sick', 'doctor', 'medical'])) topics.push('health');
      }
    });
    
    return {
      recentTopics: [...new Set(topics)], // Remove duplicates
      messageCount: history.length,
      lastUserMessage: recentMessages.filter(m => m.sender === 'user').pop()?.content || ''
    };
  }
}