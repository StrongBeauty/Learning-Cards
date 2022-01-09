import { CardPacksType } from "../../la-2-features/f-1-packs/p-2-bll/packsReducer"
import { CardType } from "../../la-2-features/f-2-cards/c-2-bll/cardsReducer"
import { AppStateType } from "./store"


//// Registration Selectors

export const getRegistrationError = (state: AppStateType): string => {
    return state.registration.error
}
export const getRegistrationStatus = (state: AppStateType): boolean => {
    return state.registration.registered
}

//// App Selectors

export const getIsLoading = (state: AppStateType): boolean => {
    return state.app.isLoading
}
export const getIsCardAdding = (state: AppStateType): boolean => {
    return state.app.isCardAdding
}

//// Login Page Selectors

export const getIsLoggedIn = (state: AppStateType): boolean => {
    return state.loginization.isLoggedIn
}

export const getLoginError = (state: AppStateType): string => {
    return state.loginization.error
}

//// Password Recovery Selectors

export const getIsSended = (state: AppStateType): boolean => {
    return state.password.isSended
}

export const getPasswordRecoveryError = (state: AppStateType): string => {
    return state.password.error
}

export const getPasswordSetted = (state: AppStateType): boolean => {
    return state.password.passwordSetted
}

//// Profile Page Selectors

export const getIsProfileEditing = (state: AppStateType): boolean => {
    return state.profile.isEditing
}

export const getUserName = (state: AppStateType): string => {
    return state.profile.userData.name
}

export const getUserAvatar = (state: AppStateType): string | undefined => {
    return state.profile.userData.avatar
}
export const getCurrentUserId = (state: AppStateType): string => {
    return state.profile.userData._id
}

//// Card Packs Selectors

export const getCardPacks = (state: AppStateType): CardPacksType[] => {
    return state.packs.cardPacks
}

export const getPacksPage = (state: AppStateType): number => {
    return state.packs.controls.page
}

export const getTotalPagesCount = (state: AppStateType): number => {
    return state.packs.controls.totalPagesCount
}

export const getPageCount = (state: AppStateType): number => {
    return state.packs.controls.pageCount
}

export const getMinCardsCount = (state: AppStateType): number => {
    return state.packs.controls.min
}

export const getMaxCardsCount = (state: AppStateType): number => {
    return state.packs.controls.max
}

export const getIsPrivate = (state: AppStateType): boolean => {
    return state.packs.controls.isPrivate
}
export const getSortPacks = (state: AppStateType): 0 | 1 => {
    return state.packs.controls.sortPacks
}

//// Cards Selectors

export const getCardsSelector = (state: AppStateType): CardType[] =>{
    return state.cards.cards
}
export const getPackUserId = (state: AppStateType): string =>{
    return state.cards.packUserId
}
export const getCurrentPackId = (state: AppStateType): string =>{
    return state.cards.currentPackId
}
export const getCurrentPackName = (state: AppStateType): string =>{
    return state.cards.currentPackName
}
export const getCardsPage = (state: AppStateType): number => {
    return state.cards.controls.page
}
export const getCardsPageCount = (state: AppStateType): number => {
    return state.cards.controls.pageCount
}
export const getTotalCardsPages = (state: AppStateType): number => {
    return state.cards.controls.totalPagesCount
}
export const getCardsSort = (state: AppStateType): number => {
    return state.cards.controls.sortCards
}