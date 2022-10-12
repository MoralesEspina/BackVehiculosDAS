const InfoService = require("../services/info.service")

//TODO OBTENER TODOS LOS TIPOS
const getAllTypes= async(req,res) =>{
    try{
        const allTypes = await InfoService.getAllTypes();
        res.json({status: 'OK' , data: allTypes})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODOS LOS TRABAJOS
const getAllJobs= async(req,res) =>{
    try{
        const allJobs = await InfoService.getAllJobs();
        res.json({status: 'OK' , data: allJobs})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODOS LOS Estatus
const getAllStatus= async(req,res) =>{
    try{
        const allStatus = await InfoService.getAllStatus();
        res.json({status: 'OK' , data: allStatus})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getAllTypes,
    getAllJobs,
    getAllStatus,
}