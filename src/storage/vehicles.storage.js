import {getConnection} from "./../database/database";

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVehicles= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * from vehicle")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER UN VEHICULO
const getOneVehicle = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT plate,type,brand,model from vehicle where vin = ?", id);
        if (result.length <= 0) {
            return {
            status: 404,
            message: 'No se encontro el vehiculo'
        };
        }else{
            return result;
        }
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVO VEHICULO
const createNewVehicle = async (newVehicle) => {
    const vehicle = {
        vin: newVehicle.vin,
        plate: newVehicle.plate,
        type: newVehicle.type,
        brand: newVehicle.brand,
        model: newVehicle.model
    }
    try{
        const connection = await getConnection();
        const verifyVehicle = await connection.query("SELECT vin FROM vehicle where vin = ? ",vehicle.vin);
        if (verifyVehicle.length <= 0) {
            await connection.query("INSERT INTO vehicle (vin,plate,type,brand,model) values (?,?,?,?,?)",
            [vehicle.vin,vehicle.plate,vehicle.type,vehicle.brand,vehicle.model]);
            return {vin: vehicle.vin, 
                    plate: vehicle.plate,
                    type: vehicle.type,
                    brand: vehicle.brand,
                    modelo: vehicle.model};
        }else{
            return {
                status: 400,
                message: 'Número de VIN existente'
            };
        }
    } catch(error)
    {
        throw error;
    }
}

//TODO ACTUALIZAR UN VEHICULO
const updateOneVehicle = async (id, updatedVehicle) => {
    const vehicle = {
        plate: updatedVehicle.plate,
        type: updatedVehicle.type,
        brand: updatedVehicle.brand,
        model: updatedVehicle.model
    }
    try{
        const connection = await getConnection();
            const result = await connection.query("UPDATE vehicle SET plate = IFNULL(?, plate), type = IFNULL(?, type), brand = IFNULL(?, brand), model = IFNULL(?, model) WHERE vin = ?",
            [vehicle.plate,vehicle.type,vehicle.brand,vehicle.model,id]);
            if (result.affectedRows === 0) {
                return {
                    status: 400,
                    message: 'El número de VIN no existe'
                };
            }

             const updated = await connection.query("SELECT plate,type,brand,model from vehicle where vin = ?", id);
             return updated;

    } catch(error)
    {
        throw error;
    }
}

//TODO ELIMINAR UN VEHICULO
const deleteOneVehicle = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM vehicle WHERE vin = ?", id);
        if (result.affectedRows <= 0) {
            return {
                status: 400,
                message: 'El número de VIN no existe'
            };
        }
        return {
            status: 204
        }
    } catch (error) {
        throw error;
    }
    
}
module.exports = {
    getAllVehicles,
    getOneVehicle,
    createNewVehicle,
    updateOneVehicle,
    deleteOneVehicle
}