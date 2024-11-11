import { ActionFunction, json } from "@remix-run/node";
import {  ref, get, remove, update } from "firebase/database";
import { error_res } from "~/tool/api-error-res";
import { db } from "~/tool/firebase-config";
import { getUserId } from "~/tool/session.server";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json()
  const user_id = await getUserId(request)
  const { vid, cid } = data

  if (data.debug) {
    return error_res(400)
  }

  if (!vid || !cid) {
    return  error_res(400)
  }

  try {
    const itemRef = ref(db, `comment-list/${vid}/${cid}`);
    const snapshot = await get(itemRef);

    if (!snapshot.exists()) {
      return error_res(404)
    }
    if (snapshot.val().user_id !== user_id) {
      return error_res(403)
    }

    await update(itemRef, { is_delete: true })
  
    return json({ ok: true, message: "Item deleted successfully" });

  } catch (error) {
    return error_res(500, error)
  }
};
