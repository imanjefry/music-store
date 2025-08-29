import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Album, Singer, Page, Song } from './types';
import * as api from './services/api';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import ChartsPage from './pages/ChartsPage';
import ContactPage from './pages/ContactPage';
import AlbumDetailsModal from './components/AlbumDetailsModal';
import MusicPlayer from './components/MusicPlayer';
import LoadingSpinner from './components/LoadingSpinner';

// Custom hook for debouncing input
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};


const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredAlbums, setFeaturedAlbums] = useState<Album[]>([]);
  const [newReleases, setNewReleases] = useState<Album[]>([]);
  const [singers, setSingers] = useState<Singer[]>([]);
  const [searchResults, setSearchResults] = useState<Album[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [favoriteAlbumIds, setFavoriteAlbumIds] = useState<Set<number>>(new Set());
  const [favoriteSingerIds, setFavoriteSingerIds] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isAlbumDetailModalOpen, setIsAlbumDetailModalOpen] = useState(false);

  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<{album: Album, songs: Song[]}>({ album: {} as Album, songs: [] });
  const [isPlaying, setIsPlaying] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const topAlbums = await api.fetchTopAlbums();
        setFeaturedAlbums(topAlbums.slice(0, 10));
        setNewReleases(topAlbums.slice(10, 25));
        
        const uniqueSingers = topAlbums.reduce((acc, album) => {
          if (!acc.some(singer => singer.name === album.artist)) {
            acc.push({ id: album.id, name: album.artist }); // Using album id as singer id for simplicity
          }
          return acc;
        }, [] as Singer[]);
        setSingers(uniqueSingers);
        
        setError(null);
      } catch (err) {
        setError('Failed to load music. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }
      try {
        setIsLoading(true);
        const { albums } = await api.searchMusic(debouncedSearchQuery);
        setSearchResults(albums);
      } catch (err) {
        setError('Failed to perform search.');
      } finally {
        setIsLoading(false);
      }
    };
    performSearch();
  }, [debouncedSearchQuery]);


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

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    setIsAlbumDetailModalOpen(true);
  }

  const handlePlayTrack = (track: Song, album: Album, tracklist: Song[]) => {
    setCurrentTrack(track);
    if (album.id !== currentPlaylist.album.id) {
        setCurrentPlaylist({ album, songs: tracklist });
    }
    setIsPlaying(true);
    setIsAlbumDetailModalOpen(false);
  };

  const handleSelectTrackFromPlaylist = (track: Song) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if(currentTrack) {
      setIsPlaying(prev => !prev);
    }
  };

  const handleNextTrack = () => {
    if (!currentPlaylist || !currentTrack) return;
    const currentIndex = currentPlaylist.songs.findIndex(s => s.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.songs.length;
    setCurrentTrack(currentPlaylist.songs[nextIndex]);
    setIsPlaying(true);
  };
  
  const handlePrevTrack = () => {
    if (!currentPlaylist || !currentTrack) return;
    const currentIndex = currentPlaylist.songs.findIndex(s => s.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + currentPlaylist.songs.length) % currentPlaylist.songs.length;
    setCurrentTrack(currentPlaylist.songs[prevIndex]);
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  const renderPage = () => {
    if (error) {
      return <div className="container mx-auto text-center py-20 text-red-400">{error}</div>;
    }
    
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            isLoading={isLoading}
            searchQuery={searchQuery}
            searchResults={searchResults}
            featuredAlbums={featuredAlbums}
            newReleases={newReleases}
            singers={singers}
            favoriteAlbumIds={favoriteAlbumIds}
            favoriteSingerIds={favoriteSingerIds}
            onToggleAlbumFavorite={handleToggleAlbumFavorite}
            onToggleSingerFavorite={handleToggleSingerFavorite}
            onAlbumClick={handleAlbumClick}
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
            onAlbumClick={handleAlbumClick}
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
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <main className="flex-grow pb-24">
        {renderPage()}
      </main>
      <Footer />
      {selectedAlbum && (
        <AlbumDetailsModal 
          isOpen={isAlbumDetailModalOpen}
          onClose={() => setIsAlbumDetailModalOpen(false)}
          album={selectedAlbum}
          onPlayTrack={handlePlayTrack}
        />
      )}
      {currentTrack && currentPlaylist.album && (
        <MusicPlayer
          track={currentTrack}
          playlist={currentPlaylist}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          onClose={handleClosePlayer}
          onTrackEnd={handleNextTrack}
          onSelectTrack={handleSelectTrackFromPlaylist}
        />
      )}
    </div>
  );
};

export default App;