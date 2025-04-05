import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Video,
  MessageSquare,
  Users,
  Calendar,
  Award,
  Clock,
  BookMarked,
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Enrolled Courses', value: '12', icon: BookMarked },
    { label: 'Live Classes', value: '3', icon: Video },
    { label: 'Hours Learned', value: '48', icon: Clock },
    { label: 'Achievements', value: '5', icon: Award },
  ];

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Mathematics',
      topic: 'Quadratic Equations',
      time: '10:00 AM',
      teacher: 'Mrs. Smith',
    },
    {
      id: 2,
      subject: 'Science',
      topic: 'Chemical Reactions',
      time: '11:30 AM',
      teacher: 'Mr. Johnson',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/courses"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Browse Courses</h3>
          <p className="text-gray-600">
            Explore our comprehensive course library
          </p>
        </Link>

        <Link
          to="/live-class"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Video className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Join Live Class</h3>
          <p className="text-gray-600">
            Connect with teachers in real-time
          </p>
        </Link>

        <Link
          to="/chatbot"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageSquare className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
          <p className="text-gray-600">
            Get instant help with your doubts
          </p>
        </Link>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Upcoming Classes</h2>
          <Calendar className="h-6 w-6 text-gray-400" />
        </div>

        <div className="space-y-4">
          {upcomingClasses.map((cls) => (
            <div
              key={cls.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{cls.subject}</h3>
                <p className="text-sm text-gray-600">{cls.topic}</p>
                <p className="text-sm text-gray-500">by {cls.teacher}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 font-semibold">{cls.time}</p>
                <button className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;