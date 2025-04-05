import React, { useState } from 'react';
import { Search, BookOpen, Star, Clock } from 'lucide-react';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Mathematics Class 10',
      description: 'Complete mathematics course for class 10 students',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      duration: '48 hours',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3',
      subject: 'Mathematics',
      class: 10,
    },
    {
      id: 2,
      title: 'Science Class 9',
      description: 'Comprehensive science course covering physics, chemistry, and biology',
      instructor: 'Prof. Michael Brown',
      rating: 4.7,
      duration: '52 hours',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3',
      subject: 'Science',
      class: 9,
    },
    // Add more courses as needed
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'all' || course.class === parseInt(selectedClass);
    const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;
    return matchesSearch && matchesClass && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="all">All Classes</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Class {i + 1}
              </option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="all">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Social Studies">Social Studies</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  by {course.instructor}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;