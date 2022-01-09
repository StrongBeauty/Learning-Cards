import { instance } from "../../../la-3-main/m-3-dal/api"
import {CardPacksType, ControlsType } from "../p-2-bll/packsReducer"



export const packsAPI = {
    getPack(data: GetPacksParamsType) {
        return instance.get<cardsPackDataType>(`/cards/pack`,
            {
                params: {
                    packName: data.controls.packName,
                    min: data.controls.min,
                    max: data.controls.max,
                    sortPacks: `${data.controls.sortPacks}updated`,
                    page: data.controls.page,
                    pageCount: data.controls.pageCount,
                    user_id: data.user_id ? data.user_id : '',
                }
            }
        )
    },

    createPack(data: postPackParamsType) {
        return instance.post<{}>(`/cards/pack`, data)
    },

    deletePack(packId: string) {
        return instance.delete<{}>(`/cards/pack`, {
            params: {
                id: packId
            }
        })
    },

    updatePack(data: putPackParamsType) {
        return instance.put<{}>(`/cards/pack`, data)
    },
}


export type cardsPackDataType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type GetPacksParamsType = {
    controls: ControlsType
    user_id: string | undefined
}

export type postPackParamsType = {
    cardsPack: {
        name: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}


export type putPackParamsType = {
    cardsPack: {
        _id: string
        name?: string
    }
}
