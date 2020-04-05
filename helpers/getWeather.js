const request = require("request");

const getWeather = (data, callback) => {
  const url =
    "https://api.darksky.net/forecast/6d8827fd209416e22ffda7de016fce28/" +
    data.latitude +
    "," +
    data.longitude;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the server...", undefined);
    } else if (body.currently.length === 0) {
      callback("Couldn't fetch data from the address...", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degress out. This high today is " +
          body.daily.data[0].temperatureHigh +
          " with a low of " +
          body.daily.data[0].temperatureLow +
          ". There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = getWeather;
