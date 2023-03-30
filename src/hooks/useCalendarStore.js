import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";

import { calendarApi } from "../api";

import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
  
    const { events, activeEvent } = useSelector( (state) => state.calendar)
    const { user } = useSelector( (state) => state.auth)

    //! ACTIVAR UN EVENTO
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    //! CREAR O ACTUALIZAR EVENTO
    const startSavingEvent = async(calendarEvent) => {

        try {

            if( calendarEvent.id ){
    
                // ? Actualizar
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent( {...calendarEvent, user} ))
                return;
    
            }
                // ? Crear
                const { data } = await calendarApi.post('/events', calendarEvent)
                console.log({data});
                dispatch(onAddNewEvent( {...calendarEvent, id: data.evento.id, user} ));    
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'error')
        }

    }
    
    //! BORRAR EVENTO
    const startDeleteEvent = () => {
        // TODO: Llegar al backend
        dispatch( onDeleteEvent() );
    }

    //! CARGA DE EVENTOS
    const startLoadingEvents = async( user ) => {
        try {

            const {data} = await calendarApi.get(`/events/${user.uid}`)
            console.log(data);
            const events = convertEventsToDateEvents(data.eventosUsuario)
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
