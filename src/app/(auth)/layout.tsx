import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="bg-primary-900 flex h-full w-full items-center justify-center p-7">{children}</div>;
}
