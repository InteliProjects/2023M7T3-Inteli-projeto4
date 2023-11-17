import { analyzeNLP } from '../routes/services/nlu.service';
import * as nluConfig from '../config/nluConfig';
import * as kafkaConfig from '../config/kafkaConfig';

// Mocking NLU analyze function
nluConfig.naturalLanguageUnderstanding = {
  analyze: jest.fn(),
};

// Mocking Kafka consumer
jest.mock('../config/kafkaConfig', () => ({
  kafka: {
    consumer: jest.fn(),
  },
}));

describe('NLU Service', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should analyze NLP correctly', async () => {
    const req = { 
      body: { text: 'This is a sufficiently long sample text for NLU analysis.' },
      producer: {
        send: jest.fn().mockResolvedValue('Kafka Result'),
      }
    };
    const res = { send: jest.fn() };

    nluConfig.naturalLanguageUnderstanding.analyze.mockResolvedValue({ result: 'NLU Result' });

    await analyzeNLP(req, res);

    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ 
      language: 'en', 
      usage: expect.objectContaining({ features: expect.any(Number) }) 
    }));
    
  });
});
