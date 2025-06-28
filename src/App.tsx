import React, { useState, useEffect } from 'react';
import { Brain, LogOut } from 'lucide-react';
import { User } from './types';
import { SecureStorage } from './utils/storage';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import MoodTracker from './components/MoodTracker';
import BreathingExercise from './components/BreathingExercise';
import Journal from './components/Journal';
import Resources from './components/Resources';
import CrisisSupport from './components/CrisisSupport';
import AIChat from './components/AIChat';
import BadgesView from './components/BadgesView';

type View = 'dashboard' | 'mood' | 'breathing' | 'journal' | 'resources' | 'crisis' | 'chat' | 'badges';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const user = SecureStorage.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    SecureStorage.logout();
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const handleUserUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  const renderView = () => {
    if (!currentUser) return null;

    switch (currentView) {
      case 'mood':
        return <MoodTracker onBack={() => setCurrentView('dashboard')} user={currentUser} onUserUpdate={handleUserUpdate} />;
      case 'breathing':
        return <BreathingExercise onBack={() => setCurrentView('dashboard')} user={currentUser} onUserUpdate={handleUserUpdate} />;
      case 'journal':
        return <Journal onBack={() => setCurrentView('dashboard')} user={currentUser} onUserUpdate={handleUserUpdate} />;
      case 'resources':
        return <Resources onBack={() => setCurrentView('dashboard')} />;
      case 'crisis':
        return <CrisisSupport onBack={() => setCurrentView('dashboard')} />;
      case 'chat':
        return <AIChat onBack={() => setCurrentView('dashboard')} user={currentUser} />;
      case 'badges':
        return <BadgesView onBack={() => setCurrentView('dashboard')} user={currentUser} />;
      default:
        return <Dashboard onNavigate={setCurrentView} user={currentUser} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {currentView === 'dashboard' && (
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-3">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MindWell
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </header>
        )}
        
        {renderView()}
      </div>
    </div>
  );
}

export default App;