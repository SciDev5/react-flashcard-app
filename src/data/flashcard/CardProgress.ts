import CardData from "./CardData";
import DeckData from "./DeckData";

export type LearnMode = "activeLearning"|"activeReminder"|"inactive";

export interface CardProgressData {
    learnMode?: LearnMode;
    priority: number;
    id: string;
}

export default class CardProgress {
    learnMode: LearnMode;
    priority: number;
    constructor(readonly card: CardData, priority: number, learnMode?: LearnMode) {
        this.learnMode = learnMode ?? "activeLearning";
        this.priority = priority;
    }

    setLearnMode(mode: LearnMode, priority: number):void {
        this.learnMode = mode;
        this.priority = priority;
    }

    static fromData(data:CardProgressData, deck:DeckData):CardProgress {
        const { id, learnMode, priority } = data;
        const cardData = deck.cards.find(v=>v.id===id);
        if (!cardData)
            throw new Error("Attempt to register progress for nonexistant card");
        return new CardProgress(cardData, priority, learnMode);
    }
}
