const randomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomDiceFace = () => randomInt(1, 6);

export const getDiceRolls = (numberOfDices: number): number[] => {
    const diceRolls = [];
    for (let i = 0; i < numberOfDices; i++) {
        diceRolls.push(randomDiceFace())
    }
    return diceRolls;
}

export function findItemsWithAtLeastNOccurrences<T>(occurences: Map<T, number>, minOccurrences: number): T[] {
    const result: T[] = [];
    for (const [item, occurence] of occurences) {
        if (occurence >= minOccurrences) {
            result.push(item);
        }
    }
    return result;
}