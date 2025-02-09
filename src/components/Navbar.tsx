import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Brain, Briefcase, MessageCircle, BookOpen, LayoutDashboard, Trophy } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: Compass, text: 'Home' },
    { path: '/mbti', icon: Brain, text: 'MBTI Assessment' },
    { path: '/career', icon: Briefcase, text: 'Career Assessment' },
    { path: '/chat', icon: MessageCircle, text: 'Chat' },
    { path: '/resources', icon: BookOpen, text: 'Resources' },
    { path: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
    { path: '/achievements', icon: Trophy, text: 'Achievements' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl text-gray-800">CareerGuide</span>
          </Link>
          
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;