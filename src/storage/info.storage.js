import {getConnection} from "./../database/database";

//TODO OBTENER TODOS LOS TIPOS
const getAllTypes= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT idvtype,type_name from vtype")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS TRABAJOS
const getAllJobs= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT id,job_name,description from job")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS Estatus
const getAllStatus= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT idstatus,status_name,description from status")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS Estatus
const getAllRoles= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT idrol,rol,description from rol")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

module.exports = {
    getAllTypes,
    getAllJobs,
    getAllStatus,
    getAllRoles,
}