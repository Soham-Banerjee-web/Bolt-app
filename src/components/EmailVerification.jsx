import React, { useState } from 'react';
import { Mail, Shield, RefreshCw, CheckCircle } from 'lucide-react';
import { SecureStorage } from '../utils/storage';
import { EmailService } from '../utils/emailService';

const EmailVerification = ({ user, onVerificationComplete }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerification = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (verificationCode.trim() === user.verificationCode) {
        const verifiedUser = {
          ...user,
          emailVerified: true,
          verificationCode: null
        };
        
        SecureStorage.saveUser(verifiedUser);
        onVerificationComplete(verifiedUser);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResending(true);
    setError('');

    try {
      const newCode = EmailService.generateVerificationCode();
      const updatedUser = {
        ...user,
        verificationCode: newCode
      };
      
      SecureStorage.saveUser(updatedUser);
      EmailService.sendVerificationEmail(user.email, newCode);
      
      // Update the user object for this component
      Object.assign(user, updatedUser);
      
      alert('New verification code sent to your email!');
    } catch (err) {
      setError('Failed to resend verification code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
          <div className="text-center mb-8">
            <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Mail className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
            <p className="text-gray-600">
              We've sent a verification code to <strong>{user.email}</strong>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-800">Security Notice</span>
            </div>
            <p className="text-sm text-blue-700">
              Email verification helps protect your account and ensures you can recover access if needed.
            </p>
          </div>

          <form onSubmit={handleVerification} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-mono tracking-widest"
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || verificationCode.length !== 6}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Verify Email
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendCode}
              disabled={resending}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center mx-auto disabled:opacity-50"
            >
              {resending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resend Code
                </>
              )}
            </button>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> For demonstration purposes, check the browser console for your verification code: <strong>{user.verificationCode}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;