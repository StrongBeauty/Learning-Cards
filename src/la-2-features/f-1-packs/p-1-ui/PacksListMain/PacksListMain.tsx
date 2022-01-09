import React, {useState} from "react";
import s from './PacksListMain.module.css';
import {useDispatch, useSelector} from "react-redux";
import PacksLine from "./PacksLine/PacksLine";
import { setPackNameAC, setPageAC, setPageCountAC } from "../../p-2-bll/packsReducer";
import ModalAddPack from "../PackModals/modalAddPack/ModalAddPack";
import ListTitle from "../../../../la-1-common/listTititle/ListTitile";
import InputSearch from "../../../../la-1-common/inputSearch/InputSearch";
import ButtonFormColor from "../../../../la-1-common/buttonFormColor/ButtonFormColor";
import { PaginationRounded } from "../../../../la-1-common/pagination/Pagination";
import Select  from "../../../../la-1-common/select/Select";
import TableHead  from "../../../../la-1-common/tableHead/TableHead";
import { getCardPacks, getPacksPage, getTotalPagesCount } from "../../../../la-3-main/m-2-bll/selectots";

const PacksListMain = () => {

    const cardPacks = useSelector(getCardPacks)

    const dispatch = useDispatch()

    const [packName, setPackName] = useState<string>('')
    const [addPack, setAddPack] = useState<boolean>(false)


    const page = useSelector(getPacksPage)
    const pagesCount = useSelector(getTotalPagesCount)

    const onPaginationChangeHandler = (page: number) => {
        dispatch(setPageAC({page: page}))
    }

    const onSelectChangeHandler = (pageCount: number) => {
        dispatch(setPageCountAC({pageCount}))
    }

    const onPackNameChangeHandler = (newPackName: string) => {
        setPackName(newPackName)
        dispatch(setPackNameAC({packName: newPackName}))
    }

    const tBody = cardPacks.map((m, index) => <PacksLine cardsCount={m.cardsCount}
                                                          updated={m.updated}
                                                          userName={m.user_name}
                                                          packName={m.name}
                                                          key={index}
                                                          _id={m._id}
                                                          user_id={m.user_id}
    />)

    const onAddPackClickHandler = () => {
        setAddPack(true)
    }

    return (
        <>
            <ModalAddPack open={addPack} setClose={setAddPack}/>
            <main className={s.container}>

                <div className={s.titleWrap}>
                    <ListTitle
                        text={"Packs list"}/>
                </div>

                <div className={s.mainBlock}>

                    <div className={s.controlBlock}>

                        <div className={s.inputWrap}>
                            <InputSearch
                                placeholder={"Search by pack name"}
                                value={packName}
                                onChangeText={onPackNameChangeHandler}
                            />
                        </div>

                        <div className={s.buttonContainer}>
                            <ButtonFormColor
                                text={'Add new pack'}
                                onClick={onAddPackClickHandler}
                            />
                        </div>
                    </div>

                    <div className={s.tabWrap}>
                        <table className={s.table}>
                            <TableHead/>
                            <tbody className={s.tableBody}>
                            {tBody}
                            </tbody>
                        </table>
                    </div>

                    <div className={s.tableNavigation}>
                        <PaginationRounded totalPages={pagesCount} setNewPage={onPaginationChangeHandler}
                                           currentPage={page}/>
                        <div className={s.select}>
                            <span className={s.selectText}>
                                Show
                            </span>
                            <Select changeHandler={onSelectChangeHandler}/>
                            <span className={s.selectText}>
                                Packs per Page
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default PacksListMain;


