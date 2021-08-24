import { genId } from "./DeckData";

export interface Data {
    type: "text"|"imageURL",
    data: string
}

export default interface CardData {
    readonly id: string;
    /** The priority for the card, dependent on its practicality. */
    priority: number;
    /** The question, shown on front of card asked to user. */
    question: Data;
    /** The answer, shown on back of card, answer to question. */
    answer: Data;
    /** If the card is also able to have the answer shown first to guess the question. */
    reversable: boolean;
    /** More information about the answer (markdown). */
    answerInfo: string;
}

export function genEmptyCardData():CardData {
    return {
        id: genId(),
        answer: {data:"",type:"text"},
        question: {data:"",type:"text"},
        answerInfo: "",
        priority: 1,
        reversable: false
    };
}
