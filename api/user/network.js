const { Router } = require('express');
// const { check } = require('express-validator');

const {newUser,apiRestaurants,getRestaurants} = require('./controller')
const {validarJWT } = require('../../middlewares')
// const {validarCampos} = require('../middlewares/validar-campos')

const router = Router();

// router.post('/login',[
//     check('correo','Correo obligatorio').isEmail(),
//     check('password','La constraseña es obligatoria').not().isEmpty(),
//     validarCampos
// ], login)

router.post('/newUser', newUser)
router.post('/shops',[validarJWT], apiRestaurants)
router.get('/history',[validarJWT], getRestaurants)



module.exports = router;