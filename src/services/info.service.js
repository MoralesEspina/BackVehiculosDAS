const InfoStorage = require("../storage/info.storage")

//TODO OBTENER TODOS LOS TIPOS
const getAllTypes = async () => {
    try{
        const allTypes = await InfoStorage.getAllTypes();
        return allTypes;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS TRABAJOS
const getAllJobs = async () => {
    try{
        const allJobs = await InfoStorage.getAllJobs();
        return allJobs;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS Estatus
const getAllStatus = async () => {
    try{
        const allStatus = await InfoStorage.getAllStatus();
        return allStatus;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS ROLES
const getAllRoles = async () => {
    try{
        const allRoles = await InfoStorage.getAllRoles();
        return allRoles;
    } catch (error){
        throw error;
    }   
}

module.exports = {
    getAllTypes,
    getAllJobs,
    getAllStatus,
    getAllRoles
}