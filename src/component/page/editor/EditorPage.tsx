import React from "react";
import { Trans } from "react-i18next";
import { ReactNode } from "react-markdown";
import { useParams } from "react-router-dom";
import CardData from "../../../data/flashcard/CardData";
import DeckData from "../../../data/flashcard/DeckData";
import DeckProgress from "../../../data/flashcard/DeckProgress";
import WidthLimiter from "../../leaf/WidthLimiter/WidthLimiter";
import Deck404Page from "../flashcard/deck404/Deck404Page";
import CardRow from "./CardRow";
import DeckRow from "./DeckRow";
import "./EditorPage.scss";

type EditCardFunction = (deck:DeckProgress,op:"new"|"edit"|"del",newData?:CardData)=>void;
type EditDeckFunction = (newData:DeckData)=>void;

// eslint-disable-next-line @typescript-eslint/naming-convention
function EditorPage(props:{decks:DeckProgress[],onEditCard:EditCardFunction,onEditDeck:EditDeckFunction}):JSX.Element {
    const {setId} = useParams<{setId:string}>();
    const deck = props.decks.find(v=>v.data.id===setId);
    // Redirect if card or deck is missing, otherwise render the page.
    if (!deck) 
        return <Deck404Page setId={setId}/>;
    else
        return <EditorPageClass deck={deck} onEditCard={props.onEditCard} onEditDeck={props.onEditDeck}/>;
}

class EditorPageClass extends React.Component<{deck:DeckProgress,onEditCard:EditCardFunction,onEditDeck:EditDeckFunction}> {
    onNewCardClick = (e:React.MouseEvent):void => {
        if (!e.isTrusted) return;
        this.props.onEditCard(this.props.deck,"new");
    };
    render():ReactNode {
        const { deck } = this.props, { data } = deck;
        return (
            <main className="EditorPage">
                <WidthLimiter width={700}>
                    <h1><Trans values={{name:data.name}}>editorPage.title</Trans></h1>
                    <DeckRow deck={data} onChange={this.props.onEditDeck}/>
                    <button onClick={this.onNewCardClick}><Trans>editorPage.card.new</Trans></button>
                    {data.cards.map(v=>(
                        <CardRow key={v.id} card={v}
                            onChange={this.props.onEditCard.bind(this,deck,"edit")}
                            onDelete={this.props.onEditCard.bind(this,deck,"del",v)}/>
                    ))}
                </WidthLimiter>
            </main>
        );
    }
}

export default EditorPage;
