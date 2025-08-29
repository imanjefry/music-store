
import React, { useState, useEffect } from 'react';
import { Singer } from '../types';
import XIcon from './icons/XIcon';

interface AddSingerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSinger: (singer: Omit<Singer, 'id'>) => void;
}

const AddSingerModal: React.FC<AddSingerModalProps> = ({ isOpen, onClose, onAddSinger }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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
    if (!name.trim() || !imageUrl.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    onAddSinger({ name, imageUrl });
    setName('');
    setImageUrl('');
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
      aria-labelledby="add-singer-title"
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
        <h2 id="add-singer-title" className="text-2xl font-bold mb-6 text-white">Add New Artist</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Artist Name</label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
            <input 
              type="url" 
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://picsum.photos/seed/..."
              required
            />
          </div>
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
              Add Artist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSingerModal;