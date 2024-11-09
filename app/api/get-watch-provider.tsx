import { api_key } from "~/config/api";
import { post_error } from "./post-error";
import { CountryWatchProviders } from "~/interface/provider";

const is_res_match = (id: number, results: CountryWatchProviders) =>
  !!id && Array.isArray(Object.keys(results))

const outpost = (r: { id: number; results: CountryWatchProviders }) => {
  if (is_res_match(r.id, r.results)) {
    return r
  } else {
    post_error({ res: r, location: "get watch provider" });
    return fallback
  }
}

export const get_watch_provider = async (type:string, id: number) => {
  let res;
  try {
    res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${api_key}&region=TW`).then((r) => r.json());
  } catch (error) {
    post_error({ error, location: "get watch provider" });
  }

  return outpost(res);
};

const fallback = {
  id: null,
  results: {}
};
