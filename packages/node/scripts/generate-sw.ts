// import fs from "fs";

// declare const process: {
//   env: {
//     FIREBASE_API_KEY?: string;
//     FIREBASE_AUTH_DOMAIN?: string;
//     FIREBASE_PROJECT_ID?: string;
//     FIREBASE_SENDER_ID?: string;
//     FIREBASE_APP_ID?: string;
//   };
// };

// const template = fs.readFileSync(
//   "./public/firebase-messaging-sw.template.js",
//   "utf-8"
// );

// const finalSW = template.replace(
//   "__FIREBASE_CONFIG__",
//   JSON.stringify({
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     messagingSenderId: process.env.FIREBASE_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
//   })
// );

// fs.writeFileSync(
//   "./dist/firebase-messaging-sw.js",
//   finalSW
// );