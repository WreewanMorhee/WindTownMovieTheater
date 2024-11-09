export type ToSeeData = {
    adult: boolean;
    id: number;
    title: string;
    overview: string;
    popularity: number;
    release_date: string;
    vote_average: number;
    vote_count: number;
    poster_path: string;
  
    collect_date?: number;
    media_type?: "movie" | "tv";
    user_id?: string
  };