import {getConnection} from "../database/database";

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT id,place,date,section,applicantsName,position,phoneNumber,observations,s.status_name from local_request join status AS s where status = s.idstatus and status != 7 order by id desc")
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
        const request = await connection.query("SELECT l.id,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status,l.boss FROM local_request AS l where id = ?", id);
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
        const Request = await connection.query("INSERT INTO local_request (place,date,section,applicantsName,position,phoneNumber,observations,status, boss) values (?,?,?,?,?,?,?,?,?)",
        [newRequest.place,newRequest.date,newRequest.section,newRequest.applicantsName, newRequest.position, newRequest.phoneNumber, newRequest.observations, newRequest.status, newRequest.boss ]);
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
    try {
        const connection = await getConnection();
        if (updatedRequest.status_request == 7) {
            const updated = await connection.query("UPDATE local_request SET status = IFNULL(?, status) where id = ?",
            [updatedRequest.status_request, id]);  
            const result = await connection.query("INSERT INTO trips(transp_request_local,pilot,vehicle_plate,status) values (?,?,?,?)",
            [updatedRequest.transp_request_local,updatedRequest.pilot_name, updatedRequest.plate_vehicle, updatedRequest.status]);
            return { request: result, updated: updated };
        }
            const updated = await connection.query("UPDATE local_request SET status = IFNULL(?, status) where id = ?",
            [updatedRequest.status, id]);
            return updated;
    } catch (error) {
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