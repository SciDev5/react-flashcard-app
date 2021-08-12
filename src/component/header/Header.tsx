import React, { ReactNode } from "react";
import { Translation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Header.scss";

export default class Header extends React.Component {
    render():ReactNode {
        return (<Translation>{t=>(
            <nav className="Header">
                <Link to="/" className="-appName" aria-label={t("header.mainPageLink")}>{t("header.appName")}</Link>
                <Link to="/">{t("header.mainPageLink")}</Link>
            </nav>
        )}</Translation>);
    }
}
