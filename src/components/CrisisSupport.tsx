import React from 'react';
import { ArrowLeft, Phone, MessageCircle, Globe, Shield, Heart, Clock } from 'lucide-react';

interface CrisisSupportProps {
  onBack: () => void;
}

const CrisisSupport: React.FC<CrisisSupportProps> = ({ onBack }) => {
  const hotlines = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 free and confidential support',
      type: 'Call',
      icon: Phone,
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis counseling via text',
      type: 'Text',
      icon: MessageCircle,
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral and information service',
      type: 'Call',
      icon: Phone,
    },
  ];

  const internationalResources = [
    { country: 'United Kingdom', number: '116 123 (Samaritans)' },
    { country: 'Canada', number: '1-833-456-4566' },
    { country: 'Australia', number: '13 11 14 (Lifeline)' },
    { country: 'International', number: 'befrienders.org' },
  ];

  const copingStrategies = [
    {
      title: 'Grounding Technique',
      description: 'Focus on 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
      icon: Shield,
    },
    {
      title: 'Box Breathing',
      description: 'Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat.',
      icon: Heart,
    },
    {
      title: 'Safe Person',
      description: 'Call or text someone you trust. You don\'t have to go through this alone.',
      icon: Phone,
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

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg mb-8">
        <div className="flex items-center mb-4">
          <Shield className="h-8 w-8 mr-3" />
          <h2 className="text-2xl font-bold">Crisis Support Resources</h2>
        </div>
        <p className="text-red-100 text-lg">
          If you're having thoughts of suicide or self-harm, please reach out for help immediately. 
          You are not alone, and help is available 24/7.
        </p>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 mb-8">
        <div className="text-center mb-8">
          <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Phone className="h-10 w-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Emergency: Call 911</h3>
          <p className="text-gray-600">
            If you're in immediate danger or having a medical emergency
          </p>
        </div>

        {/* Crisis Hotlines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {hotlines.map((hotline, index) => {
            const IconComponent = hotline.icon;
            return (
              <div key={index} className="p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-200">
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{hotline.name}</h4>
                  <div className="text-xl font-bold text-blue-600 mb-2">{hotline.number}</div>
                  <p className="text-sm text-gray-600 mb-3">{hotline.description}</p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    24/7 Available
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Immediate Coping Strategies */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Immediate Coping Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {copingStrategies.map((strategy, index) => {
            const IconComponent = strategy.icon;
            return (
              <div key={index} className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200/30">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">{strategy.title}</h4>
                    <p className="text-sm text-gray-600">{strategy.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* International Resources */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
        <div className="flex items-center mb-6">
          <Globe className="h-6 w-6 text-blue-500 mr-3" />
          <h3 className="text-xl font-bold text-gray-800">International Crisis Resources</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internationalResources.map((resource, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-2xl">
              <div className="font-medium text-gray-800">{resource.country}</div>
              <div className="text-blue-600 font-mono">{resource.number}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200/30">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> For additional international resources, visit{' '}
            <a href="#" className="underline hover:no-underline">
              findahelpline.com
            </a>{' '}
            or search for crisis resources in your specific country.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;