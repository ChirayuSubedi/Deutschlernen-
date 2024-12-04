import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Languages, Trophy, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Deutsch<span className="text-blue-600">Lernen</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Master German through interactive lessons, real-time pronunciation feedback, 
            and a supportive learning community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
              Start Learning Now
            </button>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Take Placement Test
            </button>
          </div>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: GraduationCap, title: 'Interactive Lessons', desc: 'Learn through engaging exercises' },
            { icon: Languages, title: 'Speech Recognition', desc: 'Perfect your pronunciation' },
            { icon: Trophy, title: 'Gamified Learning', desc: 'Earn points and badges' },
            { icon: Users, title: 'Community Support', desc: 'Learn with others' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;