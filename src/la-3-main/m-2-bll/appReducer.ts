import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const slice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
        isCardAdding: false,
    },
    reducers:{
        setIsLoading(state, action: PayloadAction<{isLoading: boolean}>){
            state.isLoading = action.payload.isLoading
        },
        setIsCardAdding(state, action: PayloadAction<{isCardAdding: boolean}>){
            state.isCardAdding = action.payload.isCardAdding
        }
    }
})

export const appReducer = slice.reducer

export const {setIsLoading, setIsCardAdding} = slice.actions