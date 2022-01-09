import React, {MouseEvent, useState} from "react";
import s from './ModalEditCard.module.css';
import {useDispatch} from "react-redux";
import ModalBox from "../../../../../la-1-common/modalBox/ModalBox";
import InputForm from "../../../../../la-1-common/inputForm/InputForm";
import InputFile from "../../../../../la-1-common/inputFile/InputFile";
import ButtonFormColor from "../../../../../la-1-common/buttonFormColor/ButtonFormColor";
import { editCard } from "../../../c-2-bll/cardsReducer";

type AddNewCardType = {
    open: boolean
    setOpen: (open: boolean) => void
    answer: string
    question: string
    cardId: string
}


const ModalEditCard: React.FC<AddNewCardType> = props => {

    const dispatch = useDispatch()

    const [question, setQuestion] = useState<string>(props.question)
    const [answer, setAnswer] = useState<string>(props.answer)

    const onQuestionChangeHandler = (text: string) => {
        setQuestion(text)
    }
    const onAnswerChangeHandler = (text: string) => {
        setAnswer(text)
    }

    const onCancelClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        props.setOpen(false)
    }

    const onSaveClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            dispatch(editCard({question, answer, cardId: props.cardId}))
        } finally {
            props.setOpen(false)
        }
    }

    return (
        <ModalBox open={props.open} setClose={props.setOpen} title={'Card Info'}>
            <>
                <InputForm
                    text={'Question'}
                    inputType={'text'}
                    placeholder={'Please enter a question'}
                    title={' '}
                    value={question}
                    onChangeText={onQuestionChangeHandler}
                />

                <div className={s.inputFileBox}>
                    <InputFile/>
                </div>

                <InputForm
                    text={'Answer'}
                    inputType={'text'}
                    placeholder={'Please enter  your answer'}
                    title={' '}
                    value={answer}
                    onChangeText={onAnswerChangeHandler}
                />

                <div className={s.inputFileBox}>
                    <InputFile/>
                </div>

                <div className={s.buttonsBox}>
                    <ButtonFormColor
                        text={'Cancel'}
                        onClick={onCancelClickHandler}
                    />

                    <div className={s.buttonBox}>
                        <ButtonFormColor
                            text={'Save'}
                            onClick={onSaveClickHandler}
                        />
                    </div>

                </div>
            </>
        </ModalBox>

    )
}

export default ModalEditCard