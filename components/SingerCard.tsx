
import React from 'react';
import { Singer } from '../types';
import HeartIcon from './icons/HeartIcon';

interface SingerCardProps {
  singer: Singer;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const SingerCard: React.FC<SingerCardProps> = ({ singer, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(singer.id);
  };
  
  return (
    <div className="group relative text-center p-4 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:-translate-y-1 h-full flex items-center justify-center">
       <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 z-20 p-1 bg-black/30 rounded-full transition-colors duration-200 ${isFavorite ? 'text-red-500' : 'text-white/70 hover:text-white'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon className="h-5 w-5" isFilled={isFavorite} />
        </button>
      <h3 className="text-white text-md font-semibold truncate">{singer.name}</h3>
    </div>
  );
};

export default SingerCard;