import { Router } from "express";
import { 
    createMainEntity, 
    getMainEntity, 
    updateMainEntity,
    deleteMainEntity,
    getMainEntityById,
    getEmployeeNoUser
} from "../controllers/employee.controllers";

const router = Router();
const mainEntity = "employee"

router.post(`/${mainEntity}`, createMainEntity);
router.get(`/${mainEntity}`, getMainEntity);
router.put(`/${mainEntity}/:id`, updateMainEntity);
router.delete(`/${mainEntity}/:id`, deleteMainEntity);
router.get(`/${mainEntity}/:id`, getMainEntityById);
router.get(`/${mainEntity}-nouser`, getEmployeeNoUser);

export default router