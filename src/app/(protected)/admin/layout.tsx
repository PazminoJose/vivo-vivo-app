import { ReactNode } from "react";
import AppLayout from "./components/AppLayout";
import { SocketIOProvider } from "./providers/SockerIOPtovider";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <SocketIOProvider>
      <AppLayout>{children}</AppLayout>;
    </SocketIOProvider>
  );
}
