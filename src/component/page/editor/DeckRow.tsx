import React from "react";
import { Translation } from "react-i18next";
import { ReactNode } from "react-markdown";
import DeckData from "../../../data/flashcard/DeckData";
import EditRow from "./EditRow";
import EditRowField from "./EditRowField";

export default class DeckRow extends React.Component<{deck:DeckData,onChange:(newData:DeckData)=>void}> {
    onChange(field:keyof DeckData,value:string):void {
        const recombinantData = {...this.props.deck, [field]: value};
        this.props.onChange(recombinantData);
    }

    render():ReactNode {
        const { deck } = this.props;
        return (<Translation>{t=>(
            <EditRow label={t("editorPage.deck.label")}>
                <EditRowField label="editorPage.deck.name" value={deck.name} onChange={this.onChange.bind(this,"name")}/>
                <EditRowField label="editorPage.deck.imgURL" value={deck.coverImgURL} onChange={this.onChange.bind(this,"coverImgURL")}/>
            </EditRow>
        )}</Translation>);
    }
}
