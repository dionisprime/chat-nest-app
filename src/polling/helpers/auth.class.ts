import { Socket } from 'socket.io';

export interface AuthSocket extends Socket {
  user: { userId: string; name: string };
}

export interface JwtPayload {
  userId: string;
  name: string;
}
