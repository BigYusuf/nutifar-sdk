# 📱 Nutifar Expo SDK

<div align="center">

<h3>Official Expo SDK for Nutifar</h3>

Register devices and receive push notifications in Expo apps — managed workflow or bare with Expo modules.

<p>

[![npm](https://img.shields.io/npm/v/@nutifar/expo)](https://www.npmjs.com/package/@nutifar/expo)
[![License](https://img.shields.io/github/license/BigYusuf/nutifar-sdk)](https://github.com/BigYusuf/nutifar-sdk/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-SDK-000020?logo=expo&logoColor=white)](https://expo.dev/)

</p>

</div>

---

# Overview

The **Nutifar Expo SDK** is the client-side counterpart to [`@nutifar/node`](https://www.npmjs.com/package/@nutifar/node). Where the Node SDK *sends*, this SDK *receives*: `sdk.push` handles device registration, push token lifecycle, permissions, and incoming notification listeners on physical devices via `expo-notifications`.

It's built for apps using the **Expo push service** (`ExponentPushToken[...]`) — not raw FCM/APNs tokens. If you're on bare React Native without Expo modules, use [`@nutifar/react-native`](#) instead.

---

# Features

- 📲 Device registration against your Nutifar backend
- 🔑 Push permission request + status checks
- 🔄 Automatic token-refresh handling, synced to your backend
- 📥 Foreground and interaction (tapped) notification listeners
- 💓 Optional device heartbeat
- 🧹 Clean unregister on logout
- 🧩 Bring-your-own backend calls — the SDK doesn't assume your API shape

---

# Requirements

- Expo SDK with `expo-notifications` and `expo-device` installed
- A physical device (push notifications are not supported on simulators/emulators)
- A backend exposing device register/unregister/refresh endpoints — typically your `@nutifar/node`-powered API

```bash
npx expo install expo-notifications expo-device
```

---

# Installation

### npm

```bash
npm install @nutifar/expo
```

### pnpm

```bash
pnpm add @nutifar/expo
```

### yarn

```bash
yarn add @nutifar/expo
```

---

# Quick Start

```ts
import { Nutifar } from "@nutifar/expo";

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

Requests permission, fetches the Expo push token, collects device metadata, and registers it with Nutifar — all in one call. Throws if run on a simulator/emulator.

### Listen for incoming notifications

```ts
useEffect(() => {
  const unsubscribe = sdk.push.listen((payload) => {
    if (payload.type === "received") {
      // notification arrived while app was in foreground
    }
    if (payload.type === "response") {
      // user tapped the notification
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
const status = await sdk.push.getPermissionStatus(); // "granted" | "denied" | "undetermined"
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

Token refresh is handled automatically — `sdk.push` subscribes to Expo's push token listener internally and re-syncs with Nutifar whenever the token changes. You don't need to wire this up manually.

---

# Examples

Working example apps (Expo, Web, more on the way) live in the SDK repo:

👉 [github.com/BigYusuf/nutifar-sdk](https://github.com/BigYusuf/nutifar-sdk)

---

# API

## `Nutifar({ apiKey })`

Returns an `sdk` instance. Push/device functionality is namespaced under `sdk.push`.

## `sdk.push`

| Method | Description |
|---|---|
| `register(metadata?)` | Requests permission, gets token, registers device with Nutifar. Returns `{ token, response }` |
| `unregister(pushToken)` | Removes the device registration |
| `listen(callback)` | Subscribes to foreground + tap events. Returns an unsubscribe function |
| `heartbeat(pushToken)` | Pings Nutifar to mark the device as active |
| `getPermissionStatus()` | Returns current notification permission status |
| `isSupported()` | `true` if running on a physical device |

---

# Notes

- `register()` throws if called on a simulator/emulator — guard your UI with `isSupported()` first if you want to avoid the throw.
- Device metadata (OS, model, app version, etc.) is collected automatically and merged with anything you pass into `register()`.
- Platform is normalized to uppercase (`"IOS"` / `"ANDROID"`) before being sent to Nutifar.

---

# Notes

- `register()` throws if called on a simulator/emulator — guard your UI with `isSupported()` first if you want to avoid the throw.
- Device metadata (OS, model, app version, etc.) is collected automatically and merged with anything you pass into `register()`.
- Platform is normalized to uppercase (`"IOS"` / `"ANDROID"`) before being sent to your backend.

---

# Roadmap

## Available

- ✅ Device registration
- ✅ Automatic token refresh sync
- ✅ Foreground + tap listeners
- ✅ Permission handling
- ✅ Heartbeat support

## Coming Soon

- Notification category/action support
- Badge count helpers
- Rich media notification handling

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
