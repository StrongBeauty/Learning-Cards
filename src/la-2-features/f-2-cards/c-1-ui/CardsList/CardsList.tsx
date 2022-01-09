import React from 'react';
import s from './CardsList.module.css';
import CardsListLine from './CardsListLine/CardsListLine';
import CardListHead from './CardListHead/CardListHead';
import { useDispatch, useSelector } from 'react-redux';
import { PaginationRounded } from '../../../../la-1-common/pagination/Pagination';
import Select  from "../../../../la-1-common/select/Select";
import { CardType, setCardsPageCount, setCurrentCardsPage } from '../../c-2-bll/cardsReducer';
import { getCardsPage, getTotalCardsPages } from '../../../../la-3-main/m-2-bll/selectots';

type CardsListType = {
    cards: CardType[]
    isPackBelongsToUser: boolean
}

const CardsList: React.FC<CardsListType> = props => {

    const dispatch = useDispatch()

    const currentPage = useSelector(getCardsPage)
    const totalPages = useSelector(getTotalCardsPages)

    const onPaginationChangeHandler = (page: number) => {
        dispatch(setCurrentCardsPage({currentPage: page}))
    }

    const onSelectChangeHandler = (pageCount: number) => {
        dispatch(setCardsPageCount({pageCount}))
    }

    return (
        <>
            <div className={s.tabWrap}>
                <table className={s.table}>

                    <CardListHead isPackBelongsToUser={props.isPackBelongsToUser}/>

                    <tbody className={s.tableBody}>
                    {
                        
                        props.cards.map((m, index) => <CardsListLine
                            isPackBelongsToUser={props.isPackBelongsToUser} key={index} card={m}/>)
                    }

                    </tbody>
                </table>

            </div>

            <div className={s.tableNavigation}>

                <PaginationRounded setNewPage={onPaginationChangeHandler} currentPage={currentPage}
                                   totalPages={totalPages}/>

                <div className={s.selectWrap}>
                                <span className={s.selectText}>
                                    Show
                                </span>

                    <Select changeHandler={onSelectChangeHandler}/>

                    <span className={s.selectText}>
                                    Cards per Page
                                </span>
                </div>

            </div>

        </>

    )
}

export default CardsList