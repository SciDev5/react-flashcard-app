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
        coverImgURL: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        name: "TestDeckB",
        cards: new Array(25).fill(0).map((_,i)=>({
            id: `B-${i}`,
            answer: {type:"imageURL",data:"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"},
            question: {type:"text",data:`B question ${i}`},
            answerInfo: `B some answer info ${i*2}`,
            priority: 1/(i**0.4),
            reversable: i % 20 >= 10
        }))
    },
    {
        id: "testC",
        coverImgURL: "",
        name: "TestDeckC",
        cards: new Array(7).fill(0).map(()=>({
            id: Math.random()+"",
            answer: {type:"text",data:"a"},
            question: {type:"text",data:"q"},
            answerInfo: "",
            priority: 1,
            reversable: false
        }))
    },
    ...new Array(20).fill(0).map(()=>({id:"I"+Math.random(),coverImgURL:"",name:"TEST",cards:[]}))
];


export const testDecks = deckDatas.map(d=>new DeckProgress(d,d.cards.map(v=>new CardProgress(v,1))));