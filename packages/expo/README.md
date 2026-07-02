EXPO

packages/expo/
│
├── src/
│   ├── index.ts
│   │
│   ├── client.ts                # wraps @nutifar/core SDK
│   │
│   ├── push/
│   │   ├── expo.ts              # main ExpoPushManager (like WebPushManager)
│   │   ├── token.ts             # getExpoPushToken
│   │   ├── permission.ts        # notification permissions
│   │   ├── listeners.ts         # foreground/background listeners
│   │   ├── scheduler.ts        # optional local notifications
│   │   └── types.ts
│   │
│   ├── device/
│   │   ├── device.ts            # platform detection + metadata
│   │   └── expoDevice.ts        # Expo-specific device info
│   │
│   ├── notifications/
│   │   ├── handler.ts           # setNotificationHandler
│   │   ├── events.ts            # onReceive, onResponse
│   │   └── utils.ts
│   │
│   ├── utils/
│   │   ├── platform.ts          # detect expo runtime
│   │   ├── logger.ts
│   │   └── constants.ts
│   │
│   └── sdk.ts                   # createExpoSDK factory
│
├── package.json
├── tsconfig.json
└── README.md