import React, { LegacyRef, RefObject } from "react";
import { Trans, Translation } from "react-i18next";
import { ReactNode } from "react-markdown";

export default class EditRowField extends React.Component<{label:string,inputRef?:RefObject<HTMLElement>}&({bool:true,value:boolean,onChangeBool:(v:boolean)=>void}|{multiline?:boolean,bool?:false,value:string,onChange:(v:string)=>void})> {
    onChange = (e:React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>):void => {
        if (!e.isTrusted) return;
        if (!this.props.bool)
            this.props.onChange(e.target.value);
    };
    onChangeBool = (e:React.ChangeEvent<HTMLInputElement>):void => {
        if (!e.isTrusted) return;
        if (this.props.bool)
            this.props.onChangeBool(e.target.checked);
    };

    render():ReactNode {
        const { props } = this;
        return (
            <div className="-EditRowField">
                <label><Trans>{props.label}</Trans></label>
                <Translation>{t=>(
                    props.bool ? (
                        <input
                            ref={props.inputRef as LegacyRef<never>}
                            aria-label={t(props.label)}
                            checked={props.value} type="checkbox"
                            onChange={this.onChangeBool}/>
                    ) : (props.multiline ? (
                        <textarea
                            ref={props.inputRef as LegacyRef<never>}
                            placeholder={t(props.label)}
                            onChange={this.onChange} value={props.value} />
                    ) : (
                        <input
                            ref={props.inputRef as LegacyRef<never>}
                            placeholder={t(props.label)}
                            onChange={this.onChange} value={props.value}/>
                    ))
                )}</Translation>
            </div>
        );
    }
}
