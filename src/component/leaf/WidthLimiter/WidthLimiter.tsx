import React, { ReactNode } from "react";
import "./WidthLimiter.scss";

export default class WidthLimiter extends React.Component<{children:ReactNode,width?:number}> {
    render():ReactNode {
        const width = this.props.width ?? 1000;
        return (
            <div className="WidthLimiter">
                <div className="-buffer" />
                <div className="-content" style={{flexBasis: width, maxWidth: width}}>{this.props.children}</div>
                <div className="-buffer" />
            </div>
        );
    }
}