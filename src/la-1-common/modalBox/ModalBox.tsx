import { Modal } from "@material-ui/core";
import React from "react";
import ButtonCloseModal from "../buttonCloseModal/ButtonCloseModal";
import ModalTitle from "../modalTitle/ModalTitle";
import s from './ModalBox.module.css';

type ModalBoxPropsType = {
    children: JSX.Element;
    open: boolean
    setClose: (open: boolean)=> void
    title: string
}

const ModalBox = (props: ModalBoxPropsType) => {

    const onCloseButtonClick = () =>{
        props.setClose(false)
    }

    return (
        <Modal
            open={props.open}
        >
            <div className={s.wrap}>
                <div className={s.modalContent}>
                    <div className={s.headerModal}>
                        <ModalTitle
                            text={props.title}
                        />
                        <ButtonCloseModal  onClick={onCloseButtonClick}/>
                    </div>
                {props.children}
                </div>
            </div>
        </Modal>
    )
}

export default ModalBox