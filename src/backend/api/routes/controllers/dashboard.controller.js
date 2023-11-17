import { Router } from "express";
import { adminMiddleware } from "../../middleware/auth.middleware.js";
import { dashboard } from "../services/dashboard.service.js";

const router = Router();

/**
 * @swagger
 * /dashboard/info:
 *   get:
 *     summary: Information on dashboard format about the users on application
 *     tags: [Dashboard]
 * 
 *     responses:
 *       200:
 *         description: Number of Sales Sales Members in the app
 *         content:
 *           application/json:
 *             example:
 *               qtdUsers: 3
 *               qtdMaleUsers: 2
 *               qtdFemaleUsers: 1
 *               qtdDepartmentUsersMarketing: 1
 *               qtdDepartmentUsersSales: 1
 *               qtdDepartmentUsersTechnology: 1
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor, faça login para continuar."
 *       500:
 *         description: Internal server error
 */
router.get("/dashboard/info", adminMiddleware, dashboard);

export default router;
