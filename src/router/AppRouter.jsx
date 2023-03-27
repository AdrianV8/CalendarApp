import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { LoadPage } from "../calendar/components/LoadPage";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {

  const authStatus = 'not-authenticated'; // ''authenticated 'not-authenticated'

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])
      
  if(status === 'checking'){
    return ( <LoadPage/>);
  }


  return (
    <Routes>
        {
            (status === 'not-authenticated')
            ? (
              <>
                <Route path="/auth/*" element={<LoginPage/>} />
                {/* Fake Save para evitar que el usuario llegue a una ruta que no exista */}
                <Route path="/*" element={<Navigate to={"/auth/login"}/>} />
              </>
                
            )
            : (
              <>
                <Route path="/" element={<CalendarPage/>} />
                <Route path="/*" element={<Navigate to={"/"}/>} />
              </>
            )
        }
    </Routes>
  )
}
