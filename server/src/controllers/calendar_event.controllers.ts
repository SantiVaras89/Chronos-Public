import { Request, Response } from "express";
import { Calendar_Event } from "../entities/Calendar_Event";
import { getHolidays } from "../utils/holiday";
import { logger } from '../utils/logger'
import boom from '@hapi/boom'

const MainEntity = Calendar_Event;
const loggerName = "Evento Calendario";
const loggerNamePlural = "Evento Calendario";

/**
 * 
 * Description: Crear los Proyectos
 * Method: POST
 * 
 **/

export const createMainEntity= async (req: Request, res: Response, next) => {

    try {

        const { title, start, end, holiday } = req.body

        const entity = new MainEntity();
        entity.title= title,
        entity.start= start,
        entity.end= end,
        entity.holiday= holiday,


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
        const entity = await MainEntity.find({
            order:{
                start: "ASC"
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

export const getMainEntityByStart = async (req:Request, res:Response, next) => {

    try {

        const {date} = req.params
        const entity = await MainEntity.findOne({
                 where: {
                         start: date,
                         holiday: true,
                         }
        })
        if (!entity) res.send("FALSE")

        logger.info(`${loggerName}.controllers.ts (data-access) getMainEntityById - Request : ${JSON.stringify(req.params)}`)
        return res.send("TRUE")
        
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
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            holiday: req.body.holiday,
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

export const getCalendarHolidays = async (req: Request, res: Response, next) => {
    try {
        const entity = await MainEntity.find({
            where:{
                holiday: true
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

export const renewHolidays=async()=>{  
    const feriados = [{}];
    MainEntity.clear();
    await getHolidays().then(data => {
      const formattedResponse = data.items
        .map(({ summary, start, end }) => ({ summary, start, end }))
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      for(let i = 0; i < formattedResponse.length; i++){
        const entity = new MainEntity();
        entity.title= formattedResponse[i].summary,
        entity.start= formattedResponse[i].start.date,
        entity.holiday= true,
        entity.save();
      }
    });
  }