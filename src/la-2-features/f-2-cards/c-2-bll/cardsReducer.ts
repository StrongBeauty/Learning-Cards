import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import { setIsLoading } from "../../../la-3-main/m-2-bll/appReducer"
import { AppStateType } from "../../../la-3-main/m-2-bll/store"
import { cardsAPI } from "../c-3-dal/cardsAPI"

export type CardsControlsType = {
    cardQuestion?: string
    cardAnswer?: string
    sortCards: number
    page: number
    pageCount: number
    totalPagesCount: number
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    created: string
    updated: string
    more_id: string
    _id: string
}

type CardsInitialStateType = {
    cards: CardType[]
    controls: CardsControlsType
    packUserId: string
    currentPackId: string
    currentPackName: string
}

const initialState: CardsInitialStateType = {
    cards: [],
    controls: {
        sortCards: 0,
        page: 1,
        pageCount: 10,
        totalPagesCount: 0
    },
    packUserId: '',
    currentPackId:'',
    currentPackName: '',
}

export const getCards = createAsyncThunk('cards/getCards', async (cardsPack_id: string, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppStateType
    const controls = state.cards.controls
    try {
        dispatch(setIsLoading({isLoading: true}))
        const res = await cardsAPI.getCard({controls, cardsPack_id})
        return {cardsData: res.data}
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading({isLoading: false}))
    }
})
export const createCard = createAsyncThunk('cards/createCard', async (params:{question: string, answer: string}, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppStateType
    const cardsPack_id = state.cards.currentPackId
    try {
        dispatch(setIsLoading({isLoading: true}))
        await cardsAPI.createCard({cardsPack_id: cardsPack_id, answer: params.answer, question: params.question})
        dispatch(getCards(cardsPack_id))
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading({isLoading: false}))
    }
})
export const deleteCard = createAsyncThunk('cards/deleteCard', async (cardId: string, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppStateType
    const cardsPack_id = state.cards.currentPackId
    try {
        dispatch(setIsLoading({isLoading: true}))
        await cardsAPI.deleteCard(cardId)
        dispatch(getCards(cardsPack_id))
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading({isLoading: false}))
    }
})
export const editCard = createAsyncThunk('cards/editCard', async (params:{question: string, answer: string, cardId: string}, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppStateType
    const cardsPack_id = state.cards.currentPackId
    try {
        dispatch(setIsLoading({isLoading: true}))
        await cardsAPI.editCard({_id: params.cardId, answer: params.answer, question: params.question})
        dispatch(getCards(cardsPack_id))
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading({isLoading: false}))
    }
})
export const gradeCard = createAsyncThunk('cards/gradeCard', async (params:{grade: number, cardId: string}, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppStateType
    const cardsPack_id = state.cards.currentPackId
    try {
        dispatch(setIsLoading({isLoading: true}))
        await cardsAPI.gradeCard({grade: params.grade, card_id:params.cardId})
        dispatch(getCards(cardsPack_id))
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading({isLoading: false}))
    }
})



const slice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        setCurrentPackId(state, action: PayloadAction<{currentPackId: string}>){
            state.currentPackId = action.payload.currentPackId
        },
        setCurrentCardsPage(state, action: PayloadAction<{currentPage: number}>){
            state.controls.page = action.payload.currentPage
        },
        setCardsPageCount(state, action: PayloadAction<{pageCount: number}>){
            state.controls.pageCount = action.payload.pageCount
        },
        setCurrentPackName(state, action: PayloadAction<{currentPackName: string}>){
            state.currentPackName = action.payload.currentPackName
        },
        setSortCards(state, action: PayloadAction<{cardsSort: number}>){
            state.controls.sortCards = action.payload.cardsSort
        }
    },
    extraReducers: builder => {
        builder.addCase(getCards.fulfilled, (state, action) => {
            state.cards = action.payload.cardsData.cards
            state.packUserId = action.payload.cardsData.packUserId
            state.controls.totalPagesCount = Math.ceil(action.payload.cardsData.cardsTotalCount/state.controls.pageCount)
        })
    }
})

export const cardsReducer = slice.reducer

export const {setCurrentPackId, setCurrentCardsPage, setCardsPageCount, setCurrentPackName, setSortCards} =slice.actions