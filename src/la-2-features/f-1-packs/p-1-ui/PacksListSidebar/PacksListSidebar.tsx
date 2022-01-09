import React, {MouseEvent} from 'react';
import {useDispatch} from 'react-redux';
import s from './PacksListSidebar.module.css';
import { getCardsPacksTC } from '../../p-2-bll/packsReducer';
import ButtonFormColor from '../../../../la-1-common/buttonFormColor/ButtonFormColor';
import { RangeSlider } from '../../../../la-1-common/inputRange/InputRange';
import ButtonsShowPacks from '../../../../la-1-common/buttonsShowPacks/ButtonsShowPacks';

const PacksListSidebar = () => {

    const dispatch = useDispatch()

    const onGetPacksClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(getCardsPacksTC())
    }

    return (
        <div className={s.container}>
            <>
                <div className={s.saidbarItem}>
                    <h3 className={s.title}>Show Cards Packs</h3>
                    <ButtonsShowPacks/>

                </div>

                <div className={s.saidbarItem}>
                    <h3 className={s.title}>Number of Cards</h3>
                    <RangeSlider/>
                </div>

                <div className={s.buttonContainer}>
                    <ButtonFormColor
                        text={'Get Packs'}
                        onClick={onGetPacksClickHandler}/>
                </div>

            </>
        </div>
    )
}


export default PacksListSidebar;


