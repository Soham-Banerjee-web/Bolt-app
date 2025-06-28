import React from 'react';
import { ArrowLeft, BookOpen, Video, Headphones, ExternalLink, Heart, Lightbulb, Shield } from 'lucide-react';

const Resources = ({ onBack }) => {
  const categories = [
    {
      id: 'articles',
      title: 'Articles & Guides',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      resources: [
        { title: 'Understanding Anxiety: A Beginner\'s Guide', type: 'Article', duration: '5 min read' },
        { title: 'Building Healthy Coping Mechanisms', type: 'Guide', duration: '8 min read' },
        { title: 'The Science of Gratitude', type: 'Article', duration: '6 min read' },
        { title: 'Mindfulness in Daily Life', type: 'Guide', duration: '10 min read' },
      ],
    },
    {
      id: 'videos',
      title: 'Video Content',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      resources: [
        { title: 'Progressive Muscle Relaxation', type: 'Video', duration: '15 minutes' },
        { title: 'Guided Meditation for Beginners', type: 'Video', duration: '10 minutes' },
        { title: 'Cognitive Behavioral Techniques', type: 'Video', duration: '20 minutes' },
        { title: 'Stress Management Workshop', type: 'Video', duration: '25 minutes' },
      ],
    },
    {
      id: 'audio',
      title: 'Audio Resources',
      icon: Headphones,
      color: 'from-green-500 to-emerald-500',
      resources: [
        { title: 'Sleep Stories for Relaxation', type: 'Audio', duration: '30 minutes' },
        { title: 'Daily Affirmations', type: 'Audio', duration: '5 minutes' },
        { title: 'Nature Sounds for Focus', type: 'Audio', duration: '60 minutes' },
        { title: 'Breathing Exercise Guide', type: 'Audio', duration: '12 minutes' },
      ],
    },
  ];

  const quickTips = [
    {
      icon: Heart,
      title: 'Practice Self-Compassion',
      tip: 'Treat yourself with the same kindness you\'d show a good friend.',
    },
    {
      icon: Lightbulb,
      title: 'The 5-4-3-2-1 Technique',
      tip: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.',
    },
    {
      icon: Shield,
      title: 'Set Boundaries',
      tip: 'It\'s okay to say no to protect your mental health and well-being.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Mental Health Resources</h2>
        <p className="text-gray-600 mb-8">Curated content to support your mental health journey.</p>

        {/* Quick Tips */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200/30">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">{tip.title}</h4>
                      <p className="text-sm text-gray-600">{tip.tip}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resource Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id}>
                <div className="flex items-center mb-4">
                  <div className={`bg-gradient-to-r ${category.color} p-2 rounded-full mr-3`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.resources.map((resource, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">{resource.title}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded mr-2">{resource.type}</span>
                            <span>{resource.duration}</span>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional Help Notice */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-6 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-2">Need Professional Support?</h3>
        <p className="text-blue-100 mb-4">
          While these resources are helpful, they don't replace professional mental health care. 
          Consider speaking with a therapist or counselor for personalized support.
        </p>
        <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full font-semibold transition-colors duration-200">
          Find a Therapist
        </button>
      </div>
    </div>
  );
};

export default Resources;