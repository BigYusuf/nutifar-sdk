# 🌐 Nutifar Web SDK

<div align="center">

<h3>Official Web Push Notification SDK for Nutifar</h3>

Integrate reliable web push notifications into any modern JavaScript application with minimal setup.

<p>

[![npm](https://img.shields.io/npm/v/@nutifar/web)](https://www.npmjs.com/package/@nutifar/web)
[![License](https://img.shields.io/github/license/BigYusuf/nutifar-sdk)](https://github.com/BigYusuf/nutifar-sdk/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

</p>

</div>

---

# Overview

The **Nutifar Web SDK** provides everything you need to integrate browser push notifications using **Firebase Cloud Messaging (FCM)** and the Nutifar platform.

Whether you're building with **React**, **Next.js**, **Vue**, **Angular**, **Vite**, or plain JavaScript, the SDK offers a consistent, TypeScript-first developer experience.

---

# Features

- 🌐 Browser-first SDK
- 🔔 Firebase Cloud Messaging (FCM)
- ⚡ Lightweight and tree-shakeable
- 📦 TypeScript-first
- 🛠 Built-in CLI
- 🔒 Secure communication with Nutifar
- 🚀 Production-ready
- 🧩 Framework agnostic

---

# Requirements

- Node.js 18+
- Modern browser with Service Worker support
- Firebase Cloud Messaging (FCM)

---

# Installation

### npm

```bash
npm install @nutifar/web
```

### pnpm

```bash
pnpm add @nutifar/web
```

### yarn

```bash
yarn add @nutifar/web
```

---

# Initialize Your Project

After installing the SDK, initialize your project.

```bash
npx nutifar init
```

The CLI will automatically:

- Copy `firebase-messaging-sw.js`
- Create the `public/` directory if needed
- Configure your project for background notifications

---

# Quick Start

```ts
import { Nutifar } from "@nutifar/web";

const nutifar = new Nutifar({
  apiKey: "YOUR_PUBLIC_API_KEY",
});

await nutifar.initialize();
```

---

# Service Worker

The CLI generates the following file inside your project:

```text
public/
└── firebase-messaging-sw.js
```

Contents:

```js
importScripts("https://api.nutifar.buzz/sw/v1/firebase-messaging-sw.js");
```

The hosted service worker is maintained by Nutifar and handles background notification delivery.

---

# CLI

The SDK ships with a built-in CLI.

## Initialize

```bash
npx nutifar init
```

## Help

```bash
npx nutifar --help
```

## Version

```bash
npx nutifar --version
```

### Upcoming Commands

```bash
nutifar doctor
nutifar upgrade
```

---

# Supported Frameworks

The SDK works with any modern JavaScript framework.

- React
- Next.js
- Vue
- Angular
- Svelte
- Vite
- Vanilla JavaScript

---

# TypeScript

The SDK is written entirely in TypeScript and includes complete type definitions.

```ts
import { Nutifar } from "@nutifar/web";
```

No additional typings are required.

---

# Examples

Example applications are available in the SDK repository.

- React + Vite
- Next.js
- Vanilla JavaScript

More examples will be added over time.

---

# Browser Compatibility

Supported browsers must support:

- Service Workers
- Push API
- Notifications API
- Firebase Cloud Messaging

---

# Roadmap

## Available

- ✅ Web SDK
- ✅ Web CLI

## Coming Soon

- Device Management
- Notification Analytics
- Rich Notifications
- Deep Linking
- Notification Inbox
- Message Templates
- Offline Queue

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
