import express from "express";
import morgan from "morgan";
// Import Routes
import vehiclesRoutes from "./routes/vehicles.routes"

const app=express();


//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan("dev"));

//Use Routes
app.use('/api/vehicles',vehiclesRoutes);

export default app;