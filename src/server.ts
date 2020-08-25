import express from 'express';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.routes();
        this.middlewares();
    }

    middlewares() {}

    routes() {}
}

export default new Server();
