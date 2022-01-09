import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import { setIsLoading } from "../../../la-3-main/m-2-bll/appReducer"
import { authApi, ForgotParamsType } from "../../../la-3-main/m-3-dal/auth-api"

export const setNewPasswordTC = createAsyncThunk('paaword/setNewPassword', async (param:{password: string, token: string}, {dispatch, rejectWithValue, getState}) => {
    try {
        dispatch(setIsLoading({isLoading: true}))
        await authApi.setNewPassword({password: param.password, resetPasswordToken: param.token})
        dispatch(setPasswordSettedAC({passwordSetted: true}))
    }catch (error){
        //@ts-ignore
        dispatch(setPasswordRecoveryErrorAC({error: error.response.data.error}))
    }finally {
        dispatch(setIsLoading({isLoading:false}))
    }
})

export const sendRecoveryMailTC = createAsyncThunk('password/sendRecoveryMail', async (email: string, {dispatch, rejectWithValue}) => {
    const forgotData: ForgotParamsType ={
        email: email,
        from: "test-front-admin <lonely__wind@mail.ru>",
        message: `<div style="padding: 15px">
                    Password recovery link:
                    <a href='https://matumba125.github.io/learningApp/#/new-password/$token$'>Click Here</a>
                    </div>`
    }

    try {
        dispatch(setIsLoading({isLoading: true}))
        await authApi.forgot(forgotData)
        dispatch(setSendedAC({isSended: true}))
    }catch (error) {
        //@ts-ignore
        dispatch(setPasswordRecoveryErrorAC({error: error.response.data.error}))
    }finally{
        dispatch(setIsLoading({isLoading:false}))
    }
})

const slice = createSlice({
    name: 'password',
    initialState:{
        isSended: false,
        error: '',
        passwordSetted: false,
    },
     reducers:{
         setSendedAC(state, action: PayloadAction<{isSended: boolean}>){
             state.isSended = action.payload.isSended
         },
         setPasswordRecoveryErrorAC(state, action: PayloadAction<{error: string}>){
             state.error = action.payload.error
         },
         setPasswordSettedAC(state, action: PayloadAction<{passwordSetted: boolean}>){
             state.passwordSetted = action.payload.passwordSetted
         }
     }
})


export const passwordReducer = slice.reducer

export const {setSendedAC, setPasswordRecoveryErrorAC, setPasswordSettedAC} = slice.actions