const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./helpers/geocode");
const getWeather = require("./helpers/getWeather");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/templates/views"));
hbs.registerPartials(path.join(__dirname, "/templates/partials"));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Mead Production",
    title: "Weather App",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Mead Production",
    title: "About",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please Enter the location...",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    getWeather(data, (error, info) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      res.send({
        forecast: info,
        address: data.location,
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
