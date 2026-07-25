# 🚀 Nutifar CLI

<div align="center">

<h3>Manage your Nutifar SDK ecosystem from the terminal.</h3>

Detect your project, install the right Nutifar SDK, and diagnose your setup with an interactive CLI.

<p>

[![npm](https://img.shields.io/npm/v/@nutifar/cli)](https://www.npmjs.com/package/@nutifar/cli)
[![License](https://img.shields.io/github/license/BigYusuf/nutifar-sdk)](https://github.com/BigYusuf/nutifar-sdk/blob/main/LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

</p>

</div>

---

## ✨ Features

- 🔍 Automatic project detection
- 📦 Install the correct Nutifar SDK
- 🩺 Diagnose your Nutifar setup
- 📋 View SDK information
- 🔄 Manage Nutifar SDKs
- ⚡ Interactive terminal prompts
- 🧩 Supports multiple package managers

---

## Installation

You can run the CLI directly with `npx`:

```bash
npx nutifar
```

Or install it globally:

```bash
npm install -g @nutifar/cli
```

```bash
pnpm add -g @nutifar/cli
```

```bash
yarn global add @nutifar/cli
```

---

## Usage

Start the interactive CLI:

```bash
nutifar
```

You will see the Nutifar CLI menu:

```text
🚀 Nutifar

? What do you want to do?
❯ Setup Nutifar
  Install an SDK
  Check project
  View SDK info
  Exit
```

---

# Setup Nutifar

The setup command automatically detects your project and resolves the correct Nutifar SDK.

```text
? What do you want to do?
❯ Setup Nutifar
```

For example, in an Expo project:

```text
✓ Project detected

Platform: Expo
Package manager: pnpm

? Install @nutifar/expo?
❯ Yes
  No

✓ Nutifar setup complete 🚀
```

The CLI currently supports:

- Expo
- React Native
- Web
- Node.js

---

# Install an SDK

Install a Nutifar SDK manually:

```text
? What do you want to do?
❯ Install an SDK
```

Available SDKs:

```text
@nutifar/web
@nutifar/expo
@nutifar/react-native
@nutifar/node
```

The CLI automatically detects your package manager and runs the correct installation command.

### pnpm

```bash
pnpm add @nutifar/expo
```

### npm

```bash
npm install @nutifar/expo
```

### yarn

```bash
yarn add @nutifar/expo
```

### bun

```bash
bun add @nutifar/expo
```

---

# Check your project

Use the built-in project diagnostics:

```text
? What do you want to do?
❯ Check project
```

Nutifar Doctor checks your project for common issues:

```text
🩺 Nutifar Doctor

✓ Project Project detected
  expo

✓ SDK Nutifar SDK installed
  @nutifar/expo

✓ Dependencies Package manager detected
  pnpm

✓ Everything looks good 🚀
```

The diagnostic system is designed to support additional checks as the Nutifar ecosystem grows.

---

# Supported SDKs

| Platform        | Package                 | Status         |
| --------------- | ----------------------- | -------------- |
| 🌐 Web          | `@nutifar/web`          | ✅ Stable      |
| 📱 Expo         | `@nutifar/expo`         | ✅ Stable      |
| 📲 React Native | `@nutifar/react-native` | ✅ Stable      |
| 🟢 Node.js      | `@nutifar/node`         | ✅ Stable      |
| 🐍 Python       | `@nutifar/python`       | 🚧 Coming Soon |
| 🐘 Laravel      | `@nutifar/laravel`      | 🚧 Coming Soon |

---

# Package Manager Detection

The CLI automatically detects the package manager used by your project.

Supported package managers:

- pnpm
- npm
- yarn
- bun

The detected package manager is used when installing Nutifar SDKs.

---

# Development

Clone the repository:

```bash
git clone https://github.com/BigYusuf/nutifar-sdk.git
cd nutifar-sdk
```

Install dependencies:

```bash
pnpm install
```

Build the CLI:

```bash
pnpm --filter @nutifar/cli build
```

Run the CLI locally:

```bash
node packages/cli/dist/index.js
```

Start development mode:

```bash
pnpm --filter @nutifar/cli dev
```

---

# Architecture

The CLI uses a registry-driven architecture.

```text
Project
   │
   ▼
Project Detector
   │
   ▼
Platform
   │
   ▼
SDK Registry
   │
   ▼
SDK Resolver
   │
   ▼
SDK Installer
```

SDKs are defined in a central registry:

```ts
const SDK_REGISTRY = [
  {
    packageName: "@nutifar/expo",
    platform: "expo",
  },
  {
    packageName: "@nutifar/react-native",
    platform: "react-native",
  },
];
```

This allows new Nutifar SDKs to be added to the CLI without duplicating installation logic.

---

# Roadmap

- ✅ Interactive CLI
- ✅ Project detection
- ✅ Package manager detection
- ✅ SDK registry
- ✅ SDK installation
- ✅ Project diagnostics
- 🚧 SDK information
- 🚧 SDK updates
- 🚧 SDK version checks
- 🚧 SDK migration assistant

---

# License

Released under the MIT License.

Made with ❤️ by **BigYusuf**.
