module.exports = class Application {
    #express = require('express');
    #app = this.#express();
    constructor(PORT, DB_URL)   {
        this.configDatabase(DB_URL);
        this.configApplication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }

    configApplication(){
        const path = require("path");
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({ extended: true }));
        this.#app.use(this.#express.static(path.join(__dirname, '..', 'public')));
    }

    createServer(PORT){
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server is runnig on : http://localhost:${PORT}`);
        });
    }

    configDatabase(DB_URL){
        const mongoose = require('mongoose');
        mongoose.connect(DB_URL).then(
            () =>  { console.log('Connected to MongoDB successfully') },
            err => console.log(err.message)
        )
    }

    errorHandler(){
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'We cant find the page you\'re looking for'
            });
        });
        this.#app.use((err, req, res, next) => {
            const status = err?.status || 500;
            const message = err?.message || 'Internal server error';
            return res.status(ststus).json({
                status,
                success: false,
                message
            })
        })
    }

    createRoutes(){
        this.#app.get('/', (req, res, next) => {
            return res.json({
                message: 'First step'
            })
        })
    }

}