const VehiclesService = require("../services/vehicles.service")

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVehicles= async(req,res) =>{
    try{
        const allVehicles = await VehiclesService.getAllVehicles();
        res.json({status: 'OK' , data: allVehicles})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER UN VEHICULO
const getOneVehicle= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
          });
          return;
    }
    try{
        const oneVehicle =  await VehiclesService.getOneVehicle(id);
        if (oneVehicle.status == 404) {
            res.status(404).json({data: oneVehicle})
        }else{
            res.status(200).json({status: "OK", data: oneVehicle})
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO CREAR NUEVO VEHICULO
const createNewVehicle= async(req,res) =>{
    
    try{
        const vehicle = {
            vin: req.body.vin,
            plate: req.body.plate,
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model
        };
        const createdVehicle = await VehiclesService.createNewVehicle(vehicle);
        if (createdVehicle.status == 400) {
            res.status(400).json({data: createdVehicle})
        }else{
            res.status(201).json({status: "Creado Correctamente", data: createdVehicle})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

//TODO ACTUALIZAR UN VEHICULO
const updateOneVehicle= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
          });
          return;
    }

    try{
        const vehicle = {
            plate: req.body.plate,
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model
        };
        const updatedVehicle = await VehiclesService.updateOneVehicle(id, vehicle);
        if (updatedVehicle.status == 400) {
            res.status(400).json({data: updatedVehicle})
        }else{
            res.status(201).json({status: "Actualizado Correctamente", data: updatedVehicle})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

//TODO ELIMINAR UN VEHICULO
const deleteOneVehicle= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
          });
          return;
    }
    try{
        const deletedVehicle = await VehiclesService.deleteOneVehicle(id);
        if (deletedVehicle.status == 400) {
            res.status(400).json({data: deletedVehicle})
        }else{
            res.status(204).json({status: "Eliminado Correctamente", data: deletedVehicle})
        }
    }catch(error){
    
    }
}

export const methods = {
    getAllVehicles,
    getOneVehicle,
    createNewVehicle,
    updateOneVehicle,
    deleteOneVehicle,
}