// app/routes/logout.tsx
import { ActionFunction, redirect } from "@remix-run/node";
import { destroyUserSession } from "~/tool/session.server";

export const action: ActionFunction = async ({ request }) => {
  return destroyUserSession(request);
};

