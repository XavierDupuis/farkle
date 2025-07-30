import { Player } from "./player";

export class Game {
    private roundCount = 0;

    private _bankedPoints = 0;
    
    public get bankedPoints(): number {
        return this._bankedPoints;
    }

    public get remainingPointsToWin(): number {
        return this.pointsRequiredForWin - this.bankedPoints;
    }

    constructor(
        private readonly player: Player,
        public readonly pointsRequiredForWin: number = 10000,
        public readonly pointsRequiredToOpen: number = 1000
    ) {}

    public start(): number {
        let hasPlayerWon = false;
        while (!hasPlayerWon) {
            this.roundCount++;
            const { hasWonRound, potentialPoints } = this.player.playRound(this);
            if (hasWonRound) {
                this._bankedPoints += potentialPoints;
                console.log(`🟢 Player won ${potentialPoints} points (now ${this.bankedPoints})`)
                hasPlayerWon = this.hasPlayerWon(this.bankedPoints);
            } else {
                console.log(`🔴 Player lost round (${potentialPoints})`)
            }
        }
        console.log(`🔵 Player won after ${this.roundCount} rounds`)
        return this.roundCount;
    }

    private hasPlayerWon(playerPoints: number) {
        return playerPoints >= this.pointsRequiredForWin;
    }
}
