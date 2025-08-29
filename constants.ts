
import { Album, Singer } from './types';

export const INITIAL_FEATURED_ALBUMS: Album[] = [
  { id: 1, title: 'Cosmic Echoes', artist: 'Orion Starstrider', coverUrl: 'https://picsum.photos/seed/album1/500/500' },
  { id: 2, title: 'Midnight Bloom', artist: 'Luna Spectre', coverUrl: 'https://picsum.photos/seed/album2/500/500' },
  { id: 3, title: 'Metropolis Heartbeat', artist: 'The Vindicators', coverUrl: 'https://picsum.photos/seed/album3/500/500' },
  { id: 4, title: 'Oceanic Dreams', artist: 'Coral Waves', coverUrl: 'https://picsum.photos/seed/album4/500/500' },
  { id: 5, title: 'Digital Soul', artist: 'Glitch Mob', coverUrl: 'https://picsum.photos/seed/album5/500/500' },
];

export const INITIAL_NEW_RELEASES: Album[] = [
  { id: 6, title: 'Sunset Drive', artist: 'Aesthetic Voyager', coverUrl: 'https://picsum.photos/seed/album6/500/500' },
  { id: 7, title: 'Forest Lullaby', artist: 'Willow Creek', coverUrl: 'https://picsum.photos/seed/album7/500/500' },
  { id: 8, title: 'Neon Grid', artist: 'Cybersynth', coverUrl: 'https://picsum.photos/seed/album8/500/500' },
  { id: 9, title: 'Forgotten Lore', artist: 'Ancient Bards', coverUrl: 'https://picsum.photos/seed/album9/500/500' },
  { id: 10, title: 'Quantum Leap', artist: 'Dr. Paradox', coverUrl: 'https://picsum.photos/seed/album10/500/500' },
  { id: 11, title: 'City Lights', artist: 'Urban Groove', coverUrl: 'https://picsum.photos/seed/album11/500/500' },
  { id: 12, title: 'Velvet Dreams', artist: 'The Somnambulists', coverUrl: 'https://picsum.photos/seed/album12/500/500' },
];

export const INITIAL_SINGERS: Singer[] = [
  { id: 1, name: 'Orion Starstrider', imageUrl: 'https://picsum.photos/seed/singer1/500/500' },
  { id: 2, name: 'Luna Spectre', imageUrl: 'https://picsum.photos/seed/singer2/500/500' },
  { id: 3, name: 'The Vindicators', imageUrl: 'https://picsum.photos/seed/singer3/500/500' },
  { id: 4, name: 'Coral Waves', imageUrl: 'https://picsum.photos/seed/singer4/500/500' },
  { id: 5, name: 'Glitch Mob', imageUrl: 'https://picsum.photos/seed/singer5/500/500' },
  { id: 6, name: 'Aesthetic Voyager', imageUrl: 'https://picsum.photos/seed/singer6/500/500' },
];

export const GENRES: string[] = [
  'Electronic',
  'Indie Rock',
  'Hip Hop',
  'Ambient',
  'Synthwave',
  'Jazz',
  'Folk',
  'Classical',
  'Techno',
  'Lo-Fi'
];