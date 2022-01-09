import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import { setIsLoading } from "../../../la-3-main/m-2-bll/appReducer"
import { authApi, UserDataType } from "../../../la-3-main/m-3-dal/auth-api"

export const updateProfileTC = createAsyncThunk('profile/updateProfile', async (param: { name: string, avatar: string | undefined }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    try {
        dispatch(setIsLoading({isLoading: true}))
        const res = await authApi.update({name: param.name, avatar: param.avatar})
        dispatch(setUserDataAC({userData: res.data.updatedUser}))
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading({isLoading: false}))
        dispatch(setProfileIsEditingAC({isEditing: false}))
    }
})


const initialState: ProfileReducerInitialStateType = {
    userData: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,

    },
    isEditing: false,
}

type ProfileReducerInitialStateType = {
    userData: UserDataType,
    isEditing: boolean
}

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUserDataAC(state, action: PayloadAction<{ userData: UserDataType }>) {
            state.userData = action.payload.userData
        },
        setProfileIsEditingAC(state, action: PayloadAction<{ isEditing: boolean }>) {
            state.isEditing = action.payload.isEditing
        },
    }
})


export const profileReducer = slice.reducer

export const {setUserDataAC, setProfileIsEditingAC} = slice.actions
