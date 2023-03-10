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
        // Activar nota
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        // Añadir nueva nota
        onAddNewEvent: (state, { payload }) => {
            state.events.push( payload );
            state.activeEvent = null;
            
        },
        // Actualizar evento del calendario
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map( event => {
                /**
                 * Si el 'id' del evento es el mismo que el que se manda
                 * a través del payload, regresaremos el payload (que seria el nuevo evento actualizado)
                 */
                if(event._id === payload._id){
                    return payload;
                }

                return event;
            });
        }

    }
})
// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } = calendarSlice.actions;