import React from "react";
import { ReactNode } from "react-markdown";
import DeckProgress from "../../../data/flashcard/DeckProgress";
import DeckRow from "./DeckRow";

export default class DeckList extends React.Component<{decks:DeckProgress[]}> {
    render():ReactNode {
        return (
            <div className="-DeckList">{
                this.props.decks.map(v=>(
                    <DeckRow deck={v} key={v.data.id} />
                ))
            }</div>
        );
    }
}