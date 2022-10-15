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
        let user;
        const connection = await getConnection();
        await connection.query("SELECT uuid, username, password from user where username = ?", detailUsername.username, (error, rows, field) => {
            if (!error) {
                user = rows[0];
                    console.log(user.password)
                    return user.password;
                    }   
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewUser,
    getOneUsername
}