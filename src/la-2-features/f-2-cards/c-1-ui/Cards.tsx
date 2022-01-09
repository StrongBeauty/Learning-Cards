import {Redirect} from 'react-router-dom';
import s from './Cards.module.css';
import React, {MouseEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {
    getCardsPage,
    getCardsPageCount,
    getCardsSelector,
    getCardsSort,
    getCurrentPackId,
    getCurrentPackName,
    getCurrentUserId,
    getIsLoggedIn,
    getPackUserId
} from '../../../la-3-main/m-2-bll/selectots';
import ModalAddNewCard from './CardsModals/modalAddNewCard/ModalAddNewCard';
import CardsList from './CardsList/CardsList';
import ListContainer from '../../../la-1-common/ListContainer/ListContainer';
import LinkPackName from '../../../la-1-common/linkPackName/LinkPackName';
import { InputSearch } from '../../../la-1-common/inputSearch/InputSearch';
import ButtonFormColor from '../../../la-1-common/buttonFormColor/ButtonFormColor';
import { getCards } from '../c-2-bll/cardsReducer';
import { PATH } from '../../../la-3-main/m-1-ui/u-2-routing/Routing';

const Cards = () => {

    const [addCard, setAddCard] = useState<boolean>(false)

    const dispatch = useDispatch()

    const cards = useSelector(getCardsSelector)
    const isLoggedIn = useSelector(getIsLoggedIn)
    const currentUserId = useSelector(getCurrentUserId)
    const packUserId = useSelector(getPackUserId)
    const currentPage = useSelector(getCardsPage)
    const currentPackId = useSelector(getCurrentPackId)
    const pageCount = useSelector(getCardsPageCount)
    const currentPackName = useSelector(getCurrentPackName)
    const cardsSort = useSelector(getCardsSort)

    useEffect(() => {
       dispatch(getCards(currentPackId))
    }, [currentPage, pageCount, currentPackId, dispatch, currentPackName, cardsSort])

    const onAddButtonClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setAddCard(true)
    }

    const isPackBelogsToUser = packUserId === currentUserId

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <>
            <ModalAddNewCard setOpen={setAddCard} open={addCard}/>
            <ListContainer>
                <>
                    <div className={s.packListWrap}>

                        <LinkPackName packName={currentPackName}/>

                        <div className={s.searchBox}>
                            <div className={isPackBelogsToUser ? s.inputWrap : s.inputWrapBig}>
                                <InputSearch
                                    placeholder={'Search...'}/>
                            </div>
                            {isPackBelogsToUser &&
                            <div className={s.buttonWrap}>
                                <ButtonFormColor
                                    text={'Add new card'}
                                    onClick={onAddButtonClickHandler}
                                />
                            </div>
                            }

                        </div>
                        {cards.length === 0 ?
                            <span
                                className={s.cardListText}>This pack is empty. Click add new card to fill this pack</span>
                            : <CardsList isPackBelongsToUser={isPackBelogsToUser} cards={cards}/>
                        }
                    </div>
                </>

            </ListContainer>
        </>
    )
}

export default Cards