const { v4: uuidv4 } = require('uuid');
//const moment = require('moment')
//const userModel = require('../models/users')
//const { ctrlError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helper/handleBcrypt')
const { generateSign } = require('../helper/handleJwt')
const AuthService = require("../services/auth.service")

const loginUser = async (req, res) => {
    try {
        //const today = moment()
        const { body } = req
        const detailUsername = {
            username: body.username
        }
        const detailUser = await AuthService.getOneUsername(detailUsername);

        if (detailUser.status == 404) {
            res.status(404).json({ data: detailUser })
        } else {
            console.log(detailUser)
            const checkPassword = await compare(body.password, detailUser.password)
            if (checkPassword) {
                console.log("hola")
                const tokenObject = {
                    token: await generateSign(detailUser),
                    expire: today.add(4, 'hours').format('DD MM YYYY HH:MM:SS')
                }
                res.send({
                    data: detailUser,
                    tokenObject
                })
            } else {
                res.status(409)
                res.send({ error: 'Contraseña Invalida' })
            }
        }
    } catch (error) {
        res.status(error?.status || 500)
        res.send({ status: "Failed", data: { error: error?.message || error } })
    }
}

const registerUser = async (req, res) => {
    try {
        const { body } = req
        const passwordHash = await encrypt(body.password)
        const newUser = {
            uuid: uuidv4(),
            username: body.username,
            password: passwordHash,
            rol_id: body.rol_id,
            uuidPerson: body.uuidPerson
        }
        const detailUser = await AuthService.createNewUser(newUser)
        if (detailUser.status == 400) {
            res.status(400).json({ data: detailUser })
        } else {
            res.status(201).json({ status: "Creado Correctamente", data: detailUser })
        }
    } catch (error) {
        res.status(error?.status || 500)
        res.send({ status: "Failed", data: { error: error?.message || error } })
    }
}

const getCtrl = async (req, res) => {
    try {
        const user = req.user;
        res.send({ data: user })
    } catch (e) {
        ctrlError(e, res)
    }
}

export const methods = {
    loginUser,
    registerUser,
    getCtrl
}