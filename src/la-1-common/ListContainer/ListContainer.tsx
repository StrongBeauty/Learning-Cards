import React from "react";
import s from './ListContainer.module.css';


const ListContainer: React.FC = props => {

    return (
            <div className={s.container}>
                <div className={s.boxCardList}>
                  {props.children}
                </div>
            </div>
    )
}

export default ListContainer