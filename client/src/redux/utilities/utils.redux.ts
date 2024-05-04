import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface InitialUtilitiesProps {
    isMenuOpen: boolean
}

const initialState: InitialUtilitiesProps = {
    isMenuOpen: false
}

const setUtilites = createSlice({
    name: "utilities",
    initialState,
    reducers: {
        setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isMenuOpen = action.payload
        }
    }
})

export const { setIsMenuOpen } = setUtilites.actions

export default setUtilites.reducer;