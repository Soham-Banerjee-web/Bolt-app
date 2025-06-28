import React from 'react';
import { 
  Sparkles, Flame, Trophy, Crown, Target, Medal, MessageCircle, 
  Heart, BookOpen, Wind, Star, Award 
} from 'lucide-react';

const BadgeDisplay = ({ badges, showAll = false }) => {
  const getIconComponent = (iconName) => {
    const icons = {
      Sparkles, Flame, Trophy, Crown, Target, Medal, MessageCircle,
      Heart, BookOpen, Wind, Star, Award
    };
    return icons[iconName] || Award;
  };

  const displayBadges = showAll ? badges : badges.slice(0, 3);

  if (badges.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Trophy className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-500">No badges earned yet</p>
        <p className="text-sm text-gray-400">Keep using the app to unlock achievements!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {displayBadges.map((badge) => {
        const IconComponent = getIconComponent(badge.icon);
        return (
          <div
            key={badge.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200"
          >
            <div className="text-center">
              <div className={`bg-gradient-to-r ${badge.color} p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
              <div className="text-xs text-gray-500">
                Earned {badge.unlockedAt.toLocaleDateString()}
              </div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                badge.category === 'streak' ? 'bg-orange-100 text-orange-800' :
                badge.category === 'milestone' ? 'bg-blue-100 text-blue-800' :
                badge.category === 'achievement' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {badge.category}
              </div>
            </div>
          </div>
        );
      })}
      
      {!showAll && badges.length > 3 && (
        <div className="bg-gray-50 rounded-2xl p-4 border-2 border-dashed border-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400 mb-1">+{badges.length - 3}</div>
            <div className="text-sm text-gray-500">More badges</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;