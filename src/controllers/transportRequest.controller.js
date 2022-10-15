const RequestService = require("../services/transportRequest.service")
const { v4: uuidv4 } = require('uuid');

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests= async(req,res) =>{
    try{
        const allRequests = await RequestService.getAllRequests();
        res.json({status: 'OK' , data: allRequests})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER UNA SOLICITUD
const getOneRequest= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
          });
          return;
    }
    try{
        const oneRequest =  await RequestService.getOneRequest(id);
        if (oneRequest.status == 404) {
            res.status(404).json({data: oneRequest})
        }else{
            res.status(200).json({status: "OK", data: oneRequest})
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO CREAR NUEVA SOLICITUD
const createNewRequest= async(req,res) =>{
    
    try{
        const Request = {
            uuid: uuidv4(),
            pilotName: req.body.pilotName,
            plate: req.body.plate,
            place: req.body.place,
            date: req.body.date,
            section: req.body.section,
            applicantsName: req.body.applicantsName,
            position: req.body.position,
            phoneNumber: req.body.phoneNumber,
            observation: req.body.observation,
            dateOf: req.body.dateOf,
            dateTo: req.body.dateTo,
            schedule: req.body.schedule,
            destiny: req.body.destiny,
            peopleNumber: req.body.peopleNumber,
            commission: req.body.commission
        };
        const createdRequest = await RequestService.createNewRequest(Request);
        if (createdRequest.status == 400) {
            res.status(400).json({data: createdRequest})
        }else{
            res.status(201).json({status: "Creado Correctamente", data: createdRequest})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

//TODO ACTUALIZAR UNA SOLICITUD
const updateOneRequest= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
          });
          return;
    }

    try{
        const Request = {
            fullname: req.body.fullname,
            job: req.body.job,
            phone: req.body.phone,
            dpi: req.body.dpi,
            nit: req.body.nit
        };
        const updatedRequest = await RequestService.updateOneRequest(id, Request);
        if (updatedRequest.status == 400) {
            res.status(400).json({data: updatedRequest})
        }else{
            res.status(201).json({status: "Actualizado Correctamente", data: updatedRequest})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

export const methods = {
    getAllRequests,
    getOneRequest,
    createNewRequest,
    updateOneRequest,
}