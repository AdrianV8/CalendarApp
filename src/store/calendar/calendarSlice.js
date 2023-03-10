import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent =   {
    _id: new Date().getTime(),
    title: 'Evento',
    notes: 'comprar comida',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    user: {
        _id: '123',
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
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
    }
})
// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;