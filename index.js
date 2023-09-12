const { request } = require("express");
const app = require("./app")
const mongoose = require("mongoose");
const {DB_USER,DB_HOST,DB_PASSWORD,IP_SERVER,API_VERSION} = require("./contants");
const PORT = process.env.POST || 8080
const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`)
      console.log('La conexión con la base de datos ha sido exitosa.');
    } catch (err) {
      console.log('Error al conectar a la base de datos', err);
    }
}
connectDB()
app.listen(PORT,() => {
    console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`)
})
