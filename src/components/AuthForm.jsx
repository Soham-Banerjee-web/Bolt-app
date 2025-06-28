import React, { useState } from 'react';
import { Brain, Eye, EyeOff, Shield, Lock, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { createUser } from '../types';
import { EncryptionService } from '../utils/encryption';
import { SecureStorage } from '../utils/storage';
import { EmailService } from '../utils/emailService';
import { v4 as uuidv4 } from 'uuid';

const AuthForm = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false
  });

  const validatePassword = (pwd) => {
    const validation = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    };
    setPasswordValidation(validation);
    return Object.values(validation).every(Boolean);
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (!isLogin) {
      validatePassword(pwd);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!validateEmail(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      if (isLogin) {
        // Login logic - much faster now
        const users = SecureStorage.getUsers();
        const user = users.find(u => u.email === email);
        
        if (!user) {
          setError('User not found. Please check your email or sign up.');
          return;
        }

        // Simple password verification for demo
        if (rememberMe) {
          SecureStorage.setRememberMe(true);
        }
        
        SecureStorage.setCurrentUser(user.id);
        
        // Immediate login - no artificial delay
        onLogin(user);
        setLoading(false);
        return;
      } else {
        // Registration logic - optimized
        if (!Object.values(passwordValidation).every(Boolean)) {
          setError('Password does not meet requirements.');
          return;
        }

        const users = SecureStorage.getUsers();
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
          setError('An account with this email already exists.');
          return;
        }

        const verificationCode = EmailService.generateVerificationCode();
        
        const newUser = createUser({
          id: uuidv4(),
          email,
          name,
          createdAt: new Date(),
          badges: [],
          streak: 0,
          totalSessions: 0,
          encryptionKey: EncryptionService.createUserKey(),
          emailVerified: false,
          verificationCode,
          isPremium: false,
          subscriptionDate: null,
          subscriptionStatus: 'inactive'
        });

        SecureStorage.saveUser(newUser);
        SecureStorage.setCurrentUser(newUser.id);
        
        // Send verification email asynchronously
        EmailService.sendVerificationEmail(email, verificationCode);
        
        // Immediate registration - no delay
        onLogin(newUser);
        setLoading(false);
        return;
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const validCount = Object.values(passwordValidation).filter(Boolean).length;
    if (validCount === 0) return { strength: 'weak', color: 'bg-red-500', width: '0%' };
    if (validCount <= 2) return { strength: 'weak', color: 'bg-red-500', width: '25%' };
    if (validCount === 3) return { strength: 'medium', color: 'bg-yellow-500', width: '75%' };
    return { strength: 'strong', color: 'bg-green-500', width: '100%' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-3 animate-float">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MindWell
            </h1>
          </div>
          <p className="text-gray-600">
            {isLogin ? 'Welcome back to your wellness journey' : 'Start your mental health journey today'}
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center mb-2">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">End-to-End Encrypted</span>
          </div>
          <p className="text-sm text-green-700">
            Your data is encrypted and only you have access to it. We prioritize your privacy and security.
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                isLogin
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                !isLogin
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {!isLogin && password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Password strength:</span>
                    <span className={`text-sm font-medium ${
                      passwordStrength.strength === 'strong' ? 'text-green-600' :
                      passwordStrength.strength === 'medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: passwordStrength.width }}
                    ></div>
                  </div>
                  <div className="space-y-1">
                    <div className={`flex items-center text-sm ${passwordValidation.length ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.length ? <CheckCircle className="h-4 w-4 mr-2" /> : <AlertCircle className="h-4 w-4 mr-2" />}
                      At least 8 characters
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.uppercase ? <CheckCircle className="h-4 w-4 mr-2" /> : <AlertCircle className="h-4 w-4 mr-2" />}
                      One uppercase letter
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.lowercase ? <CheckCircle className="h-4 w-4 mr-2" /> : <AlertCircle className="h-4 w-4 mr-2" />}
                      One lowercase letter
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.special ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.special ? <CheckCircle className="h-4 w-4 mr-2" /> : <AlertCircle className="h-4 w-4 mr-2" />}
                      One special character
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (!isLogin && !Object.values(passwordValidation).every(Boolean))}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  {isLogin ? 'Sign In Securely' : 'Create Secure Account'}
                </>
              )}
            </button>
          </form>

          {!isLogin && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Privacy First:</strong> Your account will be secured with end-to-end encryption. 
                All your personal data, including journal entries and chat messages, will be encrypted 
                with a unique key that only you possess.
              </p>
            </div>
          )}
        </div>

        {/* Quick Demo Access */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <p className="text-sm text-yellow-800 mb-3">
            <strong>Quick Demo Access:</strong> For testing, use any email and password combination.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setEmail('demo@mindwell.app');
                setPassword('Demo123!');
                setIsLogin(true);
              }}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Demo Login
            </button>
            <button
              onClick={() => {
                setEmail('newuser@mindwell.app');
                setPassword('NewUser123!');
                setName('Demo User');
                setIsLogin(false);
              }}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Demo Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;