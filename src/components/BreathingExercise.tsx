import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { User, UserSession } from '../types';
import { SecureStorage } from '../utils/storage';
import { BadgeSystem } from '../utils/badges';
import { v4 as uuidv4 } from 'uuid';

interface BreathingExerciseProps {
  onBack: () => void;
  user: User;
  onUserUpdate: (user: User) => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onBack, user, onUserUpdate }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const phases = {
    inhale: { duration: 4, text: 'Breathe In', color: 'from-blue-400 to-cyan-400' },
    hold: { duration: 4, text: 'Hold', color: 'from-green-400 to-emerald-400' },
    exhale: { duration: 6, text: 'Breathe Out', color: 'from-purple-400 to-pink-400' },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return phases.hold.duration;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return phases.exhale.duration;
            } else {
              setPhase('inhale');
              setCycle(prev => prev + 1);
              return phases.inhale.duration;
            }
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const handleStart = () => {
    setIsActive(true);
    if (!startTime) {
      setStartTime(new Date());
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(4);
    setCycle(0);
    setStartTime(null);
  };

  const handleComplete = () => {
    if (startTime) {
      const duration = Math.floor((Date.now() - startTime.getTime()) / 1000);
      
      const session: UserSession = {
        id: uuidv4(),
        userId: user.id,
        type: 'breathing',
        duration,
        timestamp: new Date()
      };

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
    }
    
    onBack();
  };

  const currentPhase = phases[phase];
  const progress = ((currentPhase.duration - count) / currentPhase.duration) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={cycle > 0 ? handleComplete : onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        {cycle > 0 ? 'Complete Session' : 'Back to Dashboard'}
      </button>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Breathing Exercise</h2>
        <p className="text-gray-600 mb-8">Follow the rhythm to calm your mind and body</p>

        {/* Breathing Circle */}
        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto relative">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentPhase.color} opacity-30 animate-pulse`}></div>
            <div 
              className={`absolute inset-4 rounded-full bg-gradient-to-r ${currentPhase.color} transition-all duration-1000 flex items-center justify-center`}
              style={{
                transform: `scale(${0.7 + (progress / 100) * 0.3})`,
              }}
            >
              <div className="text-center text-white">
                <div className="text-6xl font-bold mb-2">{count}</div>
                <div className="text-lg font-medium">{currentPhase.text}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <div className="text-2xl font-bold text-gray-800 mb-1">{cycle}</div>
          <div className="text-gray-600">Completed Cycles</div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
            >
              <Play className="h-5 w-5 mr-2" />
              Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
            >
              <Pause className="h-5 w-5 mr-2" />
              Pause
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/30">
          <h3 className="font-semibold text-gray-800 mb-2">4-4-6 Breathing Technique</h3>
          <p className="text-gray-600 text-sm">
            Inhale for 4 seconds, hold for 4 seconds, then exhale for 6 seconds. 
            This technique helps activate your body's relaxation response.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;