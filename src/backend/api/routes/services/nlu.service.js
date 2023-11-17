import dotenv from "dotenv";
import naturalLanguageUnderstanding from "../../config/nluConfig.js";
import { kafka } from "../../config/kafkaConfig.js";
dotenv.config();

export const analyzeNLP = async (req, res) => {
  const analyzeParams = {
    text: req.body.text,
    features: {
      entities: {
        emotion: true,
        sentiment: true,
        limit: 2,
      },
      keywords: {
        emotion: true,
        sentiment: true,
        limit: 2,
      },
      categories: {
        limit: 1,
      },
    },
  };

  try {
    await req.producer.send({
      topic: "alert-topic",
      messages: [{ value: JSON.stringify(analyzeParams.text) }],
    });

    const analysisResults = await naturalLanguageUnderstanding.analyze(
      analyzeParams
    );

    res.send(analysisResults.result);
  } catch (err) {
    console.log("Error:", err.message);
    throw new Error("Error analyzing text");
  }
};

export const getTextResponse = async (req, res) => {
  try {
    const consumer = kafka.consumer({ groupId: "alert-group-receiver" });

    await consumer.connect();

    await consumer.subscribe({ topic: "alert-response", fromBeginning: true });

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

// export const analyzeTextAlternative = async (req, res) => {
//   const analyzeParams = {
//     text: req.body.text,
//     features: {
//       entities: {
//         sentiment: true,
//         limit: 50,
//       },
//       keywords: {
//         sentiment: true,
//         limit: 50,
//       },
//       emotion: {
//         document: true,
//       },
//       semantic_roles: {},
//       sentiment: {},
//       categories: {
//         limit: 1,
//       },
//     },
//   };

//   const ipAddress = "177.92.77.170"; // replace with req.id when the server is not running locally
//   const response = await axios.get(`http://ipinfo.io/${ipAddress}/json`);

//   naturalLanguageUnderstanding
//     .analyze(analyzeParams)
//     .then((analysisResults) => {
//       const precision = (
//         analysisResults.result.categories[0].score * 100
//        ).toFixed(2);
//        search.json(
//          {
//            api_key: process.env.GOOGLE_API_KEY, // https://serpapi.com/manage-api-key
//            q: analysisResults.result.categories[0].label, // search query
//            location: `${response.data.city}, ${response.data.region}`, // location of the search
//            lr: "lang_pt",
//            safe: "active", // filter adult content
//          },
//          (data) => {
//            const searchResults = data.organic_results;

//            const titleLink = searchResults.map((result) => {
//              return {
//                title: result.title,
//                link: result.link,
//              };
//            });
//            console.log(`A precisão é: ${precision}%`);
//            res.json(titleLink);
//          }
//        );
//       // res.json(analysisResults.result);
//     })
//     .catch((err) => {
//       console.log("error:", err);
//       res.status(500).send("Error analyzing text.");
//     });
// };

// // google search
// const search = new SerpApi.GoogleSearch(process.env.GOOGLE_API_KEY);
