
export const getMessagesES = () => {
    const arrowRight = <i className="bi bi-caret-right-fill"></i>;
    const arrowLeft = <i className="bi bi-caret-left-fill"></i>;
    return {
        allDay: 'Todo el día',
        previous: arrowLeft,
        next: arrowRight,
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        noEventsInRange: 'No hay eventos en este rango',
        showMore: total => `+ Ver más (${total})`    
    };
};