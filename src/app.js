import express from "express";
import morgan from "morgan";
// Import Routes
import vehiclesRoutes from "./routes/vehicles.routes"
import personRoutes from "./routes/person.routes"

var cors = require('cors')
const app=express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

//Use Routes
app.use('/api/vehicles',vehiclesRoutes);
app.use('/api/persons',personRoutes);

app.use((req,res,next) => {
    res.status(404).json({
        message: 'Ruta invalida'
    })
})

export default app;