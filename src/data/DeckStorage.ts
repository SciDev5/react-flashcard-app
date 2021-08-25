import CardData from "./flashcard/CardData";
import CardProgress from "./flashcard/CardProgress";
import DeckData, { genId } from "./flashcard/DeckData";
import DeckProgress, { DeckProgressData } from "./flashcard/DeckProgress";

const DATA_KEY = {
    decks: "deck-data",
    progress: "deck-progress"
} as const;

export default class DeckStorage {
    private _decks: DeckProgress[] = [];
    public get decks(): DeckProgress[] { return this._decks }

    private _assertDeckManaged(deck:DeckProgress):void|never {
        if (!this._decks.includes(deck))
            throw new Error("deck is not managed by this DeckStorage");
    }

    loadAndInit():void {
        if (this._decks.length > 0)
            throw new Error("Cannot loadAndInit, as data has already been loaded and this deckstorage been initialized.");
        
        const deckData = JSON.parse(localStorage.getItem(DATA_KEY.decks) ?? "[]") as DeckData[];
        const progressData = JSON.parse(localStorage.getItem(DATA_KEY.progress) ?? "[]") as DeckProgressData[];
        for (const deckEntry of deckData) {
            // Find the corresponding progress element and sub it with empty data if its missing.
            const correspondingProgress = progressData.find(({id})=>deckEntry.id===id)
                ?? {id:deckEntry.id,cards:[],startedCardsOrder:[]};
            // Load the data pair.
            this.loadDeck(deckEntry,correspondingProgress);
        }
    }
    save(justProgress=false):void {
        const deckData:DeckData[] = [];
        const progressData:DeckProgressData[] = [];
        // Export current deck data to the arrays.
        for (const deck of this._decks) {
            progressData.push(this.exportDeckProgress(deck));
            if (!justProgress)
                deckData.push(this.exportDeckData(deck));
        }
        localStorage.setItem(DATA_KEY.progress,JSON.stringify(progressData));
        if (!justProgress)
            localStorage.setItem(DATA_KEY.decks,JSON.stringify(deckData));
    }


    newDeck(name:string,cover:string):DeckProgress {
        const data:DeckData = {
            name,
            coverImgURL: cover,
            id: genId(),
            cards: []
        };
        const deck = new DeckProgress(data,[]);
        this._decks.push(deck);
        deck.setProgressCallback(this.save.bind(this));
        return deck;
    }
    loadDeck(deckData:DeckData,progressData:DeckProgressData):DeckProgress {
        if (deckData.id !== progressData.id)
            throw new Error("Deck ids of deckData and progressData did not match");
        const progress:CardProgress[] = deckData.cards
            .map(({id})=>progressData.cards.find(v=>v.id===id) ?? {id,priority:1})
            .map(v=>CardProgress.fromData(v,deckData));

        const deck = new DeckProgress(deckData,progress,progressData.startedCardsOrder);
        deck.setLastStudied(progressData.lastStudied);
        this._decks.push(deck);
        deck.setProgressCallback(this.save.bind(this));
        return deck;
    }
    exportDeckProgress(deck:DeckProgress):DeckProgressData {
        this._assertDeckManaged(deck);
        return {
            id: deck.data.id,
            startedCardsOrder: deck.startedCardsOrder,
            lastStudied: deck.lastStudied?.getTime(),
            cards: deck.progress.map(
                ({
                    card:{id},
                    priority,
                    learnMode
                })=>({
                    id,
                    priority,
                    learnMode
                })
            )
        };
    }
    exportDeckData(deck:DeckProgress):DeckData {
        this._assertDeckManaged(deck);
        return JSON.parse(JSON.stringify(deck.data));
    }

    deckAddCard(deck:DeckProgress, cardData:CardData, progress?:CardProgress):void {
        this._assertDeckManaged(deck);
        if (progress && (progress.card !== cardData))
            throw new Error("progress.card is not equal to cardData");
        if (deck.data.cards.includes(cardData))
            throw new Error("card has already been added to deck");
        const progressEnt = progress ?? new CardProgress(cardData,0);
        deck.data.cards.push(cardData);
        deck.progress.push(progressEnt);
        deck.recalculateCardMeta();
    }
    deckDelCard(deck:DeckProgress, id:string):void {
        this._assertDeckManaged(deck);
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
        this._assertDeckManaged(deck);

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
