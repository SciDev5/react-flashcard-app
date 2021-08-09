import React, { ReactNode } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import FlashcardPage from "./page/flashcard/FlashcardPage";
import IndexPage from "./page/index/IndexPage";

export default class App extends React.Component {
    render():ReactNode {
        return (
            <>
                <Header/>
                <Switch>
                    <Route path="/" exact>
                        <IndexPage/>
                    </Route>
                    <Route path="/flashcard/:setId/:cardId" exact>
                        <FlashcardPage />
                    </Route>
                    <Route>
                        404 TODO
                    </Route>
                </Switch>
            </>
        );
    }
}
