import React from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';
import BadgeDisplay from './BadgeDisplay';
import { BadgeSystem } from '../utils/badges';

const BadgesView = ({ onBack, user }) => {
  const badgesByCategory = BadgeSystem.getBadgesByCategory(user.badges);

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Achievements</h2>
          <p className="text-gray-600">
            You've earned {user.badges.length} badge{user.badges.length !== 1 ? 's' : ''} on your mental health journey
          </p>
        </div>

        {user.badges.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Trophy className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No badges yet</h3>
            <p className="text-gray-500 mb-6">
              Start using the app to unlock your first achievement!
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200/30">
              <h4 className="font-semibold text-blue-800 mb-2">How to earn badges:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Complete your first session to get "Getting Started"</li>
                <li>• Maintain daily streaks for streak badges</li>
                <li>• Use different features to unlock achievement badges</li>
                <li>• Reach milestones for special recognition</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(badgesByCategory).map(([category, badges]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    category === 'streak' ? 'bg-orange-500' :
                    category === 'milestone' ? 'bg-blue-500' :
                    category === 'achievement' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`}></div>
                  {category} Badges ({badges.length})
                </h3>
                <BadgeDisplay badges={badges} showAll={true} />
              </div>
            ))}
          </div>
        )}

        {/* Progress Encouragement */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-200/30">
          <h3 className="font-semibold text-gray-800 mb-2">Keep Going!</h3>
          <p className="text-gray-600 text-sm">
            Every step you take in your mental health journey matters. Continue using MindWell 
            to unlock more achievements and build healthy habits that last.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BadgesView;