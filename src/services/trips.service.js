const TripStorage = require("../storage/trips.storage")

//TODO OBTENER TODOS LOS VIAJES EXTERIORES
const getAllTripsFromExteriorRequest = async () => {
    try{
        const allTrips = await TripStorage.getAllTripsFromExteriorRequest();
        return allTrips;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS VIAJES EXTERIORES EN ESPERA
const getTripsOnHoldFromExteriorRequest = async () => {
    try{
        const tripsOnHold = await TripStorage.getTripsOnHoldFromExteriorRequest();
        return tripsOnHold;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS VIAJES LOCALES
const getAllTripsFromLocalRequest = async () => {
    try{
        const allTrips = await TripStorage.getAllTripsFromLocalRequest();
        return allTrips;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS VIAJES LOCALES EN ESPERA
const getTripsOnHoldFromLocalRequest = async () => {
    try{
        const tripsOnHold = await TripStorage.getTripsOnHoldFromLocalRequest();
        return tripsOnHold;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER UN TRIP
const getOneTrip = async (id) => {
    try {
        const oneTrip = await TripStorage.getOneTrip(id);
        return oneTrip
    } catch (error) {
        
    }
}

//TODO CREAR NUEVO TRIP
const createNewTrip = async (newTrip) => {
    try {
        const createdTrip = await TripStorage.createNewTrip(newTrip);
        return createdTrip;
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UN TRIP
const updateOneTrip = async (id, Trip) => {
    try {
        const updatedTrip = await TripStorage.updateOneTrip(id, Trip);
        return updatedTrip;
    } catch (error) {
        throw error;
    }

}

module.exports = {
    getAllTripsFromExteriorRequest,
    getTripsOnHoldFromExteriorRequest,
    getAllTripsFromLocalRequest,
    getTripsOnHoldFromLocalRequest,
    getOneTrip,
    createNewTrip,
    updateOneTrip,
}