import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mbtiQuestions } from '../data/mbtiQuestions';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const MBTIAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { mbtiAnswers, setMbtiAnswer, setRecommendations } = useStore();
  const navigate = useNavigate();

  const calculateMBTIType = () => {
    let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;
    
    Object.entries(mbtiAnswers).forEach(([_, answer]) => {
      const lowerAnswer = answer.toLowerCase();
      if (lowerAnswer.includes('socializing') || lowerAnswer.includes('outgoing')) e++;
      if (lowerAnswer.includes('alone') || lowerAnswer.includes('reserved')) i++;
      if (lowerAnswer.includes('details') || lowerAnswer.includes('practical')) s++;
      if (lowerAnswer.includes('patterns') || lowerAnswer.includes('theoretical')) n++;
      if (lowerAnswer.includes('logic') || lowerAnswer.includes('analyze')) t++;
      if (lowerAnswer.includes('feelings') || lowerAnswer.includes('heart')) f++;
      if (lowerAnswer.includes('structured') || lowerAnswer.includes('organized')) j++;
      if (lowerAnswer.includes('flexible') || lowerAnswer.includes('spontaneous')) p++;
    });

    const type = [
      e > i ? 'E' : 'I',
      s > n ? 'S' : 'N',
      t > f ? 'T' : 'F',
      j > p ? 'J' : 'P'
    ].join('');

    const recommendations = getMBTIRecommendations(type);
    setRecommendations(recommendations);
    return type;
  };

  const getMBTIRecommendations = (type: string) => {
    const recommendations = {
      'ISTJ': ['Software Engineering', 'Accounting', 'Project Management'],
      'ISFJ': ['Healthcare', 'Teaching', 'Social Work'],
      'INFJ': ['Counseling', 'Writing', 'Psychology'],
      'INTJ': ['Research', 'Strategic Planning', 'Systems Architecture'],
      'ISTP': ['Technical Analysis', 'Engineering', 'Forensics'],
      'ISFP': ['Art & Design', 'Music', 'Healthcare'],
      'INFP': ['Creative Writing', 'Counseling', 'Art Therapy'],
      'INTP': ['Data Science', 'Research', 'Software Development'],
      'ESTP': ['Entrepreneurship', 'Sales', 'Emergency Services'],
      'ESFP': ['Event Planning', 'Teaching', 'Performance Arts'],
      'ENFP': ['Marketing', 'Counseling', 'Public Relations'],
      'ENTP': ['Innovation', 'Entrepreneurship', 'Consulting'],
      'ESTJ': ['Business Management', 'Administration', 'Law'],
      'ESFJ': ['Healthcare Administration', 'Teaching', 'Human Resources'],
      'ENFJ': ['Education', 'Human Resources', 'Non-profit Management'],
      'ENTJ': ['Executive Leadership', 'Management Consulting', 'Law']
    };
    
    return recommendations[type as keyof typeof recommendations] || [];
  };

  const handleAnswer = (answer: string) => {
    setMbtiAnswer(mbtiQuestions[currentQuestion].id, answer);
    
    if (currentQuestion < mbtiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (Object.keys(mbtiAnswers).length === mbtiQuestions.length - 1) {
      const mbtiType = calculateMBTIType();
      navigate('/dashboard', { state: { mbtiType } });
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">MBTI Personality Assessment</h2>
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / mbtiQuestions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {mbtiQuestions.length}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl text-gray-800 mb-6">{mbtiQuestions[currentQuestion].question}</h3>
          <div className="space-y-4">
            {mbtiQuestions[currentQuestion].options.map((option, index) => (
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

        {currentQuestion === mbtiQuestions.length - 1 && Object.keys(mbtiAnswers).length === mbtiQuestions.length && (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">Assessment Complete!</p>
            <button
              onClick={() => {
                const mbtiType = calculateMBTIType();
                navigate('/dashboard', { state: { mbtiType } });
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

export default MBTIAssessment;