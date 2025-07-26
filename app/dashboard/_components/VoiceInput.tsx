import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, RefreshCw, StopCircle } from 'lucide-react';

const VoiceToText: React.FC = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Log transcript on every render
  useEffect(() => {
    console.log("Transcript:", transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded">
        <span>Browser doesn't support speech recognition.</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2 text-black">Voice to Text</h3>
      <div className="flex items-center gap-3">
        <button
          onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'en-US' })}
          className={`p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition ${listening ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={listening}
          aria-label="Start Recording"
        >
          <Mic className="text-blue-600" />
        </button>
        <button
          onClick={SpeechRecognition.stopListening}
          className={`p-2 rounded-full bg-red-100 hover:bg-red-200 transition ${!listening ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!listening}
          aria-label="Stop Recording"
        >
          <StopCircle className="text-red-600" />
        </button>
        <button
          onClick={resetTranscript}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          aria-label="Reset Transcript"
        >
          <RefreshCw className="text-gray-600" />
        </button>
        <span className="ml-2 text-sm text-gray-500">
          Microphone: {listening ? <span className="text-green-600">on</span> : <span className="text-gray-400">off</span>}
        </span>
      </div>
      <textarea
        className="w-full mt-2 p-2 border rounded bg-gray-50 text-gray-800"
        rows={4}
        value={transcript}
        readOnly
        placeholder="Your speech will appear here..."
      />
    </div>
  );
};

export default VoiceToText;