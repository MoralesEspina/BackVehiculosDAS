import {getConnection} from "./../database/database";

//TODO CREAR NUEVO USUARIO
const createNewUser = async (newUser) => {
    try{
        const connection = await getConnection();
            await connection.query("INSERT INTO user (uuid,username,password,rol_id,uuidPerson) values (?,?,?,?,?)",
            [newUser.uuid,newUser.username,newUser.password,newUser.rol_id,newUser.uuidPerson]);
            return {uuid: newUser.uuid, 
                    username: newUser.username,
                    rol_id: newUser.rol_id,
                    uuidPerson: newUser.uuidPerson,};
    } catch(error)
    {
        throw error;
    }
}

//TODO OBTENER UN USERNAME
const getOneUsername = async (detailUsername) => {
    try {
        const connection = await getConnection();
        const result  = await connection.query("SELECT uuid, username, password from user where username = ?", detailUsername.username);
            return result[0];
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER TODOS LOS USUARIOS
const getAllUsers= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT p.uuid,p.fullname,j.job_name,p.phone,p.dpi,p.nit,active,available from person AS p join job As j where p.job = j.id")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER UN USUARIO


module.exports = {
    createNewUser,
    getOneUsername,
    getAllUsers
}