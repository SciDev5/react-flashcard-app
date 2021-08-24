import React, { ReactNode } from "react";
import { Trans } from "react-i18next";
import DeckProgress from "../../../data/flashcard/DeckProgress";
import WidthLimiter from "../../leaf/WidthLimiter/WidthLimiter";
import DeckList from "./DeckList";
import "./IndexPage.scss";

export default class IndexPage extends React.Component<{decks:DeckProgress[],onCreateDeck:()=>void}> {
    render():ReactNode {
        return (<main className="IndexPage"><WidthLimiter width={500}>
            <h1><Trans>app.name</Trans></h1>
            <h3><Trans>indexPage.selectDeckHeader</Trans></h3>
            <DeckList decks={this.props.decks} />
            <button onClick={this.props.onCreateDeck}><Trans>indexPage.createDeckButton</Trans></button>
        </WidthLimiter></main>);
    }
}
