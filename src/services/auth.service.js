const AuthStorage = require("../storage/auth.storage")

//TODO CREAR NUEVO USUARIO
const createNewUser = async (newUser) => {
    try {
        const createdUser = await AuthStorage.createNewUser(newUser);
        return createdUser;
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER USERNAME
const getOneUsername = async (detailUsername) => {
    try {
        const OneUsername = await AuthStorage.getOneUsername(detailUsername);
        return OneUsername
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER TODOS LOS USUARIOS
const getAllUsers = async () => {
    try {
        const allUsers = await AuthStorage.getAllUsers();
        return allUsers
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER UN SOLO USUARIO
const getOneUser = async (uuid) => {
    try {
        const oneUser = await AuthStorage.getOneUser(uuid);
        return oneUser
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewUser,
    getOneUsername,
    getAllUsers,
    getOneUser
}