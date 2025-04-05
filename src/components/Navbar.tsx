import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Video, MessageSquare, Layout, Users, LogOut, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(supabase.auth.getUser());

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">EduPlatform</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" icon={<Layout />} text="Dashboard" />
            <NavLink to="/courses" icon={<BookOpen />} text="Courses" />
            <NavLink to="/live-class" icon={<Video />} text="Live Class" />
            <NavLink to="/chatbot" icon={<MessageSquare />} text="AI Chat" />
            <NavLink to="/lms" icon={<Users />} text="LMS" />

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;