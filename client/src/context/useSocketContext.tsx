import { useState, useContext, createContext, FunctionComponent, useCallback, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAuth } from '../context/useAuthContext';

interface ISocketContext {
  socket: Socket | undefined;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { loggedInUser } = useAuth();

  const initSocket = useCallback(() => {
    console.log('trying to connect');
    setSocket(
      io('/', {
        withCredentials: true,
      }),
    );
  }, []);

  useEffect(() => {
    if (loggedInUser?._id === undefined) return;

    initSocket();
    return () => {
      socket?.close();
    };
  }, [initSocket, loggedInUser]);

  useEffect(() => {
    if (loggedInUser?._id === undefined || socket === undefined) return;

    socket.emit('comes-online', loggedInUser._id);
  }, [loggedInUser, socket]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
