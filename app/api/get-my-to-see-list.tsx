import { get, ref } from "firebase/database";
import { db } from "~/tool/firebase-config";
import { post_error } from "./post-error";


export const get_my_to_see_list = async (user_id: string) => {
    const listRef = ref(db, user_id + '/to-see-list');
  
    try {
      const snapshot = await get(listRef);
  
      if (snapshot.exists()) {
        const data = snapshot.val()
        return data;
      } else {
        return {}
      }
    } catch (error) {
      post_error({ error, location: "get my to see list" });
      console.error("Error fetching data:", error);
    }
  }


