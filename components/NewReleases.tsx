import React from 'react';
import AlbumCard from './AlbumCard';
import { Album } from '../types';

interface NewReleasesProps {
  searchQuery: string;
  albums: Album[];
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
}

const NewReleases: React.FC<NewReleasesProps> = ({ searchQuery, albums, favoriteIds, onToggleFavorite }) => {
  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-white">New Releases</h2>
      {filteredAlbums.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredAlbums.map(album => (
            <AlbumCard 
              key={album.id} 
              album={album}
              isFavorite={favoriteIds.has(album.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={() => console.log('Album Details:', album)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No new releases found matching your search.</p>
      )}
    </section>
  );
};

export default NewReleases;