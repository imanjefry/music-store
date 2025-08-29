import React from 'react';
import { Singer } from '../types';
import SingerCard from './SingerCard';

interface SingersSectionProps {
  searchQuery: string;
  singers: Singer[];
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
}

const SingersSection: React.FC<SingersSectionProps> = ({ searchQuery, singers, favoriteIds, onToggleFavorite }) => {
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
        </div>
      ) : (
         <p className="text-gray-400">No artists found matching your search.</p>
      )}
    </section>
  );
};

export default SingersSection;