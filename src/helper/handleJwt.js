const jwt = require('jsonwebtoken')

const generateSign = (user) => {
    try {
        const token = jwt.sign(
            {
                _id: user.uuid,
                name: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "4h"
            }
        )
        return token
    } catch (error) {
        console.log('__Algo fallo___', error)
        return null
    }
}

const verifySign = (token) => {
    try {
        const tokenVerify = jwt.verify(token, process.env.JWT_SECRET)
        return tokenVerify
    } catch (error) {
        console.log('__Algo fallo___', error)
        return null
    }
}

module.exports = { 
    generateSign, 
    verifySign 
}