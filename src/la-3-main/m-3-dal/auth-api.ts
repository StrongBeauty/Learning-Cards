import {instance} from "./api"


export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<UserDataType>(`/auth/login`, data)
    },

    register(data: RegisterParamsType) {
        return instance.post<RegisterResponseType>(`/auth/register`, data)
    },

    me() {
        return instance.post<UserDataType>(`/auth/me`)
    },

    update(data: UpdateParamsType) {
        return instance.put<UpdateProfileDataType>(`/auth/me`, data)
    },

    logout() {
        return instance.delete<InfoResponseType>(`/auth/me`)
    },

    forgot(data: ForgotParamsType) {
        return instance.post<InfoResponseType>(`/auth/forgot`, data)
    },

    setNewPassword(data: SetNewPasswordParamsType) {
        return instance.post<InfoResponseType>(`/auth/set-new-password`, data)
    },

}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type RegisterParamsType = {
    email: string
    password: string
}

export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод

    created?: Date
    updated?: Date
    isAdmin?: boolean
    verified?: boolean // подтвердил ли почту
    rememberMe?: boolean

}

export type UpdateProfileDataType ={
    token: string
    tokenDeathTime: number
    updatedUser: UserDataType
}

export type RegisterResponseType = {
    addedUser: {}
    error?: string
}

export type UpdateParamsType = {
    name: string
    avatar?: string
}

export type InfoResponseType = {
    info: string
    error: string
}

export type ForgotParamsType = {
    email: string
    from: string
    message: string
}

export type SetNewPasswordParamsType = {
    password: string
    resetPasswordToken: string
}
