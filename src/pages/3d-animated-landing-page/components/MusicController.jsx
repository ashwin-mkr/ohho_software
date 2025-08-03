import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MusicController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Mock audio context for demonstration
  useEffect(() => {
    // Simulate audio loading and duration
    setDuration(180); // 3 minutes mock duration
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In real implementation, this would control actual audio
    console.log(isPlaying ? 'Pausing techno music' : 'Playing techno music');
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    // In real implementation, this would control audio volume
    console.log('Volume changed to:', newVolume);
  };

  const handleProgressClick = (e) => {
    if (!progressRef?.current) return;
    
    const rect = progressRef?.current?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * duration;
    setCurrentTime(newTime);
    // In real implementation, this would seek audio
    console.log('Seeking to:', newTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Controller */}
      <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
              ${isPlaying 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500' :'bg-white/10 hover:bg-white/20'
              }
            `}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            <Icon 
              name={isPlaying ? 'Pause' : 'Play'} 
              size={20} 
              className="text-white" 
            />
          </button>

          {/* Track Info */}
          <div className="min-w-0 flex-1">
            <div className="text-white text-sm font-medium truncate">
              Futuristic Techno Ambient
            </div>
            <div className="text-blue-200/60 text-xs">
              Background Music
            </div>
          </div>

          {/* Volume Control */}
          <div className="relative">
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
              aria-label="Volume control"
            >
              <Icon 
                name={volume === 0 ? 'VolumeX' : volume < 0.5 ? 'Volume1' : 'Volume2'} 
                size={16} 
                className="text-white" 
              />
            </button>

            {/* Volume Slider */}
            {showVolumeSlider && (
              <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-3">
                <div className="flex flex-col items-center space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider-vertical"
                    style={{
                      background: `linear-gradient(to right, #00d4ff 0%, #00d4ff ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                  <span className="text-white text-xs">{Math.round(volume * 100)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 space-y-2">
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-1 bg-white/20 rounded-full cursor-pointer overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-blue-200/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Visualizer Effect */}
        {isPlaying && (
          <div className="flex items-end justify-center space-x-1 mt-3 h-8">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full"
                style={{
                  height: `${Math.random() * 100 + 20}%`,
                  animation: `pulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Music Notes Animation */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="absolute text-cyan-400/30 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            >
              <Icon name="Music" size={16} />
            </div>
          ))}
        </div>
      )}

      {/* Custom CSS for slider */}
      <style jsx>{`
        .slider-vertical::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00d4ff;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 212, 255, 0.3);
        }
        
        .slider-vertical::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00d4ff;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 212, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default MusicController;