import { ActionFunction, json } from "@remix-run/node";
import { get, ref, update } from "firebase/database";
import { error_res } from "~/tool/api-error-res";
import { db } from "~/tool/firebase-config";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json()
  const listRef = ref(db, data.user_id + '/to-see-list');
  console.warn(11111)
  if (data.debug) {
    return error_res(400)
  }
  console.warn(22222)
  if (typeof data.user_id !== 'string' || isNaN(Number(data.id))) {
    return error_res(400)
  }

  try {
    console.warn(333333)
    const itemRef = ref(db, `${data.user_id}/to-see-list/${data.id}`);
    console.warn(444444)
    const snapshot = await get(itemRef);
    console.warn(5555555, snapshot)
    if (snapshot.exists()) {
      return error_res(409)
    }
    console.warn(8888888)
    await update(listRef, {[data.id]: data});
    console.warn(9999999)
    return json({ ok: true, message: "Item added successfully" });

  } catch (error) {
    console.warn(error, 'ji3ji3ji3ji3')
    return error_res(500, error)
  }
};
