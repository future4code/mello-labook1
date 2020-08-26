import express from 'express';
import Router from './Controllers/Router';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.routes();
    }

    public routes() {
        this.app.use(express.json());
        this.app.route('/signup').post(Router.signUp);
        this.app.route('/login').post(Router.login);
        this.app.route('/makefriend').post(Router.doFriendship);
    }
}

export default new Server();
