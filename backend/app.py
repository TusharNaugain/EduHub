from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import tempfile
import os
import requests

app = Flask(__name__)
CORS(app)

# Load Whisper model once
model = whisper.load_model("medium")  # You can change to "small", "medium", etc.

# Set your OpenRouter API key
OPENROUTER_API_KEY = "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"

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    # Save to temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp:
        file.save(temp.name)
        temp_path = temp.name

    try:
        result = model.transcribe(temp_path)
        transcript = result["text"]
        return jsonify({'transcript': transcript})
    finally:
        os.remove(temp_path)  # Ensure temp file is deleted

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    transcript = data.get('transcript', '')

    if not transcript:
        return jsonify({'error': 'Transcript missing'}), 400

    prompt = f"""Generate well-structured lecture notes from the following class transcript. 
        Include important points in bullet format, avoid unnecessary dialogue or filler, and ensure clarity.
        Explain the importanat points in detail. keep it in bullet points.
        Give Examples if necessary.
Transcript:
{transcript}
"""

    headers = {
        'Authorization': f'Bearer {OPENROUTER_API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant that creates academic lecture notes."},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post("https://openrouter.ai/api/v1/chat/completions", json=payload, headers=headers)

    if response.status_code != 200:
        return jsonify({'error': 'Summarization failed', 'details': response.text}), 500

    notes = response.json()['choices'][0]['message']['content']
    return jsonify({'notes': notes})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
