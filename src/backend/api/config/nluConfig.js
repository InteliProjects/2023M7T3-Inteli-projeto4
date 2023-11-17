// const { IamAuthenticator } = require('ibm-watson/auth');
// const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
import { IamAuthenticator } from "ibm-watson/auth/index.js";
import NaturalLanguageUnderstandingV1 from "ibm-watson/natural-language-understanding/v1.js";
import dotenv from "dotenv";
dotenv.config();

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2021-09-01",
  authenticator: new IamAuthenticator({ apikey: process.env.API_NLU_KEY }),
  serviceUrl: process.env.URL_NLU,
});

export default naturalLanguageUnderstanding;
