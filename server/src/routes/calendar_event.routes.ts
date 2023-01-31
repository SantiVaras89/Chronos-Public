import { Router } from "express";
import { 
    createMainEntity, 
    getMainEntity, 
    updateMainEntity,
    deleteMainEntity,
    getMainEntityById,
    getMainEntityByStart,
    getCalendarHolidays
} from "../controllers/calendar_event.controllers";

const router = Router();
const mainEntity = "calendar"

router.post(`/${mainEntity}`, createMainEntity);
router.get(`/${mainEntity}`, getMainEntity);
router.get(`/${mainEntity}-holidays`, getCalendarHolidays);
router.put(`/${mainEntity}/:id`, updateMainEntity);
router.delete(`/${mainEntity}/:id`, deleteMainEntity);
router.get(`/${mainEntity}/:id`, getMainEntityById);
router.get(`/${mainEntity}-date/:date`, getMainEntityByStart);

export default router