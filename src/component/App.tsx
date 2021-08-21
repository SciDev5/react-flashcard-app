import React, { ReactNode } from "react";
import { Route, Switch } from "react-router-dom";
import { testDecks } from "../data/flashcard/test-data/someDecks";
import Header from "./header/Header";
import ColorBoundary from "./leaf/ColorBoundary/ColorBoundary";
import EditorPage from "./page/editor/EditorPage";
import FlashcardPage from "./page/flashcard/FlashcardPage";
import FlashcardRandCardRedirect from "./page/flashcard/FlashcardRandCardRedirect";
import IndexPage from "./page/index/IndexPage";

const data = testDecks;

export default class App extends React.Component {
    render():ReactNode {
        // TODO, make theme customizable.
        return (
            <ColorBoundary mode="detect">
                <Header/>
                <Switch>
                    <Route path="/" exact>
                        <IndexPage decks={data}/>
                    </Route>
                    <Route path="/flashcard/:setId/:cardId" exact>
                        <FlashcardPage decks={data} />
                    </Route>
                    <Route path="/flashcard/:setId" exact>
                        <FlashcardRandCardRedirect decks={data} />
                    </Route>
                    <Route path="/edit/:setId" exact>
                        <EditorPage decks={data} onEditCard={console.log} onEditDeck={console.log} />
                    </Route>
                    <Route>
                        404 TODO
                    </Route>
                </Switch>
            </ColorBoundary>
        );
    }
}
