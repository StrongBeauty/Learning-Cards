import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './checkbox.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type CheckboxPropsType = DefaultInputPropsType & {
    text: string
}

const Checkbox: React.FC<CheckboxPropsType> = props => {

    const {
        name,
        onChange,
        value,
        text,
        checked,
    } = props

    return (
        <label className={s.formCheckbox}>
            <input
                className={s.checkbox}
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span className={s.checkStyle}></span>
            <p className={s.inputText}>{text}</p>
        </label>

    )
}

export default Checkbox;