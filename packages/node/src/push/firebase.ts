import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";

let app: FirebaseApp;
let messaging: Messaging;

export const initializeFirebase = (config: any) => {
  if (!app) {
    app = initializeApp(config);
    messaging = getMessaging(app);
  }

  return {
    app,
    messaging,
  };
};