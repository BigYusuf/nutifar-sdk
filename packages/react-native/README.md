REACT NATIVE

packages/react-native/
│
├── src/
│ ├── index.ts
│ │
│ ├── client.ts.                    # wraps @nutifar/core SDK
│ │
│ ├── push/
│ │ ├── manager.ts                  # main ReactNativePushManager
│ │ │
│ │ ├── token.ts                    # push token abstraction
│ │ │
│ │ ├── permission.ts               # permission abstraction
│ │ │
│ │ ├── listeners.ts                # foreground/background listener abstraction
│ │ │
│ │ └── scheduler.ts                # optional local notification abstraction
│ │
│ ├── device/
│ │ ├── device.ts                   # device registration + management
│ │ │
│ │ └── nativeDevice.ts             # React Native device metadata
│ │
│ ├── notifications/
│ │ ├── handler.ts                  # notification handler abstraction
│ │ │
│ │ ├── events.ts                   # onReceive, onResponse abstraction
│ │ │
│ │ └── utils.ts
│ │
│ ├── utils/
│ │ ├── platform.ts                 # detect android / ios
│ │ │
│ │ ├── logger.ts                   # SDK logger
│ │ │
│ │ └── constants.ts
│ │
│ └── sdk.ts                        # createReactNativeSDK factory
│
├── package.json
├── tsconfig.json
└── README.md
