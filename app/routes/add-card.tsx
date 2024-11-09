import { ActionFunction, json } from "@remix-run/node";
import { get, ref, update } from "firebase/database";
import { error_res } from "~/tool/api-error-res";
import { db } from "~/tool/firebase-config";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json()
  const listRef = ref(db, data.user_id + '/to-see-list');

  if (data.debug) {
    return error_res(400)
  }

  if (typeof data.user_id !== 'string' || isNaN(Number(data.id))) {
    return error_res(400)
  }

  try {
    const itemRef = ref(db, `${data.user_id}/to-see-list/${data.id}`);
    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
      return error_res(409)
    }

    await update(listRef, {[data.id]: data});
    return json({ ok: true, message: "Item added successfully" });

  } catch (error) {
    return error_res(500, error)
  }
};
