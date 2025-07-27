import { Game } from "./game";
import { PlayerStrategy } from "./player-strategy";
import { Round } from "./round";

export class Player {
    private _points = 0;
    
    public get points(): number {
        return this._points;
    }

    constructor(private playerStrategy: PlayerStrategy) {}
    
    public playRound(game: Game) {
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
        if (hasWonRound) {
            const pointsGained = round.potentialPoints;
            this._points += round.potentialPoints;
            console.log(`🟢 Player won ${pointsGained} points (now ${this.points})`)
        } else {
            console.log(`🔴 Player lost round (${round.potentialPoints})`)
        }
    }
}