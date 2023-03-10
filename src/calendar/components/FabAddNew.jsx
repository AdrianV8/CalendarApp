import { addHours } from "date-fns";

import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        _id: "123",
        name: "Adrian",
      },
    });

    openDateModal();
  };

  return (
    <button className="btn btn-danger fab" onClick={handleClickNew}>
      <i className="fa fa-plus"></i>
    </button>
  );
};
