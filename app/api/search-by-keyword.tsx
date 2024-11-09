import { post_error } from "./post-error";

const is_res_match = (r: {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}) =>
  typeof r.page === "number" &&
  Array.isArray(r.results) &&
  typeof r.total_pages === "number" &&
  typeof r.total_results === "number";

const outpost = (
  r: {
    page: number;
    results: [];
    total_pages: number;
    total_results: number;
  },
  api_url: string
) => {
  if (is_res_match(r)) {
    return r;
  } else {
    post_error({
        api_url
    })

    return fallback;
  }
};

export const search_by_keyword = async (api_url: string) => {
  const res = await fetch(api_url).then((r) => r.json())

  return outpost(res, api_url);
};

const fallback = {
    page: Infinity,
    results: [],
    total_pages: Infinity,
    total_results: Infinity,
  }
