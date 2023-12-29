import Providers from "@/providers/providers";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vivo Vivo",
  description: "Alarm System"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Toaster richColors position="bottom-center" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
