import { format_date } from "./transform-date";

export const is_res_match = (r: {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}) =>
  typeof r.page === "number" &&
  Array.isArray(r.results) &&
  typeof r.total_pages === "number" &&
  typeof r.total_results === "number";


export const search_keyword_outpost = (r: {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}) => {
  if (is_res_match(r)) {
    return r;
  } else {
    fetch("/error-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            api: '',
            date: format_date(new Date()),
        }),
      })

    return {
      page: 0,
      results: [],
      total_pages: Infinity,
      total_results: Infinity,
    };
  }
};
