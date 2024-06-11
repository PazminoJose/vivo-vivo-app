"use client";
import { theme } from "@/theme/theme";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            gcTime: 1000 * 3600 // 1 hour cache invalidation
          }
        }
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <ModalsProvider labels={{ cancel: "Cancelar", confirm: "Confirmar" }}>
            <Toaster richColors position="bottom-center" />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
