export const registerServiceWorker = async (
  path = "/firebase-messaging-sw.js",
) => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker not supported");
  }

  return navigator.serviceWorker.register(path);
};