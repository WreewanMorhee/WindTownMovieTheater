export interface Keyword {
    id: number;
    name: string;
  }
  
export interface KeywordsResponse {
    keywords?: Keyword[];  // Present for movies
    results?: Keyword[];   // Present for TV shows
  }
  