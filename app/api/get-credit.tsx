import { api_key } from "~/config/api";
import { post_error } from "./post-error";
import { CastMember } from "~/interface/cast";
import { CrewMember } from "~/interface/crew";

const is_res_match = (id: number, cast: CastMember[]) => !!id && Array.isArray(cast)

const outpost = (
  r: {
    id: number,
    cast: CastMember[]
    crew: CrewMember[]
  },
) => {
  if (is_res_match(r.id, r.cast)) {
    return r
  } else {
    post_error({res: r, location: 'get credit info' })
    return fallback
  }
} 

export const get_credit = async (type: string, id: number) => {
  let res
  try {
    res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${api_key}`).then((r) => r.json())
  } catch(error) {
    post_error({error, location: 'get credit info' })
  }

  return outpost(res);
};

const fallback = {
  id: null,
  cast: [],
  crew: []
}
