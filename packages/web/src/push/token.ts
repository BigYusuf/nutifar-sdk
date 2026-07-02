import { getToken } from "firebase/messaging";

export const generatePushToken = async ({
  messaging,
  vapidKey,
  serviceWorkerRegistration,
}: any) => {
  return getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration,
  });
};
