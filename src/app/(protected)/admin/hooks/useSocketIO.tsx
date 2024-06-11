import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketIOProviderProps {
  uri: string;
  query?: Record<string, string | number | undefined>;
}

export function useSocketIO({ uri, query }: SocketIOProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(uri, { query });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [uri, query]);

  return socket;
}
