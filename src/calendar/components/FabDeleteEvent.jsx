import { useCalendarStore } from "../../hooks";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'

export const FabDeleteEvent = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeleteEvent();
    Swal.fire('Evento borrado','El evento se ha eliminado de tu calendario', 'success')
  }

  return (
    <button 
        className="btn btn-danger fab-danger" 
        onClick={handleDelete}
        style={{ display: hasEventSelected ? '' : 'none'}}
    >
      <i className="fa fa-trash-alt"></i>
    </button>
  );
};
