import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
  
    const { events, activeEvent } = useSelector( (state) => state.calendar)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = (calendarEvent) => {
        // TODO: llegar al backend

        // Todo bien
        if( calendarEvent._id ){
            // ? Actualizar
            dispatch(onUpdateEvent( {...calendarEvent} ))

        }else{
            // ? Crear
            dispatch(onAddNewEvent( {...calendarEvent, _id: new Date().getTime()} ));
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
