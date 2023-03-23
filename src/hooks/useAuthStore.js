import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";


export const useAuthStore = () => {

    //? HOOKS / CUSTOM HOOKS
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {

        dispatch( onChecking() )

        try {
            
            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({name: data.name, uid: data.uid}) )
            
        } catch (error) {
            dispatch( onLogout( 'El usuario o la contraseña no son correctos.' ) );
            // Limpiar error en pantalla
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async({name, email, password}) => {
        console.log({name, email, password});
        dispatch( onChecking() )

        try {
            
            const { data } = await calendarApi.post('/auth/new', {name, email, password})
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({name: data.name, uid: data.uid}) )
            
        } catch (error) {
            console.log(error.response.data);
            dispatch( onLogout( error.response.data?.msg || Object.values(error.response.data.errors)[0].msg) );
            // Limpiar error en pantalla
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    return{

        //* Propiedades
        status,
        user,
        errorMessage,

        //* Métodos
        startLogin,
        startRegister
    }
}