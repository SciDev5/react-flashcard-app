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
        const dataNullError = new Error("deck needs to be non-null for this operation");
        switch(op) {
        case "new": {
            const card = genEmptyCardData();
            storage.deckAddCard(deck,card);
            storage.save();
            this.forceUpdate(()=>{
                this.editPageRef.current?.focusCardRow(card.id);
            });
            break;
        }
        case "edit":
            if (!newData) throw dataNullError;
            storage.deckEditCard(deck,newData);
            storage.save();
            this.forceUpdate();
            break;
        case "del":
            if (!newData) throw dataNullError;
            storage.deckDelCard(deck,newData.id);
            storage.save();
            this.forceUpdate();
            break;
        default: throw new Error("card edit called with unsupported operation");
        }
    };
    onEditDeck:EditDeckFunction = async (op,deckData)=>{
        const { storage } = this.props;
        const dataNullError = new Error("deck needs to be non-null for this operation");
        switch(op) {
        case "new":
            storage.newDeck((await i18n)("flashcard.newDeck"),"");
            storage.save();
            this.forceUpdate();
            break;
        case "edit":
            if (!deckData) throw dataNullError;
            storage.deckEdit(deckData);
            storage.save();
            this.forceUpdate();
            break;
        case "del":
            if (!deckData) throw dataNullError;
            storage.deckDel(deckData.id);
            storage.save();
            break;
        default: throw new Error("card edit called with unsupported operation");
        }
    };

    onProgressChange = ():void=>{
        this.props.storage.save(true);
    };

    render():ReactNode {
        // TODO, make theme customizable.
        const { decks } = this.props.storage;
        return (
            <ColorBoundary mode="detect">
                <Header/>
                <Switch>
                    <Route path="/" exact>
                        <IndexPage decks={decks} onCreateDeck={this.onEditDeck.bind(this,"new")}/>
                    </Route>
                    <Route path="/flashcard/:setId/:cardId" exact>
                        <FlashcardPage decks={decks} />
                    </Route>
                    <Route path="/flashcard/:setId" exact>
                        <FlashcardRandCardRedirect decks={decks} />
                    </Route>
                    <Route path="/edit/:setId" exact>
                        <EditorPage decks={decks} onEditCard={this.onEditCard} onEditDeck={this.onEditDeck} classRef={this.editPageRef} />
                    </Route>
                    <Route>
                        404 TODO
                    </Route>
                </Switch>
            </ColorBoundary>
        );
    }
}
