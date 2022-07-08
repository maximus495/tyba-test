const mysql = require('mysql')
const config = require('../config')

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

async function handleCon() {
    connection = mysql.createConnection(dbconf);
    connection.connect((err) => {

        if (err) {
            setTimeout(handleCon,2000)
        } else {
            console.log('DB Connected!')
        }
    })

}

function query(iduser) {

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM tyba_history WHERE iduser = ${iduser}`, (err, result) =>{
            if (err) return reject(err) 
            resolve(result);      
        })
    })
}

function loginUser(username) {  
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id,nombre,ciudad,lat,lng,pwd FROM s_clientes_copy1 WHERE email = '${username}' and estado = 'Activo'`, (err2, result) =>{
            if (err2) return reject(err2) 
            resolve(result[0]);      
        })     
    })
}

function InsertUser(body) { //registro usuario
    return new Promise((resolve, reject) => {

        let responseJson = JSON.parse(JSON.stringify(body));
        connection.query('INSERT INTO s_clientes_copy1 SET ?', responseJson ,(err, result) =>{
            if (err) return reject(err) 
            resolve(result);      
        })
    })
}

function InsertUserHistory(body) { 
    return new Promise((resolve, reject) => {

        let responseJson = JSON.parse(JSON.stringify(body));
        connection.query('INSERT INTO tyba_history SET ?', responseJson ,(err, result) =>{
            if (err) return reject(err) 
            resolve(result);      
        })
    })
}

function userDistance(lat,lng) {
    return new Promise((resolve, reject) => {
        connection.query(`CALL sp_tyba (${lat},${lng}) `, (err, result) =>{
            if (err) return reject(err) 
            resolve(result[0]);      
        })
    })
}


module.exports = {
    handleCon,
    loginUser,
    InsertUser,
    query,
    userDistance,
    InsertUserHistory
}


