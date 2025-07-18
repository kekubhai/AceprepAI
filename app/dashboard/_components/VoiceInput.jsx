"use client"

import { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, Save, Trash2, RefreshCw } from 'lucide-react';

export default function VoiceInput({ onTranscriptChange, initialTranscript = '', showTitle = true }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(initialTranscript);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSpeechRecognition, setHasSpeechRecognition] = useState(false);

  // Check if browser supports Web Speech API
  useEffect(() => {
    const speechRecognitionAvailable = 
      'SpeechRecognition' in window || 
      'webkitSpeechRecognition' in window;
    
    setHasSpeechRecognition(speechRecognitionAvailable);
  }, []);

  // Timer for recording duration
  useEffect(() => {
    let interval;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    
    return () => clearInterval(interval);
  }, [isRecording]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // This is a placeholder for the actual Web Speech API implementation
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      stopRecording();
    } else {
      // Start recording
      startRecording();
    }
  };
  
  const startRecording = () => {
    setIsRecording(true);
    setIsProcessing(true);
    setTranscript('Listening for your voice input...');
    
    // Simulated response after 3 seconds
    setTimeout(() => {
      setIsProcessing(false);
      setTranscript('I believe the answer to this question involves explaining the key principles of responsive design, including fluid grids, flexible images, and media queries. In my experience working on multiple responsive websites, I found that starting with a mobile-first approach leads to better optimization across all devices.');
      
      // Generate simulated audio URL
      setAudioURL('data:audio/mp3;base64,fake-audio-data');
      
      // Pass transcript to parent component if callback provided
      if (onTranscriptChange) {
        onTranscriptChange('I believe the answer to this question involves explaining the key principles of responsive design, including fluid grids, flexible images, and media queries. In my experience working on multiple responsive websites, I found that starting with a mobile-first approach leads to better optimization across all devices.');
      }
    }, 3000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    // In real implementation, you would stop the recording and process the final transcript
  };
  
  const clearTranscript = () => {
    setTranscript('');
    setAudioURL(null);
    if (onTranscriptChange) {
      onTranscriptChange('');
    }
  };
  
  const retryRecording = () => {
    clearTranscript();
    startRecording();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {showTitle && <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Input</h3>}
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Response</span>
            {isRecording && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-md">
                {formatTime(recordingTime)}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`flex h-2.5 w-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : isProcessing ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`}></span>
            <span className="text-sm text-gray-500">
              {isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Ready'}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 min-h-[150px] border border-gray-200">
          {transcript ? (
            <p className="text-gray-700">{transcript}</p>
          ) : (
            <p className="text-gray-400 italic">Your voice input will appear here...</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          {transcript && !isRecording && !isProcessing && (
            <div className="flex space-x-2">
              <button
                onClick={clearTranscript}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                title="Clear response"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <button
                onClick={retryRecording}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                title="Re-record"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center">
          {!hasSpeechRecognition && (
            <p className="text-xs text-orange-500 mb-2">
              Voice recognition not supported in this browser
            </p>
          )}
          
          <button
            onClick={toggleRecording}
            disabled={isProcessing || !hasSpeechRecognition}
            className={`p-4 rounded-full ${
              isRecording 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : isProcessing
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            } transition-all`}
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <p className="text-sm text-gray-500 mt-2">
            {isRecording 
              ? 'Tap to stop recording' 
              : isProcessing 
                ? 'Processing...' 
                : 'Tap to start recording'}
          </p>
        </div>
        
        <div>
          {audioURL && !isRecording && !isProcessing && (
            <button
              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
              title="Listen to recording"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      {audioURL && !isRecording && !isProcessing && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Voice analysis</div>
          <div className="flex space-x-2">
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-md">
              Clear speech
            </span>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-md">
              Good pace
            </span>
            <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md">
              Few filler words
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
