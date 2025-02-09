import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Brain, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Discover Your Perfect Career Path
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Using AI-powered assessments and personalized guidance to help you make informed decisions about your future.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: Brain,
            title: 'Personality Assessment',
            description: 'Take our MBTI-based assessment to understand your strengths and preferences.',
            link: '/mbti',
          },
          {
            icon: Target,
            title: 'Career Mapping',
            description: 'Explore career paths aligned with your interests and abilities.',
            link: '/career',
          },
          {
            icon: MessageCircle,
            title: 'AI Career Counseling',
            description: 'Get personalized guidance from our emotional-aware chatbot.',
            link: '/chat',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <Link
              to={feature.link}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Begin Your Journey?
        </h2>
        <p className="text-gray-600 mb-6">
          Start with our comprehensive assessments to get personalized career recommendations.
        </p>
        <Link
          to="/mbti"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Take Assessment <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default Home;