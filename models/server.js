const express = require('express');
const cors = require('cors');
const config = require('../config') 
const { handleCon } = require('../store/database')

class Server {

    constructor() {
        this.app = express();
        this.port = config.api.port;
        this.usuariosPath = '/api/users'
        this.authPath = '/api/auth';
    
        this.conectarDB()
        this.middlewares();
        this.routes();
    } 

    async conectarDB(){
       await handleCon();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        // Parseo y lectura body - post
        this.app.use(express.json());

        this.app.use(express.static('public'))
    }

    routes(){

        this.app.use(this.authPath, require('../api/auth/network'))
        this.app.use(this.usuariosPath, require('../api/user/network'))
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log('escuchando puerto',this.port)
        });
    }

}

module.exports = Server;