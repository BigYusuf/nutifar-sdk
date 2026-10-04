// modules/inapp/inapp.stream.ts
import type { EventSourceLike, InAppClient, InAppEventMap, StreamState, MintTokenInput } from "./inapp.types";

export type CreateTransport = (url: string) => EventSourceLike;

export const createInAppStream = (
  client: InAppClient,
  baseURL: string,
  createTransport: CreateTransport,
) => {
  let state: StreamState = "idle";
  let lastEventId: string | null = null;
  let es: EventSourceLike | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let reconnectAttempt = 0;
  let manuallyDisconnected = false;
  let currentInput: MintTokenInput | null = null; // remembered for reconnects

  const listeners = new Map<keyof InAppEventMap, Set<(payload: any) => void>>();
  const stateListeners = new Set<(s: StreamState) => void>();

  const setState = (s: StreamState) => {
    state = s;
    stateListeners.forEach((fn) => fn(s));
  };

  const scheduleReconnect = () => {
    if (manuallyDisconnected) return;
    // capped exponential backoff — avoids hammering the server or the
    // customer's own token-mint rate limits during an outage
    const delay = Math.min(1000 * 2 ** reconnectAttempt, 30_000);
    reconnectAttempt++;
    reconnectTimer = setTimeout(() => connect(currentInput!), delay);
  };

  const connect = async (input: MintTokenInput) => {
    currentInput = input; // so reconnects reuse the same externalId/appId
    manuallyDisconnected = false;
    setState(state === "idle" ? "connecting" : "reconnecting");

    let token: string;
    try {
      const res = await client.post<MintTokenInput, { data: { token: string } }>(
        "/notifications/connect-token",
        input,
      );
      token = res.data.token;
    } catch (err) {
      setState("error");
      scheduleReconnect();
      return;
    }

    const url = new URL(`${baseURL.replace(/\/$/, "")}/notifications/stream`);
    url.searchParams.set("token", token);
    if (lastEventId) url.searchParams.set("since", lastEventId);

    es = createTransport(url.toString());

    es.onopen = () => {
      reconnectAttempt = 0;
      setState("open");
    };

    es.onerror = () => {
      setState("error");
      es?.close();
      es = null;
      scheduleReconnect();
    };

    es.addEventListener("notification.created", (e: any) => {
      if (e.lastEventId) lastEventId = e.lastEventId;
      const payload = JSON.parse(e.data);
      listeners.get("notification.created")?.forEach((fn) => fn(payload));
    });

    es.addEventListener("notification.read", (e: any) => {
      const payload = JSON.parse(e.data);
      listeners.get("notification.read")?.forEach((fn) => fn(payload));
    });
  };

  const disconnect = () => {
    manuallyDisconnected = true;
    if (reconnectTimer) clearTimeout(reconnectTimer);
    es?.close();
    es = null;
    setState("idle");
  };

  const on = <K extends keyof InAppEventMap>(event: K, fn: (payload: InAppEventMap[K]) => void) => {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event)!.add(fn);
    return () => listeners.get(event)?.delete(fn); // unsubscribe
  };

  const onStateChange = (fn: (s: StreamState) => void) => {
    stateListeners.add(fn);
    return () => stateListeners.delete(fn);
  };

  return { connect, disconnect, on, onStateChange, getState: () => state };
};