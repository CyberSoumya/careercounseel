import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { careerQuestions } from '../data/careerQuestions';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const CareerAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { careerAnswers, setCareerAnswer, setRecommendations } = useStore();
  const navigate = useNavigate();

  const calculateCareerPath = () => {
    const answers = Object.values(careerAnswers);
    const interests = {
      technical: 0,
      creative: 0,
      business: 0,
      healthcare: 0,
      research: 0
    };

    answers.forEach(answer => {
      const lowerAnswer = answer.toLowerCase();
      if (lowerAnswer.includes('tech') || lowerAnswer.includes('programming')) interests.technical++;
      if (lowerAnswer.includes('art') || lowerAnswer.includes('creative')) interests.creative++;
      if (lowerAnswer.includes('business') || lowerAnswer.includes('management')) interests.business++;
      if (lowerAnswer.includes('health') || lowerAnswer.includes('medical')) interests.healthcare++;
      if (lowerAnswer.includes('research') || lowerAnswer.includes('analysis')) interests.research++;
    });

    const maxInterest = Object.entries(interests).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const recommendations = getCareerRecommendations(maxInterest);
    setRecommendations(recommendations);
    return maxInterest;
  };

  const getCareerRecommendations = (interest: string) => {
    const recommendations = {
      technical: [
        'Software Development',
        'Data Science',
        'Cybersecurity',
        'AI/ML Engineering'
      ],
      creative: [
        'UX/UI Design',
        'Digital Marketing',
        'Content Creation',
        'Art Direction'
      ],
      business: [
        'Business Analysis',
        'Project Management',
        'Management Consulting',
        'Entrepreneurship'
      ],
      healthcare: [
        'Medical Practice',
        'Healthcare Administration',
        'Biomedical Research',
        'Public Health'
      ],
      research: [
        'Data Analysis',
        'Market Research',
        'Academic Research',
        'R&D'
      ]
    };
    
    return recommendations[interest as keyof typeof recommendations] || [];
  };

  const handleAnswer = (answer: string) => {
    setCareerAnswer(careerQuestions[currentQuestion].id, answer);
    
    if (currentQuestion < careerQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (Object.keys(careerAnswers).length === careerQuestions.length - 1) {
      const careerPath = calculateCareerPath();
      navigate('/dashboard', { state: { careerPath } });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Interest Assessment</h2>
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / careerQuestions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {careerQuestions.length}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl text-gray-800 mb-6">{careerQuestions[currentQuestion].question}</h3>
          <div className="space-y-4">
            {careerQuestions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>

        {currentQuestion === careerQuestions.length - 1 && Object.keys(careerAnswers).length === careerQuestions.length && (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">Assessment Complete!</p>
            <button
              onClick={() => {
                const careerPath = calculateCareerPath();
                navigate('/dashboard', { state: { careerPath } });
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View Results
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CareerAssessment;