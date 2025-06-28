import React, { useState } from 'react';
import { X, Crown, Check, CreditCard, Shield, Star } from 'lucide-react';

const PricingModal = ({ onClose, onSubscribe, feature }) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onSubscribe();
    }, 2000);
  };

  const getFeatureName = (feature) => {
    switch (feature) {
      case 'mood': return 'Mood Tracker';
      case 'breathing': return 'Breathing Exercises';
      default: return 'Premium Features';
    }
  };

  const premiumFeatures = [
    'Advanced Mood Tracking & Analytics',
    'Guided Breathing Exercises',
    'Mood Pattern Insights',
    'Export Your Data',
    'Priority Customer Support',
    'Ad-Free Experience'
  ];

  const freeFeatures = [
    'AI Therapy Chat',
    'Personal Journal',
    'Mental Health Resources',
    'Crisis Support Access',
    'Achievement Badges',
    'Basic Progress Tracking'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Upgrade to Premium</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {feature && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <p className="text-blue-800">
              <strong>{getFeatureName(feature)}</strong> is a premium feature. 
              Upgrade now to unlock this and other advanced mental health tools.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Free Plan */}
          <div className="border border-gray-200 rounded-2xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Free Plan</h3>
              <div className="text-3xl font-bold text-gray-600 mb-1">$0</div>
              <div className="text-gray-500">Forever</div>
            </div>
            <ul className="space-y-3 mb-6">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <div className="bg-gray-100 text-gray-500 py-2 px-4 rounded-xl font-medium">
                Current Plan
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-blue-500 rounded-2xl p-6 relative bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                <Crown className="h-4 w-4 mr-1" />
                Most Popular
              </div>
            </div>
            <div className="text-center mb-6 mt-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Plan</h3>
              <div className="text-3xl font-bold text-blue-600 mb-1">$5</div>
              <div className="text-gray-500">per month</div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="text-sm text-gray-600 font-medium mb-2">Everything in Free, plus:</li>
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Subscribe Now
                </>
              )}
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center mb-2">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">Secure Payment</span>
          </div>
          <p className="text-sm text-green-700">
            Your payment information is processed securely. Cancel anytime with no hidden fees.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> This is a demonstration. No actual payment will be processed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;