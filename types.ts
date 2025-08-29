
export interface Album {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
}

export interface Singer {
  id: number;
  name: string;
  imageUrl: string;
}

export type Page = 'home' | 'browse' | 'charts' | 'contact';
