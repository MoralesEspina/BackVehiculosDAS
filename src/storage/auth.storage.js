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
        const result  = await connection.query("SELECT uuid, username, password, r.rol from user join rol as r where rol_id = r.idrol and username =  ?", detailUsername);
            return result[0];
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER TODOS LOS USUARIOS
const getAllUsers= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("Select u.uuid,u.username,r.rol,p.fullname from user AS u join rol AS r join person AS p where u.uuidperson = p.uuid and u.rol_id = r.idrol")
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER ROLES
const getOneRol= async (uuid) =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("Select rol_id from user where uuid = ?", uuid)
        var data=JSON.parse(JSON.stringify(result))
        return data[0];
    }catch(error){
        throw error;
    }
}

//TODO OBTENER UN USUARIO
const getOneUser = async (uuid) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("Select username,rol_id, uuidPerson from user where uuid = ?", uuid);
        if (result.length <= 0) {
            return {
            status: 404,
            message: 'No se encontro el usuario'
        };
        }else{
            return result;
        }
    } catch (error) {
        throw error;
    }
}
//TODO OBTENER UN USERNAME
const getPassword = async (uuid) => {
    try {
        const connection = await getConnection();
        const result  = await connection.query("SELECT password from user where uuid = ?", uuid);
            return result[0];
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UN USUARIO
const updateOneUser = async (id, updatedUser) => {
    try{
        const connection = await getConnection();
            const result = await connection.query("UPDATE user SET username = IFNULL(?, username), password = IFNULL(?, password), rol_id = IFNULL(?, rol_id) WHERE uuid = ?",
            [updatedUser.username,updatedUser.password,updatedUser.rol_id,id]);
            if (result.affectedRows === 0) {
                return {
                    status: 400,
                    message: 'El usuario no existe'
                };
            }
             const updated = await connection.query("Select u.uuid,u.username,r.rol from user AS u join rol AS r where u.rol_id = r.idrol and uuid = ?", id);
             return updated;

    } catch(error)
    {
        throw error;
    }
}

module.exports = {
    createNewUser,
    getOneUsername,
    getAllUsers,
    getOneUser,
    getOneRol,
    updateOneUser,
    getPassword
}