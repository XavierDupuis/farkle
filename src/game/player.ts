import { Game } from "./game";
import { PlayerStrategy } from "./player-strategy";
import { Round } from "./round";

export class Player {
    constructor(private playerStrategy: PlayerStrategy) {}
    
    public playRound(game: Game): { hasWonRound: boolean, potentialPoints: number } {
        const round = new Round();
        let wantsToContinueRolling = true;
        let canContinueRolling = true;
        let wouldWin = true;
        
        let willRoll = true
        do {
            canContinueRolling = round.rollDices();
            wantsToContinueRolling = this.playerStrategy.wantsToContinueRolling(round, game);
            wouldWin = game.remainingPointsToWin <= round.potentialPoints;
            willRoll = wantsToContinueRolling && canContinueRolling && !wouldWin;
        } while (willRoll);

        const hasWonRound = canContinueRolling;
        if (!hasWonRound) {
            return { hasWonRound: false, potentialPoints: 0 };
        }

        const potentialPoints = round.potentialPoints;

        const hasToOpen = game.bankedPoints < game.pointsRequiredToOpen;
        const willOpen = potentialPoints > game.pointsRequiredToOpen;
        if (hasToOpen && !willOpen) {
            return { hasWonRound: false, potentialPoints: 0 };
        }

        return { hasWonRound, potentialPoints };
    }
}
