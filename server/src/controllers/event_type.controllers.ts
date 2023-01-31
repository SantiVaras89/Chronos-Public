import { Request, Response } from "express";
import { logger } from '../utils/logger'
import boom from '@hapi/boom'
import { Event_Type } from "../entities/Event_Type";


const MainEntity = Event_Type;
const loggerName = "Tipo de afectacion";
const loggerNamePlural = "Tipos de afectaciones";

/**
 * 
 * Description: Crear los Proyectos
 * Method: POST
 * 
 **/

export const createMainEntity= async (req: Request, res: Response, next) => {

    try {

        const { name, status } = req.body

        const entity = new MainEntity();
        entity.name= name,
        entity.status= status,


        await entity.save();
        logger.info(`${loggerName}.controllers.ts (data-access) createMainEntity - Request : ${JSON.stringify(req.body)}`) 
        return res.json(entity);
     
    } catch (error) {

        if (error instanceof Error) {
            logger.error(`${loggerName}.controllers.ts (data-access) createMainEntity - ${error} - Request :  ${JSON.stringify(req.body)}`) 
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
        const entity = await MainEntity.find()

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
            name: req.body.name,
            status: req.body.status,
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

export const getMainEntityActive = async (req: Request, res: Response, next) => {
    try {
        const entity = await MainEntity.find({
            where: {
                status: '1'
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