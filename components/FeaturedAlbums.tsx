import React from 'react';
import AlbumCard from './AlbumCard';
import { Album } from '../types';
import PlusIcon from './icons/PlusIcon';

interface FeaturedAlbumsProps {
  searchQuery: string;
  albums: Album[];
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
  onAlbumClick: (album: Album) => void;
  onAdd: () => void;
}

const FeaturedAlbums: React.FC<FeaturedAlbumsProps> = ({ searchQuery, albums, favoriteIds, onToggleFavorite, onAlbumClick, onAdd }) => {
  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Featured Albums</h2>
        <button
          onClick={onAdd}
          className="bg-gray-800 p-2 rounded-full text-gray-400 hover:bg-purple-600 hover:text-white transition-all"
          title="Add new album"
          aria-label="Add new album"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      {filteredAlbums.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredAlbums.map(album => (
            <AlbumCard 
              key={album.id} 
              album={album} 
              isFavorite={favoriteIds.has(album.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={() => onAlbumClick(album)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No featured albums found matching your search.</p>
      )}
    </section>
  );
};

export default FeaturedAlbums;
