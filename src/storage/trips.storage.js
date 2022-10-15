import {getConnection} from "./../database/database";

//TODO OBTENER TODOS LOS VIAJES
const getAllTrips= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT p.uuid,p.fullname,j.job_name,p.phone,p.dpi,p.nit,active,available from Trip AS p join job As j where p.job = j.id")
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
            message: 'No se encontro la Tripa'
        };
        }else{
            return result;
        }
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVO VIAJE
const createNewTrip = async (newTrip) => {
    const Trip = {
        uuid: newTrip.uuid,
        fullname: newTrip.fullname,
        job: newTrip.job,
        phone: newTrip.phone,
        dpi: newTrip.dpi,
        nit: newTrip.nit,
        active: 1,
        availabale: 1
    }
    try{
        const connection = await getConnection();
        const verifyTrip = await connection.query("SELECT uuid FROM Trip where uuid = ? ",Trip.uuid);
        if (verifyTrip.length <= 0) {
            await connection.query("INSERT INTO Trip (uuid,fullname,job,phone,dpi,nit,active,available) values (?,?,?,?,?,?,?,?)",
            [Trip.uuid,Trip.fullname,Trip.job,Trip.phone,Trip.dpi,Trip.nit,Trip.active, Trip.availabale]);
            return {uuid: Trip.uuid, 
                    fullname: Trip.fullname,
                    job: Trip.job,
                    phone: Trip.phone,
                    dpi: Trip.dpi,
                    nit: Trip.nit};
        }else{
            return {
                status: 400,
                message: 'UUID ya existente'
            };
        }
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
    getAllTrips,
    getOneTrip,
    createNewTrip,
    updateOneTrip,
}