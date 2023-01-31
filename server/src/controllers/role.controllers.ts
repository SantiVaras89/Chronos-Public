import { Request, Response } from "express";
import { Role } from "../entities/Role"
import { logger } from '../utils/logger'
import boom from '@hapi/boom'

/**
 * 
 * Description: Crear los roles
 * Method: POST
 * 
 **/

export const createRole = async (req: Request, res: Response, next) => {

    try {

        const { name } = req.body

        const role = new Role();
        role.role= name;

        await role.save();
        logger.info(`Role.controllers.ts (data-access) createRole - Request : ${JSON.stringify(req.body)}`) 
        return res.json(Role);
     
    } catch (error) {

        if (error instanceof Error) {
            logger.error(`Role.controllers.ts (data-access) createRole - ${error} - Request :  ${JSON.stringify(req.body)}`) 
            next(error)
        }
    }


}

/**
 * 
 * Description: obtener todos los roles
 * Method: GET
 * 
 **/

export const getRole = async (req: Request, res: Response, next) => {
    try {
        const role = await Role.find()

        if (!role || role.length === 0) {
            throw boom.notFound('No existen roles disponibles')
        }

        logger.info(`Role.controllers.ts (data-access) getRole`) 
        return res.json(role)

    } catch (error) {

        if (error instanceof Error) {
            logger.error(`Role.controllers.ts (data-access) getRole - ${error}`) 
            next(error)
        }

    }

}

/**
 * 
 * Description: Obtener rol por id 
 * Method: GET
 * 
 **/
export const getRoleById = async (req:Request, res:Response, next) => {

    try {

        const {id} = req.params
        const role = await Role.findOne({
                 where: {id: parseInt(id)}
        })
        if (!Role) throw boom.badRequest('El rol no existe')

        logger.info(`Role.controllers.ts (data-access) getRoleById - Request : ${JSON.stringify(req.params)}`)
        return res.json(Role)
        
    } catch (error) {

        if (error instanceof Error) {
            logger.error(`Role.controllers.ts (data-access) getRoleById - ${error} - Request : ${JSON.stringify(req.params)}`) 
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

export const updateRole = async (req: Request, res: Response, next) => {

    try {
        const { id } = req.params;

        const role = await Role.findOneBy({ id: parseInt(req.params.id) });

        if (!role) throw boom.badRequest('El rol no existe')

        await Role.update({ id: parseInt(id) }, {
            role: req.body.name
        })

        logger.info(`Role.controllers.ts (data-access) updateRole - Request : ${JSON.stringify(req.body)}`) 
        return res.json(Role);

    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Role.controllers.ts (data-access) updateRole - ${error} - Request : ${JSON.stringify(req.body)}`) 
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

export const deleteRole = async (req: Request, res: Response, next) => {
    try {
        const { id } = req.params

        const result = await Role.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            throw boom.badRequest('El rol no existe')
        }

        logger.info(`Role.controllers.ts (data-access) deleteRole - Request : ${JSON.stringify(req.params)}`)
        return res.sendStatus(204)
        
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Role.controllers.ts (data-access) deleteRole - ${error} - Request : ${JSON.stringify(req.params)}`)
            next(error)
        }
    }

}