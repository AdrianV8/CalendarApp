import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        // Al abrir el modal
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true
        },
        // Cerrar modal
        onOpenDateModal: (state) => {
            state.isDateModalOpen = false
        },
    }
})
// Action creators are generated for each case reducer function
export const { onOpenDateModal } = uiSlice.actions;