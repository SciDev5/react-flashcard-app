import React from "react";
import { Trans } from "react-i18next";
import { ReactNode } from "react-markdown";

export default class Button extends React.Component<{className?:string|(string|false)[],onInteract:()=>void,text:string}> {
    onInteract():void {
        this.props.onInteract();
    }
    onClick = (e:React.MouseEvent):void => this.onInteract();
    onKeyPress = (e:React.KeyboardEvent):void => {
        const { key } = e;
        switch (key) {
        case "Enter":
        case " ":
            this.onInteract();
            break;
        }
    };
    render():ReactNode {
        const className = (typeof(this.props.className) === "string" ?
            this.props.className :
            this.props.className?.filter(v=>v!==false).map(v=>(v as string).trim()).join(" ")
        )?.trim();
        return (
            <button className={className} onClick={this.onClick} onKeyPress={this.onKeyPress}>
                <Trans>{this.props.text}</Trans>
            </button>
        );
    }
}