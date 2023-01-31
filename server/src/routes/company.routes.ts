import { Router } from "express";
import { 
    createCompany, 
    getCompany, 
    updateCompany,
    deleteCompany,
    getCompanyById
} from "../controllers/company.controllers";

const router = Router();

router.post("/company", createCompany);
router.get("/company", getCompany);
router.put("/company/:id", updateCompany);
router.delete("/company/:id", deleteCompany);
router.get("/company/:id", getCompanyById);

export default router