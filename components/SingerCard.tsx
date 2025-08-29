import React from 'react';
import { Singer } from '../types';
import HeartIcon from './icons/HeartIcon';

interface SingerCardProps {
  singer: Singer;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

// Helper to get initials
const getInitials = (name: string) => {
  const words = name.split(' ').filter(Boolean);
  if (words.length > 1) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  if (words.length === 1 && words[0].length > 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return '??';
};


const SingerCard: React.FC<SingerCardProps> = ({ singer, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(singer.id);
  };
  
  return (
    <div className="flex flex-col items-center text-center gap-3 group w-full">
      <div className="relative w-full aspect-square">
        <div className="group relative rounded-full overflow-hidden w-full h-full shadow-lg transition-transform duration-300 transform group-hover:scale-105">
          {singer.imageUrl ? (
            <img src={singer.imageUrl} alt={singer.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
              <span className="text-3xl lg:text-4xl font-bold text-white">{getInitials(singer.name)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`absolute bottom-0 right-0 z-20 p-2 bg-gray-800/80 rounded-full transition-all duration-200 transform hover:scale-110 ${isFavorite ? 'text-red-500' : 'text-white/70 hover:text-white'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon className="h-5 w-5" isFilled={isFavorite} />
        </button>
      </div>
      <h3 className="text-white text-sm sm:text-base font-semibold truncate w-full px-1">{singer.name}</h3>
    </div>
  );
};

export default SingerCard;
