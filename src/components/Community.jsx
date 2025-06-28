import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, MessageCircle, Heart, Search, Filter, MapPin, Calendar, Star, Send, X, Plus } from 'lucide-react';
import { SecureStorage } from '../utils/storage';
import { CommunityService } from '../utils/communityService';
import { v4 as uuidv4 } from 'uuid';

const Community = ({ onBack, user }) => {
  const [activeTab, setActiveTab] = useState('discover');
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showProfile, setShowProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const interests = [
    'Anxiety Support', 'Depression Help', 'Mindfulness', 'Meditation', 'Stress Relief',
    'Self-Care', 'Therapy', 'Wellness', 'Mental Health', 'Positive Thinking',
    'Gratitude', 'Breathing Exercises', 'Sleep Health', 'Work-Life Balance',
    'Relationships', 'Personal Growth', 'Emotional Support', 'Recovery'
  ];

  useEffect(() => {
    loadCommunityData();
  }, [user.id]);

  const loadCommunityData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load community users and conversations
      const communityUsers = CommunityService.getCommunityUsers();
      const userConversations = CommunityService.getUserConversations(user.id);
      
      setUsers(communityUsers || []);
      setConversations(userConversations || []);
    } catch (error) {
      console.error('Failed to load community data:', error);
      setError('Failed to load community data. Please try again.');
      setUsers([]);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => {
    if (u.id === user.id) return false;
    
    const matchesSearch = !searchQuery || 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.bio && u.bio.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesInterests = selectedInterests.length === 0 || 
      (u.interests && selectedInterests.some(interest => u.interests.includes(interest)));
    
    return matchesSearch && matchesInterests;
  });

  const handleStartConversation = (targetUser) => {
    try {
      const existingConversation = conversations.find(conv => 
        conv.participants.includes(targetUser.id)
      );

      if (existingConversation) {
        setSelectedConversation(existingConversation);
      } else {
        const newConversation = {
          id: uuidv4(),
          participants: [user.id, targetUser.id],
          participantDetails: [user, targetUser],
          messages: [],
          createdAt: new Date(),
          lastActivity: new Date()
        };
        
        CommunityService.saveConversation(newConversation);
        setConversations(prev => [...prev, newConversation]);
        setSelectedConversation(newConversation);
      }
      setActiveTab('messages');
    } catch (error) {
      console.error('Error starting conversation:', error);
      setError('Failed to start conversation. Please try again.');
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const message = {
        id: uuidv4(),
        senderId: user.id,
        content: newMessage,
        timestamp: new Date(),
        read: false
      };

      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, message],
        lastActivity: new Date()
      };

      CommunityService.updateConversation(updatedConversation);
      setSelectedConversation(updatedConversation);
      setConversations(prev => 
        prev.map(conv => conv.id === updatedConversation.id ? updatedConversation : conv)
      );
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  const renderDiscoverTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors duration-200">
            <Filter className="h-5 w-5" />
          </button>
        </div>

        {/* Interest Filters */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by interests:</h3>
          <div className="flex flex-wrap gap-2">
            {interests.slice(0, 8).map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  setSelectedInterests(prev => 
                    prev.includes(interest) 
                      ? prev.filter(i => i !== interest)
                      : [...prev, interest]
                  );
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedInterests.includes(interest)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((communityUser) => (
            <div key={communityUser.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                  {communityUser.name.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{communityUser.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{communityUser.location}</p>
                <div className="flex items-center justify-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {communityUser.joinedDate}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 text-center">{communityUser.bio}</p>

              {/* Interests */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {communityUser.interests?.slice(0, 3).map((interest) => (
                    <span key={interest} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {interest}
                    </span>
                  ))}
                  {communityUser.interests?.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{communityUser.interests.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Match Score */}
              <div className="flex items-center justify-center mb-4">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-gray-700">
                  {communityUser.matchScore}% match
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowProfile(communityUser)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-colors duration-200"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleStartConversation(communityUser)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {loading ? 'Loading users...' : 'No users found'}
          </h3>
          <p className="text-gray-500">
            {loading ? 'Please wait while we load the community' : 'Try adjusting your search or filters'}
          </p>
        </div>
      )}
    </div>
  );

  const renderMessagesTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">Messages</h3>
        </div>
        <div className="overflow-y-auto h-full">
          {conversations.length > 0 ? (
            conversations.map((conversation) => {
              const otherUser = conversation.participantDetails?.find(p => p.id !== user.id);
              const lastMessage = conversation.messages[conversation.messages.length - 1];
              
              if (!otherUser) return null;
              
              return (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {otherUser.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">{otherUser.name}</h4>
                      <p className="text-sm text-gray-600 truncate">
                        {lastMessage ? lastMessage.content : 'Start a conversation...'}
                      </p>
                    </div>
                    {lastMessage && (
                      <div className="text-xs text-gray-500">
                        {lastMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-4 text-center text-gray-500">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No conversations yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                {selectedConversation.participantDetails?.find(p => p.id !== user.id)?.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">
                  {selectedConversation.participantDetails?.find(p => p.id !== user.id)?.name}
                </h3>
                <p className="text-sm text-gray-600">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.senderId === user.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-2 rounded-xl transition-colors duration-200"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose someone to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Community</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadCommunityData}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 mb-8">
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Community</h2>
          <p className="text-gray-600">Connect with like-minded people on their wellness journey</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-2xl w-fit mx-auto">
        <button
          onClick={() => setActiveTab('discover')}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            activeTab === 'discover'
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Users className="h-5 w-5 inline mr-2" />
          Discover
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            activeTab === 'messages'
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <MessageCircle className="h-5 w-5 inline mr-2" />
          Messages
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'discover' && renderDiscoverTab()}
      {activeTab === 'messages' && renderMessagesTab()}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Profile</h3>
              <button
                onClick={() => setShowProfile(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                {showProfile.name.charAt(0)}
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-1">{showProfile.name}</h4>
              <p className="text-gray-600 mb-2">{showProfile.location}</p>
              <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {showProfile.joinedDate}
              </div>
            </div>

            <div className="mb-6">
              <h5 className="font-semibold text-gray-800 mb-2">About</h5>
              <p className="text-gray-600">{showProfile.bio}</p>
            </div>

            <div className="mb-6">
              <h5 className="font-semibold text-gray-800 mb-3">Interests</h5>
              <div className="flex flex-wrap gap-2">
                {showProfile.interests?.map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                handleStartConversation(showProfile);
                setShowProfile(null);
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200"
            >
              Start Conversation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;