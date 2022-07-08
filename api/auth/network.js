const { Router } = require('express');
const {login} = require('./controller')

// const { check } = require('express-validator');
// const {validarCampos} = require('../middlewares/validar-campos')

const router = Router();

// router.post('/login',[    // middlewares para validar los campos :( no me dio el tiempo 

//     check('correo','Correo obligatorio').isEmail(),
//     check('password','La constraseña es obligatoria').not().isEmpty(),
//     validarCampos
// ], login)

router.post('/login', login)



module.exports = router;