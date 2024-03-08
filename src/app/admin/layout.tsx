import { ReactNode } from "react";
import AppLayout from "./components/AppLayout";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
