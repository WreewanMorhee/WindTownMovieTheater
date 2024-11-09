import { get, ref } from "firebase/database";
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
      const data = snapshot.val();  
      
      return Object.fromEntries(
        Object.entries(data).reverse()
      );
    } else {
      return {}
    }

  } catch (error) {
    return error_res(500, error)
  }
};
