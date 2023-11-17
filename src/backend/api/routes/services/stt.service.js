import ffmpeg from "fluent-ffmpeg"; // Importing ffmpeg
import * as fs from "fs";
import speechToText from "../../config/sttConfig.js";
import { kafka } from "../../config/kafkaConfig.js";

export const transcribeAudio = async (audioFile) => {
  console.log(audioFile.buffer);
  const audioBuffer = Buffer.from(audioFile.buffer);
  const audioPath = "inputAudio.mp3"; // Saving the incoming audio as an MP3 file

  fs.writeFileSync(audioPath, audioBuffer);

  const outputPath = "outputAudio.wav"; // Change to .wav
  await new Promise((resolve, reject) => {
    ffmpeg(audioPath)
      .audioChannels(1)
      .audioFrequency(16000)
      .audioCodec("pcm_s16le")
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .on("start", (commandLine) => {
        console.log("Spawned FFmpeg with command:", commandLine);
      })
      .run();
  });
  const audioStream = fs.createReadStream(outputPath);

  const params = {
    audio: audioStream,
    contentType: "audio/l16; rate=16000",
    model: "pt-BR_BroadbandModel",
  };

  const { result } = await speechToText.recognize(params);

  return result.results
    .map((item) => item.alternatives[0].transcript)
    .join(" ");
};

export const speechToTextConversion = async (req, res) => {
  try {
    const transcription = await transcribeAudio(req.file);
    await req.producer.send({
      topic: "stt_topic",
      messages: [{ value: JSON.stringify(transcription) }],
    });

    res.json({ transcription: transcription });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error.message || "An error occurred during transcription");
  } finally {
    req.producer.disconnect();
  }
};

export const getVoiceResponse = async (req, res) => {
  try {
    const consumer = kafka.consumer({ groupId: "alert-group-receiver" });

    await consumer.connect();

    await consumer.subscribe({
      topic: "alert-response-voice",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(String(message.value));
      },
    });

    res.status(200).send("200 OK");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
