import CardData from "./CardData";

export default interface DeckData {
    readonly id: string;
    name: string;
    coverImgURL: string;
    readonly cards: CardData[];
}
