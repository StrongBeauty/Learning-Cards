import React, {useState} from "react";
import s from './ModalAddPack.module.css';
import {useDispatch} from "react-redux";
import { createCardsPackTC } from "../../../p-2-bll/packsReducer";
import ModalBox from "../../../../../la-1-common/modalBox/ModalBox";
import InputForm from "../../../../../la-1-common/inputForm/InputForm";
import ButtonFormColor from "../../../../../la-1-common/buttonFormColor/ButtonFormColor";

type ModalAddPackType={
    open: boolean
    setClose: (open: boolean)=> void
}


const ModalAddPack = (props: ModalAddPackType) => {

    const[newPackName, setNewPackName] = useState<string>('')

    const dispatch = useDispatch()

    const onTextChangeHandler = (text: string)=>{
        setNewPackName(text)
    }

    const onSaveButtonClickHandler = () =>{
        dispatch(createCardsPackTC({name: newPackName}))
        props.setClose(false)
    }

    return (
        <ModalBox open={props.open} setClose={props.setClose} title={'Add New Pack'}>
            <>
                <div className={s.inputBox}>
                    <InputForm
                        text={'Pack Name'}
                        inputType={'text'}
                        title={'Please enter package name'}
                        placeholder={'Pack Name'}
                        onChangeText={onTextChangeHandler}
                    />
                </div>

                <div className={s.buttonsBox}>
                    <ButtonFormColor text={'Cancel'} onClick={()=>props.setClose(false)}  />
                    <div className={s.buttonContainer}>
                        <ButtonFormColor
                            onClick={onSaveButtonClickHandler}
                            text={'Save'}
                        />
                    </div>

                </div>
            </>
        </ModalBox>


    )
}

export default ModalAddPack