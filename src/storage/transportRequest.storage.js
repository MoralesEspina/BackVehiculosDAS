import {getConnection} from "./../database/database";

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT uuid,pilotName,plate,place,date,section,applicantsName,position,phoneNumber,observations from local_request")
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
        const result = await connection.query("SELECT p.uuid,p.fullname,j.job_name,p.phone,p.dpi,p.nit,active,available from Request AS p join job As j where p.job = j.id and uuid = ?", id);
        if (result.length <= 0) {
            return {
            status: 404,
            message: 'No se encontro la Requesta'
        };
        }else{
            return result;
        }
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVA SOLICITUD
const createNewRequest = async (newRequest) => {
    try{
        const connection = await getConnection();
        const verifyRequest = await connection.query("SELECT uuid FROM local_request where uuid = ? ",newRequest.uuid);
        if (verifyRequest.length <= 0) {
            await connection.query("INSERT INTO local_request (uuid,pilotName,plate,place,date,section,applicantsName,position,phoneNumber,observations) values (?,?,?,?,?,?,?,?,?,?)",
            [newRequest.uuid,newRequest.pilotName,newRequest.plate,newRequest.place,newRequest.date,newRequest.section,newRequest.applicantsName, newRequest.position, newRequest.phoneNumber, newRequest.observation]);
            return {uuid: newRequest.uuid};
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
    updateOneRequest,
}