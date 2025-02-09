import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MBTIAssessment from './components/MBTIAssessment';
import CareerAssessment from './components/CareerAssessment';
import ChatBot from './components/ChatBot';
import Resources from './components/Resources';
import Dashboard from './components/Dashboard';
import Gamification from './components/Gamification';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mbti" element={<MBTIAssessment />} />
            <Route path="/career" element={<CareerAssessment />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/achievements" element={<Gamification />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App