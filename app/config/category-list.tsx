export const category_list = [
  {
    id: "1",
    title: "Film & Animation",
    zh_tw_title: "電影與動畫",
    path: "film-animation",
  },
  {
    id: "2",
    title: "Autos & Vehicles",
    zh_tw_title: "車輛與交通工具",
    path: "autos-vehicles",
  },
  { id: "10", title: "Music", zh_tw_title: "音樂", path: "music" },
  {
    id: "15",
    title: "Pets & Animals",
    zh_tw_title: "寵物與動物",
    path: "pets-animals",
  },
  { id: "17", title: "Sports", zh_tw_title: "體育、運動", path: "sports" },
  // {
  //   id: "18",
  //   title: "Short Movies",
  //   zh_tw_title: "短劇",
  //   path: "short-movies",
  // },
  // {
  //   id: "19",
  //   title: "Travel & Events",
  //   zh_tw_title: "旅行與活動",
  //   path: "travel-events",
  // },
  { id: "20", title: "Gaming", zh_tw_title: "遊戲", path: "gaming" },
  // {
  //   id: "21",
  //   title: "Videoblogging",
  //   zh_tw_title: "Vlog",
  //   path: "videoblogging",
  // },
  {
    id: "22",
    title: "People & Blogs",
    zh_tw_title: "群眾與部落格",
    path: "people-blogs",
  },
  { id: "23", title: "Comedy", zh_tw_title: "喜劇", path: "comedy" },
  {
    id: "24",
    title: "Entertainment",
    zh_tw_title: "娛樂",
    path: "entertainment",
  },
  {
    id: "25",
    title: "News & Politics",
    zh_tw_title: "新聞與政治",
    path: "news-politics",
  },
  {
    id: "26",
    title: "Howto & Style",
    zh_tw_title: "生活大小事",
    path: "howto-style",
  },
  // { id: "27", title: "Education", zh_tw_title: "教育", path: "education" },
  {
    id: "28",
    title: "Science & Technology",
    zh_tw_title: "科學與科技",
    path: "science-technology",
  },
  // {
  //   id: "29",
  //   title: "Nonprofits & Activism",
  //   zh_tw_title: "非營利組織與行動主義",
  //   path: "nonprofits-activism",
  // },
  // { id: "30", title: "Movies", zh_tw_title: "電影", path: "movies" },
  // {
  //   id: "31",
  //   title: "Anime/Animation",
  //   zh_tw_title: "動漫",
  //   path: "anime-animation",
  // },
  // {
  //   id: "32",
  //   title: "Action/Adventure",
  //   zh_tw_title: "行動至上/冒險",
  //   path: "action-adventure",
  // },
  // { id: "33", title: "Classics", zh_tw_title: "就愛經典", path: "classics" },
  // {
  //   id: "35",
  //   title: "Documentary",
  //   zh_tw_title: "真實紀錄片",
  //   path: "documentary",
  // },
  // { id: "36", title: "Drama", zh_tw_title: "戲劇", path: "drama" },
  // { id: "37", title: "Family", zh_tw_title: "溫馨家庭", path: "family" },
  // { id: "38", title: "Foreign", zh_tw_title: "外國好朋友", path: "foreign" },
  // { id: "39", title: "Horror", zh_tw_title: "恐怖！", path: "horror" },
  // {
  //   id: "40",
  //   title: "Sci-Fi/Fantasy",
  //   zh_tw_title: "科幻領域",
  //   path: "sci-fi-fantasy",
  // },
  // { id: "41", title: "Thriller", zh_tw_title: "驚悚！", path: "thriller" },
  // { id: "42", title: "Shorts", zh_tw_title: "短影音", path: "shorts" },
  // { id: "43", title: "Shows", zh_tw_title: "Show！", path: "shows" },
  // { id: "44", title: "Trailers", zh_tw_title: "電影原聲帶", path: "trailers" },
];

export const form_cate_path = (c: string) =>
  c
    .toLowerCase()
    .replaceAll(" &", "")
    .replaceAll("/", " ")
    .split(" ")
    .join("-");
