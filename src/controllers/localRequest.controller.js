const RequestService = require("../services/localRequest.service")

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

//TODO OBTENER LAS SOLICITUDES EN ESPERA    
const getRequestsOnHold = async (req, res) => {
    try {
        const allRequestsOnHold = await RequestService.getRequestsOnHold();
        res.json({ status: 'OK', data: allRequestsOnHold })
    } catch (error) {
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

//TODO OBTENER UNA SOLICITUD
const getOneRequestComplete= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
          });
          return;
    }
    try{
        const oneRequest =  await RequestService.getOneRequestComplete(id);
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
            place: data.place,
            date: data.date,
            section: data.section,
            applicantsName: data.applicantsName,
            position: data.position,
            phoneNumber: data.phoneNumber,
            observations: data.observations,
            boss: data.boss,
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
const updateOneRequest = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
        });
        return;
    }

    try {
        const Request = {
            pilot_name: req.body.pilotName,
            plate_vehicle: req.body.plate,
            status_request: req.body.status,
            transp_request_local: parseInt(id),
            status: 6
        };
        console.log(Request)
        const updatedRequest = await RequestService.updateOneRequest(id, Request);
        if (updatedRequest.status == 400) {
            res.status(400).json({ data: updatedRequest })
        } else {
            res.status(201).json({ status: "Actualizada Correctamente", data: updatedRequest })
        }

    } catch (error) {
        res.status(error?.status || 500)
        res.send({ status: "Failed", data: { error: error?.message || error } })
    }
}

export const methods = {
    getAllRequests,
    getRequestsOnHold,
    getOneRequest,
    getOneRequestComplete,
    createNewRequest,
    updateOneRequest,
}