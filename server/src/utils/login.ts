
import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { logger } from './logger'
import { User } from "../entities/User";


export const getLoginCredentials = async (req:Request, res:Response, next) => {

    try {

        const { login_name, password } = req.body
        const user = await User.find({
                 where: {
                         login_name: login_name,
                         password: password,
                         status: "1"
                         }
        })
        if (!user) res.send("FALSE")

        return res.json(user);
        
    } catch (error) {

        if (error instanceof Error) {
            logger.error(``) 
            next(error)
        }
    }
}