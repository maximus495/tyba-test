const { response } = require('express');
const {loginUser} = require('../../store/database')
const {UserHistory} = require('../../helpers/history')
const bcryptjs = require('bcryptjs');


const {generarJWT} = require('../../helpers/generar-jwt');

const login = async(req, res = response) =>{

    const {username,password} = req.body;
    const usuario = await loginUser(username)
    if(usuario){

        //verificar pass
        const validaPassWord = bcryptjs.compareSync(password, usuario.pwd);
        if (!validaPassWord) {
            return res.status(400).json({
                msg: 'usuario / Password no valido - Correo'
            })
        }

        //generar el jwt
       const token = await generarJWT( usuario.id );
       const { pwd, ... data} = usuario
       UserHistory({id:usuario.id, descripcion: 'login'})

       res.status(200).json({
            response: 'Ok',
            data,
            token
       })

    }else{
        console.log("error");
        res.status(400).json({msg:'usuario / Password no son correctos'})
    }





}

module.exports = {login};