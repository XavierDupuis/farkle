import { Player } from "./player";

export class Game {
    private roundCount = 0;
    private _remainingPointsToWin: number = this.pointsRequiredForWin;

    public get remainingPointsToWin(): number {
        return this._remainingPointsToWin;
    }

    constructor(
        private player: Player,
        private pointsRequiredForWin: number = 10000
    ) {}

    public start(): number {
        let hasPlayerWon = false;
        while (!hasPlayerWon) {
            this.roundCount++;
            this._remainingPointsToWin = this.pointsRequiredForWin - this.player.points
            this.player.playRound(this);
            hasPlayerWon = this.hasPlayerWon(this.player.points)
        }
        console.log(`🔵 Player won after ${this.roundCount} rounds`)
        return this.roundCount;
    }

    private hasPlayerWon(playerPoints: number) {
        return playerPoints >= this.pointsRequiredForWin;
    }
}
