import { myPlayer } from ".";
import { Game } from "./game/game";

export const myGame = new Game(myPlayer);
myGame.start();

// const args = process.argv.slice(2); // Get arguments after the first two
// const name = args[0]; // First argument
// const age = args[1]; // Second argument