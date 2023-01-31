import * as dotenv from 'dotenv';
import {DataSource} from 'typeorm';
import { Employee } from './entities/Employee';
import { Company } from './entities/Company';
import { User } from './entities/User';
import { Role } from './entities/Role';
import { Client } from './entities/Client';
import { Project } from './entities/Project';
import { Client_Referent } from './entities/Client_Referent';
import { Assignment } from './entities/Assignment';
import { Event_Type } from './entities/Event_Type';
import { Event } from './entities/Event';
import { Calendar_Event } from "./entities/Calendar_Event";

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST, 
    username: process.env.DB_USER, 
    password: process.env.DB_PASS,
    port: Number(process.env.PORT),
    database: process.env.DB_NAME,
    logging: true, 
    synchronize: true,
    entities: [
        Employee,
        Company,
        User,
        Role,
        Client,
        Project,
        Client_Referent,
        Assignment,
        Event_Type,
        Event,
        Calendar_Event
      ],
    
})