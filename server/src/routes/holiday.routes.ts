import { Router } from "express";
import { getHolidays, renewHolidays} from "../utils/holiday";

const router = Router();

router.post('/holiday', async (req, res)=>{
    const holidays = await getHolidays();
    res.json(holidays)
})

router.post(`/holiday-renew`, renewHolidays);

export default router