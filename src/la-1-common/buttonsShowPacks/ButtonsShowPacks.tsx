import React, {MouseEvent} from "react";
import { useDispatch } from "react-redux";
import { setIsPrivateAC } from "../../la-2-features/f-1-packs/p-2-bll/packsReducer";
import s from './ButtonsShowPacks.module.css';

const ButtonsShowPacks = () => {

    const dispatch = useDispatch()

    const onMyButtonClickHandler =(e: MouseEvent<HTMLButtonElement>)=>{
        dispatch(setIsPrivateAC({isPrivate: true}))
        e.currentTarget.className = s.active
        //@ts-ignore
        document.getElementById('buttonAll').className = s.button
    }
    const onAllButtonClickHandler =(e: MouseEvent<HTMLButtonElement>)=>{
        dispatch(setIsPrivateAC({isPrivate: false}))
        e.currentTarget.className = s.active
        //@ts-ignore
        document.getElementById('buttonMy').className = s.button
    }

    return (
        <>
            <div className={s.buttonsBlock}>
                <button id={'buttonMy'} className={s.button} onClick={onMyButtonClickHandler}>
                    My
                </button >

                <button id={'buttonAll'}className={s.active} onClick={onAllButtonClickHandler}>
                    All
                </button>

            </div>
        </>
    )
}

export default ButtonsShowPacks
