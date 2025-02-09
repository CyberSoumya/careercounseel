import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, GraduationCap } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      title: 'Competitive Exam Guides',
      description: 'Comprehensive study materials and tips for JEE, WBJEE, NEET, CLAT, and IAT',
      icon: GraduationCap,
      items: [
        'JEE/WBJEE Preparation Strategy',
        'NEET Study Schedule',
        'CLAT Mock Tests',
        'IAT Practice Questions',
      ],
    },
    {
      title: 'Career Development',
      description: 'Resources to help you build essential skills and knowledge',
      icon: Award,
      items: [
        'Resume Writing Guide',
        'Interview Preparation',
        'Soft Skills Development',
        'Industry Insights',
      ],
    },
    {
      title: 'Learning Materials',
      description: 'Educational content to support your career journey',
      icon: BookOpen,
      items: [
        'Video Tutorials',
        'Online Courses',
        'E-books and Articles',
        'Industry Reports',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Resources</h2>
        <p className="text-gray-600">Access comprehensive materials to support your career journey</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <resource.icon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">{resource.title}</h3>
            <p className="text-gray-600 mb-6">{resource.description}</p>
            <ul className="space-y-3">
              {resource.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Resources;