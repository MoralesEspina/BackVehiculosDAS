import {getConnection} from "./../database/database";

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVouchersDiesel= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT v.iddiesel,v.date,vh.plate,v.comission_to,v.cost,p.fullname 
        FROM voucher_diesel AS v 
        JOIN vehicle as vh 
        JOIN person as p 
        WHERE vh.idVehicle = v.id_vehicle 
        AND p.uuid = v.id_pilot 
        ORDER BY v.iddiesel desc`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVouchersRegular= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT v.idregular,v.date,vh.plate,v.comission_to,v.cost,p.fullname 
        FROM voucher_regular AS v 
        JOIN vehicle as vh 
        JOIN person as p 
        WHERE vh.idVehicle = v.id_vehicle 
        AND p.uuid = v.id_pilot 
        ORDER BY v.idregular desc`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER UN VEHICULO
const getOneVoucherDiesel = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT iddiesel,date,cost,v.idVehicle,v.plate,v.brand,v.model,v.color,comission_to,objective,km_gallon,service_of,comission_date,km_to_travel,p.fullname,p.dpi,vt.type_name 
        FROM voucher_diesel 
        JOIN vehicle AS v 
        JOIN person AS p 
        JOIN vtype AS vt 
        WHERE v.idVehicle = id_vehicle 
        AND p.uuid = id_pilot 
        AND vt.idvtype = v.type 
        AND iddiesel = ?`, id);
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

//TODO OBTENER UN VEHICULO
const getOneVoucherRegular = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT idregular,v.idVehicle,date,cost,v.plate,v.brand,v.model,v.color,comission_to,objective,p.fullname,p.dpi,vt.type_name 
        FROM voucher_regular 
        JOIN vehicle AS v 
        JOIN person AS p 
        JOIN vtype AS vt 
        WHERE v.idVehicle = id_vehicle 
        AND p.uuid = id_pilot 
        AND vt.idvtype = v.type 
        AND idregular = ?`, id);
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

//TODO CREAR NUEVO VALE DIESEL
const createNewVoucherDiesel = async (newVoucher) => {
    try{
        const connection = await getConnection();
            await connection.query(`
            INSERT INTO voucher_diesel (date,cost,id_vehicle,comission_to,objective,id_pilot,km_gallon,service_of,comission_date,km_to_travel) 
            values (?,?,?,?,?,?,?,?,?,?)`,
            [newVoucher.date, newVoucher.cost, newVoucher.id_vehicle,newVoucher.comission_to,newVoucher.objective, newVoucher.id_pilot, newVoucher.km_gallon, newVoucher.service_of, newVoucher.comission_date, newVoucher.km_to_travel]);
            return {date: newVoucher.date, 
                    cost: newVoucher.cost,
                    id_vehicle: newVoucher.id_vehicle,
                    comission_to: newVoucher.comission_to,
                    objective: newVoucher.objective,
                    id_pilot: newVoucher.id_pilot,
                    km_gallon: newVoucher.km_gallon,
                    service_of: newVoucher.service_of,
                    comission_date: newVoucher.comission_date};
    } catch(error)
    {
        throw error;
    }
}


//TODO CREAR NUEVO VALE DIESEL
const createNewVoucherRegular= async (newVoucher) => {
    try{
        const connection = await getConnection();
            await connection.query(`
            INSERT INTO voucher_regular (date,cost,id_vehicle,comission_to,objective,id_pilot) 
            values (?,?,?,?,?,?)`,
            [newVoucher.date, newVoucher.cost, newVoucher.id_vehicle,newVoucher.comission_to,newVoucher.objective, newVoucher.id_pilot]);
            return {date: newVoucher.date, 
                    cost: newVoucher.cost,
                    id_vehicle: newVoucher.id_vehicle,
                    comission_to: newVoucher.comission_to,
                    objective: newVoucher.objective,
                    id_pilot: newVoucher.id_pilot,};
    } catch(error)
    {
        throw error;
    }
}

//TODO ACTUALIZAR UN VEHICULO
const updateOneVoucher = async (id, updatedVoucher) => {
    try{
        const connection = await getConnection();
            const result = await connection.query(`
            UPDATE Voucher SET plate = IFNULL(?, plate), type = IFNULL(?, type), brand = IFNULL(?, brand), model = IFNULL(?, model), km = IFNULL(?, km), gas = IFNULL(?, gas), status = IFNULL(?, status), active = IFNULL(?, active), cylinders = IFNULL(?, cylinders), color = IFNULL(?, color) 
            WHERE vin = ?`,
            [updatedVoucher.plate,updatedVoucher.type,updatedVoucher.brand,updatedVoucher.model,updatedVoucher.km, updatedVoucher.gas, updatedVoucher.status, updatedVoucher.active, updatedVoucher.cylinders, updatedVoucher.color, id]);
            if (result.affectedRows === 0) {
                return {
                    status: 400,
                    message: 'El número de VIN no existe'
                };
            }
             const updated = await connection.query(`
             SELECT v.vin,v.brand,v.model,v.plate,v.km,t.type_name,v.gas,s.status_name,v.active,v.cylinders,v.color 
             FROM Voucher AS v 
             JOIN vtype As t 
             JOIN status AS s 
             WHERE v.type = t.idvtype 
             AND v.status = s.idstatus 
             AND vin = ?`, id);
             return updated;

    } catch(error)
    {
        throw error;
    }
}

//TODO ELIMINAR UN VEHICULO
const deleteOneVoucher = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        DELETE FROM Voucher 
        WHERE vin = ?`, id);
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
    getAllVouchersDiesel,
    getAllVouchersRegular,
    getOneVoucherDiesel,
    getOneVoucherRegular,
    createNewVoucherDiesel,
    createNewVoucherRegular,
    updateOneVoucher,   
    deleteOneVoucher
}