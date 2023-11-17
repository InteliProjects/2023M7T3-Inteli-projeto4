import { producerMiddleware } from "../../middleware/producer.middleware.js";
import { Router } from "express";
import multer from 'multer';
import { getVoiceResponse, speechToTextConversion } from "../services/stt.service.js";

const router = Router();
const upload = multer();


// Define your routes

//Get
/**
 * @swagger
 * /webhook/voice:
 *   get:
 *     summary: Get notifications from Kafka
 *     tags: [Notification]
 *     responses:
 *       200:
 *         content:
 *              string/html:
 *                  example:
 *                     "200 OK"
 *       401:
 *         description: Unauthorized
 *         content:
 *              application/json:
 *                  example:
 *                     
 *                         {
 *                            "message":"Por favor, faça login para continuar."
 *                         }
 *                     
 *       500:
 *         description: Internal server error
 */
router.get('/webhook/voice', getVoiceResponse)

/**
 * @swagger
 * /speech-to-text:
 *   post:
 *     summary: Transcribe audio file to text
 *     tags: [STT]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: audio
 *         type: file
 *         schema:
 *            type: file
 *            format: binary
 *         required: true
 *         description: The audio file to transcribe (mpeg format)
 *     responses:
 *       200:
 *         description: Successful transcription
 *         content:
 *              application/json:
 *                  example:
 *                            transcription: "Mensagem de Teste Transcrita" 
 *       401:
 *         description: Unauthorized
 *         content:
 *              application/json:
 *                  example:                         
 *                            message: "Por favor, faça login para continuar."          
 *       500:
 *         description: Internal server error
 */
router.post("/speech-to-text", producerMiddleware, upload.single("audio"), speechToTextConversion);

export default router;