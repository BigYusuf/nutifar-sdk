# 🌐 Nutifar Node SDK

<div align="center">

<h3>Official Server-Side SDK for Nutifar</h3>

Send transactional and broadcast notifications — Email, Push, SMS, and In-App — from your Node.js backend with a single, consistent API.

<p>

[![npm](https://img.shields.io/npm/v/@nutifar/node)](https://www.npmjs.com/package/@nutifar/node)
[![License](https://img.shields.io/github/license/BigYusuf/nutifar-sdk)](https://github.com/BigYusuf/nutifar-sdk/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

</p>

</div>

---

# Overview

The **Nutifar Node SDK** is the server-side interface to the Nutifar notification platform. It's built for backends — Express, Nest, Fastify, serverless functions, workers — that need to **trigger** notifications, not receive them.

It's a thin, typed wrapper around the Nutifar API for sending across all four channels: **Email, Push, SMS, and In-App**.

> Building a frontend or mobile app that needs to *receive* push notifications or listen for in-app events? Use [`@nutifar/web`](https://www.npmjs.com/package/@nutifar/web), [`@nutifar/expo`](https://www.npmjs.com/package/@nutifar/expo) or [`@nutifar/react-native`](https://www.npmjs.com/package/@nutifar/react-native) instead. This package is send-only.

---

# Features

- 📤 Send Email, Push, SMS, and In-App notifications from one client
- 🧩 Single or bulk/batch sends
- 📄 Template-based sends with variable substitution
- 🔑 Multi-tenant API key support
- 📦 TypeScript-first, fully typed requests and responses
- 🔒 Server-only — no browser or device APIs involved
- ⚡ Lightweight — depends only on `@nutifar/core`
- 🚀 Production-ready

---

# Requirements

- Node.js 18+
- A Nutifar account and server-side API key

---

# Installation

### npm

```bash
npm install @nutifar/node
```

### pnpm

```bash
pnpm add @nutifar/node
```

### yarn

```bash
yarn add @nutifar/node
```

---

# Quick Start

```ts
import { Nutifar } from "@nutifar/node";

const sdk = Nutifar({
  apiKey: process.env.NUTIFAR_API_KEY!,
});
```

### Send an email

```ts
await sdk.notification.sendEmail({
  to: "user@example.com",
  subject: "Welcome to Teepas",
  html: "<p>Hey Yusuf, glad to have you on board.</p>",
});
```

### Send an SMS

```ts
await sdk.notification.sendSMS({
  to: "+2348012345678",
  body: "Your OTP is 123456. Expires in 5 minutes.",
});
```

### Send a push notification

```ts
await sdk.notification.sendPush({
  to: "user_123", // nutifarToken or externalId
  title: "Your order shipped",
  body: "Track your package in the app.",
});
```

### Send an in-app notification

```ts
await sdk.notification.sendInApp({
  to: "user_123",
  title: "New comment",
  body: "Someone replied to your post.",
});
```

---

# Templates

Every channel accepts an optional `template` in place of (or alongside) raw content:

```ts
await sdk.notification.sendEmail({
  to: "user@example.com",
  subject: "Payment received",
  template: {
    name: "payment-received",
    data: { amount: "₦25,000" },
  },
});
```

---

# Multiple Recipients

`sms`, `push`, and `inapp` accept a single recipient or an array; `email` accepts a string, an `{ email, name }` object, or an array of either — with optional `cc`, `bcc`, and `from` too:

```ts
await sdk.notification.sendEmail({
  to: [{ email: "a@example.com", name: "A" }, "b@example.com"],
  cc: "manager@example.com",
  subject: "Weekly digest",
  html: "<p>...</p>",
});

await sdk.notification.sendSMS({
  to: ["+2348012345678", "+2348098765432"],
  body: "Reminder: rent due tomorrow.",
});
```

---

# Attachments

```ts
await sdk.notification.sendEmail({
  to: "user@example.com",
  subject: "Your invoice",
  html: "<p>Attached.</p>",
  attachments: [
    { filename: "invoice.pdf", url: "https://cdn.example.com/invoice.pdf" },
  ],
});
```

---

# Configuration

```ts
const sdk = Nutifar({
  apiKey: process.env.NUTIFAR_API_KEY!,
});
```

---

# Response Shape

Every `sendEmail` / `sendSMS` / `sendPush` / `sendInApp` call resolves to the same response shape — the notification is accepted and queued, not delivered synchronously:

```ts
type NotificationResponse = {
  success: boolean;
  message?: string;
  data: {
    success: boolean;
    eventId: string;
  };
};
```

Use `eventId` to correlate with delivery status once webhooks/analytics land (see Roadmap).

---

# TypeScript

The SDK is written entirely in TypeScript with complete type definitions for every channel's input and response — no additional `@types` package needed.

```ts
import type {
  SendEmailInput,
  SendSMSInput,
  SendPushInput,
  SendInAppInput,
  NotificationResponse,
} from "@nutifar/node";
```

---

# Roadmap

## Available

- ✅ Email sending (with templates, attachments, cc/bcc, multi-recipient)
- ✅ SMS sending (single or bulk)
- ✅ Push sending
- ✅ In-app sending

## Coming Soon

- Delivery status webhooks helper
- Notification analytics
- Batch/bulk send endpoint
- Scheduled sends

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