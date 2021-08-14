import React, { ReactNode } from "react";
import { Redirect, useParams } from "react-router-dom";
import CardProgress from "../../../data/flashcard/CardProgress";
import DeckProgress from "../../../data/flashcard/DeckProgress";
import WidthLimiter from "../../leaf/WidthLimiter/WidthLimiter";
import ButtonRow from "./ButtonRow";
import FlashcardRandCardRedirect from "./FlashcardRandCardRedirect";
import TermRow from "./TermRow";
import "./FlashcardPage.scss";
import AnswerInfoRow from "./AnswerInfoRow";
import ModeSelectorRow from "./ModeSelectorRow";

type PropsType = {decks: DeckProgress[]};

/** A wrapper function which forwards the url information to FlashcardPageClass */
// eslint-disable-next-line @typescript-eslint/naming-convention
function FlashcardPage(props:PropsType):JSX.Element {
    const {cardId,setId} = useParams<{cardId:string,setId:string}>();
    const deck = props.decks.find(v=>v.data.id===setId),
        card = deck?.getCardById(cardId);
    // Redirect if card or deck is missing, otherwise render the page.
    if (!deck || !card) 
        return <FlashcardRandCardRedirect decks={props.decks}/>;
    else
        return <FlashcardPageClass deck={deck} card={card} />;
}

class FlashcardPageClass extends React.Component<{deck:DeckProgress,card:CardProgress}, {flipped:boolean,next?:string,attemptReverse:boolean}> {
    constructor(props:FlashcardPageClass["props"]) {
        super(props);
        this.state = {
            flipped: false,
            attemptReverse: Math.random()>0.5
        };
    }

    onFlipToAnswer = ()=>{
        this.setState({ flipped: true });
    };

    onNextCard = ()=>{
        const next = this.props.deck.nextCard().card.id;
        this.setState({
            next,
            flipped: false,
            attemptReverse: Math.random() > 0.5
        });
    };

    render():ReactNode {
        const { card, deck } = this.props, { flipped, next, attemptReverse } = this.state,
            cardData = card.card;
            
        if (next && next !== cardData.id) // Redirect to next card.
            return <Redirect to={`/flashcard/${deck.data.id}/${next}`}/>;

        const doReverse = cardData.reversable && attemptReverse,
            question = doReverse ? cardData.answer : cardData.question,
            answer = doReverse ? cardData.question : cardData.answer;

        return (<main className="FlashcardPage"><WidthLimiter width={600}>{
            flipped ? (/*Answer side*/<>
                <TermRow data={question} />
                <TermRow em data={answer} />
                <ModeSelectorRow card={card} deck={deck} />
                <ButtonRow text="flashcard.nextCard" onInteract={this.onNextCard}/>
                <AnswerInfoRow text={cardData.answerInfo}/>
            </>) : (/*Question side*/<>
                <TermRow em data={question} />
                <ButtonRow text="flashcard.flipCard" onInteract={this.onFlipToAnswer}/>
            </>)
        }</WidthLimiter></main>);
    }
}

export default FlashcardPage;
