import { Router } from "express";
import { 
    createRole, 
    getRole, 
    updateRole,
    deleteRole,
    getRoleById
} from "../controllers/role.controllers";

const router = Router();

router.post("/role", createRole);
router.get("/role", getRole);
router.put("/role/:id", updateRole);
router.delete("/role/:id", deleteRole);
router.get("/role/:id", getRoleById);

export default router