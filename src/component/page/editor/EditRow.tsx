import React from "react";
import { ReactNode } from "react-markdown";

export default class EditRow extends React.Component<{children:ReactNode,label:string}> {
    render():ReactNode {
        return (
            <div className="-EditRow">
                <div className="-rowLabel">{this.props.label}</div>
                {this.props.children}
            </div>
        );
    }
}
