import React, { useState } from "react";
 import s from './TableHead.module.css';
import ButtonFilterHeadTabl from '../buttonFilterHeadTabl/ButtonFilterHeadTabl';
import { useDispatch } from "react-redux";
import { setSortPacksAC } from "../../la-2-features/f-1-packs/p-2-bll/packsReducer";

const TableHead = () => {

    const dispatch = useDispatch()

    const [packsSort, setPacksSort] = useState<0 | 1>(0)

    const onSortChange = ()=>{
        if(packsSort === 0){
            setPacksSort(1)
            dispatch(setSortPacksAC({sortPacks: 1}))
        }
        if(packsSort === 1) {
            setPacksSort(0)
            dispatch(setSortPacksAC({sortPacks: 0}))
        }
    }

    return (
        <>
            <thead className={s.tableHead}>
                <tr className={s.tabLeine}>
                    <th className={s.tableItem}>Name</th>
                    <th className={s.tableItem}>Cards</th>
                    <th className={s.tableItem}>
                        <ButtonFilterHeadTabl setDirection={onSortChange} direction={packsSort} />
                    </th>
                    <th className={s.tableItem}>
                        Created by
                    </th>
                    <th className={s.tableItem}>Actions</th>
                </tr>
            </thead>
        </>
    )
}

export default TableHead;