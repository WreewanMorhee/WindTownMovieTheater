import { equalTo, get, orderByChild, orderByKey, orderByValue, query, ref } from "firebase/database";
import { where } from "firebase/firestore";
import { CommentItemType } from "~/interface/comment-item";
import { error_res } from "~/tool/api-error-res";
import { db } from "~/tool/firebase-config";

export const loader = async ({request}: {request: Request}) => {
  const url = new URL(request.url);
  const uid = url.searchParams.get("uid"); 
  const vid = url.searchParams.get("vid"); 
  const debug = url.searchParams.get("debug"); 


  if (debug === '1') {
    return  error_res(400)
  }

  if (!uid || !vid) {
    return  error_res(400)
  }


  try {
    const listRef = ref(db, 'comment-list/' + vid);
    const snapshot = await get(listRef);


    if (snapshot.exists()) {

      const allData = snapshot.val()  as Record<string, CommentItemType & {user_id: string, is_delete: boolean}>
      const filteredData = Object.entries(allData)
        .filter(([, value]) => value.is_delete === false)
        .reverse()
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    
      return filteredData;
      
    } else {
      return {}
    }

  } catch (error) {
    return error_res(500, error)
  }
};
