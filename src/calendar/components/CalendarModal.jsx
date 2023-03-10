import { useEffect, useMemo, useState } from "react";
import { addHours } from "date-fns/esm";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from "react-modal";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { differenceInSeconds } from "date-fns";

import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale('es', es)

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {

  // ! ---- HOOKS & CUSTOM HOOKS ----
  
  const { isDateModalOpen, closeDateModal} = useUiStore();

  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formValues, setFormValues] = useState({
    title: "a",
    notes: "a",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {

    if( activeEvent !== null ){
      setFormValues( {...activeEvent} )
    }
    
  }, [activeEvent])
  
  // ? Colores validación campos del formulario
  const titleClass = useMemo(() => {
    if(!formSubmitted) return '';
    return ( formValues.title.length > 0 ) ? 'is-valid' : 'is-invalid';
  },[formValues.title, formSubmitted])

  const notaClass = useMemo(() => {
    if(!formSubmitted) return '';
    return ( formValues.notes.length > 0 ) ? 'is-valid' : 'is-invalid';
  },[formValues.notes, formSubmitted])
  
  const dateStartClass = useMemo(() => {
    if(!formSubmitted) return '';
    const dif = differenceInSeconds(formValues.end, formValues.start)
    return ( isNaN(dif) || dif <= 0 ) ? 'is-invalid' : 'is-valid';
  },[formValues.start, formSubmitted])

  const dateEndClass = useMemo(() => {
    if(!formSubmitted) return '';
    const dif = differenceInSeconds(formValues.end, formValues.start)
    return ( isNaN(dif) || dif <= 0 ) ? 'is-invalid' : 'is-valid';
  },[formValues.end, formSubmitted])


  // ! ---- FUNCIONES ADICIONALES ----
  
  const onInputChanged = ({target}) => {
    setFormValues({
        ...formValues,
        [target.name]: target.value
    })
  }

  const onDateChanged = (event, changing) => {
    setFormValues({
        ...formValues,
        [changing]: event
    })
  }

  const onSubmit = async(event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // Validaciones de formulario
    const difference = differenceInSeconds(formValues.end, formValues.start)

    if(isNaN(difference) || difference <= 0) {
        Swal.fire('Fechas incorrectas','Revisa las fechas introducidas', 'error')
        return;
    }
    
    if( formValues.title.length <= 0 ) return;

    // TODO:
    await startSavingEvent( formValues );
    closeDateModal();
    setFormSubmitted(false)

  }


  // ! ---- MODAL ----
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={ closeDateModal }
      style={customStyles}
      contentLabel="Example Modal"
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <h1>{ (formValues.title.length < 1) ? 'Nueva nota' : formValues.title }</h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            className={`form-control ${dateStartClass}`}
            selected={formValues.start}
            onChange={ (event) => onDateChanged(event, 'start') }
            dateFormat="Pp"
            showTimeSelect
            locale={"es"}
            timeCaption={"Hora"}
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={ formValues.start }
            className={`form-control ${dateEndClass}`}
            selected={formValues.end}
            onChange={ (event) => onDateChanged(event, 'end') }
            dateFormat="Pp"
            showTimeSelect
            locale={"es"}
            timeCaption={"Hora"}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className={`form-control ${notaClass}`}
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-danger btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
