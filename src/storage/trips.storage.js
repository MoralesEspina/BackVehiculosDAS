import {getConnection} from "./../database/database";

//TODO OBTENER TODOS LOS VIAJES EXTERIORES
const getAllTripsFromExteriorRequest= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("Select t.idtrips,ER.requesting_unit,ER.commission_manager,ER.date_request,t.transp_request_exterior,P.fullname,V.plate,S.status_name from trips as t join exterior_request as ER join person as P join vehicle as V join status as S where pilot = P.uuid and vehicle_plate = V.vin and t.status = S.idstatus and transp_request_exterior = ER.id")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS VIAJES LOCALES
const getAllTripsFromLocalRequest= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("Select LR.applicantsName,LR.date,t.transp_request_local,P.fullname,V.plate,S.status_name from trips as t join local_request as LR join person as P join vehicle as V join status as S where pilot = P.uuid and vehicle_plate = V.vin and t.status = S.idstatus and transp_request_local = LR.id")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER UN VIAJE
const getOneTrip = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT l.uuid,l.pilotName,l.plate,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status, DL.dateOf, DL.dateTo, DL.schedule, DL.destiny, DL.peopleNumber, DL.comission  FROM detail_local_request AS DL join local_request AS l where id_local_request = ?", id);
        if (result.length <= 0) {
            return {
            status: 404,
            message: 'No se encontro el viaje'
        };
        }else{
            return result;
        }
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVO VIAJE
const createNewTrip = async (Trip) => {
    try{
        const connection = await getConnection();
            await connection.query("INSERT INTO trips (transp_request_local,transp_request_exterior,pilot,vehicle_plate,status) values (?,?,?,?,?)",
            [Trip.transp_request_local,Trip.transp_request_exterior,Trip.pilot,Trip.vehicle_plate,Trip.status]);
            return {transp_request_local: Trip.transp_request_local, 
                    transp_request_exterior: Trip.transp_request_exterior,
                    pilot: Trip.pilot,
                    vehicle_plate: Trip.vehicle_plate,
                    status: Trip.status};
    } catch(error)
    {
        throw error;
    }
}

//TODO ACTUALIZAR UN VIAJE
const updateOneTrip = async (id, updatedTrip) => {
    const Trip = {
        fullname: updatedTrip.fullname,
        job: updatedTrip.job,
        phone: updatedTrip.phone,
        dpi: updatedTrip.dpi,
        nit: updatedTrip.nit
    }
    try{
        const connection = await getConnection();
            const result = await connection.query("UPDATE Trip SET fullname = IFNULL(?, fullname), job = IFNULL(?, job), phone = IFNULL(?, phone), dpi = IFNULL(?, dpi), nit = IFNULL(?, nit) WHERE uuid = ?",
            [Trip.fullname,Trip.job,Trip.phone,Trip.dpi,Trip.nit,id]);
            if (result.affectedRows === 0) {
                return {
                    status: 400,
                    message: 'La Tripa no existe'
                };
            }

             const updated = await connection.query("SELECT p.uuid,p.fullname,j.job_name,p.phone,p.dpi,p.nit,active,available from Trip AS p join job As j where p.job = j.id and uuid = ?", id);
             return updated;

    } catch(error)
    {
        throw error;
    }
}

module.exports = {
    getAllTripsFromExteriorRequest,
    getAllTripsFromLocalRequest,
    getOneTrip,
    createNewTrip,
    updateOneTrip,
}