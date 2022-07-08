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