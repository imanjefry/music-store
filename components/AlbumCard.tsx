import React, { useState } from 'react';
import { Album } from '../types';
import PlayIcon from './icons/PlayIcon';
import HeartIcon from './icons/HeartIcon';

interface AlbumCardProps {
  album: Album;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClick: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, isFavorite, onToggleFavorite, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(album.id);
  };

  const handleCardClick = () => {
    setIsClicked(true);
    onClick(); // Propagate the click event
    
    // Reset the animation state after it completes
    setTimeout(() => {
      setIsClicked(false);
    }, 300); // This duration should match the transition duration
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div 
      className={`group relative block overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer ${isClicked ? 'scale-95' : 'scale-100'}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-2 right-2 z-20 p-2 bg-black/50 rounded-full transition-colors duration-200 ${isFavorite ? 'text-red-500' : 'text-white/70 hover:text-white'}`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon className="h-6 w-6" isFilled={isFavorite} />
      </button>
      <img
        src={album.coverUrl}
        alt={`${album.title} cover`}
        className="w-full h-auto object-cover aspect-square transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
        <PlayIcon className="h-16 w-16 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300"/>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
        <h3 className="text-white text-lg font-semibold truncate">{album.title}</h3>
        <p className="text-gray-300 text-sm truncate">{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;