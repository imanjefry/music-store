import React from 'react';
import { Album, Singer } from '../types';
import AlbumCard from '../components/AlbumCard';
import SingerCard from '../components/SingerCard';

interface BrowsePageProps {
  searchQuery: string;
  albums: Album[];
  singers: Singer[];
  favoriteAlbumIds: Set<number>;
  favoriteSingerIds: Set<number>;
  onToggleAlbumFavorite: (id: number) => void;
  onToggleSingerFavorite: (id: number) => void;
  onAlbumClick: (album: Album) => void;
}

const BrowsePage: React.FC<BrowsePageProps> = ({
  searchQuery,
  albums,
  singers,
  favoriteAlbumIds,
  favoriteSingerIds,
  onToggleAlbumFavorite,
  onToggleSingerFavorite,
  onAlbumClick,
}) => {
  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSingers = singers.filter(singer =>
    singer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">Browse All Music</h1>

      <section className="space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white">Albums</h2>
          {filteredAlbums.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredAlbums.map(album => (
                <AlbumCard 
                  key={album.id} 
                  album={album} 
                  isFavorite={favoriteAlbumIds.has(album.id)}
                  onToggleFavorite={onToggleAlbumFavorite}
                  onClick={() => onAlbumClick(album)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No albums found matching your search.</p>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 text-white">Artists</h2>
          {filteredSingers.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-4 md:gap-6 items-start">
              {filteredSingers.map(singer => (
                <SingerCard
                  key={singer.id}
                  singer={singer}
                  isFavorite={favoriteSingerIds.has(singer.id)}
                  onToggleFavorite={onToggleSingerFavorite}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No artists found matching your search.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BrowsePage;
