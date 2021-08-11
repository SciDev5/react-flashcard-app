import React from "react";
import { Redirect, useParams } from "react-router-dom";
import DeckProgress from "../../../data/flashcard/DeckProgress";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function FlashcardRandCardRedirect(props:{decks:DeckProgress[]}):JSX.Element {
    const { setId } = useParams<{setId:string}>(),
        deck = props.decks.find(v => v.data.id === setId);
    if (!deck)
        return <Redirect to="/"/>;
    else
        return <Redirect to={`/flashcard/${setId}/${deck.nextCard().card.id}`}/>;
}
