import { v4 as uuidV4 } from "uuid";
import CardData from "./CardData";

export default interface DeckData {
    readonly id: string;
    name: string;
    coverImgURL: string;
    readonly cards: CardData[];
}

export function genId():string {
    return uuidV4();
}
