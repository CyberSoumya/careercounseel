import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Trophy, Target, BookOpen } from 'lucide-react';
import useStore from '../store/useStore';

const Dashboard = () => {
  const { mbtiAnswers, careerAnswers, recommendations } = useStore();

  const progressData = {
    mbti: (Object.keys(mbtiAnswers).length / 10) * 100,
    career: (Object.keys(careerAnswers).length / 10) * 100,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <PieChart className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-indigo-600">{progressData.mbti}%</span>
          </div>
          <h3 className="text-gray-700 font-medium">MBTI Progress</h3>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{progressData.career}%</span>
          </div>
          <h3 className="text-gray-700 font-medium">Career Assessment</h3>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <span className="text-2xl font-bold text-yellow-600">3</span>
          </div>
          <h3 className="text-gray-700 font-medium">Achievements</h3>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">12</span>
          </div>
          <h3 className="text-gray-700 font-medium">Resources Viewed</h3>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Your Career Path</h3>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                <span className="text-gray-700">{recommendation}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2" />
              Complete remaining assessments
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2" />
              Explore recommended resources
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2" />
              Schedule a counseling session
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;