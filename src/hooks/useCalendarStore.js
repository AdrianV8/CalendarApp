import { useDispatch, useSelector } from "react-redux"

import { calendarApi } from "../api";

import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
  
    const { events, activeEvent } = useSelector( (state) => state.calendar)
    const { user } = useSelector( (state) => state.auth)

    //? ACTIVAR UN EVENTO
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    //? CREAR O ACTUALIZAR EVENTO
    const startSavingEvent = async(calendarEvent) => {

        // TODO: llegar al backend


        // Todo bien
        if( calendarEvent._id ){

            // ? Actualizar
            dispatch(onUpdateEvent( {...calendarEvent} ))

        }else{
            // ? Crear
            const { data } = await calendarApi.post('/events', calendarEvent)
            console.log({data});
            dispatch(onAddNewEvent( {...calendarEvent, id: data.evento.id, user} ));
        }

    }
    
    //? BORRAR EVENTO
    const startDeleteEvent = () => {
        // TODO: Llegar al backend
        dispatch( onDeleteEvent() );
    }

    //? CARGA DE EVENTOS
    const startLoadingEvents = async() => {
        try {

            const {data} = await calendarApi.get('/events')
            const events = convertEventsToDateEvents(data.eventos)
            dispatch( onLoadEvents(events) );
            
        } catch (error) {
            console.error(error);
        }
    }

    return {
        // * Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        // * Métodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }
}
