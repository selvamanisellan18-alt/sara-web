import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Reliable HTML5 Audio Player Hook.
 * Handles audio playback state, progress, duration, loading states, and error handling.
 */
export function useAudioPlayer(src) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
      setError(null);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onWaiting = () => {
      setIsLoading(true);
    };

    const onPlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onError = (e) => {
      setIsLoading(false);
      setIsPlaying(false);
      setError("Unable to load audio file. Using soothing voice note preview.");
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    if (src) {
      audio.src = src;
      audio.load();
    }

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.src = '';
    };
  }, [src]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      setError(null);
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Audio play prevented or failed", err);
      setError("Autoplay blocked. Tap to interact.");
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((timeInSeconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = timeInSeconds;
    setCurrentTime(timeInSeconds);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
    isPlaying,
    isLoading,
    duration,
    currentTime,
    progress,
    error,
    play,
    pause,
    toggle,
    seek,
  };
}
