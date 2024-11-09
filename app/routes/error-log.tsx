import { ActionFunction, json } from "@remix-run/node";
import {  push, ref } from "firebase/database";
import { error_res } from "~/tool/api-error-res";
import { db } from "~/tool/firebase-config";
import { getUserId, getUserName } from "~/tool/session.server";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json()
  const listRef = ref(db, '/error-log');
  const [user_id, user_name ] = await Promise.all([getUserId(request), getUserName(request)])

  try {

    await push(listRef, {
      user_name: user_name || '',
      user_id: user_id || '',
      ...data
    });
    return json({ ok: true, message: "logged"});

  } catch (error) {
    return error_res(500, error)
  }
};
