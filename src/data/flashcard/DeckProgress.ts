import { weightedRandom } from "../../util/arrayUtil";
import CardProgress, { LearnMode as LearnCategory } from "./CardProgress";
import DeckData from "./DeckData";


export default class DeckProgress {
    _cardsByMode:{[key in LearnCategory]: CardProgress[]} = {activeLearning:[],activeReminder:[],inactive:[]};
    _cardsById:{[key: string]: CardProgress} = {};

    modeWeights:{[key in LearnCategory]: number} = {
        activeLearning: 2,
        activeReminder: 1,
        inactive: 1
    };

    constructor (
        readonly data: DeckData,
        readonly progress: CardProgress[],
        private _startedCardsOrder: string[] = []
    ) {
        this.recalculateCardsById();
        this.recalculateCardsByMode();
    }

    get startedCardsOrder():string[] { return [...this._startedCardsOrder] }

    /** Recalculate the value of _cardsById */
    recalculateCardsById():void {
        this._cardsById = {};
        for (const card of this.progress) {
            if (!this.data.cards.includes(card.card))
                throw new Error("Card progress links to a card not in the deck");
            this._cardsById[card.card.id] = card;
        }
        for (const card of this.data.cards) {
            if (this._cardsById[card.id]?.card !== card)
                throw new Error("Card progress is missing for some cards in the deck.");
        }
    }
    /** Recalculate the value of _cardsByMode */
    recalculateCardsByMode():void {
        this._cardsByMode = {activeLearning:[],activeReminder:[],inactive:[]};
        for (const id of this._startedCardsOrder) {
            const card = this._cardsById[id];
            this._cardsByMode[card.learnMode].push(card);
        }
    }

    /** Start a new card in the deck. */
    beginCard():void {
        const beginnableCards:CardProgress[] = this.progress.filter(v=>!this._startedCardsOrder.includes(v.card.id));
        if (beginnableCards.length === 0)
            return; // There are no new cards to start, return.
        // Select the card by the card data weight (card.card.priority), card.priority is for selection. 
        const cardToBegin = weightedRandom(beginnableCards.map(card=>({
            value: card,
            weight: card.card.priority
        })));
        if (cardToBegin)
            this._startedCardsOrder.push(cardToBegin.card.id);
        else throw new Error("should not happen");
    }

    /** Get the next card to quiz the user on. (selects from started cards) */
    nextCard():CardProgress {
        // Choose a mode and get its associated cards.
        const mode = this._getRandomLearnCategory();
        if (mode === null) throw new Error("No cards have been started, yet nextCard was called. Should not happen.");
        const orderedCards = this._startedCardsOrder
            .map(id => this._cardsById[id])
            .filter(card => card.learnMode === mode);
        // Generate weights and select the card.
        const maxCardPriority = Math.max(...orderedCards.map(v=>v.priority)),
            minCardPriority = Math.min(...orderedCards.map(v=>v.priority));
        const weightedCards = orderedCards.map((card,i)=>({
            value:card,
            weight:
                ((i+1)/orderedCards.length + 0.3) *
                ((card.priority-minCardPriority)/(maxCardPriority-minCardPriority) + 0.3)
        }));
        const card = weightedRandom(weightedCards);
        if (card === null)
            throw new Error("Cards were available to be selected, but none were selected (this may be due to a card's priority not being finite).");
        
        const order = this._startedCardsOrder;
        order.splice(order.indexOf(card.card.id),1);
        order.splice(0,0,card.card.id);
        
        return card;
    }

    /** Select the next learning category to select a card from. */
    private _getRandomLearnCategory():LearnCategory|null {
        // _cardsByMode contains cards which have been started, in arrays by mode.
        // Ignore modes with no cards, and then dump the other two into the array.
        const modes = Object.entries(this._cardsByMode)
            .filter(([,cards]) => cards.length > 0)
            .map(([mode]) => mode) as LearnCategory[];
        // Randomly select one based on this.modeWeights
        return weightedRandom(modes.map(mode=>({value:mode,weight:this.modeWeights[mode]})));
    }

}
