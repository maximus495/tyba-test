const { Router } = require('express');
// const { check } = require('express-validator');

const {login} = require('./controller')
// const {validarCampos} = require('../middlewares/validar-campos')

const router = Router();

// router.post('/login',[

//     check('correo','Correo obligatorio').isEmail(),
//     check('password','La constraseña es obligatoria').not().isEmpty(),
//     validarCampos
// ], login)

router.post('/login', login)





module.exports = router;