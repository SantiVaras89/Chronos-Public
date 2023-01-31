
import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { logger } from '../utils/logger'


export const getDashboardData = async (req: Request, res: Response, next) => {
  try {
      const query ='SELECT(SELECT COUNT(*) FROM   client) AS client_count, (SELECT COUNT(*) FROM   employee ) AS employee_count, (SELECT COUNT(*) FROM   project ) AS project_count  FROM dual'
      const data = await AppDataSource.query(query)
      return res.json(data)

  } catch (error) {

      if (error instanceof Error) {
          logger.error(`employee.controllers.ts (data-access) getEmployee - ${error}`) 
          next(error)
      }

  }

}

export const getUserDashboardData = async (req: Request, res: Response, next) => {
    try {
        const { id } = req.params
        const query =`SELECT(SELECT COUNT(*) FROM  assignment where employeeId = ${id}) AS assignment_count, (SELECT COUNT(*) FROM   employee ) AS employee_count, (SELECT COUNT(*) FROM   project ) AS project_count  FROM dual`
        const data = await AppDataSource.query(query)
        return res.json(data)
  
    } catch (error) {
  
        if (error instanceof Error) {
            logger.error(`employee.controllers.ts (data-access) getEmployee - ${error}`) 
            next(error)
        }
  
    }
  
  }