import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent =   {
    title: 'Evento',
    notes: 'comprar comida',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    user: {
        id: '123',
        name: 'Adrian'
      }
    }

export const calendarSlice = createSlice({
    name: 'calendarSlice',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null,
    },
    reducers: {
        showEvents: (state) => {
            state.events = tempEvent
        },
    }
})
// Action creators are generated for each case reducer function
export const { showEvents } = calendarSlice.actions;