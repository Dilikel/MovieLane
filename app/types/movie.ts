export interface BaseArray {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  image_url: string;
  grade: number;
  name: string;
  info: string;
  year: string;
  original_name: string;
  video_links: Record<string, string>;
  audio_links: Record<string, { name: string; link: string }[]>;
  directors: BaseArray[];
  actors: BaseArray[];
  genres: BaseArray[];
  categories: BaseArray[];
  countries: BaseArray[];
  created_at: string;
  updated_at: string;
}
