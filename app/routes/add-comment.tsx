import { ActionFunction, json } from "@remix-run/node";
import { push, ref } from "firebase/database";
import { error_res } from "~/tool/api-error-res";
import { db } from "~/tool/firebase-config";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json()

  if (data.debug) {
    return error_res(400)
  }

  if (typeof data.user_id !== 'string' || !data.video_id) {
    return error_res(400)
  }


  try {
   const listRef2 = ref(db, 'comment-list/' + data.video_id);


   const res =  await push(listRef2, {...data.comment_data, user_id: data.user_id, is_delete: false})
   return json({ ok: true, message: "Item added successfully", id:  res.key});

  } catch (error) {
    return error_res(500, error)
  }
};
