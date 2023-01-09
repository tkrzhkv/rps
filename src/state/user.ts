import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IPlayer, IScore } from "types/recoilTypes";
import { ElementType } from "types/gameTypes";

const { persistAtom } = recoilPersist();

export const currentUserAtom = atom<IPlayer>({
  key: "currentUser",
  default: {
    username: "",
    currentRoundChoice: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const opponentUserAtom = atom<IPlayer>({
  key: "opponentUser",
  default: {
    username: "",
    currentRoundChoice: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const opponentMadeChoice = atom({
  key: "opponentChoice",
  default: false,
});

export const gameFinishedAtom = atom({
  key: "gameFinished",
  default: "",
});

export const selectedSymbolAtom = atom<ElementType>({
  key: "selectedSymbol",
  default: "" as ElementType,
  effects_UNSTABLE: [persistAtom],
});

export const scoreAtom = atom<IScore>({
  key: "scores",
  default: {
    currentPlayerPoints: 0,
    opponentPlayerPoints: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
