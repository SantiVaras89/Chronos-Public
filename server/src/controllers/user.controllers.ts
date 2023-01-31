import { Request, Response } from "express";
import { User } from "../entities/User";
import { logger } from '../utils/logger'
import { AppDataSource } from "../db";
import { transporter } from "../utils/mailConfig";
import boom from '@hapi/boom'

const MainEntity = User;
const loggerName = "Usuario";
const loggerNamePlural = "Usuarios";

/**
 * 
 * Description: Crear los Proyectos
 * Method: POST
 * 
 **/

export const createMainEntity= async (req: Request, res: Response, next) => {

    
    try {

        const { login_name, password, status, roleId, employeeId} = req.body

        const user = new User();
        user.login_name= login_name;
        user.password= password;
        user.status= status;
        user.roleId= roleId;
        user.employeeId= employeeId;

        const query ='SELECT email FROM employee where id = '+employeeId
        const email = await AppDataSource.query(query)
 
        logger.info(email)

        if (!email || email.length === 0) {
            throw boom.notFound('No existen empleados disponibles')
        }

        const mailData = {
            from: process.env.MAIL_USER,  // sender address
            to: JSON.stringify(email[0].email),   // list of receivers
            subject: 'Alta sistema Chronos',
            html: `<b>Bienvenido! </b> <br/> <br> Fuiste dado de alta el Chronos, el nuevo sistema de gestión de empleados de FyS.<br/> <br> Tu nombre de usuario es: ${login_name}<br/> <br> Tu Contraseña es: ${password}<br/>`,
        };
        
        transporter.sendMail(mailData, (error, info) =>{
            if(error){
                return logger.info(error);
            }
            res.status(200).send( {message: "Mail send", message_id: info.message_id});
        });
        

        await user.save();
        logger.info(`User.controllers.ts (data-access) createUser - Request : ${JSON.stringify(req.body)}`) 
        return res.json(user);
     
    } catch (error) {

        if (error instanceof Error) {
            logger.error(`User.controllers.ts (data-access) createUser - ${error} - Request :  ${JSON.stringify(req.body)}`) 
            next(error)
        }
    }


}

/**
 * 
 * Description: obtener todos los MainEntityes
 * Method: GET
 * 
 **/

export const getMainEntity = async (req: Request, res: Response, next) => {
    try {
        const entity = await MainEntity.find({
            relations: { 
                employee: true,
                role: true,
            }
        })

        if (!entity || entity.length === 0) {
            throw boom.notFound(`No existen ${loggerNamePlural} disponibles`)
        }

        logger.info(`${loggerName}.controllers.ts (data-access) getMainEntity`) 
        return res.json(entity)

    } catch (error) {

        if (error instanceof Error) {
            logger.error(`${loggerName}.controllers.ts (data-access) getMainEntity - ${error}`) 
            next(error)
        }

    }

}

/**
 * 
 * Description: Obtener MainEntitye por id 
 * Method: GET
 * 
 **/
export const getMainEntityById = async (req:Request, res:Response, next) => {

    try {

        const {id} = req.params
        const entity = await MainEntity.findOne({
                 where: {id: parseInt(id)}
        })
        if (!entity) throw boom.badRequest(`El ${loggerName} no existe`)

        logger.info(`${loggerName}.controllers.ts (data-access) getMainEntityById - Request : ${JSON.stringify(req.params)}`)
        return res.json(entity)
        
    } catch (error) {

        if (error instanceof Error) {
            logger.error(`${loggerName}.controllers.ts (data-access) getMainEntityById - ${error} - Request : ${JSON.stringify(req.params)}`) 
            next(error)
        }
    }
}

/**
 * 
 * Description: Obtener MainEntitye por id 
 * Method: GET
 * 
 **/
export const getMainEntityByEmployee = async (req:Request, res:Response, next) => {

    try {

        const {id} = req.params
        const entity = await MainEntity.find({
                 relations:{employee: true},
                 where: {employeeId: parseInt(id)}
        })
        if (!entity) throw boom.badRequest(`El ${loggerName} no existe`)

        logger.info(`${loggerName}.controllers.ts (data-access) getMainEntityById - Request : ${JSON.stringify(req.params)}`)
        return res.json(entity)
        
    } catch (error) {

        if (error instanceof Error) {
            logger.error(`${loggerName}.controllers.ts (data-access) getMainEntityById - ${error} - Request : ${JSON.stringify(req.params)}`) 
            next(error)
        }
    }
}

/**
 * 
 * Description: Actualizar rol por id 
 * Method: PUT
 * 
 **/

export const updateMainEntity = async (req: Request, res: Response, next) => {

    try {
        const { id } = req.params;

        const entity = await MainEntity.findOneBy({ id: parseInt(req.params.id) });

        if (!entity) throw boom.badRequest(`El ${loggerName} no existe`)

        await MainEntity.update({ id: parseInt(id) }, {
            login_name: req.body.login_name ,
            password: req.body.password,
            status: req.body.status,
            roleId: req.body.roleId,
            employeeId: req.body.employeeId
        })

        logger.info(`${loggerName}.controllers.ts (data-access) updateMainEntity - Request : ${JSON.stringify(req.body)}`) 
        return res.json(MainEntity);

    } catch (error) {
        if (error instanceof Error) {
            logger.error(`${loggerName}.controllers.ts (data-access) updateMainEntity - ${error} - Request : ${JSON.stringify(req.body)}`) 
            next(error)
        }
    }

}

/**
 * 
 * Description: Eliminar rol por id 
 * Method: PUT
 * 
 **/

export const deleteMainEntity = async (req: Request, res: Response, next) => {
    try {
        const { id } = req.params

        const result = await MainEntity.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            throw boom.badRequest(`El ${loggerName} no existe`)
        }

        logger.info(`${loggerName}.controllers.ts (data-access) deleteMainEntity - Request : ${JSON.stringify(req.params)}`)
        return res.sendStatus(204)
        
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`${loggerName}.controllers.ts (data-access) deleteMainEntity - ${error} - Request : ${JSON.stringify(req.params)}`)
            next(error)
        }
    }

}