const express = require("express");
const {API_VERSION} = require("./contants");
const bodyParser = require("body-parser")
const cors = require("cors");

const app = express();

//Import routings
const authRoutes = require("./router/auth")
const userRoutes = require("./router/user")
const contactoRoutes = require("./router/contacto")

//Configure body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure header HTTP - CORS
app.use(cors());

//Configure routings
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, contactoRoutes)

module.exports = app;