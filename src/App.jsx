import React, { useState, useEffect } from 'react';
import { Brain, LogOut } from 'lucide-react';
import { SecureStorage } from './utils/storage';
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import MoodTracker from './components/MoodTracker';
import BreathingExercise from './components/BreathingExercise';
import Journal from './components/Journal';
import Resources from './components/Resources';
import CrisisSupport from './components/CrisisSupport';
import AIChat from './components/AIChat';
import BadgesView from './components/BadgesView';
import Community from './components/Community';
import PricingModal from './components/PricingModal';
import EmailVerification from './components/EmailVerification';
import AnimatedLoader from './components/AnimatedLoader';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('landing');
  const [loading, setLoading] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const [pendingFeature, setPendingFeature] = useState(null);

useEffect(() => {
  const timer = setTimeout(() => {
    const user = SecureStorage.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setCurrentView('dashboard');
    } else {
      setCurrentView('landing');
    }
    setLoading(false);
  }, 2000); // shows loader for 2s

  return () => clearTimeout(timer);
}, []);


  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    SecureStorage.logout();
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  const handleFeatureAccess = (feature) => {
    if (!currentUser) return;

    // Check if user has premium access for mood tracker and breathing exercises
    if ((feature === 'mood' || feature === 'breathing') && !currentUser.isPremium) {
      setPendingFeature(feature);
      setShowPricing(true);
      return;
    }

    setCurrentView(feature);
  };

  const handleSubscriptionSuccess = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        isPremium: true,
        subscriptionDate: new Date(),
        subscriptionStatus: 'active'
      };
      SecureStorage.saveUser(updatedUser);
      setCurrentUser(updatedUser);
      setShowPricing(false);
      
      if (pendingFeature) {
        setCurrentView(pendingFeature);
        setPendingFeature(null);
      }
    }
  };

  const renderView = () => {
    if (!currentUser) {
      if (currentView === 'auth') {
        return <AuthForm onLogin={handleLogin} onBack={() => setCurrentView('landing')} />;
      }
      return <LandingPage onGetStarted={() => setCurrentView('auth')} />;
    }

    // Check if user needs email verification
    if (!currentUser.emailVerified) {
      return (
        <EmailVerification 
          user={currentUser} 
          onVerificationComplete={(verifiedUser) => {
            setCurrentUser(verifiedUser);
          }}
        />
      );
    }

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
      case 'community':
        return <Community onBack={() => setCurrentView('dashboard')} user={currentUser} />;
      default:
        return <Dashboard onNavigate={handleFeatureAccess} user={currentUser} />;
    }
  };

  if (loading) {
    return <AnimatedLoader/>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {currentUser && currentView !== 'landing' && currentView !== 'auth' && (
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {currentView === 'dashboard' && currentUser.emailVerified && (
            <header className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-3">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MindWell
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                {currentUser.isPremium && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Premium
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </button>
              </div>
            </header>
          )}
          
          {renderView()}
        </div>
      )}

      {(!currentUser || currentView === 'landing' || currentView === 'auth') && renderView()}

      {showPricing && (
        <PricingModal
          onClose={() => {
            setShowPricing(false);
            setPendingFeature(null);
          }}
          onSubscribe={handleSubscriptionSuccess}
          feature={pendingFeature}
        />
      )}
    </div>
  );
}

export default App;