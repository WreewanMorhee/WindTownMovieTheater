import { Keyword } from "~/interface/keywords";
import { post_error } from "./post-error";
import { api_key } from "~/config/api";

const is_res_match = (id: number, keywords?: Keyword[], results?: Keyword[]) =>
  !!id && (Array.isArray(keywords) || Array.isArray(results))

const outpost = (r: { keywords?: Keyword[]; results?: Keyword[], id: number }) => {
  if (is_res_match(r.id, r.keywords, r.results)) {
    return r 
  } else {
    post_error({ res: r, location: "get keyword data" });
    return fallback
  }
}

export const get_keyword_data = async (type:string, id: number) => {
  let res;
  try {
    res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/keywords?api_key=${api_key}`).then((r) => r.json());
  } catch (error) {
    post_error({ error, location: "get keyword data" });
  }

  return outpost(res);
};

const fallback = {
  id: null,
  keywords: [],
  results: [],
};
