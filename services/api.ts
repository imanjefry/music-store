import { GoogleGenAI } from "@google/genai";
import { Album, Song, Singer } from '../types';

const PROXY_URL = 'https://corsproxy.io/?';

// Helper to format milliseconds to mm:ss
const formatDuration = (millis: number): string => {
  if (isNaN(millis)) return 'N/A';
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Mapper for album data from Apple's Top 100 RSS feed
const mapRssAlbum = (apiAlbum: any): Album => ({
  id: parseInt(apiAlbum.id, 10),
  title: apiAlbum.name,
  artist: apiAlbum.artistName,
  coverUrl: apiAlbum.artworkUrl100.replace('100x100', '500x500'), // Get higher res artwork
  songs: [],
});

// Mapper for album data from iTunes Search API
const mapSearchAlbum = (apiAlbum: any): Album => ({
  id: apiAlbum.collectionId,
  title: apiAlbum.collectionName,
  artist: apiAlbum.artistName,
  coverUrl: apiAlbum.artworkUrl100.replace('100x100', '500x500'),
  songs: [],
});

// Mapper for song data from iTunes Lookup API
const mapApiSong = (apiSong: any): Song => ({
  id: apiSong.trackId,
  title: apiSong.trackName,
  duration: formatDuration(apiSong.trackTimeMillis),
  url: apiSong.previewUrl,
});

export const fetchTopAlbums = async (): Promise<Album[]> => {
  const apiUrl = 'https://rss.applemarketingtools.com/api/v2/us/music/most-played/50/albums.json';
  const response = await fetch(`${PROXY_URL}${encodeURIComponent(apiUrl)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch top albums');
  }
  const data = await response.json();
  return data.feed.results.map(mapRssAlbum);
};

export const fetchAlbumTracks = async (albumId: number): Promise<Song[]> => {
  const apiUrl = `https://itunes.apple.com/lookup?id=${albumId}&entity=song`;
  const response = await fetch(`${PROXY_URL}${encodeURIComponent(apiUrl)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch album tracks');
  }
  const data = await response.json();
  // The first result is the album info, the rest are songs.
  return data.results
    .filter((item: any) => item.wrapperType === 'track')
    .map(mapApiSong);
};

export const searchMusic = async (term: string): Promise<{ albums: Album[] }> => {
    if (!term) return { albums: [] };
    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=50`;
    const response = await fetch(`${PROXY_URL}${encodeURIComponent(apiUrl)}`);
    if (!response.ok) {
        throw new Error('Failed to perform search');
    }
    const data = await response.json();
    const albums: Album[] = data.results
        .filter((item: any) => item.wrapperType === 'collection' && item.collectionType === 'Album')
        .map(mapSearchAlbum);
    
    return { albums };
};

export const findFullSongUrl = async (title: string, artist: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Find a publicly available, streamable audio or video URL for the full version of the song "${title}" by "${artist}". Prioritize official artist channels on platforms like YouTube or SoundCloud. Return ONLY the URL and nothing else. If you cannot find a valid URL, return "NOT_FOUND".`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const url = response.text.trim();

    if (url === 'NOT_FOUND' || !url.startsWith('http')) {
      console.warn('AI could not find a valid URL for the song.');
      return null;
    }

    return url;
  } catch (error) {
    console.error('Error finding full song URL with Gemini:', error);
    return null;
  }
};