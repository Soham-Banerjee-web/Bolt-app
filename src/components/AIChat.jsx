import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Shield, Heart, Smile } from 'lucide-react';
import { createChatMessage } from '../types';
import { AICompanion } from '../utils/aiCompanion';
import { SecureStorage } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

const AIChat = ({ onBack, user }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [companionMood, setCompanionMood] = useState('happy');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load existing chat messages
    const existingMessages = SecureStorage.getChatMessages(user.id, user.encryptionKey);
    
    if (existingMessages.length === 0) {
      // Create personalized welcome message
      const welcomeMessage = createChatMessage({
        id: uuidv4(),
        content: AICompanion.getWelcomeMessage(user.name),
        sender: 'ai',
        timestamp: new Date(),
        encrypted: true
      });
      setMessages([welcomeMessage]);
      SecureStorage.saveChatMessage(welcomeMessage, user.id, user.encryptionKey);
    } else {
      setMessages(existingMessages);
    }
  }, [user.id, user.encryptionKey, user.name]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = createChatMessage({
      id: uuidv4(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      encrypted: true
    });

    setMessages(prev => [...prev, userMessage]);
    SecureStorage.saveChatMessage(userMessage, user.id, user.encryptionKey);
    
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simulate Maya thinking and responding
    const thinkingTime = 1500 + Math.random() * 2000; // 1.5-3.5 seconds
    
    setTimeout(() => {
      const response = AICompanion.generateResponse(currentInput, messages, user.name);
      const aiMessage = createChatMessage({
        id: uuidv4(),
        content: response.message,
        sender: 'ai',
        timestamp: new Date(),
        encrypted: true
      });

      setMessages(prev => [...prev, aiMessage]);
      SecureStorage.saveChatMessage(aiMessage, user.id, user.encryptionKey);
      setCompanionMood(response.mood);
      setIsTyping(false);
    }, thinkingTime);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMoodIcon = () => {
    switch (companionMood) {
      case 'happy': return <Smile className="h-4 w-4 text-yellow-500" />;
      case 'caring': return <Heart className="h-4 w-4 text-pink-500" />;
      case 'thoughtful': return <Bot className="h-4 w-4 text-blue-500" />;
      default: return <Bot className="h-4 w-4 text-purple-500" />;
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
          <div className="flex items-center mb-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full mr-3">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Maya</h2>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online • {getMoodIcon()}
              </div>
            </div>
          </div>
          <p className="text-gray-600">Your personal AI companion, here to listen and support you</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white/80 backdrop-blur-sm p-6 overflow-y-auto border-l border-r border-white/20">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-white" />
                    )}
                  </div>
                </div>
                <div className={`px-6 py-4 rounded-3xl max-w-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-3 ${
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="px-6 py-4 rounded-3xl bg-gray-100">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-600 text-sm mr-2">Maya is thinking</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
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
              placeholder="Share what's on your mind... Maya is here to listen 💜"
              className="w-full px-6 py-4 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white/90 backdrop-blur-sm"
              rows={3}
              disabled={isTyping}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Maya is an AI companion designed to provide emotional support. For crisis situations, please contact emergency services.
        </p>
      </div>
    </div>
  );
};

export default AIChat;