import React, { ReactNode } from "react";
import { useParams } from "react-router-dom";

type PropsType = unknown;

// eslint-disable-next-line @typescript-eslint/naming-convention
function FlashcardPage(props:PropsType):JSX.Element {
    const {cardId,setId} = useParams() as {cardId:string,setId:string};
    return <FlashcardPageClass props={props} setId={setId} cardId={cardId} />;
}

class FlashcardPageClass extends React.Component<{props:PropsType,setId:string,cardId:string}> {
    render():ReactNode {
        return "flashcard page";
    }
}

export default FlashcardPage;
