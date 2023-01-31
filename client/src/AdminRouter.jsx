import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from "./admin/scenes/dashboard";
import Team from "./admin/scenes/team";
import Invoices from "./admin/scenes/invoices";
import Contacts from "./admin/scenes/contacts";
import Empleados from "./admin/scenes/employee";
import Asignaciones from "./admin/scenes/assignment";
import Eventos from "./admin/scenes/event";
import TipoEventos from "./admin/scenes/event_type"
import Proyectos from "./admin/scenes/project";
import Referentes from "./admin/scenes/client_referent"
import Clientes from "./admin/scenes/client";
import Bar from "./admin/scenes/bar";
import Usuarios from "./admin/scenes/user";
import Line from "./admin/scenes/line";
import Pie from "./admin/scenes/pie"
import FAQ from "./admin/scenes/faq";
import Geography from "./admin/scenes/geography";
import Calendar from "./admin/scenes/calendar/calendar";
import Password from './admin/scenes/password';



const AdminRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/asignaciones" element={<Asignaciones />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/tipo_eventos" element={<TipoEventos />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/referentes" element={<Referentes />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/line" element={<Line />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/geography" element={<Geography />} />
        <Route path="/cambiar_password" element={<Password />} />
    </Routes>
  )
}

export default AdminRouter