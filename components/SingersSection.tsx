import React from 'react';
import { Singer } from '../types';
import SingerCard from './SingerCard';
import UserPlusIcon from './icons/UserPlusIcon';

interface SingersSectionProps {
  searchQuery: string;
  singers: Singer[];
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
  onAddSingerClick: () => void;
}

const SingersSection: React.FC<SingersSectionProps> = ({ searchQuery, singers, favoriteIds, onToggleFavorite, onAddSingerClick }) => {
  const filteredSingers = singers.filter(singer =>
    singer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className="flex items-baseline gap-3 mb-6">
        <h2 className="text-3xl font-bold text-white">Browse Artists</h2>
        {favoriteIds.size > 0 && (
          <span className="bg-purple-600 text-sm font-semibold text-white px-2.5 py-0.5 rounded-full">
            {favoriteIds.size}
          </span>
        )}
      </div>
      {filteredSingers.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 items-start">
          {filteredSingers.map(singer => (
            <SingerCard
              key={singer.id}
              singer={singer}
              isFavorite={favoriteIds.has(singer.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
          <button
            onClick={onAddSingerClick}
            className="group flex flex-col items-center justify-center text-center w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full border-2 border-dashed border-gray-600 hover:border-purple-500 hover:bg-gray-800 transition-all duration-300"
            aria-label="Add a new artist"
          >
            <UserPlusIcon className="h-10 w-10 text-gray-500 group-hover:text-purple-400 transition-colors" />
            <span className="mt-2 text-sm font-semibold text-gray-400 group-hover:text-white">Add Artist</span>
          </button>
        </div>
      ) : (
         <p className="text-gray-400">No artists found matching your search.</p>
      )}
    </section>
  );
};

export default SingersSection;