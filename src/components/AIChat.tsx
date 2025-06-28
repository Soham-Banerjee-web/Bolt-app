import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Shield } from 'lucide-react';
import { ChatMessage, User as UserType } from '../types';
import { AITherapist } from '../utils/aiTherapist';
import { SecureStorage } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

interface AIChatProps {
  onBack: () => void;
  user: UserType;
}

const AIChat: React.FC<AIChatProps> = ({ onBack, user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load existing chat messages
    const existingMessages = SecureStorage.getChatMessages(user.id, user.encryptionKey);
    setMessages(existingMessages);

    // Add welcome message if no existing messages
    if (existingMessages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: uuidv4(),
        content: "Hello! I'm your AI therapy assistant. I'm here to provide a safe, non-judgmental space where you can share your thoughts and feelings. Everything we discuss is completely confidential and encrypted. How are you feeling today?",
        sender: 'ai',
        timestamp: new Date(),
        encrypted: true
      };
      setMessages([welcomeMessage]);
      SecureStorage.saveChatMessage(welcomeMessage, user.id, user.encryptionKey);
    }
  }, [user.id, user.encryptionKey]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      encrypted: true
    };

    setMessages(prev => [...prev, userMessage]);
    SecureStorage.saveChatMessage(userMessage, user.id, user.encryptionKey);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = AITherapist.generateResponse(inputMessage);
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        encrypted: true
      };

      setMessages(prev => [...prev, aiMessage]);
      SecureStorage.saveChatMessage(aiMessage, user.id, user.encryptionKey);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-t-3xl p-6 shadow-lg border border-white/20 border-b-0">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm text-green-600 font-medium">End-to-End Encrypted</span>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Therapy Session</h2>
          <p className="text-gray-600">A safe, confidential space to explore your thoughts and feelings</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white/80 backdrop-blur-sm p-6 overflow-y-auto border-l border-r border-white/20">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start max-w-3xl">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-gray-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-sm rounded-b-3xl p-6 shadow-lg border border-white/20 border-t-0">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... Press Enter to send, Shift+Enter for new line"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              disabled={isTyping}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Remember: This AI assistant provides support but doesn't replace professional therapy. 
          If you're in crisis, please contact emergency services or a crisis hotline.
        </p>
      </div>
    </div>
  );
};

export default AIChat;