import { Router } from "express";
import { requestAccess } from "../services/smtp.service.js";
import { producerMiddleware } from "../../middleware/producer.middleware.js";

const router = Router();
/**
 * @swagger
 * /request-access:
 *   post:
 *     summary: Send request access to the IBM
 *     tags: [Notification]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        text:
 *                          type: string
 *                      example:
 *                        email: "minskyapp@gmail.com"
 *                        firstName: "Minsky"
 *                        lastName: "App"
 *                        department: "Marketing"
 *                        sexualIdentity: "Straight"
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *              text/string:
 *                  example:
 *                      Email enviado para aprovação!
 *       500:
 *         description: Internal server error
 */
router.post("/request-access", producerMiddleware, requestAccess);

export default router;
