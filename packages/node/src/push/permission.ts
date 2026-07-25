export const requestPushPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Push permission denied");
  }

  return permission;
};
