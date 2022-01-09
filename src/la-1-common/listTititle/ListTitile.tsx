import React from "react";
import s from './ListTitle.module.css';

type ListTitlePropsType = {
    text: string
}

const ListTitle = (props: ListTitlePropsType) => {

    return (
        <h2 className={s.listTitle}>{props.text}</h2>
    )
}

export default ListTitle