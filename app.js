var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var async = require("async");
var cors = require('cors');

var apiV1Router = require("./routes/v1");
var dbConfig = require('./config/database');


mongoose.connect(dbConfig.connection_string, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("ERROR: Could not connect to mongodb")
  });

app.use(logger("dev")); // Logger configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Body parsers middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Routes
app.use("/api/v1", apiV1Router);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  return res.status(err.status || 500).send();
});

app.listen(process.env.PORT || 8080, function() {
  console.log("Now listening for request in " + (process.env.PORT || 8080));
});

module.exports = app;
