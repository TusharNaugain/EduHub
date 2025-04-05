import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import LiveClass from './pages/LiveClass';
import ChatBot from './pages/ChatBot';
import LMS from './pages/LMS';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/live-class" element={<LiveClass />} />
              <Route path="/chatbot" element={<ChatBot />} />
              <Route path="/lms" element={<LMS />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;