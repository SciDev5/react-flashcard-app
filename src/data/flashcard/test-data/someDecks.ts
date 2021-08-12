import CardProgress from "../CardProgress";
import DeckData from "../DeckData";
import DeckProgress from "../DeckProgress";

const deckDatas:DeckData[] = [
    {
        id: "testA",
        coverImgURL: "",
        name: "TestDeckA",
        cards: new Array(50).fill(0).map((_,i)=>({
            id: `A-${i}`,
            answer: {type:"text",data:`answer ${i}`},
            question: {type:"text",data:`question ${i}`},
            answerInfo: `some answer info ${i*2}`,
            priority: 1,
            reversable: i % 20 >= 10
        }))
    },
    {
        id: "testB",
        coverImgURL: "",
        name: "TestDeckB",
        cards: new Array(25).fill(0).map((_,i)=>({
            id: `B-${i}`,
            answer: {type:"imageURL",data:"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"},
            question: {type:"text",data:`B question ${i}`},
            answerInfo: `B some answer info ${i*2}`,
            priority: 1/(i**0.4),
            reversable: i % 20 >= 10
        }))
    }
];


export const testDecks = deckDatas.map(d=>new DeckProgress(d,d.cards.map(v=>new CardProgress(v,1))));