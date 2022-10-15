const RequestService = require("../services/transportRequest.service")

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
    let data = req.body;
    let detail = data.detail;
    try{
        const Request = {
            pilotName: data.pilotName,
            plate: data.plate,
            place: data.place,
            date: data.date,
            section: data.section,
            applicantsName: data.applicantsName,
            position: data.position,
            phoneNumber: data.phoneNumber,
            observations: data.observations,
        };
        const createdRequest = await RequestService.createNewRequest(Request);

        const detailRequest ={
            dateOf:"",
            dateTo:"",
            schedule:"",
            destiny:"",
            peopleNumber:"",
            comission:"",
            id_local_request:""
        }

        for (let index = 0; index < detail.length; index++) {
            const element = detail[index];
            detailRequest.dateOf = element.dateOf,
            detailRequest.dateTo = element.dateTo,
            detailRequest.schedule = element.schedule,
            detailRequest.destiny = element.destiny,
            detailRequest.peopleNumber = element.peopleNumber,
            detailRequest.comission = element.comission,
            detailRequest.id_local_request = createdRequest
            await RequestService.createNewDetailRequest(detailRequest);
        }

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