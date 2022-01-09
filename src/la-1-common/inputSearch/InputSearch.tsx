import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from './InputSearch.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputSearchPropstype = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
}

export const InputSearch: React.FC<InputSearchPropstype> = props => {

    const {
        onChangeText,
        placeholder,
        value,
    } = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeText && onChangeText(e.currentTarget.value)
    }

    return (
        <>
            <input
                className={s.input}
                type="text"
                placeholder={placeholder}
                onChange={onChangeHandler}
                value={value}
                autoComplete="on"
            />
        </>
    )
}

export default InputSearch

