import { useCallback, useEffect, useState } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { io } from "socket.io-client";
import {
  currentUserAtom,
  opponentUserAtom,
  opponentMadeChoice,
  gameFinishedAtom,
  selectedSymbolAtom,
  scoreAtom,
} from "state/user";
import { ElementType } from "types/gameTypes";
import { SocketType } from "types/socketTypes";
import { defineResult } from "utils/defineResults";

const BASE_URL = "http://localhost:5000";

export const useSocket = (username: string) => {
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const setOpponentUser = useSetRecoilState(opponentUserAtom);
  const [opponentChoice, setOpponentChoice] = useRecoilState(opponentMadeChoice);
  const [result, setResult] = useRecoilState(gameFinishedAtom);
  const [selected, setSelected] = useRecoilState(selectedSymbolAtom);
  const [score, setScore] = useRecoilState(scoreAtom);
  const [socket, setSocket] = useState<SocketType | null>(null);

  useEffect(() => {
    if (!username) return;

    const socket: SocketType = io(BASE_URL, {
      query: {
        username,
      },
    });

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, [username, setSocket]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("get_players");
    socket.on("connected", () => {
      setCurrentUser({ username });
    });
    socket.on("players_received", (players) =>
      players.length > 1
        ? setOpponentUser({ username: players.filter((player) => player !== username)[0] })
        : null
    );
    socket.on("disconnected", () => setOpponentUser({ username: "" }));
    socket.on("game_finished", (results) => {
      setResult(() => defineResult(username, results));
    });
    socket.on("opponent_made_choice", () => setOpponentChoice(true));

    return () => {
      socket.on("connected", () => {
        socket.emit("disconnect");
      });
    };
  }, [socket]);

  useEffect(() => {
    if (result) {
      setScore((prev) => {
        switch (result) {
          case "win":
            return {
              currentPlayerPoints: prev.currentPlayerPoints + 1,
              opponentPlayerPoints: prev.opponentPlayerPoints,
            };
          case "loss":
            return {
              opponentPlayerPoints: prev.opponentPlayerPoints + 1,
              currentPlayerPoints: prev.currentPlayerPoints,
            };
          default:
            return {
              currentPlayerPoints: prev.currentPlayerPoints + 1,
              opponentPlayerPoints: prev.opponentPlayerPoints + 1,
            };
        }
      });
    }
  }, [result]);

  const sendSymbol = useCallback(
    (choosedElement: ElementType) => {
      socket?.emit("choose", choosedElement);
      setSelected(choosedElement);
    },
    [socket]
  );

  const onRefresh = () => {
    setSelected("" as ElementType);
    window.location.reload();
  };

  const onLeave = () => {
    setCurrentUser({ username: "" });
    setOpponentUser({ username: "" });
    setSelected("" as ElementType);
    setScore({ currentPlayerPoints: 0, opponentPlayerPoints: 0 });
    socket?.emit("disconnect");
  };

  const exposeed = {
    sendSymbol,
    opponentChoice,
    result,
    selected,
    onRefresh,
    score,
    onLeave,
  };

  return { ...exposeed };
};
