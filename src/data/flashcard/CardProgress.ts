import CardData from "./CardData";

export type LearnMode = "activeLearning"|"activeReminder"|"inactive";

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
}
