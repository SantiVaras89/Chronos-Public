import { Router } from "express";
import { 
    createMainEntity, 
    getMainEntity, 
    updateMainEntity,
    deleteMainEntity,
    getMainEntityById,
    getMainEntityByEmployee
} from "../controllers/user.controllers";

const router = Router();
const mainEntity = "user"

router.post(`/${mainEntity}`, createMainEntity);
router.get(`/${mainEntity}`, getMainEntity);
router.put(`/${mainEntity}/:id`, updateMainEntity);
router.delete(`/${mainEntity}/:id`, deleteMainEntity);
router.get(`/${mainEntity}/:id`, getMainEntityById);
router.get(`/${mainEntity}-user/:id`, getMainEntityByEmployee);

export default router