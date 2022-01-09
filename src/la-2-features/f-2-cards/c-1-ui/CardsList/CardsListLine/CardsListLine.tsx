import React, {MouseEvent, useState} from "react";
import s from './CardsListLine.module.css';
import ModalDeleteCard from "../../CardsModals/modalDeleteCard/ModalDeleteCard";
import ModalEditCard from "../../CardsModals/modalEditCard/ModalEditCard";
import { HoverRating } from "../../../../../la-1-common/rating/Rating";
import ButtonFormColor from "../../../../../la-1-common/buttonFormColor/ButtonFormColor";
import { CardType } from "../../../c-2-bll/cardsReducer";

type ListCardTableLeinePropsType = {
    card: CardType
    isPackBelongsToUser: boolean
}

const CardsListLine: React.FC<ListCardTableLeinePropsType> = props => {

    const {
        card,
        isPackBelongsToUser,
    } = props

    const newDate = new Intl.DateTimeFormat().format(new Date(card.created))

    const [deleteCard, setDeleteCard] = useState<boolean>(false)
    const [editCard, setEditCard] = useState<boolean>(false)

    const onDeleteClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setDeleteCard(true)
    }
    const onEditClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setEditCard(true)
    }

    return (
        <>
            <ModalDeleteCard open={deleteCard} setClose={setDeleteCard} cardId={card._id} />
            <ModalEditCard open={editCard} setOpen={setEditCard} cardId={card._id} question={card.question} answer={card.answer} />
            <tr className={s.tableLeine}>
                <td className={s.tableItem}>{card.question}</td>
                <td className={s.tableItem}>{card.answer}</td>
                <td className={s.tableItem}>{newDate}</td>
                <td className={s.tableItem}><HoverRating grade={card.grade}/></td>
                {isPackBelongsToUser ?
                    <td className={s.tableItem}>
                        <div className={s.tableButtonsblock}>
                            <div className={s.buttonContainer}>
                                <ButtonFormColor text={'Delete'} onClick={onDeleteClickHandler}/>
                            </div>
                            <div className={s.buttonContainer}>
                                <ButtonFormColor text={'Edit'} onClick={onEditClickHandler}/>
                            </div>
                        </div>
                    </td>
                    :<></>
                }
            </tr>
        </>

    )
}

export default CardsListLine