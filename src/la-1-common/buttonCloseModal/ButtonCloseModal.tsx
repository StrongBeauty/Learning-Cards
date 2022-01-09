import React, { ButtonHTMLAttributes,  DetailedHTMLProps } from "react";
import s from './ButtonCloseModal.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>


const ButtonCloseModal: React.FC<DefaultButtonPropsType> = props => {

    return (
        <button className={s.buttonCloseModal} type="button" {...props}>
        </button>
    )
}

export default ButtonCloseModal;