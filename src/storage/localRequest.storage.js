import {getConnection} from "../database/database";

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT id,place,date,section,applicantsName,position,phoneNumber,observations,status from local_request")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER UNA SOLICITUD
const getOneRequest = async (id) => {
    try {
        const connection = await getConnection();
        const request = await connection.query("SELECT l.id,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status FROM local_request AS l where id = ?", id);
        const detailRequest = await connection.query("SELECT DL.dateOf, DL.dateTo, DL.schedule, DL.destiny, DL.peopleNumber, DL.comission  FROM detail_local_request AS DL join local_request AS l where id_local_request = l.id and DL.id_local_request = ?", id);
        if (request.length <= 0) {
            return {
            status: 404,
            message: 'No se encontro la Solicitud'
        };
        }else{
            return {request: request, detailRequest:detailRequest};
        }
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVA SOLICITUD
const createNewRequest = async (newRequest) => {
    newRequest.status = 6;
    try{
        const connection = await getConnection();
        const Request = await connection.query("INSERT INTO local_request (place,date,section,applicantsName,position,phoneNumber,observations,status) values (?,?,?,?,?,?,?,?)",
        [newRequest.place,newRequest.date,newRequest.section,newRequest.applicantsName, newRequest.position, newRequest.phoneNumber, newRequest.observations, newRequest.status]);
        return Request.insertId
    } catch(error)
    {
        throw error;
    }
}

//TODO CREAR NUEV0 DETALLE DE SOLICITUD
const createNewDetailRequest = async (newDetailRequest) => {
    try{
        const connection = await getConnection();
        const newDetail = await connection.query("INSERT INTO detail_local_request (dateOf,dateTo,schedule,destiny,peopleNumber,comission,id_local_request) values (?,?,?,?,?,?,?)",
        [newDetailRequest.dateOf,newDetailRequest.dateTo,newDetailRequest.schedule,newDetailRequest.destiny,newDetailRequest.peopleNumber,newDetailRequest.comission,newDetailRequest.id_local_request]);
        return newDetail;
    } catch(error)
    {
        throw error;
    }
}

//TODO ACTUALIZAR UNA SOLICITUD
const updateOneRequest = async (id, updatedRequest) => {
    const Request = {
        fullname: updatedRequest.fullname,
        job: updatedRequest.job,
        phone: updatedRequest.phone,
        dpi: updatedRequest.dpi,
        nit: updatedRequest.nit
    }
    try{
        const connection = await getConnection();
            const result = await connection.query("UPDATE Request SET fullname = IFNULL(?, fullname), job = IFNULL(?, job), phone = IFNULL(?, phone), dpi = IFNULL(?, dpi), nit = IFNULL(?, nit) WHERE uuid = ?",
            [Request.fullname,Request.job,Request.phone,Request.dpi,Request.nit,id]);
            if (result.affectedRows === 0) {
                return {
                    status: 400,
                    message: 'La Requesta no existe'
                };
            }

             const updated = await connection.query("SELECT p.uuid,p.fullname,j.job_name,p.phone,p.dpi,p.nit,active,available from Request AS p join job As j where p.job = j.id and uuid = ?", id);
             return updated;

    } catch(error)
    {
        throw error;
    }
}

module.exports = {
    getAllRequests,
    getOneRequest,
    createNewRequest,
    createNewDetailRequest,
    updateOneRequest,
}