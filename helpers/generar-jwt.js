const jwt = require('jsonwebtoken');
const config = require('../config')


const generarJWT = (uid='') =>{

    return new Promise((resolve, reject) => {
        
        const payload = {uid};

        jwt.sign(payload, config.jwt.secret, {
            expiresIn: '4h'
        },(err, token) =>{
            if (err) {
                reject('no se puedo generar token')
            }else{
                resolve(token);
            }
        })

    })

}

module.exports = {
    generarJWT
};