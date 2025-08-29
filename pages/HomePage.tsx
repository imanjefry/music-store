import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedAlbums from '../components/FeaturedAlbums';
import NewReleases from '../components/NewReleases';
import SingersSection from '../components/SingersSection';
import GenreBrowser from '../components/GenreBrowser';
import { Album, Singer } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import AlbumCard from '../components/AlbumCard';

interface HomePageProps {
  isLoading: boolean;
  searchQuery: string;
  searchResults: Album[];
  featuredAlbums: Album[];
  newReleases: Album[];
  singers: Singer[];
  favoriteAlbumIds: Set<number>;
  favoriteSingerIds: Set<number>;
  onToggleAlbumFavorite: (id: number) => void;
  onToggleSingerFavorite: (id: number) => void;
  onAlbumClick: (album: Album) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  isLoading,
  searchQuery,
  searchResults,
  featuredAlbums,
  newReleases,
  singers,
  favoriteAlbumIds,
  favoriteSingerIds,
  onToggleAlbumFavorite,
  onToggleSingerFavorite,
  onAlbumClick,
}) => {
  const showSearchResults = searchQuery.trim().length > 0;

  return (
    <>
      {!showSearchResults && <HeroSection />}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {isLoading && !showSearchResults ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : showSearchResults ? (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-white">Search Results</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {searchResults.map(album => (
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
              <p className="text-gray-400">No albums found for "{searchQuery}".</p>
            )}
          </section>
        ) : (
          <>
            <FeaturedAlbums 
              searchQuery={searchQuery} 
              albums={featuredAlbums} 
              favoriteIds={favoriteAlbumIds}
              onToggleFavorite={onToggleAlbumFavorite}
              onAlbumClick={onAlbumClick}
            />
            <NewReleases 
              searchQuery={searchQuery} 
              albums={newReleases}
              favoriteIds={favoriteAlbumIds}
              onToggleFavorite={onToggleAlbumFavorite}
              onAlbumClick={onAlbumClick}
            />
            <SingersSection
              searchQuery={searchQuery}
              singers={singers}
              favoriteIds={favoriteSingerIds}
              onToggleFavorite={onToggleSingerFavorite}
            />
            <GenreBrowser />
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;