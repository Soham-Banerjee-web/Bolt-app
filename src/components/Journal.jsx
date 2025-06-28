import React, { useState } from 'react';
import { ArrowLeft, Save, Lightbulb, Heart, Star } from 'lucide-react';
import { createJournalEntry, createUserSession } from '../types';
import { SecureStorage } from '../utils/storage';
import { BadgeSystem } from '../utils/badges';
import { v4 as uuidv4 } from 'uuid';

const Journal = ({ onBack, user, onUserUpdate }) => {
  const [entry, setEntry] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [saved, setSaved] = useState(false);

  const prompts = [
    {
      id: 'gratitude',
      title: 'Gratitude',
      prompt: 'What are three things you\'re grateful for today?',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'achievement',
      title: 'Achievement',
      prompt: 'What\'s one thing you accomplished today, no matter how small?',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'insight',
      title: 'Insight',
      prompt: 'What did you learn about yourself today?',
      icon: Lightbulb,
      color: 'from-blue-500 to-purple-500',
    },
  ];

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    setEntry(prompt + '\n\n');
  };

  const handleSave = () => {
    if (entry.trim()) {
      const journalEntry = createJournalEntry({
        id: uuidv4(),
        userId: user.id,
        content: entry,
        timestamp: new Date(),
        encrypted: true
      });

      const session = createUserSession({
        id: uuidv4(),
        userId: user.id,
        type: 'journal',
        duration: 0,
        timestamp: new Date()
      });

      // Save journal entry and session
      SecureStorage.saveJournalEntry(journalEntry, user.encryptionKey);
      SecureStorage.saveUserSession(session);

      // Update user stats and check for badges
      const updatedUser = {
        ...user,
        totalSessions: user.totalSessions + 1
      };

      const allSessions = SecureStorage.getUserSessions(user.id);
      const newBadges = BadgeSystem.checkAndAwardBadges(updatedUser, [...allSessions, session]);
      
      if (newBadges.length > 0) {
        updatedUser.badges = [...updatedUser.badges, ...newBadges];
      }

      SecureStorage.saveUser(updatedUser);
      onUserUpdate(updatedUser);

      setSaved(true);
      setTimeout(() => {
        onBack();
      }, 1500);
    }
  };

  if (saved) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-white/20 text-center">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Save className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Journal Entry Saved!</h2>
          <p className="text-gray-600">Your thoughts have been safely recorded and encrypted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Journal</h2>
        <p className="text-gray-600 mb-8">Express your thoughts and feelings in a safe, encrypted space.</p>

        {/* Writing Prompts */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Need inspiration? Try a prompt:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {prompts.map((promptItem) => {
              const IconComponent = promptItem.icon;
              return (
                <button
                  key={promptItem.id}
                  onClick={() => handlePromptSelect(promptItem.prompt)}
                  className="p-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className={`inline-flex p-2 rounded-full bg-gradient-to-r ${promptItem.color} mb-3`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <div className="font-medium text-gray-800 mb-1">{promptItem.title}</div>
                  <div className="text-sm text-gray-600">{promptItem.prompt}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Area */}
        <div className="mb-8">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full h-96 p-6 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 leading-relaxed"
            placeholder="Start writing your thoughts here... There's no judgment, just you and your words."
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {entry.length} characters written
          </div>
          <button
            onClick={handleSave}
            disabled={!entry.trim()}
            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-200 flex items-center ${
              entry.trim()
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="h-5 w-5 mr-2" />
            Save Entry
          </button>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-200/30">
          <p className="text-sm text-green-800">
            <strong>🔒 Encrypted & Private:</strong> Your journal entries are encrypted with your personal key. 
            Only you can read your thoughts and reflections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journal;