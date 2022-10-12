const {check} = require('express-validator')
const {validateResult} = require ('../helper/validateHelper')

const validateCreateVehicle = [
    check('plate')
        .exists()
        .notEmpty()
        .withMessage("Debe ingresar un número de placa")
        .matches(/[MO]{1,2}[ ]{0,1}[0]{0,1}[-]{0,1}[0-9]{3,3}[a-zA-Z]{3,3}/)
        .withMessage("No cumple con las caracteristicas de una placa"),
    check('type')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('brand') 
        .exists()
        .notEmpty(),
    check('model')
        .exists()
        .notEmpty()
        .isNumeric()
        .isLength({min: 4, max: 4})
        .withMessage("Error en la cantidad de caracteres"),
    check('km')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('gas')
        .exists()
        .notEmpty(),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]
module.exports = {
    validateCreateVehicle
}