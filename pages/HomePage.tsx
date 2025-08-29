
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedAlbums from '../components/FeaturedAlbums';
import NewReleases from '../components/NewReleases';
import SingersSection from '../components/SingersSection';
import GenreBrowser from '../components/GenreBrowser';
import { Album, Singer } from '../types';

interface HomePageProps {
  searchQuery: string;
  featuredAlbums: Album[];
  newReleases: Album[];
  singers: Singer[];
  favoriteAlbumIds: Set<number>;
  favoriteSingerIds: Set<number>;
  onToggleAlbumFavorite: (id: number) => void;
  onToggleSingerFavorite: (id: number) => void;
  onAddSingerClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  searchQuery,
  featuredAlbums,
  newReleases,
  singers,
  favoriteAlbumIds,
  favoriteSingerIds,
  onToggleAlbumFavorite,
  onToggleSingerFavorite,
  onAddSingerClick,
}) => {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <FeaturedAlbums 
          searchQuery={searchQuery} 
          albums={featuredAlbums} 
          favoriteIds={favoriteAlbumIds}
          onToggleFavorite={onToggleAlbumFavorite}
        />
        <NewReleases 
          searchQuery={searchQuery} 
          albums={newReleases}
          favoriteIds={favoriteAlbumIds}
          onToggleFavorite={onToggleAlbumFavorite}
        />
        <SingersSection
          searchQuery={searchQuery}
          singers={singers}
          favoriteIds={favoriteSingerIds}
          onToggleFavorite={onToggleSingerFavorite}
          onAddSingerClick={onAddSingerClick}
        />
        <GenreBrowser />
      </div>
    </>
  );
};

export default HomePage;
