import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 p-7">
      {children}
    </div>
  );
}
