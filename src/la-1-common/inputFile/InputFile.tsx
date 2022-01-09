import React from "react";
import s from './InputFile.module.css';

const InputFile = () => {

    return (
        <label className={s.inputLabel}> + Attach file
        <input className={s.inputFile} type="file" />
    </label>

    )
} 

export default InputFile