import React, { useRef, useEffect, useState } from 'react';
import { Album, Song } from '../types';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import NextIcon from './icons/NextIcon';
import PreviousIcon from './icons/PreviousIcon';
import XIcon from './icons/XIcon';
import PlaylistIcon from './icons/PlaylistIcon';
import SpeakerIcon from './icons/SpeakerIcon';
import VolumeIcon from './icons/VolumeIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import * as api from '../services/api';

interface MusicPlayerProps {
  track: Song;
  playlist: { album: Album, songs: Song[] };
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onTrackEnd: () => void;
  onSelectTrack: (track: Song) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track, playlist, isPlaying, onPlayPause, onNext, onPrev, onClose, onTrackEnd, onSelectTrack }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);
  const [volume, setVolume] = useState(1);
  const [lastVolume, setLastVolume] = useState(1);
  const [isFindingFullSong, setIsFindingFullSong] = useState(false);
  
  // This single useEffect handles all audio playback logic to prevent race conditions.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Function to safely play audio, handling potential AbortError
    const playAudio = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // AbortError is expected when a user action interrupts playback.
          // It's safe to ignore.
          if (error.name !== 'AbortError') {
            console.error("Error playing audio:", error);
          }
        });
      }
    };

    // If the track source is new, we need to load it first.
    if (track && audio.src !== track.url) {
      audio.src = track.url;
      // We must wait for the new audio to load before trying to play it.
      // Once it's ready, if the state is still 'playing', we start playback.
      const handleCanPlay = () => {
        if (isPlaying) {
          playAudio();
        }
      };
      audio.addEventListener('canplay', handleCanPlay);
      
      // Cleanup the event listener when the effect re-runs or the component unmounts
      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
      };
    } else {
      // If the source is the same, we can just toggle play/pause.
      if (isPlaying) {
        playAudio();
      } else {
        audio.pause();
      }
    }
  }, [track, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);


  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setLastVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setLastVolume(volume);
      setVolume(0);
    } else {
      setVolume(lastVolume > 0 ? lastVolume : 1);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlaylist = () => {
    setIsPlaylistVisible(prev => !prev);
  };

  const handleFindFullSong = async () => {
    setIsFindingFullSong(true);
    try {
        const url = await api.findFullSongUrl(track.title, playlist.album.artist);
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            alert(`Sorry, an AI-powered search couldn't find a full version of "${track.title}". You can still enjoy the preview!`);
        }
    } catch (error) {
        console.error("Error in AI song search:", error);
        alert("There was an error while searching for the full song.");
    } finally {
        setIsFindingFullSong(false);
    }
  };

  const album = playlist.album;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90]">
      {isPlaylistVisible && (
        <div className="absolute bottom-20 left-0 right-0 w-full max-w-4xl mx-auto">
          <div className="bg-gray-800/95 backdrop-blur-md rounded-t-lg shadow-2xl max-h-80 overflow-y-auto border-t border-l border-r border-gray-700">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 px-2 text-white">Up Next from <span className="font-bold">{album.title}</span></h3>
              <ul className="space-y-1">
                {playlist.songs.map((song, index) => (
                  <li key={song.id}>
                    <button
                      onClick={() => onSelectTrack(song)}
                      className={`w-full flex items-center gap-4 p-2 rounded-md hover:bg-gray-700/50 transition-colors duration-200 text-left group ${track.id === song.id ? 'bg-purple-600/40' : ''}`}
                    >
                      {track.id === song.id ? (
                        <SpeakerIcon className="h-5 w-5 text-purple-400 flex-shrink-0" />
                      ) : (
                         <span className="w-5 text-center text-sm text-gray-400 flex-shrink-0">{index + 1}</span>
                      )}
                      
                      <div className="flex-grow min-w-0">
                        <p className={`font-medium truncate ${track.id === song.id ? 'text-purple-300' : 'text-white'}`}>{song.title}</p>
                      </div>
                      <span className="text-sm text-gray-400 flex-shrink-0">{song.duration}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="h-20 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 flex items-center px-4 sm:px-6 lg:px-8 text-white">
        <audio 
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={onTrackEnd}
        />

        <div className="flex items-center gap-4 w-1/4 min-w-0">
          <img src={album.coverUrl} alt={album.title} className="w-12 h-12 rounded flex-shrink-0" />
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold truncate">{track.title}</p>
              <button
                  onClick={handleFindFullSong}
                  disabled={isFindingFullSong}
                  className="p-1 rounded-full text-gray-400 hover:text-purple-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                  title="Find full song on the web (AI-powered)"
                >
                  {isFindingFullSong ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <ExternalLinkIcon className="h-4 w-4" />
                  )}
                </button>
            </div>
            <p className="text-sm text-gray-400 truncate">{album.artist}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-2 w-1/2">
          <div className="flex items-center gap-4">
            <button
              onClick={onPrev}
              aria-label="Previous track"
              className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-90"
            >
              <PreviousIcon className="h-6 w-6" />
            </button>
            <button
              onClick={onPlayPause}
              className="bg-white text-gray-900 rounded-full p-3 shadow-lg transform transition-all duration-200 hover:scale-110 active:scale-100"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <PauseIcon className="h-7 w-7" /> : <PlayIcon className="h-7 w-7" />}
            </button>
            <button
              onClick={onNext}
              aria-label="Next track"
              className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-90"
            >
              <NextIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="w-full flex items-center gap-2 text-xs">
            <span className="text-gray-400">{formatTime(progress)}</span>
            <input 
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
            />
            <span className="text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-end w-1/4 gap-4">
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white" aria-label={volume > 0 ? "Mute" : "Unmute"}>
              <VolumeIcon isMuted={volume === 0} className="h-5 w-5" />
            </button>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
              aria-label="Volume slider"
            />
          </div>
          <button onClick={togglePlaylist} className={`p-2 rounded-full transition-colors ${isPlaylistVisible ? 'bg-purple-600/50 text-white' : 'text-gray-400 hover:text-white'}`} aria-label="Toggle playlist">
            <PlaylistIcon className="h-5 w-5" />
          </button>
          <button onClick={onClose} aria-label="Close player" className="p-2 text-gray-400 hover:text-white">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;