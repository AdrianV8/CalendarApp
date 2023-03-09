import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { Navbar, CalendarEventBox, CalendarModal } from "../";
import { localizer, getMessagesES } from '../../helpers';



const events = [{
  title: 'Evento',
  notes: 'comprar comida',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  user: {
    id: '123',
    name: 'Adrian'
  }
}]

export const CalendarPage = () => {
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

  const onDoubleClick = (event) => {
    console.log({doubleClick: event});
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
