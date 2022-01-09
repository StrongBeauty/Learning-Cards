import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './InputRadio.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type InputRadioPropsType = DefaultInputPropsType & {
    text: string
}

const InputRadio: React.FC<InputRadioPropsType> = props => {

    const {
        name,
        onChange,
        value,
        text,
        checked,
    } = props

    return (
      
            <label className={s.inputWrap}>
                <input
                    className={s.input}
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                />
                <span className={s.radioStyle}></span>
                <p className={s.inputText}>{text}</p>
            </label>
    
        )
    }

export default InputRadio