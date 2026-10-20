import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Play, Pause, RotateCcw, Mic, Upload, Heart, Sparkles, Check, FileAudio } from 'lucide-react';
import { audioService } from '../utils/audioSynthesizer';
import { triggerHeartConfetti } from '../utils/confetti';

export default function VoiceMessageSection({ boyfriendName = "Selva", girlfriendName = "Sara" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(42); // 42 seconds romantic speech
  const [audioSource, setAudioSource] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showUploader, setShowUploader] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const recordIntervalRef = useRef(null);

  // Load saved voice message from localStorage if exists
  useEffect(() => {
    const savedAudio = localStorage.getItem('selva_sara_custom_voice');
    if (savedAudio) {
      setAudioSource(savedAudio);
    }
  }, []);

  const spokenTranscript = `Hey Thenmozhi... I made this special space just to express what my heart feels for you every single day. Loving you for these seven years has been the greatest blessing of my life. In every happiness and every difficult moment, your gentle smile and peaceful presence have been my greatest strength. You are my whole world, Sara. I love you, with all my heart, always.`;

  // Playback handler
  const handleTogglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const playAudio = () => {
    setIsPlaying(true);
    triggerHeartConfetti();
    audioService.playChime('sweet');

    if (audioSource && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio playback error', e));
    } else {
      // Use Web Speech API or simulated progress with gentle synthesized voice
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(spokenTranscript);
        utterance.rate = 0.88;
        utterance.pitch = 0.95;
        
        // Pick a warm voice if available
        const voices = window.speechSynthesis.getVoices();
        const gentleVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Male') || v.name.includes('David') || v.name.includes('Daniel')));
        if (gentleVoice) utterance.voice = gentleVoice;

        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
        };

        window.speechSynthesis.speak(utterance);
      }

      // Progress animation
      let currentSec = 0;
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        currentSec += 0.5;
        setProgress((currentSec / duration) * 100);
        if (currentSec >= duration) {
          clearInterval(timerRef.current);
          setIsPlaying(false);
          setProgress(100);
        }
      }, 500);
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleReset = () => {
    pauseAudio();
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const [audioError, setAudioError] = useState('');

  // Audio file upload with validation
  const handleFileUpload = (e) => {
    setAudioError('');
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|m4a|ogg|aac|webm)$/i)) {
      setAudioError('Please select a valid audio file (.mp3, .m4a, .wav, .ogg).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setAudioError('Audio file is too large. Please choose a recording under 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Audio = event.target.result;
      setAudioSource(base64Audio);
      try {
        localStorage.setItem('selva_sara_custom_voice', base64Audio);
      } catch (err) {
        console.warn('LocalStorage limit reached for audio file', err);
      }
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    };
    reader.onerror = () => {
      setAudioError('Failed to read the audio file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  // Live in-browser voice recording with permission error handling
  const startRecording = async () => {
    setAudioError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setAudioError('Audio recording is not supported in this browser. Please upload an MP3 file instead.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Audio = event.target.result;
          setAudioSource(base64Audio);
          try {
            localStorage.setItem('selva_sara_custom_voice', base64Audio);
          } catch (e) {
            console.warn(e);
          }
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      setAudioError('Microphone access was denied or is unavailable. You can upload an audio file directly below!');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordIntervalRef.current);
    }
  };

  return (
    <section id="voice" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-semibold mb-3">
            <Volume2 className="w-4 h-4 text-rose-500" />
            <span>A Special Whisper From My Soul</span>
          </div>
          <h2 className="font-caveat text-5xl sm:text-7xl font-bold text-[#4a2c2a] drop-shadow-sm">
            A Voice Message • For Thenmozhi
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#785350] max-w-md mx-auto mt-2 font-normal">
            Some feelings can never be fully spoken or written. Close your eyes and listen to what my heart wants to tell you.
          </p>
        </div>

        {/* Main Voice Player Luxury Card */}
        <div className="glass-panel-rose rounded-[2.5rem] p-6 sm:p-10 border-2 border-rose-300 shadow-xl relative overflow-hidden animate-border-blink">
          
          {/* Hidden native HTML audio element if custom audio exists */}
          {audioSource && (
            <audio
              ref={audioRef}
              src={audioSource}
              onTimeUpdate={() => {
                if (audioRef.current) {
                  setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
                  setDuration(Math.round(audioRef.current.duration) || 42);
                }
              }}
              onEnded={() => {
                setIsPlaying(false);
                setProgress(100);
              }}
            />
          )}

          <div className="flex flex-col items-center text-center">
            
            {/* Visualizer Waves */}
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 h-20 sm:h-24 my-3 w-full max-w-md">
              {Array.from({ length: 28 }).map((_, idx) => {
                const isOdd = idx % 2 === 0;
                const waveHeight = isPlaying 
                  ? Math.sin(idx * 0.4 + (progress * 0.1)) * 30 + 38 
                  : 8 + (idx % 4) * 4;

                return (
                  <motion.div
                    key={idx}
                    animate={{
                      height: isPlaying ? `${Math.max(10, waveHeight)}px` : '10px',
                      opacity: isPlaying ? 0.95 : 0.35,
                    }}
                    transition={{ duration: 0.2 }}
                    className={`w-1.5 sm:w-2 rounded-full ${
                      isOdd 
                        ? 'bg-rose-500' 
                        : 'bg-amber-400'
                    }`}
                  />
                );
              })}
            </div>

            {/* Glowing Big Call-to-Action Button */}
            <div className="my-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTogglePlay}
                className="relative group px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-caveat text-2xl sm:text-3xl font-bold tracking-wide shadow-xl shadow-rose-300/60 border border-amber-200 flex items-center space-x-3 transition-all duration-300"
              >
                <div className="relative flex items-center space-x-2.5 z-10">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-white text-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                    )}
                  </div>
                  <span>
                    {isPlaying ? "Pause Message" : "Click Here to Hear My Voice"}
                  </span>
                  <Heart className="w-5 h-5 text-amber-200 fill-amber-200 animate-heartbeat" />
                </div>
              </motion.button>
            </div>

            {/* Progress Bar & Timers */}
            <div className="w-full max-w-lg mt-1 mb-5">
              <div className="w-full h-2.5 rounded-full bg-rose-100 overflow-hidden relative cursor-pointer border border-rose-200">
                <motion.div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#785350] mt-2 font-medium">
                <span>
                  {Math.floor((duration * (progress / 100)) / 60)}:
                  {String(Math.floor((duration * (progress / 100)) % 60)).padStart(2, '0')}
                </span>
                <span className="text-rose-700 font-bold">
                  Personal Voice Message 🎙️
                </span>
                <span>
                  {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Romantic Transcription / Subtitle Box */}
            <div className="w-full max-w-xl p-5 rounded-2xl bg-white/85 border border-rose-200 text-left relative shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-rose-700 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  <span>Spoken Message For Sara</span>
                </span>
                {progress > 0 && (
                  <button 
                    onClick={handleReset} 
                    title="Play from start"
                    className="text-xs text-rose-600 hover:text-rose-800 flex items-center space-x-1 transition font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Replay</span>
                  </button>
                )}
              </div>
              <p className="text-[#4a2c2a] font-caveat text-xl sm:text-2xl leading-relaxed">
                "{spokenTranscript}"
              </p>
            </div>

            {/* Subtle discreet audio settings trigger */}
            <div className="mt-5 pt-3 border-t border-rose-100 w-full flex items-center justify-center">
              <button
                onClick={() => setShowUploader(!showUploader)}
                className="text-[11px] text-rose-400/80 hover:text-rose-600 flex items-center space-x-1 transition font-medium"
                title="Audio options"
              >
                <Mic className="w-3 h-3 text-rose-400" />
                <span>{showUploader ? "Close Audio Settings" : "Audio Settings"}</span>
              </button>
            </div>

            {/* Expandable Audio Recorder / Uploader Drawer */}
            <AnimatePresence>
              {showUploader && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full max-w-md mt-4 p-5 rounded-2xl bg-white/95 border-2 border-rose-300 shadow-md text-left"
                >
                  <h4 className="text-sm font-bold text-[#4a2c2a] mb-1 flex items-center space-x-1.5 font-caveat text-xl">
                    <FileAudio className="w-5 h-5 text-rose-500" />
                    <span>Personalize with Your Real Voice</span>
                  </h4>
                  <p className="text-xs text-[#785350] mb-4">
                    Sara will hear your exact voice recording directly when she clicks the button.
                  </p>

                  {audioError && (
                    <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs flex items-center space-x-2">
                      <span className="font-bold">Notice:</span>
                      <span>{audioError}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {/* Live Recorder */}
                    <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#4a2c2a]">
                          Option 1: Record Right Here
                        </div>
                        <div className="text-[11px] text-[#785350]">
                          {isRecording ? `Recording... (${recordingTime}s)` : "Click button to start recording"}
                        </div>
                      </div>

                      {isRecording ? (
                        <button
                          onClick={stopRecording}
                          className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold animate-pulse shadow"
                        >
                          Stop & Save
                        </button>
                      ) : (
                        <button
                          onClick={startRecording}
                          className="px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center space-x-1 shadow-sm"
                        >
                          <Mic className="w-3.5 h-3.5" />
                          <span>Start</span>
                        </button>
                      )}
                    </div>

                    {/* File Upload */}
                    <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#4a2c2a]">
                          Option 2: Upload MP3 / Audio File
                        </div>
                        <div className="text-[11px] text-[#785350]">
                          Select any voice note from your phone or PC
                        </div>
                      </div>

                      <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center space-x-1 shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse</span>
                        <input
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>

                    {uploadSuccess && (
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Voice message saved successfully! Test it with the button above.</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
