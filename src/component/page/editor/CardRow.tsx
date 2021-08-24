import React from "react";
import { Translation } from "react-i18next";
import { ReactNode } from "react-markdown";
import CardData from "../../../data/flashcard/CardData";
import i18n from "../../../i18n";
import EditRow from "./EditRow";
import EditRowField from "./EditRowField";

export default class CardRow extends React.Component<{card:CardData,onChange:(newData:CardData)=>void,onDelete:()=>void}> {
    readonly firstFieldRef = React.createRef<HTMLElement>();
    focusFirstField():void {
        this.firstFieldRef.current?.focus();
    }

    onChangeReversable = (value:boolean):void => {
        const recombinantData = {...this.props.card, reversable: value};
        this.props.onChange(recombinantData);
    };
    onChangeAnswerInfo = (value:string):void => {
        const recombinantData = {...this.props.card, answerInfo: value};
        this.props.onChange(recombinantData);
    };
    onChangeDataType(which:"question"|"answer",isImg:boolean):void {
        const dataExisting = this.props.card[which];
        const recombinantData = {...this.props.card, [which]: {...dataExisting, type:isImg?"imageURL":"text"}};
        this.props.onChange(recombinantData);
    }
    onChangeDataValue(which:"question"|"answer",data:string):void {
        const dataExisting = this.props.card[which];
        const recombinantData = {...this.props.card, [which]: {...dataExisting, data}};
        this.props.onChange(recombinantData);
    }
    onDelete = async (e:React.MouseEvent):Promise<void> => {
        if (!e.isTrusted) return;
        const t = await i18n;
        if (confirm(t("general.confirmDelete",{replace:{name:t("editorPage.card.cardNamed")}})))
            this.props.onDelete();
    };

    render():ReactNode {
        const { card } = this.props;
        return (<Translation>{t=>(
            <EditRow label={t("editorPage.card.label")}>
                <EditRowField bool label="editorPage.card.reversable" value={card.reversable} onChangeBool={this.onChangeReversable}/>
                <EditRowField inputRef={this.firstFieldRef} multiline label="editorPage.card.answerInfo" value={card.answerInfo} onChange={this.onChangeAnswerInfo}/>
                <EditRowField bool label="editorPage.card.isImg.q" value={card.question.type==="imageURL"} onChangeBool={this.onChangeDataType.bind(this,"question")}/>
                <EditRowField label="editorPage.card.question" value={card.question.data} onChange={this.onChangeDataValue.bind(this,"question")}/>
                <EditRowField bool label="editorPage.card.isImg.a" value={card.answer.type==="imageURL"} onChangeBool={this.onChangeDataType.bind(this,"answer")}/>
                <EditRowField label="editorPage.card.answer" value={card.answer.data} onChange={this.onChangeDataValue.bind(this,"answer")}/>
                <button onClick={this.onDelete}>{t("editorPage.card.del")}</button>
            </EditRow>
        )}</Translation>);
    }
}
