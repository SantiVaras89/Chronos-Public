import { Request, Response } from "express"
import { Company } from "../entities/Company"
import { logger } from '../utils/logger'
import boom from '@hapi/boom'

/**
 * 
 * Description: Crear los empleados
 * Method: POST
 * 
 **/

export const createCompany = async (req: Request, res: Response, next) => {

    try {

        const { name, alias } = req.body

        const company = new Company();
        company.name= name;
        company.alias= alias;

        await company.save();
        logger.info(`Company.controllers.ts (data-access) createUser - Request : ${JSON.stringify(req.body)}`) 
        return res.json(company);
     
    } catch (error) {

        if (error instanceof Error) {
            logger.error(`Company.controllers.ts (data-access) createUser - ${error} - Request :  ${JSON.stringify(req.body)}`) 
            next(error)
        }
    }


}

/**
 * 
 * Description: obtener todos los usuarios
 * Method: GET
 * 
 **/

export const getCompany = async (req: Request, res: Response, next) => {
    try {
        const company = await Company.find()

        if (!company || company.length === 0) {
            throw boom.notFound('No existen empleados disponibles')
        }

        logger.info(`company.controllers.ts (data-access) getCompany`) 
        return res.json(company)

    } catch (error) {

        if (error instanceof Error) {
            logger.error(`company.controllers.ts (data-access) getCompany - ${error}`) 
            next(error)
        }

    }

}

/**
 * 
 * Description: Obtener usuario por id 
 * Method: GET
 * 
 **/
export const getCompanyById = async (req:Request, res:Response, next) => {

    try {

        const {id} = req.params
        const company = await Company.findOne({
                 where: {id: parseInt(id)}
        })
        if (!Company) throw boom.badRequest('El empleado no existe')

        logger.info(`Company.controllers.ts (data-access) getCompanyById - Request : ${JSON.stringify(req.params)}`)
        return res.json(Company)
        
    } catch (error) {

        if (error instanceof Error) {
            logger.error(`Company.controllers.ts (data-access) getCompanyById - ${error} - Request : ${JSON.stringify(req.params)}`) 
            next(error)
        }
    }
}

/**
 * 
 * Description: Actualizar empleado por id 
 * Method: PUT
 * 
 **/

export const updateCompany = async (req: Request, res: Response, next) => {

    try {
        const { id } = req.params;

        const company = await Company.findOneBy({ id: parseInt(req.params.id) });

        if (!company) throw boom.badRequest('El usuario no existe')

        await Company.update({ id: parseInt(id) }, {
            name: req.body.name,
            alias: req.body.alias,
        })

        logger.info(`Company.controllers.ts (data-access) updateCompany - Request : ${JSON.stringify(req.body)}`) 
        return res.json(company);

    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Company.controllers.ts (data-access) updateCompany - ${error} - Request : ${JSON.stringify(req.body)}`) 
            next(error)
        }
    }

}

/**
 * 
 * Description: Eliminar empleado por id 
 * Method: PUT
 * 
 **/

export const deleteCompany = async (req: Request, res: Response, next) => {
    try {
        const { id } = req.params

        const result = await Company.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            throw boom.badRequest('El Empleado no existe')
        }

        logger.info(`Company.controllers.ts (data-access) deleteCompany - Request : ${JSON.stringify(req.params)}`)
        return res.sendStatus(204)
        
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Company.controllers.ts (data-access) deleteCompany - ${error} - Request : ${JSON.stringify(req.params)}`)
            next(error)
        }
    }

}