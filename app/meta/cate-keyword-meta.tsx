import { VideoCardType } from "~/interface/video-card";

export const cate_keyword_meta = ({
    params: {
      cate,
      keyword,
    },
    data: {
      data: { results: videos },
      origin,
    },
  }: {
    data: {
      data: { results: VideoCardType[] };
      origin: string;
    },
    params: {
      cate: string;
      keyword: string;
    };
  }) => {
    const type = cate === "search-movie" ? "電影" : "影集";
  
    return [
      {
        title: `${type}搜尋: ${keyword}`,
      },
  
      {
        name: "description",
        content: `目前為您呈現${type}搜尋: ${keyword} 的結果, 讓你找到心目中的${type}`,
      },
      {
        property: "og:image",
        content: "/assets/logo.webp",
      },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `關鍵字: "${keyword}" 的相關${type}搜尋結果`,
          description: `"${keyword}" 的相關${type}搜尋結果`,
          url: `${origin}/${cate}/${keyword}`,
          potentialAction: {
            "@type": "SearchAction",
            target: `${origin}/${cate}/{keyword}`,
            "query-input": "required name=keyword",
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: videos.map(
              (v_data: VideoCardType, index: number) => ({
                "@type": cate === "search-movie" ? "Movie" : "TVSeries",
                position: index + 1,
                url: `${origin}/movie/${v_data.id}`,
                name: v_data.title || v_data.name,
                description: v_data.overview,
                datePublished: v_data.release_date || v_data.first_air_date,
                genre: "Action",
                actor: [],
                director: {},
                image: `https://image.tmdb.org/t/p/w300${v_data.poster_path}`,
              })
            ),
          },
        },
      },
    ];
  };