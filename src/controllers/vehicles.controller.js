import {getConnection} from "./../database/database";

const getVehicles= async(req,res) =>{
    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT * from vehicle");
        res.json(result)
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getVehicle= async(req,res) =>{
    try{
        const { id } = req.params;
        const connection= await getConnection();
        const result = await connection.query("SELECT * from vehicle where vin = ?", id);
        res.json(result)
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const createVehicle= async(req,res) =>{
    try{
        
    }catch(error){
        
    }
}

const updateVehicle= async(req,res) =>{
    try{
        
    }catch(error){
        
    }
}

const deleteVehicle= async(req,res) =>{
    try{
        
    }catch(error){
    
    }
}

export const methods = {
    getVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,

}