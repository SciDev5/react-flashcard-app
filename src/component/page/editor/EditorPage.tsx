import React, { RefObject } from "react";
import { Trans } from "react-i18next";
import { ReactNode } from "react-markdown";
import { Link, Redirect, useParams } from "react-router-dom";
import CardData from "../../../data/flashcard/CardData";
import DeckData from "../../../data/flashcard/DeckData";
import DeckProgress from "../../../data/flashcard/DeckProgress";
import i18n from "../../../i18n";
import WidthLimiter from "../../leaf/WidthLimiter/WidthLimiter";
import Deck404Page from "../flashcard/deck404/Deck404Page";
import CardRow from "./CardRow";
import DeckRow from "./DeckRow";
import "./EditorPage.scss";

export type EditCardFunction = (deck:DeckProgress,op:"new"|"edit"|"del",newData?:CardData)=>void;
export type EditDeckFunction = (op:"new"|"edit"|"del",newData?:DeckData)=>void;

// eslint-disable-next-line @typescript-eslint/naming-convention
function EditorPage(props:{decks:DeckProgress[],onEditCard:EditCardFunction,onEditDeck:EditDeckFunction,classRef:RefObject<EditorPageClass>}):JSX.Element {
    const {setId} = useParams<{setId:string}>();
    const deck = props.decks.find(v=>v.data.id===setId);
    // Redirect if card or deck is missing, otherwise render the page.
    if (!deck) 
        return <Deck404Page setId={setId}/>;
    else
        return <EditorPageClass deck={deck} onEditCard={props.onEditCard} onEditDeck={props.onEditDeck} ref={props.classRef}/>;
}

export class EditorPageClass extends React.Component<{deck:DeckProgress,onEditCard:EditCardFunction,onEditDeck:EditDeckFunction},{deletedRedirect?:boolean}> {
    constructor(props:EditorPageClass["props"]) {
        super(props);
        this.state = {};
    }
    readonly rowRefs:RefObject<CardRow>[] = [];
    onNewCardClick = (e:React.MouseEvent):void => {
        if (!e.isTrusted) return;
        this.props.onEditCard(this.props.deck,"new");
    };
    focusCardRow(id:string):void {
        const row = this.rowRefs.find(v => v.current?.props.card.id === id)?.current ?? null;
        row?.focusFirstField();
    }
    onDeleteClick = async (e:React.MouseEvent):Promise<void> => {
        const t = await i18n,
            name = t("editorPage.deck.deckNamed",{replace:{name:this.props.deck.data.name}});
        if (confirm(t("general.confirmDelete",{replace:{name}}))) {
            this.props.onEditDeck("del",this.props.deck.data);
            this.setState({deletedRedirect:true});
        }
    };
    render():ReactNode {
        if (this.state.deletedRedirect)
            return <Redirect to="/"/>;

        const { deck } = this.props, { data } = deck;
        const deltaLen = data.cards.length - this.rowRefs.length;
        this.rowRefs.splice(0,
            Math.max(-deltaLen,0),
            ...new Array(Math.max(deltaLen,0)).fill(0).map(()=>React.createRef<CardRow>())
        );
        return (
            <main className="EditorPage">
                <WidthLimiter width={700}>
                    <h1><Trans values={{name:data.name}}>editorPage.title</Trans></h1>
                    <h3><Trans>editorPage.autosaveNote</Trans></h3>
                    <Link to="/"><Trans>editorPage.backToMenu</Trans></Link>
                    <DeckRow deck={data} onChange={this.props.onEditDeck}/>
                    <button onClick={this.onNewCardClick}><Trans>editorPage.card.new</Trans></button>
                    <button onClick={this.onDeleteClick}><Trans>editorPage.deck.del</Trans></button>
                    {data.cards.map((v,i)=>(
                        <CardRow key={v.id} card={v} ref={this.rowRefs[i]}
                            onChange={this.props.onEditCard.bind(this,deck,"edit")}
                            onDelete={this.props.onEditCard.bind(this,deck,"del",v)}/>
                    ))}
                </WidthLimiter>
            </main>
        );
    }
}

export default EditorPage;
