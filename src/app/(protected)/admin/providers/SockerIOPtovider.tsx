"use client";
import { SOCKET_URL } from "@/constants/constants";
import { APP_ROLES } from "@/constants/roles";
import { useSession } from "next-auth/react";
import { createContext, use, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketIOState = Socket | null;
const SocketIOContext = createContext<SocketIOState>(null);

export function SocketIOProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data } = useSession();

  useEffect(() => {
    if (!data?.user.userID) return;
    const socket = io(SOCKET_URL, {
      query: { userID: data?.user.userID, roleName: APP_ROLES.ADMIN },
      transports: ["websocket"]
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [data?.user.userID]);

  return <SocketIOContext value={socket}>{children}</SocketIOContext>;
}

export const useSocketIOProvider = () => use(SocketIOContext);
