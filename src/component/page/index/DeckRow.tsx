import React from "react";
import { Translation } from "react-i18next";
import { ReactNode } from "react-markdown";
import { Redirect } from "react-router-dom";
import DeckProgress from "../../../data/flashcard/DeckProgress";

export default class DeckRow extends React.Component<{deck:DeckProgress},{wasClicked:boolean}> {
    constructor(props:DeckRow["props"]) {
        super(props);
        this.state = {wasClicked:false};
    }
    onInteract():void {
        this.setState({wasClicked: true});
    }
    onClick = (e:React.MouseEvent):void => {
        if (!e.isTrusted) return;
        this.onInteract();
    };
    onKeyPress = (e:React.KeyboardEvent):void => {
        if (!e.isTrusted) return;
        switch (e.key) {
        case "Enter":
        case " ":
            this.onInteract();
            break;
        }
    };
    render():ReactNode {
        const { deck } = this.props;
        const { data } = deck;

        if (this.state.wasClicked)
            return <Redirect to={`/flashcard/${data.id}`}/>;

        return (<Translation>{t=>(
            <div className="-DeckRow" tabIndex={0} onClick={this.onClick} onKeyPress={this.onKeyPress}>
                <div className="-icon">
                    <div className="-vAligner" />
                    <img src={data.coverImgURL} alt={t("indexPage.deckRow.iconAlt")}/>
                </div>
                <div className="-titleAndDesc">
                    <span className="-title">{data.name}</span>
                    <span className="-desc">{t("indexPage.deckRow.description",{replace:{
                        nCards: data.cards.length,
                        nStarted: deck.startedCardsOrder.length,
                        lastStudy: deck.lastStudied
                    }})}</span>
                </div>
            </div>
        )}</Translation>);
    }
}