"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";

export function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // retry: 3, // matches your Axios retry
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5, // 30s
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
