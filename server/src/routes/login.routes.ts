import { Router } from "express";
import { getLoginCredentials } from "../utils/login";
import { changePassword } from "../utils/changePassword";

const router = Router();

router.post(`/login`, getLoginCredentials);
router.put(`/password/:id`, changePassword);





export default router