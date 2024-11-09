export interface Recommendation {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    title?: string; // For movies
    name?: string; // For TV shows
    original_language: string;
    original_title?: string; // For movies
    original_name?: string; // For TV shows
    overview: string;
    poster_path: string | null;
    media_type: "movie" | "tv";
    genre_ids: number[];
    popularity: number;
    release_date?: string; // For movies
    first_air_date?: string; // For TV shows
    vote_average: number;
    vote_count: number;
  }
  
  export interface RecommendationsResponse {
    page: number;
    results: Recommendation[];
    total_pages?: number;
    total_results?: number;
  }
  