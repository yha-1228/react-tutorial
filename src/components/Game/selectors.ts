import { calculateWinner } from "./calculateWinner";
import { GameState } from "./index";

export const getHistories = (state: GameState) => {
  return state.histories.slice(0, state.stepNumber + 1);
};

export const getCurrent = (state: GameState) => {
  const histories = getHistories(state);
  return histories[histories.length - 1];
};

export const getSquares = (state: GameState) => {
  const current = getCurrent(state);
  return [...current.squares];
};

export const getWinners = (state: GameState) => {
  const squares = getSquares(state);
  return calculateWinner(squares);
};
