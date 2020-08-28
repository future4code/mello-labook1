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
        this.app.route('/friends/make').post(Router.makeFriendship);
        this.app.route('/friends/undo').delete(Router.undoFriendship);
        this.app.route('/posts/create').post(Router.createPost);
        this.app.route('/posts/:postId/like').patch(Router.likePost);
        this.app.route('/posts/:postId/dislike').patch(Router.dislikePost);
    }
}

export default new Server();
