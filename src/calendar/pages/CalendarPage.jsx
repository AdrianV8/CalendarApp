import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { Navbar, CalendarEventBox, CalendarModal } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {
  
  // ! ---- HOOKS ----
  const { events } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

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
    console.log({click: event});
  } 
  // Muestra si se ha cambiado de vista a dia, semana, mes o agenda
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event)
  } 
    
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

    </>
  )
}
