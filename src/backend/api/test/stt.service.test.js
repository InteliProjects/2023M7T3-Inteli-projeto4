// Import required modules and functions
import { transcribeAudio } from '../routes/services/stt.service.js';
import * as fs from 'fs';
import * as sttConfig from '../config/sttConfig.js';
import * as kafkaConfig from '../config/kafkaConfig.js';
import ffmpeg from 'fluent-ffmpeg';


ffmpeg.setFfmpegPath('C:/Users/stefa/OneDrive/Documentos/Faculdade/Modulo 7.1/Projeto4/src/backend/api/node_modules/ffmpeg-static/ffmpeg.exe');


// Mock the 'fs' module's methods
jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
  createReadStream: jest.fn(),
  stat: jest.fn((path, cb) => cb(null, {
    isFile: jest.fn().mockReturnValue(true), // Added this line
    isSymbolicLink: jest.fn().mockReturnValue(false)
  })),
}));

// Mock the 'sttConfig' module's speechToText.recognize function
jest.mock('../config/sttConfig', () => ({
  speechToText: {
    recognize: jest.fn(),
  },
}));

// Mock the 'kafkaConfig' module's kafka function
jest.mock('../config/kafkaConfig', () => ({
  kafka: jest.fn(),
}));

// Describe the test suite for STT Service
describe('STT Service', () => {

  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case for transcribing audio correctly
  it('should transcribe audio correctly', async () => {
    // Mock audio file buffer
    const audioFile = { buffer: Buffer.from('audio data') };

    // Mock implementations for writeFileSync, recognize, and kafka
    fs.writeFileSync.mockReturnValue();
    sttConfig.speechToText.recognize.mockResolvedValue({ result: 'Transcription Result' });
    kafkaConfig.kafka.mockResolvedValue('Kafka Result');

    // Call the function and capture the result
    const result = await transcribeAudio(audioFile);

    // Assertion to check if the result matches the expected transcription
    expect(result).toBe('Transcription Result'); // Replace with the actual expected transcription.
  });
});
