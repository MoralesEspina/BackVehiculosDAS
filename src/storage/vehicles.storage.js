import {getConnection} from "./../database/database";

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVehicles= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT v.vin,v.brand,v.model,v.plate,v.km,t.type_name,v.gas,s.status_name,v.active from vehicle AS v join vtype As t join status AS s where v.type = t.idvtype and v.status = s.idstatus")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVehiclesActives= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT v.vin,v.brand,v.model,v.plate,v.km,t.type_name,v.gas,s.status_name,v.active,v.color,v.cylinders from vehicle AS v join vtype As t join status AS s where v.type = t.idvtype and v.status = s.idstatus and v.status = 3")
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
        const result = await connection.query("SELECT vin,brand,model,plate,km,type,gas,status,active,cylinders,color from vehicle where vin = ?", id);
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

//TODO OBTENER UN VEHICULO PARA EL VALE
const getOneVehicleForVoucher = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT v.plate,v.brand,v.model,t.type_name,v.color from vehicle AS v join vtype As t  where v.type = t.idvtype and vin = ?", id);
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
        newVehicle.active = 1
    try{
        const connection = await getConnection();
        const verifyVehicle = await connection.query("SELECT vin FROM vehicle where vin = ? ",newVehicle.vin);
        if (verifyVehicle.length <= 0) {
            await connection.query("INSERT INTO vehicle (vin,plate,type,cylinders,color,brand,model,km,gas,status,active) values (?,?,?,?,?,?,?,?,?,?,?)",
            [newVehicle.vin, newVehicle.plate, newVehicle.type,newVehicle.cylinders,newVehicle.color, newVehicle.brand, newVehicle.model, newVehicle.km, newVehicle.gas, newVehicle.status, newVehicle.active]);
            return {vin: newVehicle.vin, 
                    plate: newVehicle.plate,
                    type: newVehicle.type,
                    cylinders: newVehicle.cylinders,
                    color: newVehicle.color,
                    brand: newVehicle.brand,
                    model: newVehicle.model,
                    km: newVehicle.km,
                    gas: newVehicle.gas};
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
    try{
        const connection = await getConnection();
            const result = await connection.query("UPDATE vehicle SET plate = IFNULL(?, plate), type = IFNULL(?, type), brand = IFNULL(?, brand), model = IFNULL(?, model), km = IFNULL(?, km), gas = IFNULL(?, gas), status = IFNULL(?, status), active = IFNULL(?, active), cylinders = IFNULL(?, cylinders), color = IFNULL(?, color) WHERE vin = ?",
            [updatedVehicle.plate,updatedVehicle.type,updatedVehicle.brand,updatedVehicle.model,updatedVehicle.km, updatedVehicle.gas, updatedVehicle.status, updatedVehicle.active, updatedVehicle.cylinders, updatedVehicle.color, id]);
            if (result.affectedRows === 0) {
                return {
                    status: 400,
                    message: 'El número de VIN no existe'
                };
            }
             const updated = await connection.query("SELECT v.vin,v.brand,v.model,v.plate,v.km,t.type_name,v.gas,s.status_name,v.active,v.cylinders,v.color from vehicle AS v join vtype As t join status AS s where v.type = t.idvtype and v.status = s.idstatus and vin = ?", id);
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
    getAllVehiclesActives,
    getOneVehicle,
    getOneVehicleForVoucher,
    createNewVehicle,
    updateOneVehicle,   
    deleteOneVehicle
}