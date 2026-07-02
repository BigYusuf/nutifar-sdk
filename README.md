# 🚀 Nutifar

<div align="center">

<h3>Cross-platform Push Notification Infrastructure</h3>

Build, manage, and deliver reliable push notifications across **Web**, **Expo**, and **React Native** with a single SDK ecosystem.

<p>

[![npm](https://img.shields.io/npm/v/@nutifar/web)](https://www.npmjs.com/package/@nutifar/web)
[![License](https://img.shields.io/github/license/BigYusuf/nutifar-sdk)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)

</p>

</div>

---

## Why Nutifar?

Nutifar provides a modern SDK for integrating push notifications into your applications without worrying about platform-specific implementations.

* 🌐 One SDK ecosystem for Web, Expo, and React Native
* ⚡ Lightweight and tree-shakeable
* 🔒 Secure API communication
* 📦 TypeScript-first developer experience
* 🔔 Built for Firebase Cloud Messaging (FCM)
* 🧩 Framework agnostic
* 🛠 Zero-config Web CLI
* 🚀 Designed for production applications

---

## Supported Platforms

| Platform        | Package                 | Status         |
| --------------- | ----------------------- | -------------- |
| 🌐 Web          | `@nutifar/web`          | ✅ Stable       |
| 📱 Expo         | `@nutifar/expo`         | 🚧 Coming Soon |
| 📲 React Native | `@nutifar/react-native` | 🚧 Coming Soon |

---

# Installation

```bash
npm install @nutifar/web
```

or

```bash
pnpm add @nutifar/web
```

or

```bash
yarn add @nutifar/web
```

---

# Initialize your project

After installing the SDK, initialize your project:

```bash
npx nutifar init
```

The CLI will automatically:

* Copy the required `firebase-messaging-sw.js`
* Create the `public/` directory if necessary
* Prepare your project for Web Push Notifications

---

# Quick Start

```ts
import { Nutifar } from "@nutifar/web";

const nutifar = new Nutifar({
  apiKey: "YOUR_API_KEY",
});

await nutifar.initialize();
```

---

# Monorepo Structure

```text
packages/
├── web/
├── expo/
└── react-native/

examples/
├── vite/
├── nextjs/
├── expo/
└── react-native/
```

---

# Local Development

Clone the repository

```bash
git clone https://github.com/BigYusuf/nutifar-sdk.git
cd nutifar-sdk
```

Install dependencies

```bash
pnpm install
```

Build all packages

```bash
pnpm build
```

Start development mode

```bash
pnpm dev
```

---

# CLI

The Web SDK ships with a built-in CLI.

```bash
nutifar init
```

Additional commands planned:

```bash
nutifar doctor
nutifar upgrade
nutifar --version
nutifar --help
```

---

# Examples

Complete working examples are available for:

* React + Vite
* Next.js
* Expo
* React Native

---

# Roadmap

### Current

* ✅ Web SDK
* ✅ Web CLI

### Coming Soon

* 🚧 Expo SDK
* 🚧 React Native SDK
* 🚧 Notification Inbox
* 🚧 Analytics
* 🚧 Message Templates
* 🚧 Offline Queue
* 🚧 Dashboard SDK
* 🚧 Server SDK

---

# Contributing

We welcome contributions of all sizes.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a Pull Request.

---

# License

Released under the MIT License.

Made with ❤️ by **BigYusuf**.
