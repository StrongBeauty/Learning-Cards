import {createAsyncThunk} from "@reduxjs/toolkit"
import {setIsLoading} from "./appReducer"
import { authApi } from "../m-3-dal/auth-api"
import { setLoggedAC } from "../../la-2-features/f-3-loginization/l-2-bll/loginizationReducer"
import { setUserDataAC } from "../../la-2-features/f-3-profile/p-2-bll/profileReducer"

export const authMeTC = createAsyncThunk('auth/authMe', async (param, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setIsLoading({isLoading: true}))
        const res = await authApi.me()
        dispatch(setLoggedAC({isLoggedIn: true}))
        dispatch(setUserDataAC({userData: res.data}))
    } catch (error) {
        dispatch(setLoggedAC({isLoggedIn: false}))
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading({isLoading:false}))
    }
})
