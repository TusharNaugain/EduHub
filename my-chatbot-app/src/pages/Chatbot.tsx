import React, { useState } from 'react';
import AudioUploader from '../components/AudioUploader';
import TranscriptSummary from '../components/TranscriptSummary';

const Chatbot = () => {
  const [transcript, setTranscript] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6">
          🎤 Lecture Note Assistant
        </h1>

        <p className="text-gray-600 text-center mb-4">
          Upload your lecture audio and get detailed notes instantly.
        </p>

        <AudioUploader onTranscriptionComplete={setTranscript} />

        {transcript && (
          <div className="mt-8">
            <TranscriptSummary transcript={transcript} />
            <div className="flex justify-center mt-6">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105">
                ✨ Generate Detailed Notes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
