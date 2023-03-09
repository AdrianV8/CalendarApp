import { Calendar, dateFnsLocalizer  } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { Navbar } from "../";
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

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    console.log(event, start, end, isSelected);
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
      />
    </>
  )
}
