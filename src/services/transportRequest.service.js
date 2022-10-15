const RequestStorage = require("../storage/transportRequest.storage")

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests = async () => {
    try{
        const allRequests = await RequestStorage.getAllRequests();
        return allRequests;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER UNA SOLICITYD
const getOneRequest = async (id) => {
    try {
        const oneRequest = await RequestStorage.getOneRequest(id);
        return oneRequest
    } catch (error) {
        
    }
}

//TODO CREAR NUEVA SOLICITYD
const createNewRequest = async (newRequest) => {
    try {
        const createdRequest = await RequestStorage.createNewRequest(newRequest);
        return createdRequest;
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UNA SOLICITUD
const updateOneRequest = async (id, Request) => {
    try {
        const updatedRequest = await RequestStorage.updateOneRequest(id, Request);
        return updatedRequest;
    } catch (error) {
        throw error;
    }

}

module.exports = {
    getAllRequests,
    getOneRequest,
    createNewRequest,
    updateOneRequest
}