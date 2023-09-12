const express = require("express");
const ContactoController = require("../controllers/contacto");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/contacto",ContactoController.createContacto);
api.get("/contacto", [md_auth.asureAuth],ContactoController.getContactos);
api.patch("/contacto/:id", [md_auth.asureAuth],ContactoController.updateContacto);
api.delete("/contacto/:id", [md_auth.asureAuth],ContactoController.deleteContacto);

module.exports = api;