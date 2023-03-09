
export const Navbar = () => {

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            &nbsp;
            Usuario
            <i className="bi bi-arrow-right-circle-fill"></i>
        </span>
        <button className="btn btn-outline-danger">
            <i className="fas fa-sign-out-alt" ></i>
            &nbsp;
            <span>
                Salir
            </span>
        </button>
    </div>
  )
}
