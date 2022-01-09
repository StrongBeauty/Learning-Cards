import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PacksListSidebar from './PacksListSidebar/PacksListSidebar';
import { getCardsPacksTC } from '../p-2-bll/packsReducer';
import PacksListMain from './PacksListMain/PacksListMain';
import ListContainer from '../../../la-1-common/ListContainer/ListContainer';
import { PATH } from '../../../la-3-main/m-1-ui/u-2-routing/Routing';
import {getIsLoggedIn, getIsPrivate, getPacksPage, getPageCount, getSortPacks } from '../../../la-3-main/m-2-bll/selectots';


const Packs = () => {

    const dispatch = useDispatch()

    const currentPage = useSelector(getPacksPage)
    const pageCount = useSelector(getPageCount)
    const isPrivate = useSelector(getIsPrivate)
    const sortPacks = useSelector(getSortPacks)

    useEffect(() => {
        dispatch(getCardsPacksTC())
    }, [dispatch, currentPage, pageCount, isPrivate, sortPacks])

    const isLoggedIn = useSelector(getIsLoggedIn)

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <ListContainer>
            <PacksListSidebar/>
            <PacksListMain/>
        </ListContainer>
    );
};

export default Packs;
