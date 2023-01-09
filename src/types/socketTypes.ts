import { Socket } from "socket.io-client";
import { ElementType } from "./gameTypes";

export interface IResultResponse {
  results: { username: string; choice: ElementType }[];
}

export interface ServerToClientEvents {
  connected: (arg: { username: string }) => void;
  disconnected: () => void;
  players_received: (players: string[]) => void;
  opponent_made_choice: () => void;
  game_finished: (result: { results: [{ username: string; choice: ElementType }] }) => void;
}

export interface ClientToServerEvents {
  choose: (arg: "rock" | "paper" | "scissors") => void;
  get_players: () => void;
  disconnect: () => void;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
