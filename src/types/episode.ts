export interface Guest {
  name: string;
  linkedinUrl: string;
}

export interface Episode {
  title: string;
  slug: string;
  description: string; // raw HTML from RSS
  image: string;
  pubDate: string;
  duration: string;
  episodeNumber: number;
  guid: string;
  embedUrl: string;
  spotifyUrl: string;
  audioUrl: string;
  guests: Guest[];
}
