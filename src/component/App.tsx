import React, { ReactNode } from "react";
import { Route, Switch } from "react-router-dom";
import DeckStorage from "../data/DeckStorage";
import { genEmptyCardData } from "../data/flashcard/CardData";
import i18n from "../i18n";
import Header from "./header/Header";
import ColorBoundary from "./leaf/ColorBoundary/ColorBoundary";
import EditorPage, { EditCardFunction, EditDeckFunction, EditorPageClass } from "./page/editor/EditorPage";
import FlashcardPage from "./page/flashcard/FlashcardPage";
import FlashcardRandCardRedirect from "./page/flashcard/FlashcardRandCardRedirect";
import IndexPage from "./page/index/IndexPage";


export default class App extends React.Component<{storage:DeckStorage}> {
    readonly editPageRef = React.createRef<EditorPageClass>();
    constructor(props:App["props"]) {
        super(props);
        this.state = {};
    }

    onEditCard:EditCardFunction = (deck,op,newData)=>{
        const { storage } = this.props;
        switch(op) {
        case "new": {
            const card = genEmptyCardData();
            storage.deckAddCard(deck,card);
            this.forceUpdate(()=>{
                this.editPageRef.current?.focusCardRow(card.id);
            });
            break;
        }
        case "edit":
            if (!newData) break;
            storage.deckEditCard(deck,newData);
            this.forceUpdate();
            break;
        case "del":
            storage.deckDelCard(deck,newData?.id ?? "");
            this.forceUpdate();
            break;
        default: throw new Error("card edit called with unsupported operation");
        }
    };
    onEditDeck:EditDeckFunction = (newData)=>{
        const { storage } = this.props;
        storage.deckEdit(newData);
        this.forceUpdate();
    };
    onCreateDeck = async ():Promise<void>=>{
        this.props.storage.newDeck((await i18n)("flashcard.newDeck"),"");
        this.forceUpdate();
    };
    onDeleteDeck:EditDeckFunction = (deck):void=>{
        this.props.storage.deckDel(deck.id);
    };

    render():ReactNode {
        // TODO, make theme customizable.
        const { decks } = this.props.storage;
        return (
            <ColorBoundary mode="detect">
                <Header/>
                <Switch>
                    <Route path="/" exact>
                        <IndexPage decks={decks} onCreateDeck={this.onCreateDeck}/>
                    </Route>
                    <Route path="/flashcard/:setId/:cardId" exact>
                        <FlashcardPage decks={decks} />
                    </Route>
                    <Route path="/flashcard/:setId" exact>
                        <FlashcardRandCardRedirect decks={decks} />
                    </Route>
                    <Route path="/edit/:setId" exact>
                        <EditorPage decks={decks} onEditCard={this.onEditCard} onEditDeck={this.onEditDeck} onDeleteDeck={this.onDeleteDeck} classRef={this.editPageRef} />
                    </Route>
                    <Route>
                        404 TODO
                    </Route>
                </Switch>
            </ColorBoundary>
        );
    }
}
