import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import { setIsLoading } from "../../../la-3-main/m-2-bll/appReducer"
import { authApi, LoginParamsType } from "../../../la-3-main/m-3-dal/auth-api"
import { setUserDataAC } from "../../f-3-profile/p-2-bll/profileReducer"


export const logOutTC = createAsyncThunk('login/logOut', async (param, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setIsLoading({isLoading: true}))
        await authApi.logout()
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading({isLoading:false}))
        dispatch(setLoggedAC({isLoggedIn: false}))
    }
})

export const loginTC = createAsyncThunk('login/logIn', async (data: LoginParamsType, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setIsLoading({isLoading: true}))
        const res = await authApi.login(data)
        dispatch(setLoggedAC({isLoggedIn: true}))
        dispatch(setUserDataAC({userData: res.data}))
    } catch (error) {
        //@ts-ignore
        dispatch(setLoginErrorAC({error: error.response.data.error}))
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading({isLoading:false}))
    }
})

const slice = createSlice({
    name: 'loginization',
    initialState: {
        isLoggedIn: false,
        error: '',
    },
    reducers:{
        setLoginErrorAC(state, action: PayloadAction<{error: string}>){
           state.error = action.payload.error
        },
        setLoggedAC(state, action: PayloadAction<{isLoggedIn: boolean}>){
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },

})
export const loginizationReducer = slice.reducer

export const {setLoggedAC, setLoginErrorAC} = slice.actions