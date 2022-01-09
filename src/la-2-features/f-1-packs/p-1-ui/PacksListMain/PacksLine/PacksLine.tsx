import React, {MouseEvent, useState} from "react";
import s from './PacksLine.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ModalDeletePack from "../../PackModals/modalDeletePack/ModalDeletePack";
import ModalEditPack from "../../PackModals/modalEditPack/ModalEditPack";
import ButtonFormColor from "../../../../../la-1-common/buttonFormColor/ButtonFormColor";
import {getCards, setCurrentPackId, setCurrentPackName } from "../../../../../la-2-features/f-2-cards/c-2-bll/cardsReducer";
import { PATH } from "../../../../../la-3-main/m-1-ui/u-2-routing/Routing";
import { getCurrentUserId } from "../../../../../la-3-main/m-2-bll/selectots";


type TableLinePropsType = {
    packName: string
    cardsCount: number
    updated: Date
    userName: string
    _id: string
    user_id: string
}

const PacksLine: React.FC<TableLinePropsType> = props => {

    const {
        packName,
        cardsCount,
        updated,
        userName,
        _id,
        user_id,
    } = props

    const dispatch = useDispatch()

    const currentUserId = useSelector(getCurrentUserId)

    const[deleting, setDeleting] = useState<boolean>(false)
    const[packEditing, setPackEditing] = useState<boolean>(false)

    const onDeleteButtonClickHandler = (e:MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        setDeleting(true)
    }

    const onEditButtonClickHandler = (e:MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setPackEditing(!packEditing)
    }
    const onLinkClickHandler = ()=>{
        dispatch(setCurrentPackId({currentPackId: _id}))
        dispatch(setCurrentPackName({currentPackName:packName}))
    }

    const onLearnClickHandler = () =>{
        dispatch(setCurrentPackId({currentPackId: _id}))
        dispatch(getCards(_id))
        dispatch(setCurrentPackName({currentPackName:packName}))
    }

    const isPacksBelogsToUser = user_id === currentUserId

    const newDate = new Intl.DateTimeFormat().format(new Date(updated))

    return (
        <>
            <ModalDeletePack packName={packName} setClose={setDeleting} packId={_id} open={deleting}/>
            <ModalEditPack packName={packName} packId={_id} open={packEditing} setClose={setPackEditing}/>
            <tr className={s.tableLeine}>
                <td className={s.tableItem}><Link to={PATH.CARDS} onClick={onLinkClickHandler}>{packName}</Link></td>
                <td className={s.tableItem}>{cardsCount}</td>
                <td className={s.tableItem}>{newDate}</td>
                <td className={s.tableItem}>{userName}</td>
                <td className={s.tableItem}>
                    <div className={s.tableButtonsblock}>
                        <>
                            <div className={s.buttonContainer}>
                                {isPacksBelogsToUser && <ButtonFormColor text={'Delete'} onClick={onDeleteButtonClickHandler}/>}
                            </div>
                            <div className={s.buttonContainer}>
                                {isPacksBelogsToUser && <ButtonFormColor text={'Edit'} onClick={onEditButtonClickHandler}/>}
                            </div>
                        </>
                        <div className={s.buttonContainer}>
                            <Link to={PATH.LEARN_QUESTION}><ButtonFormColor text={'Learn'} onClick={onLearnClickHandler}/></Link>
                        </div>

                    </div>
                </td>
            </tr>
        </>
    )
}

export default PacksLine;