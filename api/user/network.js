const { Router } = require('express');
const {newUser,apiRestaurants,getRestaurants} = require('./controller')
const {validarJWT } = require('../../middlewares')


const router = Router();

router.post('/newUser', newUser)
router.post('/shops',[validarJWT], apiRestaurants)
router.get('/history',[validarJWT], getRestaurants)



module.exports = router;