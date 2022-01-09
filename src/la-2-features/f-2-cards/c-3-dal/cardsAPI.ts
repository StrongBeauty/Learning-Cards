import { instance } from "../../../la-3-main/m-3-dal/api"
import { CardsControlsType, CardType } from "../c-2-bll/cardsReducer"


export const cardsAPI = {

    getCard(data: GetCardsParamsType) {
        return instance.get<getCardDataType>(`/cards/card`,
            {
                params: {
                    cardQuestion: data.controls.cardQuestion,
                    cardAnswer: data.controls.cardAnswer,
                    page: data.controls.page,
                    sortCards: `${data.controls.sortCards}updated`,
                    pageCount: data.controls.pageCount,
                    cardsPack_id: data.cardsPack_id,
                }
            })
    },

    createCard(card: postCardParamsType) {
        return instance.post<{}>(`/cards/card`, {card})
    },

    deleteCard(id: string) {
        return instance.delete<{}>(`/cards/card`, {
            params: {
                id
            }
        })
    },

    editCard(card: putCardParamsType) {
        return instance.put<{}>(`/cards/card`, {card})
    },
    gradeCard(card: GradeCardParamsType) {
        return instance.put(`cards/grade`, card)
    }

}
export type GetCardsParamsType = {
    controls: CardsControlsType
    cardsPack_id: string
}


export type getCardParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type getCardDataType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type postCardParamsType = {

    cardsPack_id: string
    question: string
    answer: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string

}

export type putCardParamsType = {
    _id: string
    question?: string
    answer?: string
}

export type GradeCardParamsType = {
    grade: number
    card_id: string
}