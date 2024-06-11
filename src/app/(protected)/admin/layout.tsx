import { ReactNode } from "react";
import AppLayout from "./components/AppLayout";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
