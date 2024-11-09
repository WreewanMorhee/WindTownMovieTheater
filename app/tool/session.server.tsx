// session.server.ts
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionSecret = "dogdogcatcat";
const storage = createCookieSessionStorage({
  cookie: {
    name: "my-remix-app",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // Set cookie to expire in 7 days
  },
});

export async function createUserSession(
  use_id: string,
  redirectTo: string,
  { avatar_src, user_name }: { avatar_src: string, user_name: string }
) {
  const session = await storage.getSession();
  session.set("use_id", use_id);
  session.set("avatar_src", avatar_src); // Store avatar URL in session
  session.set("user_name", user_name); // Store avatar URL in session
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

// Retrieves the session from the request
export async function getUserSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return storage.getSession(cookie);
}

// Retrieves the userId (uid) from the session
export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  return session.get("use_id");
}

export async function getUserAvatar(request: Request): Promise<string | null> {
  const session = await getUserSession(request);
  return session.get("avatar_src") || "";
}
export async function getUserName(request: Request): Promise<string | null> {
  const session = await getUserSession(request);
  return session.get("user_name") || "";
}

// Optionally, destroy the session (for logout)
export async function destroyUserSession(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
