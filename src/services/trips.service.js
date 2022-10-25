const TripStorage = require("../storage/trips.storage")

//TODO OBTENER TODOS LOS TRIPS
const getAllTripsFromExteriorRequest = async () => {
    try{
        const allTrips = await TripStorage.getAllTripsFromExteriorRequest();
        return allTrips;
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
    getOneTrip,
    createNewTrip,
    updateOneTrip,
}