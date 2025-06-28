import React from 'react';
import { Heart, MessageCircle, BookOpen, Shield, Phone, Sparkles, TrendingUp, Calendar, Trophy, Flame, Lock, Crown, Users } from 'lucide-react';
import BadgeDisplay from './BadgeDisplay';

const Dashboard = ({ onNavigate, user }) => {
  const quickActions = [
    {
      id: 'mood',
      title: 'Track Mood',
      description: 'How are you feeling today?',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      isPremium: true,
    },
    {
      id: 'chat',
      title: 'AI Therapy',
      description: 'Talk to your AI therapist',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      isPremium: false,
    },
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: 'Take a moment to breathe',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      isPremium: true,
    },
    {
      id: 'journal',
      title: 'Journal',
      description: 'Write down your thoughts',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      isPremium: false,
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with like-minded people',
      icon: Users,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      isPremium: false,
    },
    {
      id: 'resources',
      title: 'Resources',
      description: 'Mental health resources',
      icon: BookOpen,
      color: 'from-teal-500 to-green-500',
      bgColor: 'from-teal-50 to-green-50',
      isPremium: false,
    },
  ];

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, {user.name}!</h2>
            <p className="text-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {todayDate}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end mb-2">
              <Flame className="h-6 w-6 text-orange-500 mr-2" />
              <div className="text-3xl font-bold text-orange-600">{user.streak}</div>
            </div>
            <div className="text-sm text-gray-500">Day streak</div>
          </div>
        </div>
        
        {/* Subscription Status */}
        {user.isPremium ? (
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-4 border border-yellow-300/30 mb-6">
            <div className="flex items-center">
              <Crown className="h-6 w-6 text-yellow-600 mr-3" />
              <div>
                <h3 className="font-semibold text-yellow-800">Premium Member</h3>
                <p className="text-sm text-yellow-700">Enjoy unlimited access to all features</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-4 border border-blue-200/30 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-800">Unlock Premium Features</h3>
                  <p className="text-sm text-blue-700">Get advanced mood tracking and breathing exercises</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('mood')} // This will trigger the pricing modal
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              >
                Upgrade $5/mo
              </button>
            </div>
          </div>
        )}
        
        {/* Recent Badges */}
        {user.badges.length > 0 && (
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-200/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                Recent Achievements
              </h3>
              <button
                onClick={() => onNavigate('badges')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <BadgeDisplay badges={user.badges} />
          </div>
        )}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          const isLocked = action.isPremium && !user.isPremium;
          
          return (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className={`bg-gradient-to-br ${action.bgColor} p-6 rounded-3xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group relative ${
                isLocked ? 'opacity-75' : ''
              }`}
            >
              {isLocked && (
                <div className="absolute top-3 right-3">
                  <div className="bg-yellow-500 text-white p-1 rounded-full">
                    <Crown className="h-4 w-4" />
                  </div>
                </div>
              )}
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${action.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {action.title}
                {isLocked && <span className="text-yellow-600 ml-2 text-sm">Premium</span>}
              </h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </button>
          );
        })}
      </div>

      {/* Crisis Support Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 mr-4" />
            <div>
              <h3 className="text-xl font-bold mb-1">Need immediate support?</h3>
              <p className="text-red-100">Crisis resources available 24/7</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('crisis')}
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center"
          >
            <Phone className="h-4 w-4 mr-2" />
            Get Help
          </button>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
          Your Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-2xl">
            <div className="text-2xl font-bold text-blue-600 mb-1">{user.totalSessions}</div>
            <div className="text-sm text-gray-600">Total sessions</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-2xl">
            <div className="text-2xl font-bold text-green-600 mb-1">{user.badges.length}</div>
            <div className="text-sm text-gray-600">Badges earned</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-2xl">
            <div className="text-2xl font-bold text-purple-600 mb-1">{user.streak}</div>
            <div className="text-sm text-gray-600">Current streak</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-2xl">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-sm text-gray-600">Days with us</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;