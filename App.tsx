
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Album, Singer, Page } from './types';
import { INITIAL_FEATURED_ALBUMS, INITIAL_NEW_RELEASES, INITIAL_SINGERS } from './constants';
import AddAlbumModal from './components/AddAlbumModal';
import AddSingerModal from './components/AddSingerModal';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import ChartsPage from './pages/ChartsPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredAlbums, setFeaturedAlbums] = useState<Album[]>(INITIAL_FEATURED_ALBUMS);
  const [newReleases, setNewReleases] = useState<Album[]>(INITIAL_NEW_RELEASES);
  const [singers, setSingers] = useState<Singer[]>(INITIAL_SINGERS);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isSingerModalOpen, setIsSingerModalOpen] = useState(false);
  const [favoriteAlbumIds, setFavoriteAlbumIds] = useState<Set<number>>(new Set());
  const [favoriteSingerIds, setFavoriteSingerIds] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleAddAlbum = (album: Omit<Album, 'id'>, type: 'featured' | 'new') => {
    const newAlbum = {
      ...album,
      id: Date.now(),
    };
    if (type === 'featured') {
      setFeaturedAlbums(prev => [newAlbum, ...prev]);
    } else {
      setNewReleases(prev => [newAlbum, ...prev]);
    }
    setIsAlbumModalOpen(false);
  };
  
  const handleAddSinger = (singer: Omit<Singer, 'id'>) => {
    const newSinger = {
      ...singer,
      id: Date.now(),
    };
    setSingers(prev => [newSinger, ...prev]);
    setIsSingerModalOpen(false);
  };

  const handleToggleAlbumFavorite = (albumId: number) => {
    setFavoriteAlbumIds(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(albumId)) {
        newFavs.delete(albumId);
      } else {
        newFavs.add(albumId);
      }
      return newFavs;
    });
  };
  
  const handleToggleSingerFavorite = (singerId: number) => {
    setFavoriteSingerIds(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(singerId)) {
        newFavs.delete(singerId);
      } else {
        newFavs.add(singerId);
      }
      return newFavs;
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            searchQuery={searchQuery}
            featuredAlbums={featuredAlbums}
            newReleases={newReleases}
            singers={singers}
            favoriteAlbumIds={favoriteAlbumIds}
            favoriteSingerIds={favoriteSingerIds}
            onToggleAlbumFavorite={handleToggleAlbumFavorite}
            onToggleSingerFavorite={handleToggleSingerFavorite}
            onAddSingerClick={() => setIsSingerModalOpen(true)}
          />
        );
      case 'browse':
        return (
          <BrowsePage
            searchQuery={searchQuery}
            albums={[...featuredAlbums, ...newReleases]}
            singers={singers}
            favoriteAlbumIds={favoriteAlbumIds}
            favoriteSingerIds={favoriteSingerIds}
            onToggleAlbumFavorite={handleToggleAlbumFavorite}
            onToggleSingerFavorite={handleToggleSingerFavorite}
          />
        );
      case 'charts':
        return <ChartsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        onAddAlbumClick={() => setIsAlbumModalOpen(true)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <AddAlbumModal
        isOpen={isAlbumModalOpen}
        onClose={() => setIsAlbumModalOpen(false)}
        onAddAlbum={handleAddAlbum}
      />
      <AddSingerModal
        isOpen={isSingerModalOpen}
        onClose={() => setIsSingerModalOpen(false)}
        onAddSinger={handleAddSinger}
      />
    </div>
  );
};

export default App;
