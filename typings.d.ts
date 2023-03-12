export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  adult: boolean;
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  video: boolean;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Companies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Languages {
  english_name: string;
}

export interface Details {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: Genre[];
  production_companies: Companies[];
  title: string;
  name: string;
  original_name: string;
  spoken_languages: Languages[];
  seasons: Seasons[];
  vote_average: number;
}

export interface Seasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface Cast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: string;
  profile_path: string;
}

export interface MovieCastCrew {
  cast: Cast[];
  crew: any[];
}

export interface MovieTrailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: string;
  type: string;
}

export interface MovieImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: any;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface PopularTyping {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  popularity: number;
  profile_path: string;
  known_for: Details[];
  known_for_department: string;
}

export interface personData {
  adult: boolean;
  also_known_as: any[];
  biography: string;
  birthday: string;
  deathday: string | undefined;
  gender: number;
  homepage: any | undefined;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface AuthorDetails {
  avatar_path: string;
  name: string;
  rating: number;
  username: string;
}

export interface MovieReviewData {
  author: string;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
  author_details: AuthorDetails;
}

export interface Episode {
  air_date: string;
  crew: any[];
  episode_number: number;
  guest_stars: Cast[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: number;
  vote_average: number;
  vote_count: number;
}
