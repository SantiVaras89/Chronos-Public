
import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { logger } from './logger'
import { User } from "../entities/User";
import boom from '@hapi/boom'

let loggerName= "Usuario"

export const changePassword = async (req: Request, res: Response, next) => {

    try {
        const { id } = req.params;

        const entity = await User.findOneBy({ id: parseInt(id) });

        if (!entity) throw boom.badRequest(`El ${loggerName} no existe`)

        await User.update({ id: parseInt(req.params.id) }, {
            password: req.body.password,
        })

        logger.info(`${loggerName}.controllers.ts (data-access) updateUser - Request : ${JSON.stringify(req.body)}`) 
        return res.json(entity);

    } catch (error) {
        if (error instanceof Error) {
            logger.error(`${loggerName}.controllers.ts (data-access) updateUser - ${error} - Request : ${JSON.stringify(req.body)}`) 
            next(error)
        }
    }

}