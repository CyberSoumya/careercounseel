import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ChatMessage } from '../types';
import useStore from '../store/useStore';

const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm your AI career counselor. How are you feeling about your career choices today? Feel free to share your thoughts or concerns.",
      sender: 'bot',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { setEmotionalState } = useStore();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeEmotion = (text: string): string => {
    const lowerText = text.toLowerCase();
    const emotionPatterns = {
      stressed: ['stress', 'worried', 'anxious', 'overwhelm', 'pressure', 'nervous'],
      confused: ['confus', 'unsure', 'don\'t know', 'lost', 'uncertain', 'unclear'],
      confident: ['confident', 'sure', 'certain', 'know', 'clear', 'decided'],
      neutral: []
    };

    for (const [emotion, patterns] of Object.entries(emotionPatterns)) {
      if (patterns.some(pattern => lowerText.includes(pattern))) {
        return emotion;
      }
    }
    return 'neutral';
  };

  const getResponse = async (userInput: string, emotion: string): Promise<{ text: string; action?: string }> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
      stressed: {
        text: "I can sense that you're feeling stressed about your career decisions. That's completely normal. Taking our MBTI assessment can help you better understand yourself and reduce anxiety by identifying your natural strengths. Would you like to start the assessment now?",
        action: 'mbti'
      },
      confused: {
        text: "It sounds like you're feeling uncertain about your career path. Many people go through this phase. Our career assessment is specifically designed to help clarify your interests and potential career paths based on your preferences. Shall we begin the assessment to get some clarity?",
        action: 'career'
      },
      confident: {
        text: "I'm glad to hear you're feeling confident! To help validate your career direction and potentially discover new opportunities that align with your interests, would you like to take our career assessment? It can provide additional insights to support your decision.",
        action: 'career'
      },
      neutral: {
        text: "To help guide you better, let's start with understanding your personality type through our MBTI assessment. This will give us valuable insights into your natural preferences and potential career paths. Would you like to begin?",
        action: 'mbti'
      }
    };

    if (userInput.toLowerCase().includes('yes') && messages[messages.length - 1].sender === 'bot') {
      const lastBotMessage = messages[messages.length - 1];
      if (lastBotMessage.text.includes('MBTI')) {
        return { text: "Great! I'll redirect you to the MBTI assessment now.", action: 'mbti' };
      } else if (lastBotMessage.text.includes('career assessment')) {
        return { text: "Excellent! I'll take you to the career assessment now.", action: 'career' };
      }
    }

    return responses[emotion as keyof typeof responses];
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    const emotion = analyzeEmotion(input);
    setEmotionalState(emotion);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getResponse(input, emotion);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      if (response.action) {
        setTimeout(() => {
          navigate(`/${response.action}`);
        }, 2000);
      }
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I apologize, but I'm having trouble processing your request. Could you please try again?",
        sender: 'bot',
        timestamp: Date.now(),
      }]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-indigo-600 text-white flex items-center">
          <MessageCircle className="h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold">AI Career Counselor</h2>
        </div>

        <div className="h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2 text-gray-500"
              >
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>AI is typing...</span>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;