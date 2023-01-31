import express from 'express';
import cors from "cors";
import * as dotenv from 'dotenv';
import application from './app';
import { AppDataSource } from './db';

const app = express();
dotenv.config();
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.set('port', process.env.PORT || 9000)

// routes -------------------------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})

async function main() {
    try {
        try {
            await AppDataSource.initialize();
        }
        catch (e) {
            console.error('No se pudo conectar a la base de datos');
            console.log(e);
            process.exit(1);
        }
        console.log('Nos conectamos correctamente a la db');
        app.listen(app.get('port'), ()=>{
            app.use(application)
            console.log('server running on port', app.get('port'))
        })
    }
    catch (error) {
        console.log(error);
    }
}
main();