import React, { useState } from 'react';
import { ArrowLeft, Smile, Meh, Frown, Sun, Cloud, CloudRain, Zap, Heart } from 'lucide-react';
import { createMoodEntry, createUserSession } from '../types';
import { SecureStorage } from '../utils/storage';
import { BadgeSystem } from '../utils/badges';
import { v4 as uuidv4 } from 'uuid';

const MoodTracker = ({ onBack, user, onUserUpdate }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const moods = [
    { value: 5, label: 'Excellent', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { value: 4, label: 'Good', icon: Smile, color: 'text-green-500', bg: 'bg-green-100' },
    { value: 3, label: 'Okay', icon: Meh, color: 'text-blue-500', bg: 'bg-blue-100' },
    { value: 2, label: 'Not Great', icon: Cloud, color: 'text-gray-500', bg: 'bg-gray-100' },
    { value: 1, label: 'Difficult', icon: CloudRain, color: 'text-indigo-500', bg: 'bg-indigo-100' },
  ];

  const handleSave = () => {
    if (selectedMood) {
      const moodEntry = createMoodEntry({
        id: uuidv4(),
        userId: user.id,
        mood: selectedMood,
        notes,
        timestamp: new Date(),
        encrypted: true
      });

      const session = createUserSession({
        id: uuidv4(),
        userId: user.id,
        type: 'mood',
        duration: 0,
        timestamp: new Date()
      });

      // Save mood entry and session
      SecureStorage.saveMoodEntry(moodEntry, user.encryptionKey);
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
            <Heart className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mood Saved!</h2>
          <p className="text-gray-600">Thank you for checking in with yourself today.</p>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">How are you feeling today?</h2>
        <p className="text-gray-600 mb-8">Your emotional check-in helps track patterns and progress.</p>

        <div className="space-y-4 mb-8">
          {moods.map((mood) => {
            const IconComponent = mood.icon;
            return (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedMood === mood.value
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${mood.bg} mr-4`}>
                    <IconComponent className={`h-6 w-6 ${mood.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">{mood.label}</div>
                    <div className="text-sm text-gray-600">Feeling {mood.label.toLowerCase()} today</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Any additional notes? (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="What's on your mind today? Any triggers, positive moments, or thoughts you'd like to remember?"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!selectedMood}
          className={`w-full py-4 rounded-2xl font-semibold transition-all duration-200 ${
            selectedMood
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Save Mood Entry
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;