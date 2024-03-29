import { useState, useEffect } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';

import { Navbar, CalendarEventBox, CalendarModal, FabAddNew, FabDeleteEvent } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';


export const CalendarPage = () => {
  
  // ! ---- HOOKS ----
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, activeEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  const { user } = useSelector( (state) => state.auth)

  // Hacer Hook de eventStyleGetter
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#FF0303',
      borderRadius: '3px',
      opacity: 0.8,
      color: 'white'
    }
    return{
      style
    }
  }

  // ! ---- FUNCIONES ADICIONALES ----

  const onDoubleClick = (event) => {
    openDateModal();
  } 
  const onSelect = (event) => {
    setActiveEvent(event);
    console.log({events, activeEvent});
  } 
  // Muestra si se ha cambiado de vista a dia, semana, mes o agenda
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event)
  }

  //* Carga de eventos BD
  useEffect(() => {
    startLoadingEvents( user );  
  }, [])
  
  
  return (
    <>
      <Navbar/>
        
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent = { onDoubleClick }
        onSelectEvent = { onSelect }
        onView = { onViewChanged }
        defaultView={ lastView }
      />

      <CalendarModal/>

      <FabAddNew/>

      <FabDeleteEvent/>

    </>
  )
}
