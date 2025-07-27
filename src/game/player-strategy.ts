import { Game } from "./game";
import { Round } from "./round";

export interface PlayerStrategy {
    wantsToContinueRolling(round: Round, game: Game): boolean
}