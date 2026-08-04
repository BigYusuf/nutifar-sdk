# 📱 Nutifar React Native SDK

<div align="center">

<h3>Official React Native (Bare) SDK for Nutifar</h3>

Register devices and receive push notifications in bare React Native apps via Firebase Cloud Messaging.

<p>

[![npm](https://img.shields.io/npm/v/@nutifar/react-native)](https://www.npmjs.com/package/@nutifar/react-native)
[![License](https://img.shields.io/github/license/BigYusuf/nutifar-sdk)](https://github.com/BigYusuf/nutifar-sdk/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-Bare-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)

</p>

</div>

---

# Overview

The **Nutifar React Native SDK** is the bare-workflow counterpart to [`@nutifar/expo`](https://www.npmjs.com/package/@nutifar/expo) — same `Nutifar({ apiKey })` factory, same `sdk.push` namespace, same method names. The only real difference is what's underneath: this package talks to FCM/APNs directly through `@react-native-firebase/messaging` instead of Expo's push service, since it's built for apps **not** using Expo's managed workflow.

Like the Expo SDK, `sdk.push` handles the *receiving* side — device tokens, permissions, and incoming notification listeners. For *sending*, use [`@nutifar/node`](https://www.npmjs.com/package/@nutifar/node) on your backend.

If your app is on Expo's managed workflow or using `expo-notifications`, use `@nutifar/expo` instead — this package assumes native Firebase modules are linked.

---

# Features

- 📲 FCM device token retrieval and refresh handling
- 🔑 Native permission request + status checks
- 📥 Foreground message listener
- 👆 Notification-opened (tap) listener, including cold-start via initial notification
- 🍏🤖 Works across iOS and Android via `@react-native-firebase/messaging`
- 🔗 Same `Nutifar({ apiKey })` SDK shape as `@nutifar/expo` and `@nutifar/node`

---

# Requirements

- Bare React Native project (or Expo prebuild/dev client)
- `@react-native-firebase/app` and `@react-native-firebase/messaging` installed and linked
- Native Firebase config in place (`google-services.json` / `GoogleService-Info.plist`)
- A backend exposing device register/refresh endpoints — typically your `@nutifar/node`-powered API

```bash
npm install @react-native-firebase/app @react-native-firebase/messaging
```

Follow [React Native Firebase's setup guide](https://rnfirebase.io/) for native configuration before using this SDK — it doesn't handle native linking or Firebase project setup for you.

---

# Installation

### npm

```bash
npm install @nutifar/react-native
```

### pnpm

```bash
pnpm add @nutifar/react-native
```

### yarn

```bash
yarn add @nutifar/react-native
```

---

# Quick Start

```ts
import { Nutifar } from "@nutifar/react-native";

const sdk = Nutifar({
  apiKey: "pk_...",
});
```

### Register the device (e.g. on app load or after login)

```ts
const registerDevice = async () => {
  try {
    const { token, response } = await sdk.push.register();
    console.log("registered:", token, response);
  } catch (err) {
    console.error(err);
  }
};
```

Requests permission, fetches the FCM token (registering for remote messages first, required on iOS), collects device metadata, and registers it with Nutifar — all in one call.

### Listen for incoming notifications

```ts
useEffect(() => {
  const unsubscribe = sdk.push.listen((payload) => {
    if (payload.type === "received") {
      // message arrived while app was in foreground
      // FCM does not auto-display a system notification here —
      // pair this with your own in-app UI (toast, banner, Alert)
    }
    if (payload.type === "response") {
      // user tapped the notification (app was backgrounded, or
      // killed and this is the initial notification on cold start)
    }
  });

  return unsubscribe;
}, []);
```

### Unregister (e.g. on logout)

```ts
await sdk.push.unregister(pushToken);
```

### Check permission status

```ts
const status = await sdk.push.getPermissionStatus();
```

### Check device support

```ts
if (!sdk.push.isSupported()) {
  // simulator/emulator — skip push UI
}
```

### Heartbeat (optional)

```ts
await sdk.push.heartbeat(pushToken);
```

---

# Token Refresh

Token refresh is handled automatically — `sdk.push` subscribes to Firebase's token refresh listener internally and re-syncs with Nutifar whenever the token changes. You don't need to wire this up manually.

---

# Examples

Working example apps (Expo, Web, more on the way) live in the SDK repo:

👉 [github.com/BigYusuf/nutifar-sdk](https://github.com/BigYusuf/nutifar-sdk)

---

# API

## `Nutifar({ apiKey })`

Returns an `sdk` instance. Push/device functionality is namespaced under `sdk.push` — same shape as `@nutifar/expo`.

## `sdk.push`

| Method | Description |
|---|---|
| `register(metadata?)` | Requests permission, gets the FCM token, registers device with Nutifar. Returns `{ token, response }` |
| `unregister(pushToken)` | Removes the device registration |
| `listen(callback)` | Subscribes to foreground + tap (including cold-start) events. Returns an unsubscribe function |
| `heartbeat(pushToken)` | Pings Nutifar to mark the device as active |
| `getPermissionStatus()` | Returns current notification permission status |
| `isSupported()` | `true` if running on a physical device |

---

# Notes

- **Foreground messages are not auto-displayed.** `listen()` still fires with `type: "received"`, but FCM won't show a system notification while the app is active — pair it with your own in-app UI (toast, banner, `Alert`) or a local notification library.
- `register()` calls Firebase's `registerDeviceForRemoteMessages()` internally before requesting a token, which is required on iOS.
- Cold-start (app was killed, opened via notification tap) is folded into the same `listen()` callback as a `"response"` event — you don't need a separate cold-start check.
- Registration and refresh sync happen against Nutifar directly via your `apiKey` — no backend wiring required on your end for the device lifecycle itself.

---

# Roadmap

## Available

- ✅ Token retrieval and refresh
- ✅ Permission handling
- ✅ Foreground, tap, and cold-start listeners

## Coming Soon

- Local notification fallback for foreground display
- Notification channel (Android) helpers
- Badge count helpers

---

# Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

# License

Released under the MIT License.

Made with ❤️ by **BigYusuf**.
