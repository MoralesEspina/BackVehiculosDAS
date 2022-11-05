import {getConnection} from "./../database/database";

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVouchersDiesel= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT v.iddiesel,v.date,vh.plate,v.comission_to,v.cost,p.fullname from voucher_diesel AS v join vehicle as vh join person as p where vh.vin = v.id_vehicle and p.uuid = v.id_pilot")
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
        const result = await connection.query("SELECT date,cost,v.plate,v.type,v.brand,v.model,v.color,comission_to,objective,p.fullname,p.dpi from voucher_diesel join vehicle AS v join person AS p where v.vin = id_vehicle and p.uuid = id_pilot and idregular = ?")
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
        const result = await connection.query("SELECT iddiesel,date,cost,v.plate,v.brand,v.model,v.color,comission_to,objective,km_gallon,service_of,comission_date,km_to_travel,p.fullname,p.dpi,vt.type_name from voucher_diesel join vehicle AS v join person AS p join vtype AS vt where v.vin = id_vehicle and p.uuid = id_pilot and vt.idvtype = v.type and iddiesel = ?", id);
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
        const result = await connection.query("SELECT idregular,date,cost,v.plate,v.brand,v.model,v.color,comission_to,objective,p.fullname,p.dpi,vt.type_name from voucher_regular join vehicle AS v join person AS p join vtype AS vt where v.vin = id_vehicle and p.uuid = id_pilot and vt.idvtype = v.type and idregular = ?", id);
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
            await connection.query("INSERT INTO voucher_diesel (date,cost,id_vehicle,comission_to,objective,id_pilot,km_gallon,service_of,comission_date,km_to_travel) values (?,?,?,?,?,?,?,?,?,?)",
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
            await connection.query("INSERT INTO voucher_regular (date,cost,id_vehicle,comission_to,objective,id_pilot) values (?,?,?,?,?,?)",
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
            const result = await connection.query("UPDATE Voucher SET plate = IFNULL(?, plate), type = IFNULL(?, type), brand = IFNULL(?, brand), model = IFNULL(?, model), km = IFNULL(?, km), gas = IFNULL(?, gas), status = IFNULL(?, status), active = IFNULL(?, active), cylinders = IFNULL(?, cylinders), color = IFNULL(?, color) WHERE vin = ?",
            [updatedVoucher.plate,updatedVoucher.type,updatedVoucher.brand,updatedVoucher.model,updatedVoucher.km, updatedVoucher.gas, updatedVoucher.status, updatedVoucher.active, updatedVoucher.cylinders, updatedVoucher.color, id]);
            if (result.affectedRows === 0) {
                return {
                    status: 400,
                    message: 'El número de VIN no existe'
                };
            }
             const updated = await connection.query("SELECT v.vin,v.brand,v.model,v.plate,v.km,t.type_name,v.gas,s.status_name,v.active,v.cylinders,v.color from Voucher AS v join vtype As t join status AS s where v.type = t.idvtype and v.status = s.idstatus and vin = ?", id);
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
        const result = await connection.query("DELETE FROM Voucher WHERE vin = ?", id);
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