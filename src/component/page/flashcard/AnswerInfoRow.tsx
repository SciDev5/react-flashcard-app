import React from "react";
import { Trans } from "react-i18next";
import ReactMarkdown, { ReactNode } from "react-markdown";

export default class AnswerInfoRow extends React.Component<{text:string}> {
    render():ReactNode {
        return (<>
            <h1 className="-AnswerInfoHeader"><Trans>flashcard.answerInfo.title</Trans></h1>
            <div className="-AnswerInfo">
                <ReactMarkdown>
                    {this.props.text}
                </ReactMarkdown>
            </div>
        </>);
    }
}