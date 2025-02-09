import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Target } from 'lucide-react';
import useStore from '../store/useStore';

const Gamification = () => {
  const { mbtiAnswers, careerAnswers } = useStore();

  const achievements = [
    {
      id: 1,
      title: 'Self-Explorer',
      description: 'Complete the MBTI Assessment',
      icon: Star,
      achieved: Object.keys(mbtiAnswers).length === 10,
      points: 100,
    },
    {
      id: 2,
      title: 'Career Pioneer',
      description: 'Complete the Career Assessment',
      icon: Target,
      achieved: Object.keys(careerAnswers).length === 10,
      points: 100,
    },
    {
      id: 3,
      title: 'Insight Master',
      description: 'Complete both assessments',
      icon: Trophy,
      achieved: Object.keys(mbtiAnswers).length === 10 && Object.keys(careerAnswers).length === 10,
      points: 250,
    },
    {
      id: 4,
      title: 'Career Explorer',
      description: 'Explore all resource sections',
      icon: Award,
      achieved: false,
      points: 50,
    },
  ];

  const totalPoints = achievements.reduce((acc, achievement) => 
    acc + (achievement.achieved ? achievement.points : 0), 0);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Achievement Center</h2>
        <div className="bg-indigo-600 text-white rounded-full px-6 py-3 inline-block">
          <span className="text-2xl font-bold">{totalPoints} Points</span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-white rounded-xl shadow-lg p-6 ${
              achievement.achieved ? 'border-2 border-indigo-500' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <achievement.icon className={`h-12 w-12 ${
                achievement.achieved ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <span className="text-2xl font-bold text-indigo-600">{achievement.points} pts</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
            <p className="text-gray-600 mb-4">{achievement.description}</p>
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${
              achievement.achieved 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {achievement.achieved ? 'Completed!' : 'In Progress'}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gamification;