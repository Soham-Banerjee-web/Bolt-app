export class AITherapist {
  static THERAPY_RESPONSES = {
    greeting: [
      "Hello! I'm here to listen and support you. How are you feeling today?",
      "Welcome to our session. I'm glad you're here. What's on your mind?",
      "Hi there! This is a safe space for you to share. How can I help you today?"
    ],
    anxiety: [
      "I hear that you're feeling anxious. That's completely understandable. Can you tell me what specific thoughts or situations are contributing to this feeling?",
      "Anxiety can feel overwhelming, but remember that it's your mind's way of trying to protect you. Let's explore what might be triggering these feelings.",
      "It sounds like you're experiencing anxiety. Would it help to try a grounding technique together, or would you prefer to talk about what's causing these feelings?"
    ],
    depression: [
      "I'm sorry you're going through this difficult time. Depression can make everything feel heavy and overwhelming. You're brave for reaching out.",
      "What you're experiencing sounds really challenging. Remember that these feelings, while very real and difficult, are temporary. You don't have to face this alone.",
      "Thank you for sharing something so personal with me. Depression can make it hard to see hope, but I want you to know that healing is possible."
    ],
    stress: [
      "Stress can really take a toll on both your mind and body. What are the main sources of stress in your life right now?",
      "It sounds like you're carrying a lot right now. Let's work together to identify some strategies that might help you manage these stressful feelings.",
      "Stress is your body's natural response to challenges, but when it becomes overwhelming, it's important to address it. What's been weighing on you most?"
    ],
    anger: [
      "Anger is a valid emotion, and it often signals that something important to you has been threatened or violated. Can you help me understand what's behind these feelings?",
      "I can sense your frustration. Anger can be a powerful emotion that sometimes masks other feelings like hurt or disappointment. What do you think might be underneath this anger?",
      "It takes courage to acknowledge and explore anger. These feelings are telling us something important. What situation or experience triggered these emotions?"
    ],
    sadness: [
      "I can hear the sadness in what you're sharing. It's okay to feel this way - sadness is a natural response to loss, disappointment, or difficult circumstances.",
      "Sadness can feel very isolating, but you're not alone in this. Would you like to share what's been contributing to these feelings?",
      "Thank you for trusting me with your sadness. These feelings deserve to be acknowledged and processed. What's been most difficult for you lately?"
    ],
    positive: [
      "I'm so glad to hear that you're feeling positive! It's wonderful when we can recognize and appreciate the good moments. What's been going well for you?",
      "That's fantastic! Positive emotions are just as important to explore as difficult ones. What's contributing to these good feelings?",
      "I love hearing about the bright spots in your life. These positive experiences can be great resources to draw from during more challenging times."
    ],
    coping: [
      "It sounds like you're looking for ways to cope with what you're experiencing. That's a really positive step. What strategies have you tried before?",
      "Developing healthy coping strategies is so important for mental wellness. Let's explore some techniques that might work well for your specific situation.",
      "I'm glad you're thinking about coping strategies. Everyone's toolkit looks different - let's find what works best for you."
    ],
    support: [
      "Remember that seeking support is a sign of strength, not weakness. You've already taken an important step by being here.",
      "You don't have to navigate this alone. Building a support network - whether it's friends, family, or professionals - can make a real difference.",
      "I want you to know that your feelings are valid and you deserve support. What kind of support feels most helpful to you right now?"
    ]
  };

  static generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Simple keyword-based response system
    if (this.containsKeywords(message, ['hello', 'hi', 'hey', 'start'])) {
      return this.getRandomResponse('greeting');
    }
    
    if (this.containsKeywords(message, ['anxious', 'anxiety', 'worried', 'panic', 'nervous'])) {
      return this.getRandomResponse('anxiety');
    }
    
    if (this.containsKeywords(message, ['depressed', 'depression', 'sad', 'hopeless', 'empty'])) {
      return this.getRandomResponse('depression');
    }
    
    if (this.containsKeywords(message, ['stressed', 'stress', 'overwhelmed', 'pressure'])) {
      return this.getRandomResponse('stress');
    }
    
    if (this.containsKeywords(message, ['angry', 'anger', 'mad', 'frustrated', 'furious'])) {
      return this.getRandomResponse('anger');
    }
    
    if (this.containsKeywords(message, ['sad', 'sadness', 'crying', 'tears', 'grief'])) {
      return this.getRandomResponse('sadness');
    }
    
    if (this.containsKeywords(message, ['happy', 'good', 'great', 'positive', 'excited', 'joy'])) {
      return this.getRandomResponse('positive');
    }
    
    if (this.containsKeywords(message, ['cope', 'coping', 'help', 'strategies', 'techniques'])) {
      return this.getRandomResponse('coping');
    }
    
    if (this.containsKeywords(message, ['support', 'alone', 'lonely', 'isolated'])) {
      return this.getRandomResponse('support');
    }
    
    // Default empathetic response
    return this.getDefaultResponse(message);
  }

  static containsKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }

  static getRandomResponse(category) {
    const responses = this.THERAPY_RESPONSES[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static getDefaultResponse(message) {
    const defaultResponses = [
      "I hear what you're saying, and I want you to know that your feelings are completely valid. Can you tell me more about what you're experiencing?",
      "Thank you for sharing that with me. It sounds like there's a lot going on for you right now. How are you processing all of this?",
      "I appreciate you opening up about this. What you're going through sounds really challenging. What feels most important for us to focus on right now?",
      "It takes courage to share personal experiences like this. I'm here to listen and support you. What would be most helpful for you in this moment?",
      "I can sense that this is significant for you. Your experiences and feelings matter. Would you like to explore this further, or is there something else on your mind?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}