import { IamAuthenticator } from "ibm-watson/auth/index.js";
import SpeechToTextV1 from "ibm-watson/speech-to-text/v1-generated.js";
import dotenv from "dotenv";
dotenv.config();

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({ apikey: process.env.API_STT_KEY }),
  serviceUrl: process.env.URL_STT,
});

export default speechToText;
