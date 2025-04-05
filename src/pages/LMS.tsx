import React, { useState } from 'react';
import { Book, FileText, Video as VideoIcon, CheckCircle } from 'lucide-react';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';

const LMS = () => {
  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);

  const classes = Array.from({ length: 10 }, (_, i) => i + 1);
  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies'];

  const courseContent = {
    videos: [
      { id: 1, title: 'Introduction to Algebra', url: 'https://example.com/video1' },
      { id: 2, title: 'Basic Chemistry', url: 'https://example.com/video2' },
    ],
    pdfs: [
      { id: 1, title: 'Mathematics Worksheet', url: 'https://example.com/pdf1' },
      { id: 2, title: 'Science Notes', url: 'https://example.com/pdf2' },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Course Content</h3>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Videos</h4>
              {courseContent.videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedContent(video)}
                  className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 rounded"
                >
                  <VideoIcon className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{video.title}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">PDFs</h4>
              {courseContent.pdfs.map((pdf) => (
                <button
                  key={pdf.id}
                  onClick={() => setSelectedContent(pdf)}
                  className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 rounded"
                >
                  <FileText className="h-4 w-4 text-red-600" />
                  <span className="text-sm">{pdf.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-3 bg-white rounded-lg shadow-lg p-6">
          {selectedContent ? (
            <div>
              <h2 className="text-xl font-bold mb-4">{selectedContent.title}</h2>
              {selectedContent.url.includes('video') ? (
                <ReactPlayer
                  url={selectedContent.url}
                  controls
                  width="100%"
                  height="400px"
                />
              ) : (
                <Document file={selectedContent.url}>
                  <Page pageNumber={1} />
                </Document>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Book className="h-16 w-16 mx-auto mb-4" />
              <p>Select content from the sidebar to start learning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LMS;