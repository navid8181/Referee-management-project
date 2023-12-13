
const express = require('express');
const http = require('http');
class Server {

    #app = express();
    #DB_URI
    #PORT

    constructor(DB_URI,PORT){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;

        this.configApplication();
        this.createServer();
    }

    
    configApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true})); 
    }

    createServer(){
        const server = http.createServer(this.#app);

        server.listen(this.#PORT,()=>{
            console.log("app run on : http://localhost:" + this.#PORT);
        });
    }




}

module.exports = {Server}