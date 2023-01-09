import { IResultResponse } from "types/socketTypes";
import { RoundResultType } from "../types/gameTypes";

export const defineResult = (
  currentUser: string,
  roundResult: IResultResponse
): RoundResultType => {
  const { results } = roundResult;
  const currentPlayerChoice = results.find(({ username }) => username === currentUser)?.choice;
  const opponentChoice = results.find(({ username }) => username !== currentUser)?.choice;
  if (currentPlayerChoice === opponentChoice) return "tie";
  if (
    (currentPlayerChoice === "paper" && opponentChoice === "rock") ||
    (currentPlayerChoice === "rock" && opponentChoice === "scissors") ||
    (currentPlayerChoice === "scissors" && opponentChoice === "paper")
  )
    return "win";
  return "loss";
};
