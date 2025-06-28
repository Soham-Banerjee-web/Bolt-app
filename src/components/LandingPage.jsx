import React, { useState, useEffect } from 'react';
import { Brain, Heart, Shield, MessageCircle, BookOpen, Sparkles, ArrowRight, Star, Users, Award, CheckCircle } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const features = [
    {
      icon: MessageCircle,
      title: "AI Companion",
      description: "Chat with Maya, your empathetic AI companion who understands and supports you 24/7",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "Track your emotional journey with beautiful visualizations and insights",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Sparkles,
      title: "Breathing Exercises",
      description: "Guided breathing sessions to help you find calm in stressful moments",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Private Journal",
      description: "Express your thoughts in a secure, encrypted space that's completely private",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Your data is encrypted and secure. Only you have access to your personal information",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Earn badges and track your mental health journey with meaningful milestones",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Maya feels like talking to a real friend. She remembers our conversations and genuinely cares about my progress.",
      rating: 5
    },
    {
      name: "David L.",
      text: "The privacy and encryption give me peace of mind. I can share anything without worry.",
      rating: 5
    },
    {
      name: "Emma R.",
      text: "The breathing exercises have become part of my daily routine. They really help with my anxiety.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Users" },
    { number: "50,000+", label: "Sessions Completed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support Available" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8 animate-fade-in-up">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full mr-4 shadow-lg">
                <Brain className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MindWell
              </h1>
            </div>

            {/* Hero Text */}
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in-up animation-delay-200">
              Your Personal
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> AI Companion</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
              Meet Maya, your empathetic AI companion who provides personalized mental health support, 
              tracks your progress, and helps you build lasting wellness habits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-600">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-50">
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 animate-fade-in-up animation-delay-800">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                End-to-End Encrypted
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                HIPAA Compliant
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                4.9/5 User Rating
              </div>
            </div>

            {/* Built with bolt.new Badge */}
            <div className="mt-8 animate-fade-in-up animation-delay-1000">
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm text-gray-600 hover:text-gray-800 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <span className="mr-2 text-lg">⚡</span>
                <span className="font-medium">Built with bolt.new</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white" data-animate id="stats">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${isVisible.stats ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" data-animate id="features">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 ${isVisible.features ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Everything you need for mental wellness
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to support your mental health journey with privacy and care
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isVisible.features ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white" data-animate id="testimonials">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 ${isVisible.testimonials ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Loved by thousands of users
            </h3>
            <p className="text-xl text-gray-600">
              See what our community has to say about their journey with MindWell
            </p>
          </div>

          <div className={`max-w-4xl mx-auto ${isVisible.testimonials ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-3xl"></div>
              <div className="relative">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-800 mb-6 font-medium">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <cite className="text-gray-600 font-semibold">
                  — {testimonials[currentTestimonial].name}
                </cite>
              </div>
            </div>

            {/* Testimonial Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-500 to-purple-600" data-animate id="cta">
        <div className="container mx-auto px-4 text-center">
          <div className={`max-w-3xl mx-auto ${isVisible.cta ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to start your wellness journey?
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who have found peace, clarity, and growth with MindWell
            </p>
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center group"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <p className="text-blue-100 mt-4 text-sm">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full mr-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MindWell</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 MindWell. Your mental health, our priority.
              </div>
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full text-xs text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <span className="mr-1">⚡</span>
                Built with bolt.new
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;