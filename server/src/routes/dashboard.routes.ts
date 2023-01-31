import { Router } from "express";
import { getDashboardData, getUserDashboardData } from "../utils/dashboard";

const router = Router();

router.get(`/dashboard`, getDashboardData);
router.get(`/dashboard-user/:employeeId`, getUserDashboardData);

export default router