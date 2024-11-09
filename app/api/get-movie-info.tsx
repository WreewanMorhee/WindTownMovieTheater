import { Movie } from "~/interface/movie";
import { post_error } from "./post-error";
import { api_key } from "~/config/api";

const is_res_match = (id: number) => !!id;

const outpost = (r: Movie, { id }: {id: number}) => {
  if (is_res_match(r.id)) {
    return r
  } else {
    post_error({ res: r, location: "movie info" });
    return fallback(id)
  }
}


export const get_movie_info = async (type: string, id: number) => {
  let res;
  try {
    res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=zh-TW`
    ).then((r) => r.json());

  } catch (error) {
    post_error({ error, location: "movie info" });
  }

  if (res.status_code === 34) {
    return res
  }
  
  return outpost(res, { id });
};

const fallback = (id: number) => ({
  adult: false,
  backdrop_path: "",
  belongs_to_collection: null,
  budget: 0,
  genres: [],
  homepage: "",
  id,
  imdb_id: "",
  origin_country: [],
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  production_companies: [],
  production_countries: [],
  release_date: "",
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: "",
  tagline: "",
  title: "部分資料整理中, 擇日開放！",
  video: false,
  vote_average: 0,
  vote_count: 0,
});
