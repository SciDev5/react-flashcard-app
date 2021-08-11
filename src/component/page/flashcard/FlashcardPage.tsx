import React, { ReactNode } from "react";
import { useParams } from "react-router-dom";
import DeckProgress from "../../../data/flashcard/DeckProgress";

type PropsType = {decks: DeckProgress[]};

/** A wrapper function which forwards the url information to FlashcardPageClass */
// eslint-disable-next-line @typescript-eslint/naming-convention
function FlashcardPage(props:PropsType):JSX.Element {
    const {cardId,setId} = useParams<{cardId:string,setId:string}>();
    return <FlashcardPageClass props={props} setId={setId} cardId={cardId} />;
}

class FlashcardPageClass extends React.Component<{props:PropsType,setId:string,cardId:string}> {
    render():ReactNode {
        return (<main className="FlashcardPage">
            
        </main>);
    }
}

export default FlashcardPage;
