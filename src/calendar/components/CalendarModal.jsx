import { useState } from "react";
import { addHours } from "date-fns/esm";

import Modal from "react-modal";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

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

  // Cerrar modal
  const [isOpen, setIsOpen] = useState(localStorage.getItem("isOpen") || false);

  const onCloseModal = () => {
    localStorage.setItem("isOpen", false);
    setIsOpen(false);
  };

  const [formValues, setFormValues] = useState({
    title: "a",
    notes: "a",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

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



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            minDate={ formValues.start }
            className="form-control"
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
            className="form-control"
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
            className="form-control"
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
            className="form-control"
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
