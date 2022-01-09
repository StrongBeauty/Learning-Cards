import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk"
import {configureStore} from "@reduxjs/toolkit";
import { cardsReducer } from "../../la-2-features/f-2-cards/c-2-bll/cardsReducer";
import { packsReducer } from "../../la-2-features/f-1-packs/p-2-bll/packsReducer";
import { loginizationReducer } from "../../la-2-features/f-3-loginization/l-2-bll/loginizationReducer";
import { profileReducer } from "../../la-2-features/f-3-profile/p-2-bll/profileReducer";
import { registrationReducer } from "../../la-2-features/f-4-registrartion/r-2-bll/registrationReducer";
import { appReducer } from "./appReducer";
import { passwordReducer } from "../../la-2-features/f-5-password/p-2-bll/passwordReducer";


export const rootReducer = combineReducers({
    password: passwordReducer,
    loginization: loginizationReducer,
    profile: profileReducer,
    registration: registrationReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().prepend(thunkMiddleware),
})

export type AppStateType = ReturnType<typeof rootReducer>

export default store