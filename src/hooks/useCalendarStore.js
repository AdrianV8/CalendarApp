import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
  
    const { events, activeEvent } = useSelector( (state) => state.calendar)
    const { user } = useSelector( (state) => state.auth)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

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
    const startDeleteEvent = () => {
        // TODO: Llegar al backend
        dispatch( onDeleteEvent() );
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
    }
}
