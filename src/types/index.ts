export type Color = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple'

export type Code = Color[]

export interface Profile {
    name: string;
    // totalGames: number;
    // gamesWon: number;
    // gamesLost: number;
}

export interface Game {
    player: string;
    score: number;
    code: Color[];
    attempts: Attempt[];
    currentAttempt: Color[];
    status: 'playing' | 'won' | 'lost' | '';
    maxAttempts: number;
    currentAttemptIndex: number;
}

export interface Attempt {
    code: Color[];
    exactMatches: number;
    colorMatches: number;
}