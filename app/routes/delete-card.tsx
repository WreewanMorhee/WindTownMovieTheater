import { ActionFunction, json } from "@remix-run/node";
import {  ref, get, remove } from "firebase/database";
import { error_res } from "~/tool/api-error-res";
import { db } from "~/tool/firebase-config";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json()
  const { item_id, user_id } = data

  if (data.debug) {
    return error_res(400)
  }


  if (!item_id || !user_id) {
    return error_res(400)
  }

  try {
    const itemRef = ref(db, `${user_id}/to-see-list/${item_id}`);
    const snapshot = await get(itemRef);

    if (!snapshot.exists()) {
      return error_res(404)
    }
  
    await remove(itemRef)
    return json({ ok: true, message: "Item deleted successfully" });

  } catch (error) {
    return error_res(500, error)
  }
};
