import { Poster } from "~/interface/poster"
import { post_error } from "./post-error"
import { api_key } from "~/config/api"

const is_res_match = (id: number, backdrops: Poster[], posters: Poster[]) => 
  !!id && Array.isArray(backdrops) && Array.isArray(posters)

const outpost = (
  r: {
    id: number, 
    backdrops: Poster[], 
    posters: Poster[]
  },
) => {
  if (is_res_match(r.id, r.backdrops, r.posters)) {
    return r
  } else {
    post_error({res: r, location: 'get images' })
    return fallback
  }
}

export const get_images = async (type:string, id: number) => {
  let res
  try {
    res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${api_key}`).then((r) => r.json())
  } catch(error) {
    post_error({error, location: 'get images' })
  }

  return outpost(res);
};

const fallback = {
  id: null,
  backdrops: [],
  posters: []
}
