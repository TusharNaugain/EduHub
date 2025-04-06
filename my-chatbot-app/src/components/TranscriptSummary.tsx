// src/components/TranscriptSummary.tsx
import React, { useEffect, useState } from 'react';

interface Props {
  transcript: string;
}

const TranscriptSummary: React.FC<Props> = ({ transcript }) => {
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    const summarize = async () => {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });

      const data = await response.json();
      setNotes(data.notes);
    };

    summarize();
  }, [transcript]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">📝 Lecture Notes</h2>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{notes}</pre>
    </div>
  );
};

export default TranscriptSummary;
