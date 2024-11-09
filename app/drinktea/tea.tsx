import { ToSeeData } from "~/interface/to-see-data";
import createStore from "./index";
import { ThreadList } from "~/interface/thread";
import { Movie } from "~/interface/movie";

const initial_state: {
  user_data: {
    uid: string;
    photoURL: string;
  };

  to_see_list_map: Set<string>;

  my_to_see_list: ToSeeData[] | undefined;

  filter_key: string;

  avatar_src: string;
  user_id: string;
  user_name: string;

  comment_list_data: {
    [key: string]: {
      list: ThreadList[]
      fetched: boolean
    }
  }
  is_deleting: boolean
  is_adding: boolean
  is_removing: boolean

  scroll_pos: {
    [key: string]: number
  }

  search_list_data: {
    [key: string]: Movie[]
  }
  search_list_page_data: {
    [key: string]: number
  }

  scroll_down: boolean

  image_store: {
    [key: string]: string
  }
} = {
  user_data: {
    uid: "",
    photoURL: "",
  },

  to_see_list_map: new Set(),
  my_to_see_list: undefined,
  filter_key: "date-old",
  avatar_src: "",
  user_id: "",
  user_name: "",
  comment_list_data: {

  },
  is_deleting: false,
  is_adding: false,
  is_removing: false,

  scroll_pos: {},

  search_list_data: {},
  search_list_page_data: {},

  scroll_down: false,

  image_store: {}
};

export const {
  useStore: useTea,
  getStore,
  withStore,
} = createStore(initial_state);
