import { myPlayer } from ".";
import { Game } from "./game/game";

export const myGame = new Game(myPlayer);
myGame.start();