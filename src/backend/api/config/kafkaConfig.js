import { Kafka, logLevel } from "kafkajs";

// Conexão com o Kafka{
export const kafka = new Kafka({
  clientId: "api",
  brokers: ["localhost:9092"],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10,
},
});