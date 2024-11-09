import admin from "firebase-admin";
import { readFileSync } from "fs";

// const serviceAccount = JSON.parse(readFileSync("~/JSON/dogcat.json", "utf8"));

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or use admin.credential.cert() with service account
    projectId: 'dogdogcatcat-c5643',
  });
}

export const adminAuth = admin.auth();