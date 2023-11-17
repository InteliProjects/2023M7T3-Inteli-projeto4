import { Kafka } from "kafkajs";

const kafka = new Kafka({
  brokers: ["localhost:9092"],
  clientId: "alert",
});

const consumer = kafka.consumer({ groupId: "alert-group" });
const consumer_voice = kafka.consumer({ groupId: "alert-group-voice" });

const producer = kafka.producer();

async function runText() {
  await consumer.connect();
  await consumer.subscribe({ topic: "alert-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        value: message.value.toString(),
      });

      const payload = JSON.parse(message.value);
      await producer.connect();

      producer.send({
        topic: "alert-response",
        messages: [{ value: payload }],
      });

      await producer.disconnect();
    },
  });
}

async function runVoice() {
  await consumer_voice.subscribe({ topic: "stt_topic", fromBeginning: true });

  await consumer_voice.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        value: message.value.toString(),
      });

      const payload = JSON.parse(message.value);
      await producer.connect();

      producer.send({
        topic: "alert-response-voice",
        messages: [{ value: payload }],
      });

      await producer.disconnect();
    },
  });
}

async function run() {
  await runText();
  await runVoice();
}

run().catch(console.error);
