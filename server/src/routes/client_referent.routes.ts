import { Router } from "express";
import { 
    createMainEntity, 
    getMainEntity, 
    updateMainEntity,
    deleteMainEntity,
    getMainEntityById
} from "../controllers/client_referent.controllers";

const router = Router();
const mainEntity = "client_referent"

router.post(`/${mainEntity}`, createMainEntity);
router.get(`/${mainEntity}`, getMainEntity);
router.put(`/${mainEntity}/:id`, updateMainEntity);
router.delete(`/${mainEntity}/:id`, deleteMainEntity);
router.get(`/${mainEntity}/:id`, getMainEntityById);

export default router