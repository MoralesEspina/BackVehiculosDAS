import { getConnection } from "../database/database";

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests = async () => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT id,place,date,section,applicantsName,position,phoneNumber,observations,s.status_name 
        FROM local_request JOIN status AS s 
        WHERE status = s.idstatus and status != 6 
        ORDER BY id desc`)
        var data = JSON.parse(JSON.stringify(result))
        return data;
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequestsActives = async () => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT id,place,date,section,applicantsName,position,phoneNumber,observations,s.status_name 
        FROM local_request JOIN status AS s 
        WHERE status = s.idstatus and status = 7
        ORDER BY id desc`)
        var data = JSON.parse(JSON.stringify(result))
        return data;
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER SOLICITUDES EN ESPERA
const getRequestsOnHold = async () => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT id,place,date,section,applicantsName,position,phoneNumber,observations,s.status_name 
        FROM local_request 
        JOIN status AS s 
        WHERE status = s.idstatus and status = 6 
        ORDER BY id desc`)
        var data = JSON.parse(JSON.stringify(result))
        return data;
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER UNA SOLICITUD
const getOneRequest = async (id) => {
    try {
        const connection = await getConnection();
        const status = await connection.query(`
        SELECT status 
        FROM local_request
        WHERE id = ? `, id);
        let request, detailRequest;
        if (status[0].status == 7) {
            request = await connection.query(`
            SELECT l.id,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status,l.boss,V.idVehicle as plate ,P.uuid as pilotName
            FROM local_request AS l 
            JOIN trips as T ON T.transp_request_local = id
            JOIN vehicle as V ON V.idVehicle = T.vehicle_plate 
            JOIN person as P ON P.uuid = T.pilot 
            WHERE id = ?`, id);
        }
        else {
            request = await connection.query(`
            SELECT l.id,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status,l.boss
            FROM local_request AS l 
            WHERE id = ?`, id);
        }
            detailRequest = await connection.query(`
            SELECT DL.dateOf, DL.dateTo, DL.schedule, DL.destiny, DL.peopleNumber, DL.comission  
            FROM detail_local_request AS DL 
            JOIN local_request AS l 
            WHERE id_local_request = l.id and DL.id_local_request = ?`, id);
        if (request.length <= 0) {
            return {
                status: 404,
                message: 'No se encontro la Solicitud'
            };
        } else {
            return { request: request, detailRequest: detailRequest };
        }
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER UNA SOLICITUD
const getOneRequestComplete = async (id) => {
    try {
        const connection = await getConnection();
        const request = await connection.query(`
        SELECT l.id,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status,l.boss,V.plate,P.fullname 
        FROM local_request AS l 
        JOIN trips as T ON T.transp_request_local = id
        JOIN vehicle as V ON V.idVehicle = T.vehicle_plate
        JOIN person as P ON P.uuid = T.pilot
        WHERE id = ?`, id);

        const detailRequest = await connection.query(`
        SELECT DL.dateOf, DL.dateTo, DL.schedule, DL.destiny, DL.peopleNumber, DL.comission  
        FROM detail_local_request AS DL JOIN local_request AS l 
        WHERE id_local_request = l.id and DL.id_local_request = ?`, id);
        if (request.length <= 0) {
            return {
                status: 404,
                message: 'No se encontro la Solicitud'
            };
        } else {
            return { request: request, detailRequest: detailRequest };
        }
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVA SOLICITUD
const createNewRequest = async (newRequest) => {
    newRequest.status = 6;
    try {
        const connection = await getConnection();
        const Request = await connection.query(`
        INSERT INTO local_request (place,date,section,applicantsName,position,phoneNumber,observations,status, boss) 
        VALUES (?,?,?,?,?,?,?,?,?)`,
            [newRequest.place, newRequest.date, newRequest.section, newRequest.applicantsName, newRequest.position, newRequest.phoneNumber, newRequest.observations, newRequest.status, newRequest.boss]);
        return Request.insertId
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEV0 DETALLE DE SOLICITUD
const createNewDetailRequest = async (newDetailRequest) => {
    try {
        const connection = await getConnection();
        const newDetail = await connection.query(`
        INSERT INTO detail_local_request (dateOf,dateTo,schedule,destiny,peopleNumber,comission,id_local_request) 
        VALUES (?,?,?,?,?,?,?)`,
            [newDetailRequest.dateOf, newDetailRequest.dateTo, newDetailRequest.schedule, newDetailRequest.destiny, newDetailRequest.peopleNumber, newDetailRequest.comission, newDetailRequest.id_local_request]);
        return newDetail;
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UNA SOLICITUD
const updateOneRequest = async (id, updatedRequest) => {
    try {
        const connection = await getConnection();
        if (updatedRequest.status_request == 7) {
            const updated = await connection.query(`
            UPDATE local_request 
            SET status = IFNULL(?, status) 
            WHERE id = ?`,
                [updatedRequest.status_request, id]);
            const result = await connection.query(`
            INSERT INTO trips(transp_request_local,pilot,vehicle_plate,status) 
            VALUES (?,?,?,?)`,
                [updatedRequest.transp_request_local, updatedRequest.pilot_name, updatedRequest.plate_vehicle, updatedRequest.status]);
            return { request: result, updated: updated };
        }
        const updated = await connection.query(`
            UPDATE local_request SET status = IFNULL(?, status) 
            WHERE id = ?`,
            [updatedRequest.status_request, id]);
        return updated;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllRequests,
    getAllRequestsActives,
    getRequestsOnHold,
    getOneRequest,
    getOneRequestComplete,
    createNewRequest,
    createNewDetailRequest,
    updateOneRequest,
}