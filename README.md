# 🚀 Nutifar

<div align="center">

<h3>Cross-platform Notification Infrastructure</h3>

Build and integrate reliable notifications across **Web, Node.js, Expo, and React Native** with a unified SDK ecosystem.

<p>

[![npm](https://img.shields.io/npm/v/@nutifar/web)](https://www.npmjs.com/package/@nutifar/web)
[![License](https://img.shields.io/github/license/BigYusuf/nutifar-sdk)](https://github.com/BigYusuf/nutifar-sdk/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)

</p>

</div>

---

## Why Nutifar?

Nutifar provides a unified SDK ecosystem for integrating notification infrastructure into modern applications.

Instead of managing platform-specific notification implementations independently, use the Nutifar SDK built for your platform.

* 🌐 One SDK ecosystem across multiple platforms
* ⚡ Lightweight and tree-shakeable
* 🔒 Secure API communication
* 📦 TypeScript-first developer experience
* 🔔 Built for production notification infrastructure
* 🧩 Platform-specific SDKs with a shared core
* 🛠 Developer-focused CLI
* 🚀 Designed for production applications

---

## Supported Platforms

| Platform        | Package                 | Status         |
| --------------- | ----------------------- | -------------- |
| 🌐 Web          | `@nutifar/web`          | ✅ Stable       |
| 📱 Expo         | `@nutifar/expo`         | ✅ Stable       |
| 📲 React Native | `@nutifar/react-native` | ✅ Stable       |
| 🟢 Node.js      | `@nutifar/node`         | ✅ Stable       |
| 🐍 Python       | `@nutifar/python`       | 🚧 Coming Soon |
| 🐘 Laravel      | `@nutifar/laravel`      | 🚧 Coming Soon |

---

# SDK Ecosystem

Nutifar uses a shared internal core with platform-specific SDKs.

```text
@nutifar/core
       │
       ├── @nutifar/web
       ├── @nutifar/expo
       ├── @nutifar/react-native
       ├── @nutifar/node
       ├── @nutifar/python
       └── @nutifar/laravel
```

Most developers should install the SDK for their platform.

`@nutifar/core` is an internal shared engine and is not intended for direct use.

---

# Installation

Install the SDK for your platform.

### Web

```bash
npm install @nutifar/web
```

```bash
pnpm add @nutifar/web
```

### Expo

```bash
npm install @nutifar/expo
```

### React Native

```bash
npm install @nutifar/react-native
```

### Node.js

```bash
npm install @nutifar/node
```

---

# Nutifar CLI

Nutifar provides a developer-focused CLI for managing the Nutifar SDK ecosystem.

Install or run the CLI:

```bash
npx nutifar
```

The CLI can detect your project and help install the correct Nutifar SDK.

```text
NUTIFAR

? What do you want to do?
❯ Setup Nutifar
  Install an SDK
  Check project
  View SDK info
  Exit
```

### Available CLI features

* 🔍 Automatic project detection
* 📦 SDK installation
* 🩺 Project diagnostics
* 📋 SDK information
* 🔄 SDK upgrades

The CLI package is:

```text
@nutifar/cli
```

The CLI command is:

```bash
nutifar
```

---

# Quick Start

The SDK API depends on the platform you are building for.

### Web

```ts
import { Nutifar } from "@nutifar/web";

const nutifar = new Nutifar({
  apiKey: "YOUR_API_KEY",
});

await nutifar.initialize();
```

For platform-specific installation and usage, see the README for the SDK you are using.

---

# Monorepo Structure

```text
packages/
├── core/
├── web/
├── expo/
├── react-native/
├── node/
├── python/
├── laravel/
└── cli/

examples/
├── vite/
├── nextjs/
├── expo/
└── react-native/
```

---

# Local Development

Clone the repository:

```bash
git clone https://github.com/BigYusuf/nutifar-sdk.git
cd nutifar-sdk
```

Install dependencies:

```bash
pnpm install
```

Build all packages:

```bash
pnpm build
```

Start development mode:

```bash
pnpm dev
```

---

# Examples

Working examples are available for:

* React + Vite
* Next.js
* Expo
* React Native

---

# Roadmap

### Available

* ✅ Web SDK
* ✅ Expo SDK
* ✅ React Native SDK
* ✅ Node.js SDK
* ✅ Nutifar CLI

### Coming Soon

* 🚧 Python SDK
* 🚧 Laravel SDK
* 🚧 Notification Inbox
* 🚧 Analytics
* 🚧 Message Templates
* 🚧 Offline Queue
* 🚧 Dashboard SDK
* 🚧 Server SDK improvements

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
