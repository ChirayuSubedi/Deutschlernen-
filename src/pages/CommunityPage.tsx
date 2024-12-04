import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Video, Calendar } from 'lucide-react';

export default function CommunityPage() {
  const discussions = [
    {
      id: 1,
      title: "Tips for mastering German articles",
      author: "Maria S.",
      replies: 24,
      likes: 45,
      category: "Grammar",
    },
    {
      id: 2,
      title: "Best German movies for learning",
      author: "Thomas K.",
      replies: 18,
      likes: 32,
      category: "Resources",
    },
  ];

  const events = [
    {
      id: 1,
      title: "German Conversation Club",
      date: "Every Tuesday",
      time: "18:00 - 19:30",
      participants: 12,
      level: "B1-B2",
    },
    {
      id: 2,
      title: "Grammar Workshop",
      date: "March 15, 2024",
      time: "17:00 - 18:30",
      participants: 8,
      level: "A2-B1",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community</h1>
          <p className="text-xl text-gray-600">Connect with fellow German learners</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Recent Discussions</h2>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{discussion.title}</h3>
                        <p className="text-sm text-gray-600">Posted by {discussion.author}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {discussion.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{discussion.replies} replies</span>
                      <span>{discussion.likes} likes</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mt-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.participants} participants
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Level: {event.level}
                      </div>
                    </div>
                    <button className="mt-2 text-blue-600 text-sm font-semibold hover:text-blue-700">
                      Join Event
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Discussion
                </button>
                <button className="w-full py-2 px-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <Video className="w-5 h-5 mr-2" />
                  Join Language Exchange
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}