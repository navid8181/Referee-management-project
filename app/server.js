
const express = require('express');
const http = require('http');
const { allRoutes } = require('./router/routes');
const {default: mongoose} = require('mongoose');
const createHttpError = require('http-errors');
const {StatusCodes} = require("http-status-codes")
class Server {

    #app = express();
    #DB_URI
    #PORT

    constructor(DB_URI,PORT){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;

        this.configApplication();
        this.createServer();
        this.createRoutes();
        this.connectToDB();
        this.errorHandling();
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


    createRoutes(){
        this.#app.use(allRoutes);
    }

    async connectToDB(){
        try {

            await mongoose.connect(this.#DB_URI)
            
            console.log("connect to mongodb is successful");
            
        } catch (error) {
            console.log("unable to connect to MongoDB");
            console.log(error.message);
        }

        mongoose.connection.on("connected", () => {

            console.log("connect to mongodb is successful");

        })

        mongoose.connection.on("disconnected", () => {

            console.log("disconnect to mongodb...");

        })

        process.on('SIGINT', async () => {

            await mongoose.connection.close();
            console.log("mongo Connection is Closed...");

            process.exit(0);

        })
    }


    errorHandling(){

        this.#app.use((req,res,next)=>{

            res.status(StatusCodes.NOT_FOUND).json(createHttpError.NotFound("آدرس مورد نظر یافت نشد"))

        })

        this.#app.use((error, req, res, next) => {


            const serverError = createHttpError.InternalServerError();

            const statusCode = error.status || serverError.status;

            const message = error.message || serverError.message;

            return res.status(statusCode).json({

                errors: {
                    statusCode,
                    message,
               

                }


            })


        })

    }

}

module.exports = {Server}