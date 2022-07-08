const { response } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config')

const validarJWT = async(req, res=response, next) =>{

    const token = req.header('x-token')
    if (!token) {
        return res.status(400).json({
            msg:'no viene token'
        });
    }

    try {

        const {uid} = jwt.verify(token, config.jwt.secret);
        req.uid = uid;
        console.log(uid);
        //leer usuario que corresponde al id
        // const usuario = await Usuario.findById(uid);
        // if (!usuario) {
        //     return res.status(401).json({
        //         msg:'usuario eiminado'
        //     });
        // }
        
        // req.usuario = usuario
        // //verificar si el uid no esta falso
        // if (!usuario.estado) {
        //     return res.status(401).json({
        //         msg:'usuario eiminado'
        //     });
        // }

        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:'token errado'
        });
    }
   
}

module.exports = {
    validarJWT
}