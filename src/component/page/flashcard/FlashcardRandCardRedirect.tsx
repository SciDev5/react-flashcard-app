import React from "react";
import { Redirect, useParams } from "react-router-dom";
import DeckProgress from "../../../data/flashcard/DeckProgress";
import Deck404Page from "./deck404/Deck404Page";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function FlashcardRandCardRedirect(props:{decks:DeckProgress[]}):JSX.Element {
    const { setId } = useParams<{setId:string}>(),
        deck = props.decks.find(v => v.data.id === setId);
    if (!deck || !deck.hasCards) // Go to a 404 page if the deck is missing or doesn't have any cards.
        return <Deck404Page setId={setId}/>;
    else
        return <Redirect to={`/flashcard/${setId}/${deck.nextCard().card.id}`}/>;
    
}
