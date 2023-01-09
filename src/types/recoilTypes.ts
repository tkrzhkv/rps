import { ElementType } from "./gameTypes";

export interface IPlayer {
  username: string;
  currentRoundChoice?: ElementType | null;
}

export interface IScore {
  currentPlayerPoints: number;
  opponentPlayerPoints: number;
}
