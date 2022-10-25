import express from "express";
import morgan from "morgan";
// Import Routes
import vehiclesRoutes from "./routes/vehicles.routes"
import personRoutes from "./routes/person.routes"
import infoRoutes from "./routes/info.routes"
import authRoutes from "./routes/auth.routes"
import requestLocalRoutes from "./routes/localRequest.routes"
import requestExteriorRoutes from "./routes/exteriorRequest.routes"
import departmentRoutes from "./routes/department.routes"

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
app.use('/api/info',infoRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/requestLocal',requestLocalRoutes);
app.use('/api/requestExterior',requestExteriorRoutes);
app.use('/api/departments',departmentRoutes);

app.use((req,res,next) => {
    res.status(404).json({
        message: 'Ruta invalida'
    })
})

export default app;