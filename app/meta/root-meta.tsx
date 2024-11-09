
export const root_meta = (origin = '') => {
  return [
    { title: "風城電影院" },
    {
      name: "description",
      content: "最多最齊全的電影列表就在這裡！",
    },
    {
      property: "og:image",
      content: "/assets/logo.webp",
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: origin,
        name: "風城電影院",
        description: "Find movies by searching with keywords.",
        potentialAction: [
          {
            "@type": "SearchAction",
            target: `${origin}/search-movie/{keyword}`,
            "query-input": "required name=keyword",
          },
          {
            "@type": "SearchAction",
            target: `${origin}/search-tv/{keyword}`,
            "query-input": "required name=keyword",
          },
        ],
      },
    },
  ];
};
