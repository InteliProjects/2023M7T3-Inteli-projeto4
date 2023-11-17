import { Router } from "express";
import { analyzeNLP, getTextResponse } from "../services/nlu.service.js";
import { producerMiddleware } from "../../middleware/producer.middleware.js";
const router = Router();


//Get
/**
 * @swagger
 * /webhook/text:
 *   get:
 *     summary: Get notifications from Kafka
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: IBM NLU Results Health
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
router.get('/webhook/text', getTextResponse)

//Post
/**
 * @swagger
 * /analyze:
 *   post:
 *     summary: Analyze text with IBM NLU API
 *     tags: [NLP]
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
 *                        text: "This is some sample text to analyze."
 *     responses:
 *       200:
 *         description: IBM NLU Results
 *         content:
 *              application/json:
 *                  example:
 *                     [
 *                          {
 *                            "usage": {
 *                                "text_units": 1,
 *                                "text_characters": 36,
 *                                "features": 4
 *                            },
 *                            "sentiment": {
 *                                "document": {
 *                                    "score": 0,
 *                                    "label": "neutral"
 *                                }
 *                            },
 *                            "language": "en",
 *                            "keywords": [
 *                                {
 *                                    "text": "sample text",
 *                                    "sentiment": {
 *                                        "score": 0,
 *                                        "label": "neutral"
 *                                    },
 *                                    "relevance": 0.5,
 *                                    "count": 1
 *                                }
 *                            ],
 *                            "entities": [],
 *                            "categories": [
 *                                {
 *                                    "score": 0.792542,
 *                                    "label": "/technology & computing/computing/computer software and applications/digital audio"
 *                                }
 *                            ]
 *                           }
 *                      ]
 *       401:
 *         description: Unauthorized
 *         content:
 *              application/json:
 *                  example:
 *                     [
 *                         {
 *                            "message":"Por favor, faça login para continuar."
 *                         }
 *                     ]
 *       500:
 *         description: Internal server error
 */
router.post("/analyze", producerMiddleware, analyzeNLP);

export default router;
