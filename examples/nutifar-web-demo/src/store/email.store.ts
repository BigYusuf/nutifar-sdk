import { create } from "zustand";

import { SDKEvent } from "../types";

interface EmailPlaygroundState {
  initialized: boolean;

  loading: boolean;
  response?: unknown;
  events: SDKEvent[];
  setInitialized(initialized: boolean): void;
  setLoading(loading: boolean): void;
  setResponse(response: unknown): void;
  addEvent(event: SDKEvent): void;
  clearEvents(): void;
  reset(): void;
}

const initialState = {
  initialized: false,
  loading: false,
  response: undefined,
  events: [],
};

export const useEmailPlaygroundStore = create<EmailPlaygroundState>((set) => ({
  ...initialState,
  setInitialized: (initialized) =>
    set({
      initialized,
    }),
  setLoading: (loading) =>
    set({
      loading,
    }),

  setResponse: (response) =>
    set({
      response,
    }),

  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events],
    })),

  clearEvents: () =>
    set({
      events: [],
    }),
  reset: () => set(initialState),
}));
