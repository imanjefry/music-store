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
  // FIX: Add optional 'imageUrl' to the Singer type to resolve type errors.
  // This property is used in 'constants.ts' and 'AddSingerModal.tsx' but was missing from the interface.
  // It's optional because not all Singer objects in the app have an imageUrl.
  imageUrl?: string;
}

export type Page = 'home' | 'browse' | 'charts' | 'contact';