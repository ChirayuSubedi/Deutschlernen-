import React from 'react';
import { motion } from 'framer-motion';
import { Mic, BarChart, BookOpen, Users } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose DeutschLernen?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform combines cutting-edge technology with proven learning methods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex gap-6"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mic className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Speech Recognition</h3>
              <p className="text-gray-600">
                Perfect your pronunciation with our advanced speech recognition technology. 
                Get instant feedback on your speaking skills.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex gap-6"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed analytics and progress reports. 
                Set goals and achieve them.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex gap-6"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Interactive Lessons</h3>
              <p className="text-gray-600">
                Engage with dynamic content including quizzes, dialogues, and grammar exercises 
                tailored to your level.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex gap-6"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Connect with fellow learners, participate in discussions, and practice 
                with native speakers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;