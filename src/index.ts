import { Player } from "./game/player";

export const myPlayer = new Player({ wantsToContinueRolling: (round, game) => {
    // Example strategy: continue rolling if points earned this round are less than 500 and more than one die is left to roll
    return round.potentialPoints < 500 && round.numberOfDicesToRoll > 1;
}})

