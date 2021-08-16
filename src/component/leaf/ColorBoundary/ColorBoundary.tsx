import React from "react";
import { ReactNode } from "react-markdown";

export type ColorMode = "detect"|"dark"|"light";

export default class ColorBoundary extends React.Component<{mode:ColorMode}> {
    render():ReactNode {
        return (
            <div className={`ColorBoundary -${this.props.mode}`}>
                {this.props.children}
            </div>
        );

    }
}
