import CardData from "./flashcard/CardData";
import CardProgress from "./flashcard/CardProgress";
import DeckData, { genId } from "./flashcard/DeckData";
import DeckProgress from "./flashcard/DeckProgress";

export default class DeckStorage {
    private _decks: DeckProgress[] = [];
    public get decks(): DeckProgress[] { return this._decks }

    newDeck(name:string,cover:string):DeckProgress {
        const data:DeckData = {
            name,
            coverImgURL: cover,
            id: genId(),
            cards: []
        };
        const deck = new DeckProgress(data,[]);
        this._decks.push(deck);
        return deck;
    }

    deckAddCard(deck:DeckProgress, cardData:CardData, progress?:CardProgress):void {
        if (progress && (progress.card !== cardData))
            throw new Error("progress.card is not equal to cardData");
        if (!this._decks.includes(deck))
            throw new Error("deck is not managed by this DeckStorage");
        if (deck.data.cards.includes(cardData))
            throw new Error("card has already been added to deck");
        const progressEnt = progress ?? new CardProgress(cardData,0);
        deck.data.cards.push(cardData);
        deck.progress.push(progressEnt);
        deck.recalculateCardMeta();
    }
    deckDelCard(deck:DeckProgress, id:string):void {
        if (!this._decks.includes(deck))
            throw new Error("deck is not managed by this DeckStorage");
        if (!deck.data.cards.some(card=>card.id===id))
            return void console.warn("Attempted to delete card that is not in the deck.");
        
        deck.data.cards.splice(
            deck.data.cards.findIndex(card=>card.id===id),
            1
        );
        deck.progress.splice(
            deck.progress.findIndex(card=>card.card.id===id),
            1
        );
        deck.recalculateCardMeta();
    }
    deckEditCard(deck:DeckProgress, newCardData:Partial<CardData>):void {
        if (!this._decks.includes(deck))
            throw new Error("deck is not managed by this DeckStorage");

        const data = deck.data.cards.find(v=>v.id===newCardData.id);
        if (!data)
            return void console.warn("Attempted to modify card that is not in the deck.");

        for (const keyIn of Object.keys(newCardData)) {
            const key = keyIn as keyof CardData;
            if (key !== "id")
                data[key] = (newCardData[key] ?? data[key]) as never;
        }
    }
    deckEdit(newDeckData:Partial<DeckData>):void {
        const data = this._decks.find(v=>v.data.id===newDeckData.id)?.data;
        if (!data)
            return void console.warn("Attempted to modify deck not managed by this DeckStorage.");

        for (const keyIn of Object.keys(newDeckData)) {
            const key = keyIn as keyof DeckData;
            if (key !== "id" && key !== "cards")
                data[key] = (newDeckData[key] ?? data[key]) as never;
        }
    }
    deckDel(id:string):void {
        const deckI = this._decks.findIndex(v=>v.data.id===id);
        if (deckI === -1)
            return void console.warn("Attempted to delete deck not managed by this DeckStorage.");

        this._decks.splice(deckI,1);
    }
}