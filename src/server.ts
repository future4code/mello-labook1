import express from 'express';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    public middlewares() {}

    public routes() {}
}

export default new Server();
