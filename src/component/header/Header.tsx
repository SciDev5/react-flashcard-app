import React, { ReactNode } from "react";
import { Translation } from "react-i18next";
import { Link } from "react-router-dom";
import WidthLimiter from "../leaf/WidthLimiter/WidthLimiter";
import "./Header.scss";

export default class Header extends React.Component {
    render():ReactNode {
        return (<Translation>{t=>(
            <div className="Header">
                <WidthLimiter width={800}>
                    <nav>
                        <Link to="/" className="-appName" aria-label={t("header.mainPageLink")}>{t("app.name")}</Link>
                        <Link to="/">{t("header.mainPageLink")}</Link>
                    </nav>
                </WidthLimiter>
            </div>
        )}</Translation>);
    }
}
