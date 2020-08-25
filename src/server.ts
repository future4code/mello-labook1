import express from 'express';
import Router from './Controllers/Router';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    public middlewares() {
        this.app.use(express.json());
    }

    public routes() {
        this.app.route('/signup').post(Router.signUp);
    }
}

export default new Server();
