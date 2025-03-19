import Providers from "@/providers/Providers";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vivo Vivo",
  description: "Alarm System"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="bg-primary-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
