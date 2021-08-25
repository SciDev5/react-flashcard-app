import React from "react";
import { Trans } from "react-i18next";
import CardProgress, { LearnMode } from "../../../data/flashcard/CardProgress";
import DeckProgress from "../../../data/flashcard/DeckProgress";
import Button from "../../leaf/Button/Button";

export default class ModeSelectorRow extends React.Component<{card:CardProgress,deck:DeckProgress}> {
    onSetMode(mode:LearnMode):void {
        this.props.card.learnMode = mode;
        this.props.deck.recalculateCardsByMode();
        this.props.deck.callProgressCallback();
        this.forceUpdate();
    }
    
    render():React.ReactNode {
        const { card } = this.props;
        const modes:LearnMode[] = ["activeLearning","activeReminder","inactive"];
        return (<div className="-ModeSelectorRow">
            <label><Trans>flashcard.modeSelect.title</Trans></label>
            <div className="-modes">
                {modes.map(m=>(
                    <Button key={m}
                        className={[card.learnMode===m && "-sel"]}
                        text={`flashcard.modeSelect.${m}`}
                        onInteract={this.onSetMode.bind(this,m)}/>
                ))}
            </div>
        </div>);
    }
}