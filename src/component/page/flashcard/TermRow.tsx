import React, { ReactNode } from "react";
import { Translation } from "react-i18next";
import { Data as TermData } from "../../../data/flashcard/CardData";

/** Contains the text for a question or answer */
export default class TermRow extends React.Component<{data:TermData,em?:boolean}> {
    render():ReactNode {
        const { data, em } = this.props;
        return (<Translation>{t=>(<div className={`-TermRow ${em?"-em":""}`.trim()}>{
            data.type === "text" ? (
                data.data
            ) : (
                <img alt={t("TODO term")} src={data.data}/>
            )
        }</div>)}</Translation>);
    }
}