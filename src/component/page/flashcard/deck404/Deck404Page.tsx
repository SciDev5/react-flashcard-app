import React from "react";
import { Trans } from "react-i18next";
import { ReactNode } from "react-markdown";

export default class Deck404Page extends React.Component<{setId:string}> {
    render():ReactNode {
        const { setId } = this.props;
        return (
            <main className="Deck404Page">
                <h1><Trans>flashcard.deck404Page.title</Trans></h1>
                <p><Trans values={{setId}}>flashcard.deck404Page.data</Trans></p>
            </main>
        );`404, set "${this.props.setId}" does not exist`;
    }
}