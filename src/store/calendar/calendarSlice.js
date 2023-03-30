import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

// const tempEvent =   {
//     id: new Date().getTime(),
//     title: 'Evento',
//     notes: 'comprar comida',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     user: {
//         id: '123',
//         name: 'Adrian'
//       }
// }

export const calendarSlice = createSlice({
    name: 'calendarSlice',
    initialState: {
        isLoadingEvents: true,
        events: [
            // tempEvent
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
                if(event.id === payload.id){
                    return payload;
                }

                return event;
            });
        },

        // Borrar evento
        onDeleteEvent: (state) => {

            if(state.activeEvent){
                // Regresar todos los eventos cuyo 'id' sea diferente a la nota activa
                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }

        },

        // Carga de eventos
        onLoadEvents: ( state, {payload = []} ) => {
            state.isLoadingEvents = false;
            state.events = payload
        } 

    }
})
// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent,onLoadEvents } = calendarSlice.actions;