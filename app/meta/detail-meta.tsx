import { streaming_provider_urls } from "~/config/provider-list";
import { Backdrop } from "~/interface/backdrops";
import { CastMember } from "~/interface/cast";
import { Keyword } from "~/interface/keywords";
import { Movie } from "~/interface/movie";
import { Poster } from "~/interface/poster";
import { CountryWatchProviders } from "~/interface/provider";
import { Recommendation } from "~/interface/reco";


// export const detail_meta = 
// (type: "movie" | "tv") => (a) => {
// console.warn(a.data.origin, 888)

// return null
// }


export const detail_meta =
  (type: "movie" | "tv") =>
  ({
    
      movie,
      keywords,
      watchProviders,
      cast,
      director,
      posters,
      backdrops,
      recommendations,
      origin
    ,
  }: {
    
      movie: Movie;
      keywords: Keyword[];
      watchProviders: CountryWatchProviders;
      cast: CastMember[];
      director: any[];
      posters: Poster[];
      backdrops: Backdrop[];
      recommendations: Recommendation[];
      origin: string
  
  }) =>
  {
 

    return  [
      {
        title: `${movie.title || movie.name}`,
      },
      {
        name: "description",
        content: movie.overview || `${movie.title || movie.name}`,
      },
      {
        property: "og:image",
        content: !!movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/assets/no-poster.webp",
      },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": type === "movie" ? "Movie" : "TVSeries",
          name: movie.title || movie.name,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          datePublished: movie.release_date || movie.first_air_date,
          inLanguage: movie.original_language.toLowerCase(), // Original language

          productionCompany: movie.production_companies.map(({ name }) => ({
            "@type": "Organization",
            name: name,
          })),
          keywords: keywords
            .map(({ name }: { name: string }) => name)
            .join(", "),
          offers:
            watchProviders.TW && watchProviders.TW.flatrate
              ? watchProviders.TW.flatrate.map(({ provider_name }) => ({
                  "@type": "Offer",
                  provider: {
                    "@type": "Organization",
                    name: provider_name,
                    url: streaming_provider_urls[provider_name],
                  },
                }))
              : [],
          cast: cast.map(({ name, character, profile_path }) => ({
            "@type": "Person",
            name: name,
            characterName: character,
            image: `https://image.tmdb.org/t/p/w200${profile_path}`,
          })),
          "director": director.map(({name}) => ({
            "@type": "Person",
            "name": name
          })),
          about: [
            ...posters.map(({ file_path }) => ({
              "@type": "CreativeWork",
              name: "Related Poster",
              image: `https://image.tmdb.org/t/p/w500${file_path}`,
            })),
            ...backdrops.map(({ file_path }) => ({
              "@type": "CreativeWork",
              name: "Related Backdrop",
              image: `https://image.tmdb.org/t/p/w500${file_path}`,
            })),
          ],
          relatedLink: recommendations.map(
            ({ name, title, id, poster_path }) => ({
              "@type": type === "movie" ? "Movie" : "TVSeries",
              name: name || title,
              url: `${origin}/${type}/${id}`,
              image: `https://image.tmdb.org/t/p/w300${poster_path}`,
            })
          ),
          budget: movie.budget,
          revenue: movie.revenue,
        },
      },
    ];

  }
   