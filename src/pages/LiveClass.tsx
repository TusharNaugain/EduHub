import React, { useState } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import { Video, Users, Link as LinkIcon } from 'lucide-react';

const LiveClass = () => {
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleCreateRoom = async () => {
    // Replace with your LiveKit server endpoint
    try {
      const response = await fetch('YOUR_LIVEKIT_ENDPOINT/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomName }),
      });
      const data = await response.json();
      setToken(data.token);
      setIsJoined(true);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  if (isJoined && token) {
    return (
      <LiveKitRoom
        token={token}
        serverUrl="YOUR_LIVEKIT_SERVER_URL"
        connect={true}
      >
        <VideoConference />
      </LiveKitRoom>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Video className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold">Live Class</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Name
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter room name"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleCreateRoom}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Users className="h-5 w-5" />
              <span>Create Room</span>
            </button>
            
            <button
              onClick={() => {/* Handle join room */}}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <LinkIcon className="h-5 w-5" />
              <span>Join Room</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClass;