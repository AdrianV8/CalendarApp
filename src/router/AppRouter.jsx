import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {

    const authStatus = 'not-authenticated'; // ''authenticated 'not-authenticated'

  return (
    <Routes>
        {
            (authStatus === 'not-authenticated')
            ? <Route path="/auth/*" element={<LoginPage/>} />
            : <Route path="/*" element={<CalendarPage/>} />
        }

        {/* Fake Save para evitar que el usuario llegue a una ruta que no exista */}
        <Route path="/*" element={<Navigate to={"/auth/login"}/>} />
    </Routes>
  )
}
