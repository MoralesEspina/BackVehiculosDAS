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
        console.log("s")
        return OneUsername
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createNewUser,
    getOneUsername
}