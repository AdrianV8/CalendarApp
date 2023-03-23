import { useForm } from '../../hooks/useForm';
import './LoginPage.css';

//? Campos de ambos formularios
const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
};
const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
};


export const LoginPage = () => {

    //? HOOKS / CUSTOM HOOKS
    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields );


    //? ENVIO DE FORMULARIOS
    const loginSubmit = ( event ) => {
        event.preventDefault();
    }
    const registerSubmit = ( event ) => {
        event.preventDefault();
        
    }

    return (
        <>
        <div className="container login-container body-background-login animate__animated animate__backInDown animate__fast ">
            <div className="row justify-content-between">
                <div className="col-md-5 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2 col-7 mx-auto ">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-5 login-form-2">
                    <h3>¿No tienes una cuenta?</h3>
                    <h4>Registrate</h4>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2 col-7 mx-auto">
                            <input 
                                type="submit" 
                                className="btn btnSubmit btn-primary" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        </>
        
    )
}
