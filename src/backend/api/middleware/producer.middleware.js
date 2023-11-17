import { kafka } from "../config/kafkaConfig.js";

export const producerMiddleware = async (req, res, next) => {
  const producer = kafka.producer();
  await producer.connect();

  req.producer = producer;
  next();
};
