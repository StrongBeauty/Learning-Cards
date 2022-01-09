import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, MouseEvent, useState} from 'react';
import s from './InputForm.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type InputFormPropsType = DefaultInputPropsType & {
    text: string
    inputType: string
    onChangeText?: (value: string) => void
}

const InputForm: React.FC<InputFormPropsType>= props => {

    const{
        inputType,
        text,
        onChangeText,
        placeholder,
        title,
        pattern,
        value
    }=props
    
    // !password control
    const [viewPass, setViewPass] = useState(false);
    const onViewPass = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setViewPass(!viewPass)
    }
    // !password control

    const type = inputType !== 'password'
     ? inputType
     : viewPass ? 'text' : 'password';
    const viewPassStyle = viewPass ? s.passwordControl : `${s.passwordControl} ${s.view}`;


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeText && onChangeText(e.currentTarget.value)
    }

    return (
        <label className={s.formItem}>
            <p className={s.inputText}>{text}</p>
            <div className={s.inputBox}>
                <input
                    className={s.input}
                    type={type}
                    placeholder={placeholder}
                    title={title}
                    pattern={pattern}
                    value={value}
                    onChange={onChangeHandler}
                    autoComplete="on"
                    required
                />

               {inputType === 'password' && <button className={viewPassStyle} onClick={onViewPass} />}
            </div>
        </label>

    )
}

export default InputForm