import { getDiceRolls, findItemsWithAtLeastNOccurrences } from '../utils'

export class Round {
    private static numberOfDice = 5;
    private static duplicatesCountToWild = 3;

    private static pointsByDiceFace = {
        normal: new Map<number, number>([
            [1, 100],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 50],
            [6, 0],
        ]),
        wild: new Map<number, number>([
            [1, 1000],
            [2, 200],
            [3, 300],
            [4, 400],
            [5, 500],
            [6, 600],
        ]),
    }

    private wildFaces = new Set<number>();

    private _potentialPoints = 0;

    public get potentialPoints(): number {
        return this._potentialPoints;
    }

    private _numberOfDicesToRoll = Round.numberOfDice;

    public get numberOfDicesToRoll(): number {
        return this._numberOfDicesToRoll;
    }
    
    public rollDices(): boolean {
        const diceRolls = getDiceRolls(this.numberOfDicesToRoll);
        const occurencesOfDiceFaces = this.getOccurencesOfDiceFaces(diceRolls);

        const enoughRollsToDuplicate = diceRolls.length >= Round.duplicatesCountToWild;
        if (enoughRollsToDuplicate) {
            const duplicates = this.getDuplicates(occurencesOfDiceFaces);
            if (duplicates.length) {
                for (const duplicate of duplicates) {
                    this.wildFaces.add(duplicate);
                    const currentOccurenceOfDuplicate = occurencesOfDiceFaces.get(duplicate) || 0;
                    const balancedOccurenceOfDuplicate = currentOccurenceOfDuplicate - (Round.duplicatesCountToWild - 1);
                    occurencesOfDiceFaces.set(duplicate, balancedOccurenceOfDuplicate);
                }
            }
        }

        const { rollPoints, remainingDiceToRoll } = this.getRollResults(occurencesOfDiceFaces);
        if (rollPoints === 0) {
            return false;
        }
        this._potentialPoints += rollPoints;
        
        this._numberOfDicesToRoll = remainingDiceToRoll;
        if (this.numberOfDicesToRoll === 0) {
            this.resetNumberOfDices();
        }

        return true;
    }

    private getRollResults(occurencesOfDiceFaces: Map<number, number>): { rollPoints: number, remainingDiceToRoll: number } {
        let rollPoints = 0;
        for (const [face, occurence] of occurencesOfDiceFaces) {
            const isFaceWild = this.wildFaces.has(face);
            const faceValue = (isFaceWild ? Round.pointsByDiceFace.wild : Round.pointsByDiceFace.normal).get(face) ?? 0;
            const faceValues = faceValue * occurence;
            if (faceValues > 0) {
                rollPoints += faceValues;
                occurencesOfDiceFaces.set(face, 0);
            }
        }
        const remainingDiceToRoll = [...occurencesOfDiceFaces.values()].reduce((accumulatedOccurrences, currentOccurrence) => accumulatedOccurrences + currentOccurrence, 0);
        return { rollPoints, remainingDiceToRoll };
    }

    private getOccurencesOfDiceFaces(diceRolls: number[]) {
        const occurencesByDiceFaces = new Map<number, number>();
        for (const diceRoll of diceRolls) {
            const newOccurrences = (occurencesByDiceFaces.get(diceRoll) || 0) + 1;
            occurencesByDiceFaces.set(diceRoll, newOccurrences);
        }
        return occurencesByDiceFaces;
    }

    private getDuplicates(occurencesByDiceFaces: Map<number, number>): number[] {
        return findItemsWithAtLeastNOccurrences(occurencesByDiceFaces, Round.duplicatesCountToWild);
    }

    private resetNumberOfDices() {
        this._numberOfDicesToRoll = Round.numberOfDice;
    }
}