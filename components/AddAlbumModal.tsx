
import React, { useState, useEffect } from 'react';
import { Album } from '../types';
import XIcon from './icons/XIcon';

interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAlbum: (album: Omit<Album, 'id'>, type: 'featured' | 'new') => void;
}

const AddAlbumModal: React.FC<AddAlbumModalProps> = ({ isOpen, onClose, onAddAlbum }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [type, setType] = useState<'featured' | 'new'>('new');

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim() || !coverUrl.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    onAddAlbum({ title, artist, coverUrl }, type);
    // Reset form for next time
    setTitle('');
    setArtist('');
    setCoverUrl('');
    setType('new');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-album-title"
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-md relative border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <h2 id="add-album-title" className="text-2xl font-bold mb-6 text-white">Add Your Music</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Album Title</label>
            <input 
              type="text" 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="artist" className="block text-sm font-medium text-gray-300 mb-1">Artist / Singer</label>
            <input 
              type="text" 
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="coverUrl" className="block text-sm font-medium text-gray-300 mb-1">Cover Image URL</label>
            <input 
              type="url" 
              id="coverUrl"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://picsum.photos/seed/..."
              required
            />
          </div>
          
          <fieldset>
            <legend className="block text-sm font-medium text-gray-300 mb-2">Add to</legend>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input id="new-release" name="album-type" type="radio" checked={type === 'new'} onChange={() => setType('new')} className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"/>
                <label htmlFor="new-release" className="ml-2 block text-sm text-gray-200">New Releases</label>
              </div>
              <div className="flex items-center">
                <input id="featured-album" name="album-type" type="radio" checked={type === 'featured'} onChange={() => setType('featured')} className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"/>
                <label htmlFor="featured-album" className="ml-2 block text-sm text-gray-200">Featured Albums</label>
              </div>
            </div>
          </fieldset>

          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
            >
              Add Album
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlbumModal;