// app/routes/api/login.tsx
import { ActionFunction, json } from "@remix-run/node";
import { adminAuth } from "../tool/firebase-admin"; // Firebase Admin SDK setup
import { createUserSession } from "~/tool/session.server";
import { storage } from "firebase-admin";




export const action: ActionFunction = async ({ request }) => {
  const { token } = await request.json();

  try {
    // Verify the Firebase token using the Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(token);

    // User data is now available in `decodedToken`
    const { uid, email, name, picture } = decodedToken;

    // Handle user session or other logic
    // e.g., create session, store in database, etc.

    return createUserSession(uid, "/", {avatar_src: picture || '', user_name: name || '', token});
  } catch (error) {
    console.error("Error verifying token:", error);
    return json({ success: false, error: "Invalid token" }, { status: 401 });
  }
};
