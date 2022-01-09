import React from "react";
import s from './ModalDeleteCard.module.css';
import {useDispatch} from "react-redux";
import ButtonFormColor from "../../../../../la-1-common/buttonFormColor/ButtonFormColor";
import ModalBox from "../../../../../la-1-common/modalBox/ModalBox";
import { deleteCard } from "../../../c-2-bll/cardsReducer";

type ModalDeletePackType={
    open: boolean
    setClose: (open: boolean)=> void
    cardId: string
}

const ModalDeleteCard = (props: ModalDeletePackType) => {

    const dispatch = useDispatch()

    const onDeleteButtonClickHandler = () =>{
        dispatch(deleteCard(props.cardId ))
        props.setClose(false)
    }

    return(
        <ModalBox open={props.open} setClose={props.setClose} title={'Delete Card'}>
            <>
                <p className={s.modalText}> Do you really want to remove <span className={s.modalTextBold}>this card</span>?</p>

                <div className={s.buttonsBox}>
                    <ButtonFormColor text={'Cancel'} onClick={()=>props.setClose(false)}  />
                    <button className={s.buttonDelete} type='button' onClick={onDeleteButtonClickHandler}>Delete</button>
                </div>
            </>
        </ModalBox>

    )
}

export default ModalDeleteCard