import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";


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
            // ? Actializar
            dispatch(onUpdateEvent( {...calendarEvent} ))

        }else{
            // ? Crear
            dispatch(onAddNewEvent( {...calendarEvent, _id: new Date().getTime()} ));
        }

    }

    return {
        // * Propiedades
        activeEvent,
        events,

        // * Métodos
        setActiveEvent,
        startSavingEvent,
    }
}
