import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);
  const userInteractedRef = useRef(false);

  // Use your own audio file - place it in public/audio folder
  const audioUrl = "/music.mp3";

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      // Set audio properties
      audioRef.current.volume = 0.5; // Set volume to 50%
      audioRef.current.loop = true;
      audioRef.current.preload = "auto";
    }

    // Try to play audio automatically (works in some browsers)
    const tryAutoplay = () => {
      if (audioRef.current && !userInteractedRef.current) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio autoplay successful");
              setIsPlaying(true);
            })
            .catch(error => {
              console.log("Autoplay prevented, waiting for user interaction");
              setShowInstruction(true);
              
              // Remove instruction after 5 seconds
              setTimeout(() => {
                setShowInstruction(false);
              }, 5000);
            });
        }
      }
    };

    // Try autoplay after a short delay
    const timeoutId = setTimeout(tryAutoplay, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle user interaction for audio playback
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteractedRef.current) {
        userInteractedRef.current = true;
        setHasInteracted(true);
        
        // Try to play audio on first user interaction
        if (audioRef.current && !isPlaying) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              setShowInstruction(false);
            })
            .catch(error => {
              console.log("Play failed:", error);
            });
        }
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      // If audio hasn't started playing yet, start it first
      if (!isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            // Then toggle mute
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
          })
          .catch(error => {
            console.log("Could not start audio:", error);
          });
      } else {
        // Just toggle mute if already playing
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
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.log("Could not play audio:", error);
          });
      }
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
      />
      
      {/* Audio Player UI */}
      <div className="audio-player-container">
        {/* Instruction message for autoplay */}
        {showInstruction && (
          <div className="audio-instruction">
            <span>Click anywhere to enable music</span>
            <div className="pulse-dot"></div>
          </div>
        )}
        
        <div className="audio-player">
           <button 
            onClick={toggleMute}
            className={`audio-btn mute-btn ${isMuted ? 'muted' : ''}`}
            aria-label={isMuted ? "Unmute music" : "Mute music"}
            title={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? (
              <FaVolumeMute className="audio-icon" />
            ) : (
              <FaVolumeUp className="audio-icon" />
            )}
            {isPlaying && !isMuted && <span className="sound-wave"></span>}
          </button>
          
        </div>
      </div>
    </>
  );
}