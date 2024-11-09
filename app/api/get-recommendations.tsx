import { api_key } from "~/config/api";
import { post_error } from "./post-error";
import { Recommendation, RecommendationsResponse } from "~/interface/reco";

const is_res_match = (page: number, results: Recommendation[]) =>
  !!page && Array.isArray(results)

const outpost = (r: { page: number, results: Recommendation[] }): RecommendationsResponse => {
  if (is_res_match(r.page, r.results)) {
    return r
  } else {
    post_error({ res: r, location: "get recommendation" });
    return fallback
  }
}


export const get_recommendations = async (type:string, id: number) => {
  let res;
  try {
    res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${api_key}`).then((r) => r.json());
  } catch (error) {
    post_error({ error, location: "get recommendation" });
  }

  return outpost(res);
};

const fallback = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0
};
