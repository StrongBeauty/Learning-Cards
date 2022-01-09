import React, {useEffect, useState} from "react";
import s from './LearnQuestion.module.css';
import logo from "../../../la-0-assets/images/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import ButtonFormColor from "../../../la-1-common/buttonFormColor/ButtonFormColor";
import InputRadio from "../../../la-1-common/inputRadio/InputRadio";
import ListTitle from "../../../la-1-common/listTititle/ListTitile";
import { CardType, gradeCard } from "../../f-2-cards/c-2-bll/cardsReducer";
import { PATH } from "../../../la-3-main/m-1-ui/u-2-routing/Routing";
import { getCardsSelector, getCurrentPackName, getIsLoggedIn } from "../../../la-3-main/m-2-bll/selectots";

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

const LearnQuestion = () => {
    const [isRotate, setIsRotate] = useState(false);

    const cards = useSelector(getCardsSelector)
    const isLoggedIn = useSelector(getIsLoggedIn)
    const currentPackName = useSelector(getCurrentPackName)


    const [grade, setGrade] = useState<number>(0)

    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        more_id: '',

        created: '',
        updated: '',
    });

    const dispatch = useDispatch()

    useEffect(() => {

        if (cards.length > 0) setCard(getCard(cards));

        return () => {}
    }, [cards]);

    const rotate = () => {
        setIsRotate(!isRotate)
    }

    const onNextClickHandler = () => {
        try {
            dispatch(gradeCard({grade, cardId: card._id}))
        }finally {
            setIsRotate(!isRotate)
            setCard(getCard(cards))
            setGrade(0)
        }
    }


    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (

        <div className={s.container}>

            <div className={isRotate ? `${s.card} ${s.rotate}` : s.card}>


                {/* front */}
                <div className={s.cardFront}>
                    <div className={s.titleBox}>
                        <ListTitle text={currentPackName}/>

                    </div>

                    <h4 className={`${s.textTitle} ${s.frontTextTutleQuestion}`}>Question:</h4>

                    <div className={s.textBox}>
                        <p className={`${s.textCard} ${s.textCardQuestion}`}>{card.question}
                        </p>
                    </div>

                    <div className={s.buttonsBox}>
                        <div className={s.buttonCancelWrap}>
                            <Link to={PATH.PACKS}><ButtonFormColor text={'Cancel'}/></Link>
                        </div>

                        <div className={s.buttonWrap}>
                            <ButtonFormColor
                                text={'Show answer'}
                                onClick={rotate}/>
                        </div>
                    </div>

                    <img className={s.imgCard} src={logo} alt="logo"/>
                </div>

                {/* back */}
                <div className={s.cardBack}>
                    <div className={s.titleBox}>
                        <ListTitle text={`Learn ${currentPackName}`}/>
                    </div>
                    <h4 className={`${s.textTitle} ${s.backTextTitleAnswer}`}>Answer:</h4>

                    <div className={`${s.textBox} ${s.textBoxBack}`}>
                        <p className={`${s.textCard} ${s.textCardAnswer}`}>{card.answer}
                        </p>
                    </div>

                    <div className={s.inputBox}>
                        <p className={`${s.textTitle} ${s.inputTitle}`}>Rate yourself:</p>

                        <form className={s.formRadio}>
                            <InputRadio
                                name={'answer'}
                                value={'Did not know'}
                                text={'Did not know'}
                                checked={grade === 1}
                                onChange={()=>setGrade(1)}
                            />

                            <InputRadio
                                name={'answer'}
                                value={'Forgot'}
                                text={'Forgot'}
                                checked={grade === 2}
                                onChange={()=>setGrade(2)}
                            />

                            <InputRadio
                                name={'answer'}
                                value={'A lot of thought'}
                                text={'A lot of thought'}
                                checked={grade === 3}
                                onChange={() => setGrade(3)}
                            />
                            <InputRadio
                                name={'answer'}
                                value={'Сonfused'}
                                text={'Сonfused'}
                                checked={grade === 4}
                                onChange={()=> setGrade(4)}
                            />

                            <InputRadio
                                name={'answer'}
                                value={'Knew the answer'}
                                text={'Knew the answer'}
                                checked={grade === 5}
                                onChange={()=> setGrade(5)}
                            />

                        </form>
                    </div>

                    <div className={`${s.buttonsBox} ${s.buttonsBoxBack}`}>
                        <div className={s.buttonCancelWrap}>
                            <ButtonFormColor
                                text={'Cancel'}
                                onClick={rotate}/>
                        </div>
                        <div className={s.buttonWrap}>
                            <ButtonFormColor
                                text={'Next'}
                                onClick={onNextClickHandler}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default LearnQuestion