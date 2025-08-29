import React from 'react';
import { Singer } from '../types';
import SingerCard from './SingerCard';
import UserPlusIcon from './icons/UserPlusIcon';

interface SingersSectionProps {
  searchQuery: string;
  singers: Singer[];
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
  onAdd: () => void;
}

const SingersSection: React.FC<SingersSectionProps> = ({ searchQuery, singers, favoriteIds, onToggleFavorite, onAdd }) => {
  const filteredSingers = singers.filter(singer =>
    singer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-baseline gap-3">
          <h2 className="text-3xl font-bold text-white">Browse Artists</h2>
          {favoriteIds.size > 0 && (
            <span className="bg-purple-600 text-sm font-semibold text-white px-2.5 py-0.5 rounded-full">
              {favoriteIds.size}
            </span>
          )}
        </div>
        <button 
          onClick={onAdd}
          className="bg-gray-800 p-2 rounded-full text-gray-400 hover:bg-purple-600 hover:text-white transition-all"
          title="Add new artist"
          aria-label="Add new artist"
        >
          <UserPlusIcon className="h-5 w-5" />
        </button>
      </div>
      {filteredSingers.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-4 md:gap-6 items-start">
          {filteredSingers.map(singer => (
            <SingerCard
              key={singer.id}
              singer={singer}
              isFavorite={favoriteIds.has(singer.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
         <p className="text-gray-400">No artists found matching your search.</p>
      )}
    </section>
  );
};

export default SingersSection;
