const TripService = require("../services/Trip.service")


//TODO OBTENER TODOS LOS VIAJES
const getAllTrips= async(req,res) =>{
    try{
        const allTrips = await TripService.getAllTrips();
        res.json({status: 'OK' , data: allTrips})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER UN VIAJE
const getOneTrip= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
          });
          return;
    }
    try{
        const oneTrip =  await TripService.getOneTrip(id);
        if (oneTrip.status == 404) {
            res.status(404).json({data: oneTrip})
        }else{
            res.status(200).json({status: "OK", data: oneTrip})
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO CREAR UN VIAJE
const createNewTrip= async(req,res) =>{
    
    try{
        const Trip = {
            uuid: uuidv4(),
            fullname: req.body.fullname,
            job: req.body.job,
            phone: req.body.phone,
            dpi: req.body.dpi,
            nit: req.body.nit
        };
        const createdTrip = await TripService.createNewTrip(Trip);
        if (createdTrip.status == 400) {
            res.status(400).json({data: createdTrip})
        }else{
            res.status(201).json({status: "Creado Correctamente", data: createdTrip})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

//TODO ACTUALIZAR UN TRIP
const updateOneTrip= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
          });
          return;
    }

    try{
        const Trip = {
            fullname: req.body.fullname,
            job: req.body.job,
            phone: req.body.phone,
            dpi: req.body.dpi,
            nit: req.body.nit
        };
        const updatedTrip = await TripService.updateOneTrip(id, Trip);
        if (updatedTrip.status == 400) {
            res.status(400).json({data: updatedTrip})
        }else{
            res.status(201).json({status: "Actualizado Correctamente", data: updatedTrip})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

export const methods = {
    getAllTrips,
    getOneTrip,
    createNewTrip,
    updateOneTrip,
}