// src/components/AudioUploader.tsx
import React, { useState } from 'react';

interface Props {
  onTranscriptionComplete: (text: string) => void;
}

const AudioUploader: React.FC<Props> = ({ onTranscriptionComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:5000/transcribe', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    onTranscriptionComplete(data.transcript);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={!file || loading} className="px-4 py-2 bg-blue-500 text-white rounded">
        {loading ? 'Transcribing...' : 'Upload & Transcribe'}
      </button>
    </div>
  );
};

export default AudioUploader;
