
import React from 'react';
import { GENRES } from '../constants';

const GenreBrowser: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-white">Browse by Genre</h2>
      <div className="flex flex-wrap gap-3">
        {GENRES.map(genre => (
          <a
            key={genre}
            href="#"
            className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            {genre}
          </a>
        ))}
      </div>
    </section>
  );
};

export default GenreBrowser;
