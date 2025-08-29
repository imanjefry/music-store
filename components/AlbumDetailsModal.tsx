import React, { useEffect, useState } from 'react';
import { Album, Song } from '../types';
import XIcon from './icons/XIcon';
import PlayIcon from './icons/PlayIcon';
import * as api from '../services/api';
import LoadingSpinner from './LoadingSpinner';

interface AlbumDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: Album;
  onPlayTrack: (track: Song, album: Album, tracklist: Song[]) => void;
}

const AlbumDetailsModal: React.FC<AlbumDetailsModalProps> = ({ isOpen, onClose, album, onPlayTrack }) => {
  const [tracklist, setTracklist] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const fetchTracks = async () => {
      if (isOpen && album.id) {
        setIsLoading(true);
        setTracklist([]);
        try {
          const tracks = await api.fetchAlbumTracks(album.id);
          setTracklist(tracks);
        } catch (error) {
          console.error("Failed to fetch tracks:", error);
          // Optionally, set an error state to show in the UI
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchTracks();
  }, [isOpen, album.id]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="album-details-title"
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl relative border border-gray-700 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 overflow-y-auto">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img src={album.coverUrl} alt={`${album.title} cover`} className="w-full h-auto aspect-square rounded-lg shadow-lg" />
            <h2 id="album-details-title" className="text-2xl font-bold mt-4 text-white truncate">{album.title}</h2>
            <p className="text-lg text-gray-300">{album.artist}</p>
          </div>

          <div className="flex-grow w-full md:w-2/3">
            <h3 className="text-xl font-semibold mb-4 text-white">Tracklist</h3>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <LoadingSpinner />
              </div>
            ) : tracklist.length > 0 ? (
              <ul className="space-y-2">
                {tracklist.map((song, index) => (
                  <li key={song.id}>
                    <button 
                      onClick={() => onPlayTrack(song, album, tracklist)}
                      className="w-full flex items-center gap-4 p-2 rounded-md hover:bg-gray-700/50 transition-colors duration-200 text-left group"
                      disabled={!song.url}
                    >
                      <span className="text-sm text-gray-400 w-6 text-center">{index + 1}</span>
                      <div className="flex-grow">
                        <p className={`font-medium truncate ${song.url ? 'text-white' : 'text-gray-500'}`}>{song.title}</p>
                      </div>
                      <span className="text-sm text-gray-400">{song.duration}</span>
                      {song.url ? (
                        <div className="text-white">
                          <PlayIcon className="h-8 w-8 text-white opacity-50 group-hover:opacity-100" />
                        </div>
                      ) : (
                        <div className="w-8 h-8"></div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No playable tracks available for this album.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailsModal;