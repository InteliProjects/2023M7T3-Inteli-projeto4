import axios from "axios";
import console from "console";

const requestLogger = async (req, res, next) => {
  req.startTime = Date.now();

  try {
    const ip = await axios.get("https://api64.ipify.org?format=json");
    const clientIp = ip.data["ip"];
    const response = await axios.get(`http://ipinfo.io/${clientIp}/json`);
    const location = response.data.city + ", " + response.data.region;
    res.on("finish", () => {
      const duration = Date.now() - req.startTime;
      const currentdate = new Date();

      var datetime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      console.log(
        `[${new Date().toISOString()}] Método: ${req.method} Status: ${
          res.statusCode
        } Url: ${req.protocol}:${req.hostname}${
          req.url
        } - Duração ${duration}ms - IP ${clientIp} - Localização: ${location} | Time: ${datetime}`
      );
    });
  } catch (error) {
    console.error("Error fetching data: ", error.message);
  }

  next();
};

export default requestLogger;
