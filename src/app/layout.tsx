import Providers from "@/providers/Providers";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import type { Metadata } from "next";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
