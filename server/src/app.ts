//configuración del servidor
import express from 'express';//modulo para crear un servidor
import cors from 'cors'; //módulo para conectar a otros servidores externos
import morgan from 'morgan'; //módulo para poder ver por consola
import employeeRoutes from './routes/employee.routes'
import companyRoutes from './routes/company.routes'
import userRoutes from './routes/user.routes'
import roleRoutes from './routes/role.routes'
import clientRoutes from './routes/client.routes'
import projectRoutes from './routes/project.routes'
import client_referentRoutes from './routes/client_referent.routes'
import assignmentRoutes from './routes/assignment.routes'
import event_typeRoutes from './routes/event_type.routes'
import eventRoutes from './routes/event.routes'
import holidayRoutes from './routes/holiday.routes'
import calendarRoutes from './routes/calendar_event.routes'
import dashboardRoutes from './routes/dashboard.routes'
import loginRoutes from './routes/login.routes'


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(employeeRoutes);
app.use(companyRoutes);
app.use(userRoutes);
app.use(roleRoutes);
app.use(clientRoutes);
app.use(projectRoutes);
app.use(client_referentRoutes);
app.use(assignmentRoutes);
app.use(event_typeRoutes);
app.use(eventRoutes);
app.use(holidayRoutes);
app.use(calendarRoutes);
app.use(dashboardRoutes);
app.use(loginRoutes);

export default app;