const { response } = require('express');
const bcryptjs = require('bcryptjs');
const {InsertUser,userDistance,query} = require('../../store/database')
const {UserHistory} = require('../../helpers/history')


const newUser = async(req, res = response) =>{

    const {nombre,correo,password,ciudad,lat,lng} = req.body
    const user = {
        nombre,
        email: correo,
        ciudad,
        lat,
        lng,
        pwd: password,
        estado: 'Activo'
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.pwd = bcryptjs.hashSync(password, salt);

    //save bd
    const data = await InsertUser(user)
    if(data != ''){ 
        res.status(200).json({
            response: 'Guardado con exito!'
       })
    }else{
        res.status(400).json({
            response:'Error al guardar usuario'
        }) 
    }    
}

const apiRestaurants = async(req, res = response) => {
   
    try{
       const {lat,lng} = req.body
       const data = await userDistance(lat,lng)
       UserHistory({id:req.uid, descripcion: 'Shops'})
       if(data != ''){
          const retoTo={
               response: 'Ok', 
               data: data
          }
          res.status(200).json(retoTo) 

       }else{
        res.status(400).json({"response":'BAD'}) 
       }
    }catch (err) {
          console.error(err, err.stack);
          res.status(500).json({"response":'Error interno!'}) 
      }
 }

 const getRestaurants = async(req, res = response) => {
   
    try{
      
       const data = await query(req.uid)
       if(data != ''){
          const retoTo={
               response: 'Ok', 
               data: data
          }
          res.status(200).json(retoTo) 

       }else{
        res.status(400).json({"response":'BAD'}) 
       }
    }catch (err) {
          console.error(err, err.stack);
          res.status(500).json({"response":'Error interno!'}) 
      }
 }


module.exports = {newUser,apiRestaurants,getRestaurants};