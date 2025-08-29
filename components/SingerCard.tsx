
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
    <div className="group relative text-center">
      <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
        <img
          src={singer.imageUrl}
          alt={singer.name}
          className="w-full h-full object-cover rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-1 right-1 z-20 p-2 bg-black/50 rounded-full transition-colors duration-200 ${isFavorite ? 'text-red-500' : 'text-white/70 hover:text-white'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon className="h-5 w-5" isFilled={isFavorite} />
        </button>
      </div>
      <h3 className="mt-4 text-white text-md font-semibold truncate">{singer.name}</h3>
    </div>
  );
};

export default SingerCard;