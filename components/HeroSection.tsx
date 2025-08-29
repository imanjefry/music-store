
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden -mt-20">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
          Discover Your Next Favorite Album
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Explore a universe of sounds, from rising stars to timeless legends. The perfect track is waiting for you.
        </p>
        <a 
          href="#"
          className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Browse Music
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
