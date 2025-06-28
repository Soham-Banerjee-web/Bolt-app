import React from 'react';
import { Brain, Heart, Sparkles } from 'lucide-react';

const AnimatedLoader = ({ message = "Loading your wellness journey..." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 text-center">
        {/* Logo with Pulse Animation */}
        <div className="flex items-center justify-center mb-8 animate-pulse-slow">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full mr-4 shadow-2xl animate-float">
            <Brain className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MindWell
          </h1>
        </div>

        {/* Floating Icons */}
        <div className="relative mb-8">
          <div className="flex justify-center items-center space-x-8">
            <div className="animate-float animation-delay-1000">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="animate-float animation-delay-2000">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <p className="text-xl text-gray-600 mb-8 animate-fade-in-up animation-delay-1000">
          {message}
        </p>

        {/* Animated Progress Bar */}
        <div className="w-64 mx-auto mb-8">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full animate-loading-bar"></div>
          </div>
        </div>

        {/* Breathing Animation */}
        <div className="relative mb-8">
          <div className="w-16 h-16 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-breathing opacity-60"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-breathing animation-delay-500 opacity-80"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-breathing animation-delay-1000"></div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center items-center mb-8 space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>

        {/* Built with Bolt.new Badge */}
        <div className="animate-fade-in-up animation-delay-2000">
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm text-gray-600 hover:text-gray-800 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">⚡</span>
            Built with bolt.new
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLoader;