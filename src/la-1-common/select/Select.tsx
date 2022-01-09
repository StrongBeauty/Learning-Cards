import React, {ChangeEvent} from "react";
import s from "./Select.module.css";

type SelectPropsType ={
    changeHandler: (pageCount: number) =>void
}

const Select = (props: SelectPropsType) => {


    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        props.changeHandler(+e.currentTarget.value)
    }


    return (
        <>
            <div className={s.selectWrap}>
                <select className={s.select} onChange={onChangeHandler} name="pages">
                    <option className={s.selectItem}value={10}>10</option>
                    <option className={s.selectItem} value={20}>20</option>
                    <option className={s.selectItem} value={30}>30</option>
                </select>
            </div>
        </>
    )
}

export default Select;
