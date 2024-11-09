export interface Provider {
    display_priority: number;
    logo_path: string | null;
    provider_id: number;
    provider_name: string;
  }

  export interface CountryWatchProviders {
    link?: string;

    ads?: Provider[];
    free?: Provider[];
    TW?: {
        flatrate?: Provider[];
        rent?: Provider[];
        buy?: Provider[];
    }
  }