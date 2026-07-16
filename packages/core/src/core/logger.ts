export type LogLevel = "none" | "error" | "warn" | "debug";

export interface LoggerOptions {
  debug?: boolean; // simple on/off, maps to "debug" level
  level?: LogLevel; // or fine-grained control
}

const LEVELS: Record<LogLevel, number> = {
  none: 0,
  error: 1,
  warn: 2,
  debug: 3,
};

export const createLogger = (opts: LoggerOptions = {}) => {
  const level: LogLevel = opts.level ?? (opts.debug ? "debug" : "none");
  const threshold = LEVELS[level];

  const tag = (label: string) => `[Nutifar SDK] ${label}`;

  return {
    debug: (...args: any[]) => {
      if (threshold >= LEVELS.debug) console.log(tag("🐛"), ...args);
    },
    warn: (...args: any[]) => {
      if (threshold >= LEVELS.warn) console.warn(tag("⚠️"), ...args);
    },
    error: (...args: any[]) => {
      if (threshold >= LEVELS.error) console.error(tag("❌"), ...args);
    },
  };
};

export type Logger = ReturnType<typeof createLogger>;
