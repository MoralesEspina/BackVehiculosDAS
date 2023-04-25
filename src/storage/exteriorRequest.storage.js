import { getConnection } from "../database/database";

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests = async () => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT id,requesting_unit,commission_manager,date_request,objective_request,duration_days,phoneNumber,observations,provide_fuel,provide_travel_expenses,s.status_name,reason_rejected 
        FROM exterior_request 
        JOIN status AS s 
        WHERE status_request = s.idstatus and status_request != 6 
        ORDER BY id desc`);
        var data = JSON.parse(JSON.stringify(result))
        return data;
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER LAS SOLICITUDES EN ESPERA
const getRequestsOnHold = async () => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT id,requesting_unit,commission_manager,date_request,objective_request,duration_days,phoneNumber,observations,provide_fuel,provide_travel_expenses,s.status_name,reason_rejected 
        FROM exterior_request 
        JOIN status AS s 
        WHERE status_request = s.idstatus and status_request = 6 
        ORDER BY id DESC`);
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
        const request = await connection.query(`
        SELECT id,requesting_unit,commission_manager,date_request,objective_request,duration_days,phoneNumber,observations,provide_fuel,provide_travel_expenses,status_request,reason_rejected,boss,V.plate as plate_vehicle2,P.fullname as pilot_name2
        FROM exterior_request 
        JOIN trips as T 
        JOIN vehicle as V 
        JOIN person as P 
        WHERE T.transp_request_exterior = id and T.vehicle_plate = V.idVehicle and T.pilot = P.uuid and id = ?`, id);
        const detailRequest = await connection.query(`
        SELECT DE.no, DE.number_people, DE.department, DE.municipality, DE.village, DE.dateOf, DE.dateTo , DE.hour 
        FROM detail_exterior_request AS DE 
        JOIN exterior_request AS e 
        WHERE id_exterior_request = e.id and DE.id_exterior_request = ?`, id);

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

//TODO OBTENER UNA SOLICITUD COMPLETA
const getOneRequestComplete = async (id) => {
    try {
        const connection = await getConnection();
        const request = await connection.query(`
        SELECT id,requesting_unit,commission_manager,date_request,objective_request,duration_days,phoneNumber,observations,provide_fuel,provide_travel_expenses,status_request,reason_rejected,boss,V.plate,P.fullname 
        FROM exterior_request 
        JOIN trips as T 
        JOIN vehicle as V 
        JOIN person as P 
        WHERE T.transp_request_exterior = id and T.vehicle_plate = V.idVehicle and T.pilot = P.uuid and id = ?`, id);
        const detailRequest = await connection.query(`
        SELECT DE.no, DE.number_people, DE.department, DE.municipality, DE.village, DE.dateOf, DE.dateTo , DE.hour 
        FROM detail_exterior_request AS DE 
        JOIN exterior_request AS e 
        WHERE id_exterior_request = e.id and DE.id_exterior_request = ?`, id);
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
    try {
        const connection = await getConnection();
        const Request = await connection.query(`
        INSERT INTO exterior_request (requesting_unit,commission_manager,date_request,objective_request,duration_days,phoneNumber,observations,provide_fuel,provide_travel_expenses,status_request,reason_rejected,boss) 
        values (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [newRequest.requesting_unit, newRequest.commission_manager, newRequest.date_request, newRequest.objective_request, newRequest.duration_days, newRequest.phoneNumber, newRequest.observations, newRequest.provide_fuel, newRequest.provide_travel_expenses, newRequest.status_request, newRequest.reason_rejected, newRequest.boss ]);
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
        INSERT INTO detail_exterior_request (no,number_people,department,municipality,village,dateOf,dateTo,hour,id_exterior_request) 
        values (?,?,?,?,?,?,?,?,?)`,
            [newDetailRequest.no, newDetailRequest.number_people, newDetailRequest.department, newDetailRequest.municipality, newDetailRequest.village, newDetailRequest.dateOf, newDetailRequest.dateTo, newDetailRequest.hour, newDetailRequest.id_exterior_request]);
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
            const updated = await connection.query("UPDATE exterior_request SET provide_fuel = IFNULL(?, provide_fuel),provide_travel_expenses = IFNULL(?, provide_travel_expenses), status_request = IFNULL(?, status_request) WHERE id = ?",
            [updatedRequest.provide_fuel, updatedRequest.provide_travel_expenses, updatedRequest.status_request, id]);  
            const result = await connection.query("INSERT INTO trips(transp_request_exterior,pilot,vehicle_plate,status) values (?,?,?,?)",
            [updatedRequest.transp_request_exterior,updatedRequest.pilot_name, updatedRequest.plate_vehicle, updatedRequest.status]);
            return { request: result, updated: updated };
        }
            const updated = await connection.query("UPDATE exterior_request SET status_request = IFNULL(?, status_request), reason_rejected = IFNULL(?, reason_rejected) WHERE id = ?",
            [updatedRequest.status_request, updatedRequest.reason_rejected, id]);
            return updated;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllRequests,
    getRequestsOnHold,
    getOneRequest,
    getOneRequestComplete,
    createNewRequest,
    createNewDetailRequest,
    updateOneRequest,
}