export interface Song {
  id: number;
  title: string;
  duration: string;
  url: string;
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
  songs?: Song[];
}

export interface Singer {
  id: number;
  name: string;
  imageUrl?: string;
}

export type Page = 'home' | 'browse' | 'charts' | 'contact';
