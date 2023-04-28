const RequestStorage = require("../storage/exteriorRequest.storage")

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests = async (option) => {
    try{
        let allRequests;
        switch (option) {
            case 'actives':
                allRequests = await RequestStorage.getAllRequestsActives();
                break;
                case 'onHold':
                    allRequests = await RequestStorage.getRequestsOnHold();
                    break;
            default:
                allRequests = await RequestStorage.getAllRequests();
                break;
        }

        return allRequests;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODAS LAS SOLICITUDES
const getRequestsOnHold = async () => {
    try{
        const allRequestsOnHold = await RequestStorage.getRequestsOnHold();
        return allRequestsOnHold;
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

//TODO OBTENER UNA SOLICITYD
const getOneRequestComplete = async (id) => {
    try {
        const oneRequest = await RequestStorage.getOneRequestComplete(id);
        return oneRequest
    } catch (error) {
        
    }
}

//TODO CREAR NUEVA SOLICITUD
const createNewRequest = async (newRequest) => {
    try {
        const createdRequest = await RequestStorage.createNewRequest(newRequest);
        return createdRequest;
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVO DETALLE DE SOLICITUD
const createNewDetailRequest = async (newDetailRequest) => {
    try {
        const createdDetailRequest = await RequestStorage.createNewDetailRequest(newDetailRequest);
        return createdDetailRequest;
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
    getRequestsOnHold,
    getOneRequest,
    getOneRequestComplete,
    createNewRequest,
    createNewDetailRequest,
    updateOneRequest
}