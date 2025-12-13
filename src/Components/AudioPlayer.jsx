import React, { useState, useEffect, useRef } from 'react';
import { 
  FaVolumeUp, 
  FaVolumeMute, 
  FaPlay, 
  FaPause,
  FaMusic
} from 'react-icons/fa';

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef(null);
  const hasTriedAutoplay = useRef(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use your audio file
  const audioUrl = "/music.mp3";

  // Function to play audio
  const playAudio = () => {
    if (!audioRef.current) return;
    
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("🎵 Audio started playing");
          setIsPlaying(true);
          setShowHint(false);
        })
        .catch(error => {
          console.log("🔇 Audio play failed:", error);
          setShowHint(true);
        });
    }
  };

  // Initialize audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";

    // Try to play automatically after a short delay
    const timeoutId = setTimeout(() => {
      if (!hasTriedAutoplay.current) {
        hasTriedAutoplay.current = true;
        playAudio();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Handle page interaction for audio
  useEffect(() => {
    if (!showHint) return;

    const handleInteraction = () => {
      playAudio();
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [showHint]);

  const toggleMute = () => {
    if (audioRef.current) {
      // If not playing, start playing first
      if (!isPlaying) {
        playAudio().then(() => {
          setTimeout(() => {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
          }, 100);
        });
      } else {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        playAudio();
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop />
      
      <div className="audio-player-container">
        {/* Simple hint for mobile */}
        {showHint && isMobile && (
          <div className="audio-hint-mobile">
            <FaMusic className="hint-icon" />
            <span>Tap to play music</span>
          </div>
        )}
        
        {/* Main audio player */}
        <div className="audio-player">
          {/* Play/Pause button - only show on mobile when not playing */}
          {isMobile && !isPlaying ? (
            <button 
              onClick={playAudio}
              className="audio-btn play-large-btn"
              aria-label="Play music"
            >
              <FaPlay className="audio-icon" />
            </button>
          ) : (
            <>
              {/* Mute/Unmute button */}
              <button 
                onClick={toggleMute}
                className={`audio-btn ${isMuted ? 'muted' : ''}`}
                aria-label={isMuted ? "Unmute music" : "Mute music"}
              >
                {isMuted ? (
                  <FaVolumeMute className="audio-icon" />
                ) : (
                  <FaVolumeUp className="audio-icon" />
                )}
                {isPlaying && !isMuted && <span className="sound-wave"></span>}
              </button>
              
              {/* Play/Pause button */}
              <button 
                onClick={togglePlayPause}
                className="audio-btn"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? (
                  <FaPause className="audio-icon" />
                ) : (
                  <FaPlay className="audio-icon" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}