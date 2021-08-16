import React, { ReactNode } from "react";
import Button from "../../leaf/Button/Button";

export default class ButtonRow extends React.Component<{onInteract:()=>void,text:string,disabled?:boolean}> {
    render():ReactNode {
        return (<Button
            className="-ButtonRow"
            onInteract={this.props.onInteract}
            text={this.props.text}
            disabled={this.props.disabled}/>);
    }
}