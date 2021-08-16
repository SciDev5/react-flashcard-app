import React from "react";
import { Translation } from "react-i18next";
import { ReactNode } from "react-markdown";
import { Redirect } from "react-router-dom";
import DeckProgress from "../../../data/flashcard/DeckProgress";
import FALLBACK_ICON from "./rowIcon/missing.png";


export default class DeckRow extends React.Component<{deck:DeckProgress},{wasClicked:boolean,iconURL:string}> {
    constructor(props:DeckRow["props"]) {
        super(props);
        this.state = {wasClicked:false,iconURL:props.deck.data.coverImgURL};
    }
    get disabled():boolean {
        return this.props.deck.data.cards.length === 0;
    }
    onInteract():void {
        if (this.disabled) return;
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
    onMisingIcon = (e:React.InvalidEvent<HTMLImageElement>):void => {
        if (this.state.iconURL !== FALLBACK_ICON)
            this.setState({iconURL:FALLBACK_ICON});
    };
    render():ReactNode {
        const { deck } = this.props;
        const { data } = deck;
        const { disabled } = this;

        if (this.state.wasClicked)
            return <Redirect to={`/flashcard/${data.id}`}/>;


        return (<Translation>{t=>(
            <div className={"-DeckRow"+(disabled?" -disabled":"")} tabIndex={disabled?-1:0} onClick={this.onClick} onKeyPress={this.onKeyPress}>
                <div className="-icon">
                    <div className="-vAligner" />
                    <img src={this.state.iconURL} alt={t("indexPage.deckRow.iconAlt")} onError={this.onMisingIcon}/>
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