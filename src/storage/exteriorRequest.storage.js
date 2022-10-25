import { compareSync } from "bcryptjs";
import { getConnection } from "../database/database";

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests = async () => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id,requesting_unit,commission_manager,date_request,objective_request,duration_days,phoneNumber,observations,provide_fuel,provide_travel_expenses,s.status_name,reason_rejected from exterior_request join status AS s where status_request = s.idstatus");
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
        const request = await connection.query("SELECT id,requesting_unit,commission_manager,date_request,objective_request,duration_days,phoneNumber,observations,provide_fuel,provide_travel_expenses,status_request,reason_rejected from exterior_request where id = ?", id);
        const detailRequest = await connection.query("SELECT DE.no, DE.number_people, DE.department, DE.municipality, DE.village, DE.dateOf, DE.dateTo , DE.hour FROM detail_exterior_request AS DE join exterior_request AS e where id_exterior_request = e.id and DE.id_exterior_request = ?", id);
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
        const Request = await connection.query("INSERT INTO exterior_request (requesting_unit,commission_manager,date_request,objective_request,duration_days,phoneNumber,observations,provide_fuel,provide_travel_expenses,status_request,reason_rejected) values (?,?,?,?,?,?,?,?,?,?,?)",
            [newRequest.requesting_unit, newRequest.commission_manager, newRequest.date_request, newRequest.objective_request, newRequest.duration_days, newRequest.phoneNumber, newRequest.observations, newRequest.provide_fuel, newRequest.provide_travel_expenses, newRequest.status_request, newRequest.reason_rejected]);
            return Request.insertId
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEV0 DETALLE DE SOLICITUD
const createNewDetailRequest = async (newDetailRequest) => {
    try {
        const connection = await getConnection();
        const newDetail = await connection.query("INSERT INTO detail_exterior_request (no,number_people,department,municipality,village,dateOf,dateTo,hour,id_exterior_request) values (?,?,?,?,?,?,?,?,?)",
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
        if (updatedRequest.status == 6) {
            const updated = await connection.query("UPDATE exterior_request SET status_request = ? where id = ?",
            [updatedRequest.status_request, id]);  
            const result = await connection.query("INSERT INTO trips(pilot,vehicle_plate,status,transp_request_exterior) values (?,?,?,?)",
            [updatedRequest.pilot, updatedRequest.vehicle_plate, updatedRequest.status,updatedRequest.transp_request_exterior]);
            return { request: result, updated: updated };
        }
            const updated = await connection.query("UPDATE exterior_request SET status_request = IFNULL(?, status_request), reason_rejected = IFNULL(?, reason_rejected) values (?,?) where id = ?",
            [updatedRequest.status, updatedRequest.reason_rejected, id]);
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