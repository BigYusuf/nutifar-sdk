import { onMessage } from "firebase/messaging";

export const attachForegroundListener = (
  messaging: any,
  callback: (payload: any) => void,
) => {
  return onMessage(messaging, callback);
};