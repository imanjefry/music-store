
import React, { useState, useEffect } from 'react';
import SearchIcon from './icons/SearchIcon';
import PlusIcon from './icons/PlusIcon';
import { Page } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddAlbumClick: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, onNavigate, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onNavigate(page)}
      className={`${isActive ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors duration-200`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onAddAlbumClick, currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={() => onNavigate('home')} className="text-3xl font-bold tracking-tighter text-white">
              <span className="text-purple-400">M</span>use.
            </button>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink page="home" currentPage={currentPage} onNavigate={onNavigate}>Home</NavLink>
            <NavLink page="browse" currentPage={currentPage} onNavigate={onNavigate}>Browse</NavLink>
            <NavLink page="charts" currentPage={currentPage} onNavigate={onNavigate}>Charts</NavLink>
            <NavLink page="contact" currentPage={currentPage} onNavigate={onNavigate}>Contact</NavLink>
          </nav>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search artists, albums..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 w-48 focus:w-64"
                aria-label="Search for artists or albums"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              onClick={onAddAlbumClick}
              className="flex-shrink-0 flex items-center gap-2 bg-gray-800 hover:bg-purple-600 border border-gray-700 hover:border-purple-600 text-white font-medium py-2 px-4 rounded-full transition-all duration-300"
              aria-label="Add new music"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Add Music</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
