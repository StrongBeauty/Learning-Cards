import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import { setIsLoading } from "../../../la-3-main/m-2-bll/appReducer"
import { AppStateType } from "../../../la-3-main/m-2-bll/store"
import { packsAPI } from "../p-3-dal/packsAPI"

export type CardPacksType ={
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: Date
    updated: Date
    user_name: string
    more_id: string
}

export type ControlsType = {
    packName: string | undefined
    min: number
    max: number
    sortPacks: 0 | 1
    page: number
    pageCount: number
    isPrivate: boolean
    totalPagesCount: number
}

type CardsPackInitialStateType ={
    cardPacks: CardPacksType[]
    controls: ControlsType
}

const initialState: CardsPackInitialStateType = {
    cardPacks: [],
    controls: {
        packName: undefined,
        min: 0,
        max: 100,
        sortPacks: 0,
        page: 1,
        pageCount: 10,
        isPrivate: false,
        totalPagesCount: 0
    }
}
///////////

export const getCardsPacksTC = createAsyncThunk('cardsPacks/getPacks', async (param, {dispatch, rejectWithValue, getState}) => {
    const state = getState() as AppStateType
    const controls = state.packs.controls
    const user_id = controls.isPrivate ? state.profile.userData._id : undefined
    try {
        dispatch(setIsLoading({isLoading: true}))
        const res = await packsAPI.getPack({controls: controls, user_id: user_id})
        dispatch(setTotalPagesCountAC({
            pageCount: res.data.pageCount,
            cardPacksTotalCount: res.data.cardPacksTotalCount
        }))
        return {cardPacks: res.data.cardPacks}
    }catch (error) {
        return rejectWithValue(error)
    }finally {
        dispatch(setIsLoading({isLoading:false}))
    }
})

export const deleteCardsPackTC = createAsyncThunk('cardsPacks/deletePack', async (packId: string, {dispatch, rejectWithValue}) => {
    try{
        dispatch(setIsLoading({isLoading: true}))
        await packsAPI.deletePack(packId)
        dispatch(getCardsPacksTC())
    }catch (error) {
        return rejectWithValue(error)
    }finally {
        dispatch(setIsLoading({isLoading:false}))
    }
})

export const updateCardsPackTC = createAsyncThunk('cardsPacks/updatePack', async (param:{packId: string, name?: string}, {dispatch, rejectWithValue})=>{
    try {
        dispatch(setIsLoading({isLoading: true}))
        await packsAPI.updatePack({cardsPack:{_id: param.packId, name: param.name}})
        dispatch(getCardsPacksTC())
    }catch (error) {
        return rejectWithValue(error)
    }finally {
        dispatch(setIsLoading({isLoading:false}))
    }
})

export const createCardsPackTC = createAsyncThunk('cardsPacks/createPack', async (param:{name: string, deckCover?: string}, {dispatch, rejectWithValue})=> {
    try {
        dispatch(setIsLoading({isLoading: true}))
        await packsAPI.createPack({cardsPack:{name: param.name}})
        dispatch(getCardsPacksTC())
    }catch (error) {
        return rejectWithValue(error)
    }finally {
        dispatch(setIsLoading({isLoading:false}))
    }
})

const slice = createSlice({
    name: 'cards-packs',
    initialState: initialState,
    reducers:{
        setPageAC(state, action:PayloadAction<{ page: number }>){
            if(state.controls.page !== action.payload.page)state.controls.page = action.payload.page
        },
        setMinMaxCardsAC(state, action:PayloadAction<{ min: number, max: number }>){
            state.controls.min = action.payload.min
            state.controls.max = action.payload.max
        },
        setPageCountAC(state, action:PayloadAction<{ pageCount: number }>){
            state.controls.pageCount = action.payload.pageCount
        },
        setPackNameAC(state, action:PayloadAction<{ packName: string }>){
            state.controls.packName = action.payload.packName
        },
        setSortPacksAC(state, action:PayloadAction<{ sortPacks: 0 | 1 }>){
            state.controls.sortPacks = action.payload.sortPacks
        },
        setIsPrivateAC(state, action:PayloadAction<{ isPrivate: boolean }>){
            state.controls.isPrivate = action.payload.isPrivate
        },
        setTotalPagesCountAC(state, action: PayloadAction<{pageCount: number, cardPacksTotalCount: number}>){
            state.controls.totalPagesCount = Math.ceil(action.payload.cardPacksTotalCount/action.payload.pageCount)
        }
    },
    extraReducers: builder =>{
        builder.addCase(getCardsPacksTC.fulfilled, (state, action)=>{
            state.cardPacks = action.payload.cardPacks
        })
    }
})

export const packsReducer = slice.reducer


export const {
    setIsPrivateAC,
    setMinMaxCardsAC,
    setPackNameAC,
    setPageAC,
    setPageCountAC,
    setSortPacksAC,
    setTotalPagesCountAC
} = slice.actions
