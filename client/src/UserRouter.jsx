import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from "./user/scenes/dashboard";
import Asignaciones from "./user/scenes/assignment";
import Eventos from "./user/scenes/event";
import Usuarios from "./user/scenes/user";
import Password from './user/scenes/password';



const UserRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mis_asignaciones" element={<Asignaciones />} />
        <Route path="/mis_afectaciones" element={<Eventos />} />
        <Route path="/cambiar_password" element={<Password />} />
        <Route path="/mis_datos" element={<Usuarios />} />
    </Routes>
  )
}

export default UserRouter